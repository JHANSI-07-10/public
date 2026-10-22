/**
 * Sender / recipient / Reply-To addressing for every email direction.
 *
 * The rule these tests protect: the Brevo `sender` is always the one verified
 * VPD address, and a visitor's address only ever appears as a recipient or a
 * validated Reply-To — never as the sender, which Brevo rejects and which would
 * read as spoofing. Brevo is mocked, so no real mail is sent.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  isSendableEmail,
  readEmailConfig,
  type EmailConfig,
} from '../../src/lib/email/provider/sender-config';
import { sendTransactionalEmail } from '../../src/lib/email/provider/brevo-client';
import { processEnquiry, type RawEnquiry } from '../../src/lib/email/workflows/enquiry';
import {
  processCareerApplication,
  type RawCareerApplication,
  type ResumeInput,
} from '../../src/lib/email/workflows/careers';

const TEST_KEY = 'test-secret-key-must-never-leak';
const BRAND = 'info@vpdtechnologiespvtltd.com';
const BREVO_URL = 'https://api.brevo.com/v3/smtp/email';

interface BrevoCall {
  url: string;
  body: Record<string, unknown>;
}

const brevoCalls: BrevoCall[] = [];
const storeMock = vi.fn(async (_payload: unknown) => ({ success: true }));

vi.mock('../../src/config/api', () => ({
  submitContactInquiry: (payload: unknown) => storeMock(payload),
  submitCareerApplication: async () => ({ success: true }),
  API_ENDPOINTS: {},
  API_BASE_URL: 'https://example.invalid/api',
}));

beforeEach(() => {
  process.env.BREVO_API_KEY = TEST_KEY;
  process.env.BREVO_SENDER_EMAIL = BRAND;
  process.env.CONTACT_RECEIVER_EMAIL = BRAND;
  brevoCalls.length = 0;
  storeMock.mockClear();

  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string, init: RequestInit) => {
      brevoCalls.push({ url: String(url), body: JSON.parse(String(init.body)) });
      return {
        ok: true,
        status: 200,
        text: async () => JSON.stringify({ messageId: '<addressing-test@brevo.com>' }),
      } as Response;
    })
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.BREVO_API_KEY;
  delete process.env.BREVO_SENDER_EMAIL;
  delete process.env.CONTACT_RECEIVER_EMAIL;
});

let uid = 0;
let ipCounter = 0;
function freshIp(): string {
  ipCounter += 1;
  return `10.30.${ipCounter}.1`;
}

function enquiry(kind: 'contact' | 'consultation', overrides: Partial<RawEnquiry> = {}): RawEnquiry {
  uid += 1;
  return {
    name: `Alex Morgan${uid}`,
    email: `alex${uid}@company.com`,
    phone: '+91 83339 19447',
    company: 'Northwind Retail',
    service: kind === 'contact' ? 'Website & Web Application Development' : 'Enterprise Architecture Consulting',
    message: `Platform rebuild scope for the quarter. Ref ${uid}.`,
    referenceId: `${kind === 'contact' ? 'CTADDR' : 'CSADDR'}${String(uid).padStart(6, '0')}xx`,
    submittedAt: '2026-10-22T09:30:00.000Z',
    ...overrides,
  };
}

function application(overrides: Partial<RawCareerApplication> = {}): RawCareerApplication {
  uid += 1;
  const bytes = new Uint8Array(2048);
  [0x25, 0x50, 0x44, 0x46].forEach((byte, index) => {
    bytes[index] = byte;
  });
  const resume = {
    name: 'candidate-cv.pdf',
    type: 'application/pdf',
    size: bytes.byteLength,
    arrayBuffer: async () => bytes.buffer.slice(0, bytes.byteLength) as ArrayBuffer,
  } satisfies ResumeInput;

  return {
    position: 'Full-Stack Software Engineer',
    workMode: 'Hybrid',
    fullName: `Priya Nandi${uid}`,
    email: `priya${uid}@somewhere.test`,
    phone: '+91 90000 00000',
    currentLocation: 'Kurnool, Andhra Pradesh',
    totalExperience: '3 - 5 years',
    currentCompany: 'Northwind Retail',
    currentDesignation: 'Software Engineer',
    keySkills: 'React, Node.js',
    currentCtc: '9 LPA',
    expectedCtc: '14 LPA',
    noticePeriod: '30 days',
    highestQualification: 'B.Tech / B.E.',
    college: 'SVU Engineering College',
    yearOfPassing: '2021',
    linkedinUrl: '',
    portfolioUrl: '',
    hearAboutUs: 'LinkedIn',
    referralName: '',
    coverNote: 'Three production dashboards on this stack.',
    consent: 'true',
    referenceId: `APADDR${String(uid).padStart(6, '0')}xx`,
    submittedAt: '2026-10-22T09:30:00.000Z',
    resume,
    ...overrides,
  };
}

function adminCall(): BrevoCall {
  return brevoCalls.find((call) => JSON.stringify(call.body.to) === JSON.stringify([{ email: BRAND }]))!;
}

/** The confirmation copy is the one addressed to the submitter's own inbox. */
function submitterCall(email: string): BrevoCall {
  return brevoCalls.find((call) => JSON.stringify(call.body.to) === JSON.stringify([{ email }]))!;
}

