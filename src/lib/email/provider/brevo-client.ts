/**
 * Server-only Brevo transactional email client (POST https://api.brevo.com/v3/smtp/email).
 * It owns the payload shape and the HTTP call; the sender address, the inbox and
 * the API key come from `sender-config.ts`, which reads them from process.env.
 * Only route handlers import this, so BREVO_API_KEY never reaches a client bundle
 * or a browser response.
 */
import { headerSafe } from '../templates/subjects';
import { LOGO_BASE64, LOGO_CONTENT_ID, LOGO_FILENAME, LOGO_MIME_TYPE } from '../assets/logo-asset';
import { isSendableEmail, maskEmail, type EmailConfig } from './sender-config';

const BREVO_SEND_URL = 'https://api.brevo.com/v3/smtp/email';
const SEND_TIMEOUT_MS = 8_000;
const UPLOAD_TIMEOUT_MS = 20_000;

export type BrevoFailureReason = 'not-configured' | 'rejected' | 'timeout' | 'network';

export interface BrevoSendOutcome {
  ok: boolean;
  /** Brevo's message id: the only evidence we have that the send was accepted. */
  messageId?: string;
  reason?: BrevoFailureReason;
  status?: number;
}

export interface EmailAttachment {
  /** Base64 of the file bytes, without a data: URI prefix. */
  content: string;
  filename: string;
  type: string;
}

/** A Reply-To target. The address is only used after `isSendableEmail` accepts it. */
export interface EmailRecipient {
  email: string;
  /** Display name as it should appear in the Reply-To header. */
  name?: string;
}

const MAX_RECIPIENT_NAME_LENGTH = 80;

/**
 * Only a validated address can become a Reply-To header, and the display name
 * loses control characters before it does, so a form value can neither forge a
 * header line nor point the VPD team at a blank address.
 */
function replyToHeader(
  replyTo: EmailRecipient | undefined
): { email: string; name?: string } | undefined {
  if (!replyTo) return undefined;

  const email = String(replyTo.email ?? '').trim();
  if (!isSendableEmail(email)) return undefined;

  const name = headerSafe(replyTo.name).slice(0, MAX_RECIPIENT_NAME_LENGTH);
  return name === '' ? { email } : { email, name };
}

export interface SendEmailParams {
  to: string;
  subject: string;
  htmlBody: string;
  config: EmailConfig;
  replyTo?: EmailRecipient;
  /** Downloadable files that travel with the message, e.g. a candidate resume. */
  attachments?: EmailAttachment[];
}

export async function sendTransactionalEmail({
  to,
  subject,
  htmlBody,
  config,
  replyTo,
  attachments,
}: SendEmailParams): Promise<BrevoSendOutcome> {
  const files = attachments ?? [];
  // A multi-megabyte resume takes longer than a text-only send to leave this
  // function, so the plain 8s budget would abort uploads that Brevo would
  // happily have accepted.
  const timeoutMs = files.length > 0 ? UPLOAD_TIMEOUT_MS : SEND_TIMEOUT_MS;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const reply = replyToHeader(replyTo);
  // A dropped Reply-To means the admin copy still sends but cannot be answered
  // in one click, so say so in the log rather than leaving it silent.
  if (replyTo !== undefined && reply === undefined) {
    console.error('[brevo] reply-to dropped: address failed validation', { subject });
  }

  const payload = {
    sender: { name: config.senderName, email: config.senderEmail },
    to: [{ email: to }],
    subject,
    htmlContent: htmlBody,
    // The template references the logo as cid:vpd-logo, so the image has to
    // travel inside the message: the site domain is parked and serves no logo.
    attachment: [
      {
        content: LOGO_BASE64,
        name: LOGO_FILENAME,
        filename: LOGO_FILENAME,
        type: LOGO_MIME_TYPE,
        headers: [
          { name: 'Content-ID', value: `<${LOGO_CONTENT_ID}>` },
          { name: 'Content-Disposition', value: `inline; filename=${LOGO_FILENAME}` },
        ],
      },
      ...files.map((file) => ({
        content: file.content,
        name: file.filename,
        filename: file.filename,
        type: file.type,
        // Sanitised by the caller, so the header value cannot be broken out of.
        headers: [{ name: 'Content-Disposition', value: `attachment; filename=${file.filename}` }],
      })),
    ],
    ...(reply === undefined ? {} : { replyTo: reply }),
  };

  try {
    const response = await fetch(BREVO_SEND_URL, {
      method: 'POST',
      headers: {
        'api-key': config.apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const bodyText = await response.text().catch(() => '');

    if (!response.ok) {
      // Provider detail (e.g. "some recipients are not acceptable: sender not
      // verified") stays in the server log; the caller only sees `rejected`.
      console.error('[brevo] send rejected', {
        status: response.status,
        to: maskEmail(to),
        subject,
        providerMessage: bodyText.slice(0, 300),
      });
      return { ok: false, reason: 'rejected', status: response.status };
    }

    const parsed = JSON.parse(bodyText || '{}') as { messageId?: string };
    if (!parsed.messageId) {
      console.error('[brevo] accepted without a messageId', { to: maskEmail(to), subject });
      return { ok: false, reason: 'rejected', status: response.status };
    }

    console.info('[brevo] send accepted', { to: maskEmail(to), subject, messageId: parsed.messageId });
    return { ok: true, messageId: parsed.messageId };
  } catch (error: unknown) {
    const aborted = error instanceof Error && error.name === 'AbortError';
    console.error('[brevo] send failed locally', {
      to: maskEmail(to),
      subject,
      cause: aborted ? 'timeout' : 'network',
    });
    return { ok: false, reason: aborted ? 'timeout' : 'network' };
  } finally {
    clearTimeout(timer);
  }
}
