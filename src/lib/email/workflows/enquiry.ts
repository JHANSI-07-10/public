/**
 * Shared server-side handling for the two website enquiry forms:
 * validation -> spam/rate guard -> durable store (existing backend) ->
 * admin notification -> user confirmation, with per-step outcome reporting.
 */
import { submitContactInquiry } from '../../../config/api';
import {
  isSendableEmail,
  maskEmail,
  readEmailConfig,
  type EmailConfig,
} from '../provider/sender-config';
import { sendTransactionalEmail } from '../provider/brevo-client';
import {
  consultationAdminNotification,
  contactAdminNotification,
} from '../templates/admin-notifications';
import {
  consultationUserConfirmation,
  contactUserConfirmation,
} from '../templates/customer-confirmations';
import { contactAdminSubject, quotationAdminSubject } from '../templates/subjects';
import type { EnquiryEmailData } from '../templates/types';
import { createSubmissionGuard } from './guards';

export type EnquiryKind = 'contact' | 'consultation';

const LIMITS = {
  name: 120,
  email: 160,
  phone: 32,
  company: 160,
  service: 200,
  preferredTime: 120,
  message: 5000,
} as const;

const REFERENCE_PATTERN = /^[A-Za-z0-9_-]{8,64}$/;

/** Asia/Kolkata: the company and its enquiries are India-based. */
const TIME_ZONE = 'Asia/Kolkata';
const TIME_ZONE_LABEL = 'IST (UTC+05:30)';

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_PER_WINDOW = 5;
const DEDUPE_TTL_MS = 15 * 60 * 1000;

export interface RawEnquiry {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  service?: unknown;
  message?: unknown;
  preferredTime?: unknown;
  referenceId?: unknown;
  submittedAt?: unknown;
  /** Honeypot: visually hidden in the form, humans never fill it in. */
  website?: unknown;
}

export interface ValidatedEnquiry {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  preferredTime: string;
  referenceId: string;
  submittedAt: Date;
}

export interface EnquiryOutcome {
  accepted: boolean;
  stored: boolean;
  adminNotified: boolean;
  userNotified: boolean;
  duplicate: boolean;
  referenceId: string;
  message: string;
}

export type EnquiryResult =
  | { kind: 'invalid'; errors: string[] }
  | { kind: 'limited' }
  | { kind: 'discarded' }
  | { kind: 'processed'; outcome: EnquiryOutcome };

const guard = createSubmissionGuard({
  maxPerWindow: RATE_MAX_PER_WINDOW,
  windowMs: RATE_WINDOW_MS,
  dedupeTtlMs: DEDUPE_TTL_MS,
});

function field(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

/**
 * The deployed backend (`POST /api/contact`) rejects a submission unless name,
 * email, phone and message are all non-empty, so those are required here too —
 * otherwise the store step can only fail. Relax both sides together if the
 * backend validator ever becomes lenient.
 */
export function validateEnquiry(kind: EnquiryKind, raw: RawEnquiry): ValidatedEnquiry | string[] {
  const errors: string[] = [];

  const name = field(raw.name, LIMITS.name);
  const email = field(raw.email, LIMITS.email);
  const phone = field(raw.phone, LIMITS.phone);
  const message = field(raw.message, LIMITS.message);

  if (name.length < 2) errors.push('Please provide your name (at least 2 characters).');
  if (email === '') errors.push('Please provide an email address.');
  else if (!isSendableEmail(email)) errors.push('Please provide a valid email address.');
  if (phone.replace(/\D/g, '').length < 7) {
    errors.push('Please provide a contact number with at least 7 digits.');
  }
  const minMessage = kind === 'contact' ? 10 : 2;
  if (message.length < minMessage) {
    errors.push(
      kind === 'contact'
        ? 'Please describe your project scope (at least 10 characters).'
        : 'Please add a short description of your requirements.'
    );
  }

  if (errors.length > 0) return errors;

  const submittedAt =
    typeof raw.submittedAt === 'string' && !Number.isNaN(Date.parse(raw.submittedAt))
      ? new Date(raw.submittedAt)
      : new Date();
  // A clock far in the future or the past is not trustworthy: use server time.
  if (Math.abs(Date.now() - submittedAt.getTime()) > 24 * 60 * 60 * 1000) {
    submittedAt.setTime(Date.now());
  }

  return {
    name,
    email,
    phone,
    company: field(raw.company, LIMITS.company),
    service: field(raw.service, LIMITS.service),
    message,
    preferredTime: field(raw.preferredTime, LIMITS.preferredTime),
    referenceId:
      typeof raw.referenceId === 'string' && REFERENCE_PATTERN.test(raw.referenceId.trim())
        ? raw.referenceId.trim()
        : createReference(kind),
    submittedAt,
  };
}

export function createReference(kind: EnquiryKind): string {
  const prefix = kind === 'contact' ? 'VPD-CT' : 'VPD-CS';
  return `${prefix}-${crypto.randomUUID().replace(/-/g, '').toUpperCase()}`;
}

export function formatSubmittedAt(at: Date): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIME_ZONE,
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(at);
  return `${parts} ${TIME_ZONE_LABEL}`;
}

function notificationKeys(kind: EnquiryKind, enquiry: ValidatedEnquiry): string[] {
  return [
    `${kind}:ref:${enquiry.referenceId}`,
    `${kind}:sender:${enquiry.email.toLowerCase()}:${enquiry.service}:${enquiry.message.slice(0, 200)}`,
  ];
}

function alreadyNotified(kind: EnquiryKind, enquiry: ValidatedEnquiry): boolean {
  return guard.isDuplicate(notificationKeys(kind, enquiry));
}

