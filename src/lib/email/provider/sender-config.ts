/**
 * Server-only Brevo sender configuration and address policy.
 *
 * Secrets are read from process.env by the route handlers that import this file,
 * so BREVO_API_KEY never reaches a client bundle or a browser response. This
 * module answers one question only — who is allowed to send, and to whom — and
 * holds no HTTP logic; see `brevo-client.ts` for the transport.
 */

/** Display name shown on every email this app sends. */
const SENDER_NAME = 'VPD Technologies';

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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * The single address rule for the whole integration: form validation uses it to
 * accept a submission, and the transport uses it again before any address is
 * allowed into a Reply-To header.
 */
export function isSendableEmail(email: unknown): email is string {
  return typeof email === 'string' && EMAIL_PATTERN.test(email.trim());
}
