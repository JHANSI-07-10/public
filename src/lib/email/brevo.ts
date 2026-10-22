/**
 * Server-only Brevo transactional email client (POST https://api.brevo.com/v3/smtp/email).
 * Reads secrets from process.env and is only ever imported from route handlers,
 * so BREVO_API_KEY never reaches a client bundle or a browser response.
 */
import { LOGO_BASE64, LOGO_CONTENT_ID, LOGO_FILENAME, LOGO_MIME_TYPE } from './logo-asset';

const BREVO_SEND_URL = 'https://api.brevo.com/v3/smtp/email';
const SEND_TIMEOUT_MS = 8_000;
const UPLOAD_TIMEOUT_MS = 20_000;
const SENDER_NAME = 'VPD Technologies';

export type BrevoFailureReason = 'not-configured' | 'rejected' | 'timeout' | 'network';

export interface BrevoSendOutcome {
  ok: boolean;
  /** Brevo's message id: the only evidence we have that the send was accepted. */
  messageId?: string;
  reason?: BrevoFailureReason;
  status?: number;
}

export interface EmailConfig {
  apiKey: string;
  senderEmail: string;
  senderName: string;
  receiverEmail: string;
}

export interface EmailConfigStatus {
  config: EmailConfig | null;
  missing: string[];
}

/** Reports which required variables are absent without ever returning their values. */
export function readEmailConfig(): EmailConfigStatus {
  const raw = {
    BREVO_API_KEY: process.env.BREVO_API_KEY?.trim() ?? '',
    BREVO_SENDER_EMAIL: process.env.BREVO_SENDER_EMAIL?.trim() ?? '',
    CONTACT_RECEIVER_EMAIL: process.env.CONTACT_RECEIVER_EMAIL?.trim() ?? '',
  };

  const missing = Object.entries(raw)
    .filter(([, value]) => value === '')
    .map(([key]) => key);

  if (missing.length > 0) return { config: null, missing };

  return {
    config: {
      apiKey: raw.BREVO_API_KEY,
      senderEmail: raw.BREVO_SENDER_EMAIL,
      receiverEmail: raw.CONTACT_RECEIVER_EMAIL,
      senderName: SENDER_NAME,
    },
    missing,
  };
}

/** Keeps full addresses out of logs while still identifying the domain. */
export function maskEmail(email: string): string {
  const [local = '', domain = ''] = email.split('@');
  if (domain === '') return '***';
  return `${local.slice(0, 2)}***@${domain}`;
}

export interface EmailAttachment {
  /** Base64 of the file bytes, without a data: URI prefix. */
  content: string;
  filename: string;
  type: string;
}

export interface SendEmailParams {
  to: string;
  subject: string;
  htmlBody: string;
  config: EmailConfig;
  replyTo?: string;
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
    ...(replyTo ? { replyTo: { email: replyTo } } : {}),
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