function markNotified(kind: EnquiryKind, enquiry: ValidatedEnquiry): void {
  guard.recordSent(notificationKeys(kind, enquiry));
}

async function storeEnquiry(enquiry: ValidatedEnquiry): Promise<boolean> {
  const result = await submitContactInquiry({
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone,
    company: enquiry.company,
    service: enquiry.service,
    message: enquiry.message,
  });
  if (!result.success) {
    console.error('[enquiry] backend store failed', {
      referenceId: enquiry.referenceId,
      reason: result.message?.slice(0, 200),
    });
  }
  return result.success;
}

interface EmailPlan {
  /** Built per submission from the service the visitor chose. */
  adminSubject: (data: EnquiryEmailData) => string;
  adminHtml: (data: EnquiryEmailData) => string;
  /** Constant: the customer-facing acknowledgement never changes. */
  userSubject: string;
  userHtml: (data: EnquiryEmailData) => string;
  sourceLabel: string;
}

const PLANS: Record<EnquiryKind, EmailPlan> = {
  contact: {
    adminSubject: (data) => contactAdminSubject(data.service),
    adminHtml: contactAdminNotification,
    userSubject: "We've Received Your Enquiry | VPD Technologies",
    userHtml: contactUserConfirmation,
    sourceLabel: 'Contact form',
  },
  consultation: {
    // The "Get a Quote" button opens this form, so the admin copy is filed as a
    // quotation request while the visitor keeps receiving the acknowledgement.
    adminSubject: (data) => quotationAdminSubject(data.service),
    adminHtml: consultationAdminNotification,
    userSubject: 'Your Consultation Request Has Been Received | VPD Technologies',
    userHtml: consultationUserConfirmation,
    sourceLabel: 'Book a consultation form',
  },
};

export async function processEnquiry(
  kind: EnquiryKind,
  raw: RawEnquiry,
  clientIp: string
): Promise<EnquiryResult> {
  guard.prune();

  if (typeof raw.website === 'string' && raw.website.trim() !== '') {
    return { kind: 'discarded' };
  }

  const validated = validateEnquiry(kind, raw);
  if (Array.isArray(validated)) return { kind: 'invalid', errors: validated };

  if (guard.isRateLimited(`${kind}:${clientIp}`)) return { kind: 'limited' };

  const { config, missing } = readEmailConfig();
  if (!config) {
    console.error('[enquiry] email not configured, missing', missing.join(', '));
  }

  const alreadySeen = alreadyNotified(kind, validated);
  const stored = alreadySeen ? false : await storeEnquiry(validated);

  if (alreadySeen) {
    return {
      kind: 'processed',
      outcome: {
        accepted: true,
        stored: false,
        adminNotified: true,
        userNotified: true,
        duplicate: true,
        referenceId: validated.referenceId,
        message: '',
      },
    };
  }

  const emailData: EnquiryEmailData = {
    name: validated.name,
    email: validated.email,
    phone: validated.phone,
    company: validated.company,
    service: validated.service,
    message: validated.message,
    preferredTime: validated.preferredTime,
    submittedAtLabel: formatSubmittedAt(validated.submittedAt),
    submittedAtUtc: validated.submittedAt.toISOString(),
    referenceId: validated.referenceId,
    sourceLabel: PLANS[kind].sourceLabel,
  };

  let adminNotified = false;
  let userNotified = false;

  if (config) {
    // Independent sends, so they run together: sequentially this route's worst
    // case outlives the browser's request budget and the visitor sees a timeout
    // for an enquiry that was actually captured and emailed.
    [adminNotified, userNotified] = await Promise.all([
      sendAdminEmail(config, kind, emailData, validated),
      sendUserEmail(config, kind, emailData),
    ]);
  }

  // Never lose a valid enquiry silently: the admin email is the fallback record
  // when the store failed, and a lost store with no email is a hard failure.
  const accepted = stored || adminNotified;

  console.info('[enquiry] processed', {
    kind,
    referenceId: validated.referenceId,
    stored,
    adminNotified,
    userNotified,
  });

  return {
    kind: 'processed',
    outcome: {
      accepted,
      stored,
      adminNotified,
      userNotified,
      duplicate: false,
      referenceId: validated.referenceId,
      message: accepted
        ? ''
        : 'We could not transmit your enquiry. Please email us directly or try again shortly.',
    },
  };
}

async function sendAdminEmail(
  config: EmailConfig,
  kind: EnquiryKind,
  data: EnquiryEmailData,
  validated: ValidatedEnquiry
): Promise<boolean> {
  const outcome = await sendTransactionalEmail({
    to: config.receiverEmail,
    subject: PLANS[kind].adminSubject(data),
    htmlBody: PLANS[kind].adminHtml(data),
    config,
    // The sender stays the verified VPD address; the visitor is reachable
    // through Reply-To, so answering lands in their mailbox, not ours.
    replyTo: { email: validated.email, name: validated.name },
  });
  if (outcome.ok) markNotified(kind, validated);
  return outcome.ok;
}

async function sendUserEmail(
  config: EmailConfig,
  kind: EnquiryKind,
  data: EnquiryEmailData
): Promise<boolean> {
  const outcome = await sendTransactionalEmail({
    to: data.email,
    subject: PLANS[kind].userSubject,
    htmlBody: PLANS[kind].userHtml(data),
    config,
    replyTo: { email: config.receiverEmail, name: config.senderName },
  });
  if (!outcome.ok) {
    console.error('[enquiry] user confirmation not sent', {
      kind,
      to: maskEmail(data.email),
      reason: outcome.reason,
    });
  }
  return outcome.ok;
}

export function clientIpFrom(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  );
}
