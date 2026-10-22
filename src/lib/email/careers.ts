/**
 * Server-side handling for a careers page job application:
 * validation -> resume screening -> spam/rate guard -> durable store (existing
 * backend) -> recruiter notification with the resume attached -> applicant
 * receipt confirmation.
 *
 * Reuses the same Brevo configuration, template shell and submission guards as
 * the contact and consultation forms; nothing here changes their behaviour.
 */
import { submitContactInquiry } from '../../config/api';
import {
  readEmailConfig,
  sendTransactionalEmail,
  maskEmail,
  type EmailConfig,
} from './brevo';
import {
  careersAdminNotification,
  careersUserConfirmation,
  type CareerApplicationEmailData,
} from './templates';
import { createSubmissionGuard } from './guards';
import { formatSubmittedAt } from './enquiry';

const LIMITS = {
  text: 160,
  position: 200,
  phone: 32,
  skills: 1500,
  coverNote: 2000,
  url: 300,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REFERENCE_PATTERN = /^[A-Za-z0-9_-]{8,64}$/;

const RATE_WINDOW_MS = 10 * 60 * 1000;
// An application carries a resume and costs far more to review than an enquiry,
// so one connection gets fewer of them per window.
const RATE_MAX_PER_WINDOW = 4;
const DEDUPE_TTL_MS = 15 * 60 * 1000;

/**
 * Vercel caps a serverless request body at 4.5 MB, so a 5 MB upload never
 * reaches this handler in production — it fails as an opaque network error
 * instead. The advertised limit is kept one step below that cap.
 */
export const MAX_RESUME_BYTES = 4 * 1024 * 1024;

interface ResumeFormat {
  extension: string;
  mimeTypes: string[];
  /** Container signature the bytes must actually start with. */
  signature: number[];
}

const RESUME_FORMATS: ResumeFormat[] = [
  {
    extension: '.pdf',
    mimeTypes: ['application/pdf', 'application/octet-stream'],
    signature: [0x25, 0x50, 0x44, 0x46], // %PDF
  },
  {
    // .doc is an OLE compound file, .docx is a zip — renaming a random binary
    // over either extension fails the signature check below.
    extension: '.doc',
    mimeTypes: ['application/msword', 'application/octet-stream'],
    signature: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1],
  },
  {
    extension: '.docx',
    mimeTypes: [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/octet-stream',
    ],
    signature: [0x50, 0x4b, 0x03, 0x04], // PK..
  },
];

const guard = createSubmissionGuard({
  maxPerWindow: RATE_MAX_PER_WINDOW,
  windowMs: RATE_WINDOW_MS,
  dedupeTtlMs: DEDUPE_TTL_MS,
});

/** The subset of `File` this pipeline needs; FormData gives it for free. */
export interface ResumeInput {
  name?: unknown;
  type?: unknown;
  size?: unknown;
  arrayBuffer(): Promise<ArrayBuffer>;
}

export interface RawCareerApplication {
  position?: unknown;
  workMode?: unknown;
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  currentLocation?: unknown;
  totalExperience?: unknown;
  currentCompany?: unknown;
  currentDesignation?: unknown;
  keySkills?: unknown;
  currentCtc?: unknown;
  expectedCtc?: unknown;
  noticePeriod?: unknown;
  highestQualification?: unknown;
  college?: unknown;
  yearOfPassing?: unknown;
  linkedinUrl?: unknown;
  portfolioUrl?: unknown;
  hearAboutUs?: unknown;
  referralName?: unknown;
  coverNote?: unknown;
  consent?: unknown;
  referenceId?: unknown;
  submittedAt?: unknown;
  /** Honeypot: visually hidden in the form, humans never fill it in. */
  website?: unknown;
  resume?: ResumeInput | string | null;
}

export interface ValidatedApplication {
  position: string;
  workMode: string;
  fullName: string;
  email: string;
  phone: string;
  currentLocation: string;
  totalExperience: string;
  currentCompany: string;
  currentDesignation: string;
  keySkills: string;
  currentCtc: string;
  expectedCtc: string;
  noticePeriod: string;
  highestQualification: string;
  college: string;
  yearOfPassing: string;
  linkedinUrl: string;
  portfolioUrl: string;
  hearAboutUs: string;
  referralName: string;
  coverNote: string;
  referenceId: string;
  submittedAt: Date;
  resume: {
    filename: string;
    mimeType: string;
    bytes: string;
    size: number;
    label: string;
  };
}

export interface CareerOutcome {
  accepted: boolean;
  stored: boolean;
  adminNotified: boolean;
  userNotified: boolean;
  duplicate: boolean;
  referenceId: string;
  message: string;
}