function recipient(value: unknown): { email: string; name?: string } {
  return value as { email: string; name?: string };
}

describe('customer/applicant confirmations: from VPD, to the submitter', () => {
  it.each([
    ['contact', "We've Received Your Enquiry | VPD Technologies"],
    ['consultation', 'Your Consultation Request Has Been Received | VPD Technologies'],
  ] as const)('%s confirmation comes from the verified brand sender', async (kind, subject) => {
    const payload = enquiry(kind);
    const result = await processEnquiry(kind, payload, freshIp());
    expect(result.kind).toBe('processed');

    const call = submitterCall(String(payload.email));
    expect(call.body.sender).toEqual({ name: 'VPD Technologies', email: BRAND });
    expect(call.body.to).toEqual([{ email: payload.email }]);
    expect(call.body.subject).toBe(subject);
    expect(recipient(call.body.replyTo)).toEqual({ email: BRAND, name: 'VPD Technologies' });
  });

  it('sends the job-application confirmation from the brand sender to the applicant', async () => {
    const payload = application();
    await processCareerApplication(payload, freshIp());

    const call = submitterCall(String(payload.email));
    expect(call.body.sender).toEqual({ name: 'VPD Technologies', email: BRAND });
    expect(call.body.to).toEqual([{ email: payload.email }]);
    expect(call.body.subject).toBe("We've Received Your Job Application | VPD Technologies");
    expect(recipient(call.body.replyTo)).toEqual({ email: BRAND, name: 'VPD Technologies' });
  });
});

describe('admin notifications: from the brand sender, reply straight to the submitter', () => {
  it('addresses the contact notification to the inbox with the visitor as Reply-To', async () => {
    const payload = enquiry('contact');
    await processEnquiry('contact', payload, freshIp());

    const call = adminCall();
    expect(call.body.sender).toEqual({ name: 'VPD Technologies', email: BRAND });
    expect(call.body.to).toEqual([{ email: BRAND }]);
    expect(recipient(call.body.replyTo)).toEqual({ email: payload.email, name: 'Alex Morgan' + String(uid) });
  });

  it('addresses the quotation notification to the inbox with the visitor as Reply-To', async () => {
    const payload = enquiry('consultation');
    await processEnquiry('consultation', payload, freshIp());

    const call = adminCall();
    expect(call.body.to).toEqual([{ email: BRAND }]);
    expect(recipient(call.body.replyTo).email).toBe(payload.email);
    expect(call.body.subject).toBe('New Quotation Request - Enterprise Architecture Consulting');
  });

  it('addresses the careers notification to the inbox and keeps the resume attached', async () => {
    const payload = application();
    await processCareerApplication(payload, freshIp());

    const call = adminCall();
    expect(call.body.sender).toEqual({ name: 'VPD Technologies', email: BRAND });
    expect(call.body.to).toEqual([{ email: BRAND }]);
    expect(recipient(call.body.replyTo)).toEqual({
      email: payload.email,
      name: 'Priya Nandi' + String(uid),
    });
    // The first attachment is always the inline logo; the resume follows.
    const attachments = call.body.attachment as Array<{ filename: string }>;
    expect(attachments.map((file) => file.filename)).toEqual(['vpd-logo.png', 'candidate-cv.pdf']);
  });

  it('never lets a submitter address become the sender on any email', async () => {
    const contact = enquiry('contact');
    await processEnquiry('contact', contact, freshIp());
    const quote = enquiry('consultation');
    await processEnquiry('consultation', quote, freshIp());
    const job = application();
    await processCareerApplication(job, freshIp());

    const submitterAddresses = [contact.email, quote.email, job.email].map(String);
    // Six sends and nothing else: a recorded call to another URL would mean a
    // workflow reached the real backend instead of the mock.
    expect(brevoCalls).toHaveLength(6);
    for (const call of brevoCalls) {
      expect(call.url).toBe(BREVO_URL);
      const sender = call.body.sender as { email: string };
      expect(sender.email).toBe(BRAND);
      for (const address of submitterAddresses) expect(sender.email).not.toBe(address);
    }
  });
});