export type CareerResult =
  | { kind: 'invalid'; errors: string[] }
  | { kind: 'limited' }
  | { kind: 'discarded' }
  | { kind: 'processed'; outcome: CareerOutcome };

function str(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

/**
 * A submission is only ever recorded against a name that is safe inside a
 * MIME header: no path separators, control characters, quotes or header
 * injections, and it keeps a real extension.
 */
export function sanitizeResumeFilename(rawName: string): string {
  const base = rawName.split(/[\\/]/).pop() ?? '';
  const cleaned = base
    .replace(/[^\w.()-]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^\.+/, '')
    .slice(0, 80);
  const ext = RESUME_FORMATS.find((f) => cleaned.toLowerCase().endsWith(f.extension))?.extension;
  if (!ext) return `resume.pdf`;
  const stem = cleaned.slice(0, cleaned.length - ext.length).replace(/^_+/, '') || 'resume';
  return `${stem.slice(0, 60)}${ext}`;
}

function hasSignature(bytes: Uint8Array, signature: number[]): boolean {
  return signature.every((byte, index) => bytes[index] === byte);
}

function formatFor(extension: string): ResumeFormat | undefined {
  return RESUME_FORMATS.find((format) => format.extension === extension);
}

/** Errors that concern the applicant only — never the reason behind a rejection. */
async function validateResume(
  input: RawCareerApplication['resume']
): Promise<{ ok: true; value: ValidatedApplication['resume'] } | { ok: false; error: string }> {
  const tooGeneric = 'Attach your resume as a PDF or DOC/DOCX file (max 4 MB).';

  if (!input || typeof input === 'string') return { ok: false, error: tooGeneric };

  const rawName = typeof input.name === 'string' ? input.name : '';
  const rawType = typeof input.type === 'string' ? input.type.toLowerCase() : '';
  const size = typeof input.size === 'number' ? input.size : Number.NaN;

  const extension = RESUME_FORMATS.find((f) => rawName.toLowerCase().endsWith(f.extension))?.extension;
  if (!extension) return { ok: false, error: tooGeneric };

  const format = formatFor(extension);
  if (!format) return { ok: false, error: tooGeneric };
  if (rawType !== '' && !format.mimeTypes.includes(rawType)) {
    return { ok: false, error: tooGeneric };
  }

  if (!Number.isFinite(size) || size <= 0) return { ok: false, error: tooGeneric };
  if (size > MAX_RESUME_BYTES) {
    return { ok: false, error: 'Your resume is larger than 4 MB. Please attach a smaller file.' };
  }

  let buffer: ArrayBuffer;
  try {
    buffer = await input.arrayBuffer();
  } catch {
    return { ok: false, error: tooGeneric };
  }

  if (buffer.byteLength === 0 || buffer.byteLength > MAX_RESUME_BYTES) {
    return { ok: false, error: 'Your resume is larger than 4 MB. Please attach a smaller file.' };
  }

  const head = new Uint8Array(buffer.slice(0, format.signature.length));
  if (!hasSignature(head, format.signature)) {
    return {
      ok: false,
      error: `That file is not a real ${extension.slice(1).toUpperCase()} document. Please export it from your editor and attach it again.`,
    };
  }

  const filename = sanitizeResumeFilename(rawName);
  const label = `${filename} · ${Math.max(1, Math.round(buffer.byteLength / 1024))} KB`;

  return {
    ok: true,
    value: {
      filename,
      mimeType: rawType === '' || rawType === 'application/octet-stream' ? format.mimeTypes[0] : rawType,
      bytes: Buffer.from(buffer).toString('base64'),
      size: buffer.byteLength,
      label,
    },
  };
}

export async function validateApplication(
  raw: RawCareerApplication
): Promise<{ value: ValidatedApplication } | { errors: string[] }> {
  const errors: string[] = [];

  const position = str(raw.position, LIMITS.position);
  const fullName = str(raw.fullName, LIMITS.text);
  const email = str(raw.email, LIMITS.text);
  const phone = str(raw.phone, LIMITS.phone);
  const totalExperience = str(raw.totalExperience, LIMITS.text);
  const keySkills = str(raw.keySkills, LIMITS.skills);
  const expectedCtc = str(raw.expectedCtc, LIMITS.text);
  const noticePeriod = str(raw.noticePeriod, LIMITS.text);
  const highestQualification = str(raw.highestQualification, LIMITS.text);
  const hearAboutUs = str(raw.hearAboutUs, LIMITS.text);
  const referralName = str(raw.referralName, LIMITS.text);

  if (position.length < 2) errors.push('Please mention the position you are applying for.');
  if (fullName.length < 2) errors.push('Please provide your full name.');
  if (email === '') errors.push('Please provide an email address.');
  else if (!EMAIL_PATTERN.test(email)) errors.push('Please provide a valid email address.');

  const digits = phone.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) {
    errors.push('Please provide a contact number with country code.');
  }

  if (totalExperience === '') errors.push('Please mention your total experience.');
  if (keySkills.length < 3) errors.push('Please list your key skills.');
  if (expectedCtc === '') errors.push('Please mention your expected CTC.');
  if (noticePeriod === '') errors.push('Please mention your notice period.');
  if (highestQualification === '') errors.push('Please mention your highest qualification.');
  if (raw.consent !== 'true') {
    errors.push('Please accept the consent to process your application.');
  }
  if (hearAboutUs.toLowerCase() === 'referral' && referralName === '') {
    errors.push('Please mention who referred you.');
  }

  const resume = await validateResume(raw.resume);
  if (!resume.ok) {
    errors.push(resume.error);
    return { errors };
  }

  if (errors.length > 0) return { errors };

  const submittedAt =
    typeof raw.submittedAt === 'string' && !Number.isNaN(Date.parse(raw.submittedAt))
      ? new Date(raw.submittedAt)
      : new Date();
  if (Math.abs(Date.now() - submittedAt.getTime()) > 24 * 60 * 60 * 1000) {
    submittedAt.setTime(Date.now());
  }

  return {
    value: {
      position,
      workMode: str(raw.workMode, LIMITS.text),
      fullName,
      email,
      phone,
      currentLocation: str(raw.currentLocation, LIMITS.text),
      totalExperience,
      currentCompany: str(raw.currentCompany, LIMITS.text),
      currentDesignation: str(raw.currentDesignation, LIMITS.text),
      keySkills,
      currentCtc: str(raw.currentCtc, LIMITS.text),
      expectedCtc,
      noticePeriod,
      highestQualification,
      college: str(raw.college, LIMITS.text),
      yearOfPassing: str(raw.yearOfPassing, 16),
      linkedinUrl: str(raw.linkedinUrl, LIMITS.url),
      portfolioUrl: str(raw.portfolioUrl, LIMITS.url),
      hearAboutUs,
      referralName,
      coverNote: str(raw.coverNote, LIMITS.coverNote),
      referenceId:
        typeof raw.referenceId === 'string' && REFERENCE_PATTERN.test(raw.referenceId.trim())
          ? raw.referenceId.trim()
          : createCareerReference(),
      submittedAt,
      resume: resume.value,
    },
  };
}

export function createCareerReference(): string {
  return `VPD-APP-${crypto.randomUUID().replace(/-/g, '').toUpperCase()}`;
}

function notificationKeys(application: ValidatedApplication): string[] {
  return [
    `careers:ref:${application.referenceId}`,
    `careers:candidate:${application.email.toLowerCase()}:${application.position.toLowerCase()}`,
  ];
}

/**
 * The deployed backend only exposes `POST /api/contact`, so applications are
 * captured there as the durable record until that service grows a careers
 * endpoint. The `service` prefix keeps them identifiable in the same store.
 */
async function storeApplication(application: ValidatedApplication): Promise<boolean> {
  const summary = [
    `Job application via the VPD Technologies careers page.`,
    `Position: ${application.position}`,
    `Work mode: ${application.workMode}`,
    `Location: ${application.currentLocation}`,
    `Experience: ${application.totalExperience}`,
    `Current: ${application.currentCompany} ${application.currentDesignation}`.trim(),
    `Key skills: ${application.keySkills}`,
    `CTC current/expected: ${application.currentCtc || '-'} / ${application.expectedCtc}`,
    `Notice period: ${application.noticePeriod}`,
    `Qualification: ${application.highestQualification} ${application.college} ${application.yearOfPassing}`.trim(),
    `LinkedIn: ${application.linkedinUrl}`,
    `Portfolio: ${application.portfolioUrl}`,
    `Source: ${application.hearAboutUs}${application.referralName ? ` (${application.referralName})` : ''}`,
    `Reference: ${application.referenceId}`,
    `Resume: ${application.resume.label}`,
    application.coverNote ? `Cover note: ${application.coverNote}` : '',
  ]
    .filter((line) => line !== '')
    .join('\n');

  const result = await submitContactInquiry({
    name: application.fullName,
    email: application.email,
    phone: application.phone,
    company: application.currentCompany,
    service: `Job Application — ${application.position}`.slice(0, 200),
    message: summary,
  });

  if (!result.success) {
    console.error('[careers] backend store failed', {
      referenceId: application.referenceId,
      reason: result.message?.slice(0, 200),
    });
  }
  return result.success;
}