describe('Reply-To addresses and display names are validated', () => {
  const config: EmailConfig = {
    apiKey: TEST_KEY,
    senderEmail: BRAND,
    senderName: 'VPD Technologies',
    receiverEmail: BRAND,
  };

  async function send(replyTo: unknown): Promise<Record<string, unknown>> {
    const outcome = await sendTransactionalEmail({
      to: BRAND,
      subject: 'Addressing probe',
      htmlBody: '<p>probe</p>',
      config,
      // Cast: these cases deliberately feed the layer values validation rejects.
      replyTo: replyTo as never,
    });
    expect(outcome.ok).toBe(true);
    return brevoCalls[brevoCalls.length - 1].body;
  }

  it('drops a malformed Reply-To instead of forging a header', async () => {
    expect(await send({ email: 'not-an-email', name: 'Mallory' })).not.toHaveProperty('replyTo');
    expect(await send({ email: '' })).not.toHaveProperty('replyTo');
    expect(await send({ email: 'a@b' })).not.toHaveProperty('replyTo');
    expect(await send(undefined)).not.toHaveProperty('replyTo');
  });

  it('strips header-splitting characters from the display name', async () => {
    const body = await send({
      email: 'someone@example.com',
      name: 'Alex\r\nBcc: spammer@example.com',
    });
    const replyTo = recipient(body.replyTo);
    expect(replyTo.email).toBe('someone@example.com');
    expect(replyTo.name).toBe('Alex Bcc: spammer@example.com');
    expect(replyTo.name).not.toMatch(/[\r\n]/);
  });

  it('clamps an over-long display name and accepts a bare address', async () => {
    const long = await send({ email: 'someone@example.com', name: 'A'.repeat(300) });
    expect(recipient(long.replyTo).name).toHaveLength(80);

    const bare = await send({ email: 'someone@example.com' });
    expect(recipient(bare.replyTo)).toEqual({ email: 'someone@example.com' });
  });

  it('isSendableEmail accepts real addresses and rejects the rest', () => {
    expect(isSendableEmail('Alex@Company.COM')).toBe(true);
    expect(isSendableEmail(' someone@example.com ')).toBe(true);
    expect(isSendableEmail('someone@@example.com')).toBe(false);
    expect(isSendableEmail('someone@example')).toBe(false);
    expect(isSendableEmail(undefined)).toBe(false);
    expect(isSendableEmail(42)).toBe(false);
  });

  it('reports missing configuration by name only, never by value', () => {
    delete process.env.BREVO_API_KEY;
    const status = readEmailConfig();
    expect(status.config).toBeNull();
    expect(status.missing).toEqual(['BREVO_API_KEY']);
    expect(JSON.stringify(status)).not.toContain(TEST_KEY);
  });
});

describe('sender identity is the VPD address and has no fallback', () => {
  it('uses the required name and address on every email direction', async () => {
    const payload = enquiry('contact');
    await processEnquiry('contact', payload, freshIp());
    const job = application();
    await processCareerApplication(job, freshIp());

    expect(readEmailConfig().config).toMatchObject({
      senderName: 'VPD Technologies',
      senderEmail: 'info@vpdtechnologiespvtltd.com',
    });
    expect(brevoCalls).toHaveLength(4);
    for (const call of brevoCalls) {
      expect(call.body.sender).toEqual({
        name: 'VPD Technologies',
        email: 'info@vpdtechnologiespvtltd.com',
      });
    }
  });

  it('sends nothing when the sender variable is unset', () => {
    delete process.env.BREVO_SENDER_EMAIL;
    const status = readEmailConfig();
    expect(status.config).toBeNull();
    expect(status.missing).toEqual(['BREVO_SENDER_EMAIL']);
  });

  it('refuses a brevosend.com rewritten address instead of falling back to it', async () => {
    process.env.BREVO_SENDER_EMAIL = 'mandugulajhansilakshmi@11622325.brevosend.com';
    const status = readEmailConfig();
    expect(status.config).toBeNull();
    expect(status.missing.join(' ')).toContain('BREVO_SENDER_EMAIL');
    expect(JSON.stringify(status)).not.toContain('11622325.brevosend.com');

    // A submission with that configuration is still captured, just never mailed.
    const result = await processEnquiry('contact', enquiry('contact'), freshIp());
    expect(brevoCalls).toHaveLength(0);
    if (result.kind !== 'processed') throw new Error('expected processed');
    expect(result.outcome.stored).toBe(true);
    expect(result.outcome.adminNotified).toBe(false);
    delete process.env.BREVO_SENDER_EMAIL;
  });
});