function emailData(application: ValidatedApplication): CareerApplicationEmailData {
  return {
    position: application.position,
    workMode: application.workMode,
    fullName: application.fullName,
    email: application.email,
    phone: application.phone,
    currentLocation: application.currentLocation,
    totalExperience: application.totalExperience,
    currentCompany: application.currentCompany,
    currentDesignation: application.currentDesignation,
    keySkills: application.keySkills,
    currentCtc: application.currentCtc,
    expectedCtc: application.expectedCtc,
    noticePeriod: application.noticePeriod,
    highestQualification: application.highestQualification,
    college: application.college,
    yearOfPassing: application.yearOfPassing,
    linkedinUrl: application.linkedinUrl,
    portfolioUrl: application.portfolioUrl,
    hearAboutUs: application.hearAboutUs,
    referralName: application.referralName,
    coverNote: application.coverNote,
    resumeLabel: application.resume.label,
    submittedAtLabel: formatSubmittedAt(application.submittedAt),
    referenceId: application.referenceId,
  };
}

export async function processCareerApplication(
  raw: RawCareerApplication,
  clientIp: string
): Promise<CareerResult> {
  guard.prune();

  if (typeof raw.website === 'string' && raw.website.trim() !== '') {
    return { kind: 'discarded' };
  }

  const validated = await validateApplication(raw);
  if ('errors' in validated) return { kind: 'invalid', errors: validated.errors };

  const application = validated.value;
  if (guard.isRateLimited(`careers:${clientIp}`)) return { kind: 'limited' };

  const { config, missing } = readEmailConfig();
  if (!config) {
    console.error('[careers] email not configured, missing', missing.join(', '));
  }

  if (guard.isDuplicate(notificationKeys(application))) {
    return {
      kind: 'processed',
      outcome: {
        accepted: true,
        stored: false,
        adminNotified: true,
        userNotified: true,
        duplicate: true,
        referenceId: application.referenceId,
        message: '',
      },
    };
  }

  const stored = await storeApplication(application);
  const data = emailData(application);

  let adminNotified = false;
  let userNotified = false;

  if (config) {
    [adminNotified, userNotified] = await Promise.all([
      sendRecruiterEmail(config, data, application),
      sendApplicantEmail(config, data),
    ]);
  }

  // The recruiter email carries the resume, so a lost store with no email means
  // the application is gone: that is a hard failure the applicant must see.
  const accepted = stored || adminNotified;

  console.info('[careers] processed', {
    referenceId: application.referenceId,
    position: application.position,
    stored,
    adminNotified,
    userNotified,
    resumeSize: application.resume.size,
  });

  return {
    kind: 'processed',
    outcome: {
      accepted,
      stored,
      adminNotified,
      userNotified,
      duplicate: false,
      referenceId: application.referenceId,
      message: accepted
        ? ''
        : 'We could not submit your application. Please try again or email us directly.',
    },
  };
}

async function sendRecruiterEmail(
  config: EmailConfig,
  data: CareerApplicationEmailData,
  application: ValidatedApplication
): Promise<boolean> {
  const outcome = await sendTransactionalEmail({
    to: config.receiverEmail,
    subject: 'New Job Application | VPD Technologies',
    htmlBody: careersAdminNotification(data),
    config,
    replyTo: application.email,
    // Only the recruiter receives the resume; the applicant already has it.
    attachments: [
      { content: application.resume.bytes, filename: application.resume.filename, type: application.resume.mimeType },
    ],
  });
  if (outcome.ok) guard.recordSent(notificationKeys(application));
  else console.error('[careers] recruiter notification not sent', { referenceId: application.referenceId });
  return outcome.ok;
}

async function sendApplicantEmail(
  config: EmailConfig,
  data: CareerApplicationEmailData
): Promise<boolean> {
  // The applicant's address is a recipient only: the sender stays the verified
  // VPD address, so replies land in the recruitment inbox.
  const outcome = await sendTransactionalEmail({
    to: data.email,
    subject: "We've Received Your Job Application | VPD Technologies",
    htmlBody: careersUserConfirmation(data),
    config,
    replyTo: config.receiverEmail,
  });
  if (!outcome.ok) {
    console.error('[careers] applicant confirmation not sent', {
      to: maskEmail(data.email),
      reason: outcome.reason,
    });
  }
  return outcome.ok;
}
