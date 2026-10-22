import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  MAX_RESUME_BYTES,
  processCareerApplication,
  sanitizeResumeFilename,
  type RawCareerApplication,
  type ResumeInput,
} from '../../src/lib/email/workflows/careers';
import { makeCareerApplicationHandler } from '../../src/lib/email/workflows/careers-handler';
import type { NextRequest } from 'next/server';

const TEST_KEY = 'test-secret-key-must-never-leak';
const RECEIVER = 'info@vpdtechnologiespvtltd.com';
const BREVO_URL = 'https://api.brevo.com/v3/smtp/email';

const PDF_SIGNATURE = [0x25, 0x50, 0x44, 0x46];
const DOCX_SIGNATURE = [0x50, 0x4b, 0x03, 0x04];
const OLE_SIGNATURE = [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1];

interface BrevoCall {
  url: string;
  headers: Record<string, string>;
  body: Record<string, unknown>;
}

const brevoCalls: BrevoCall[] = [];
let brevoResponse: { ok: boolean; status: number; text: string } = {
  ok: true,
  status: 200,
  text: JSON.stringify({ messageId: '<abc-123@brevo.com>' }),
};
const storeMock = vi.fn(async (_payload: unknown) => ({ success: true }));

vi.mock('../../src/config/api', () => ({
  submitContactInquiry: (payload: unknown) => storeMock(payload),
  submitCareerApplication: async () => ({ success: true }),
  API_ENDPOINTS: {},
  API_BASE_URL: 'https://example.invalid/api',
}));

beforeEach(() => {
  process.env.BREVO_API_KEY = TEST_KEY;
  process.env.BREVO_SENDER_EMAIL = RECEIVER;
  process.env.CONTACT_RECEIVER_EMAIL = RECEIVER;
  brevoCalls.length = 0;
  brevoResponse = { ok: true, status: 200, text: JSON.stringify({ messageId: '<abc-123@brevo.com>' }) };
  storeMock.mockClear();

  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string, init: RequestInit) => {
      brevoCalls.push({
        url: String(url),
        headers: (init.headers ?? {}) as Record<string, string>,
        body: JSON.parse(String(init.body)),
      });
      return {
        ok: brevoResponse.ok,
        status: brevoResponse.status,
        text: async () => brevoResponse.text,
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

function bytesOf(signature: number[], length = 2048): Uint8Array {
  const bytes = new Uint8Array(length);
  signature.forEach((byte, index) => {
    bytes[index] = byte;
  });
  return bytes;
}

function resume(overrides: Partial<ResumeInput> & { signature?: number[] } = {}): ResumeInput {
  const { signature = PDF_SIGNATURE, ...rest } = overrides;
  const bytes = bytesOf(signature);
  return {
    name: 'candidate-cv.pdf',
    type: 'application/pdf',
    size: bytes.byteLength,
    arrayBuffer: async () => bytes.buffer.slice(0, bytes.byteLength) as ArrayBuffer,
    ...rest,
  };
}

let uid = 0;
let ipCounter = 0;
function freshIp(): string {
  ipCounter += 1;
  return `10.20.${ipCounter}.1`;
}

function application(overrides: Partial<RawCareerApplication> = {}): RawCareerApplication {
  uid += 1;
  return {
    position: 'Full-Stack Software Engineer',
    workMode: 'Hybrid',
    fullName: 'Alex Morgan',
    email: `alex${uid}@company.com`,
    phone: '+91 83339 19447',
    currentLocation: 'Kurnool, Andhra Pradesh',
    totalExperience: '3 - 5 years',
    currentCompany: 'Northwind Retail',
    currentDesignation: 'Software Engineer',
    keySkills: 'React, Node.js, PostgreSQL, AWS',
    currentCtc: '9 LPA',
    expectedCtc: '14 LPA',
    noticePeriod: '30 days',
    highestQualification: 'B.Tech / B.E.',
    college: 'SVU Engineering College',
    yearOfPassing: '2021',
    linkedinUrl: 'https://www.linkedin.com/in/alex-morgan',
    portfolioUrl: '',
    hearAboutUs: 'LinkedIn',
    referralName: '',
    coverNote: 'I have built three production dashboards on this stack.',
    consent: 'true',
    referenceId: `APPREF${String(uid).padStart(6, '0')}xx`,
    submittedAt: '2026-10-22T09:30:00.000Z',
    resume: resume(),
    ...overrides,
  };
}

function adminCall(): BrevoCall {
  // The recruiter copy is the one addressed to the configured inbox; its subject
  // is now built from the applicant's own answers, so it can't be matched by a
  // constant string.
  return brevoCalls.find(
    (call) => JSON.stringify(call.body.to) === JSON.stringify([{ email: RECEIVER }])
  )!;
}

function applicantCall(): BrevoCall {
  return brevoCalls.find(
    (call) => call.body.subject === "We've Received Your Job Application | VPD Technologies"
  )!;
}

interface Attachment {
  content: string;
  filename: string;
  type: string;
  headers: Array<{ name: string; value: string }>;
}

function attachmentsOf(call: BrevoCall): Attachment[] {
  return (call.body.attachment ?? []) as unknown as Attachment[];
}

describe('job application: storage and both emails', () => {
  it('stores the application and sends the recruiter plus applicant emails', async () => {
    const payload = application();
    const result = await processCareerApplication(payload, freshIp());

    expect(result.kind).toBe('processed');
    if (result.kind !== 'processed') return;
    expect(result.outcome).toMatchObject({
      accepted: true,
      stored: true,
      adminNotified: true,
      userNotified: true,
      duplicate: false,
    });

    expect(storeMock).toHaveBeenCalledTimes(1);
    expect(brevoCalls).toHaveLength(2);

    const admin = adminCall();
    expect(admin.url).toBe(BREVO_URL);
    expect(admin.headers['api-key']).toBe(TEST_KEY);
    expect(admin.body.sender).toEqual({ name: 'VPD Technologies', email: RECEIVER });
    expect(admin.body.to).toEqual([{ email: RECEIVER }]);
    expect(admin.body.subject).toBe(
      'Alex Morgan - Full-Stack Software Engineer - 3-5 years - Hybrid'
    );
    expect(admin.body.replyTo).toEqual({ email: payload.email, name: 'Alex Morgan' });

    const applicant = applicantCall();
    expect(applicant.body.to).toEqual([{ email: payload.email }]);
    expect(applicant.body.replyTo).toEqual({ email: RECEIVER, name: 'VPD Technologies' });
  });

  it('never uses the applicant address as the sender', async () => {
    const payload = application({ email: 'candidate@somewhere.test' });
    await processCareerApplication(payload, freshIp());

    for (const call of brevoCalls) {
      const sender = call.body.sender as { email: string };
      expect(sender.email).toBe(RECEIVER);
      expect(sender.email).not.toBe(payload.email);
    }
  });

  it('attaches the resume to the recruiter email only', async () => {
    await processCareerApplication(application(), freshIp());

    const adminFiles = attachmentsOf(adminCall());
    expect(adminFiles).toHaveLength(2);
    expect(adminFiles[1].filename).toBe('candidate-cv.pdf');
    expect(adminFiles[1].type).toBe('application/pdf');
    expect(adminFiles[1].content as string).toMatch(/^[A-Za-z0-9+/=]{100,}$/);
    expect(adminFiles[1].headers).toEqual([
      { name: 'Content-Disposition', value: 'attachment; filename=candidate-cv.pdf' },
    ]);
    // The logo still rides along, inline, on both messages.
    expect(adminFiles[0].headers).toEqual(
      expect.arrayContaining([
        { name: 'Content-ID', value: '<vpd-logo>' },
        { name: 'Content-Disposition', value: 'inline; filename=vpd-logo.png' },
      ])
    );

    const applicantFiles = attachmentsOf(applicantCall());
    expect(applicantFiles).toHaveLength(1);
    expect(applicantFiles[0].filename).toBe('vpd-logo.png');
  });

  it('puts the submitted details and an explicit timezone into the recruiter email', async () => {
    await processCareerApplication(application(), freshIp());

    const html = String(adminCall().body.htmlContent);
    expect(html).toContain('New Job Application');
    expect(html).toContain('Full-Stack Software Engineer');
    expect(html).toContain('React, Node.js, PostgreSQL, AWS');
    expect(html).toContain('Northwind Retail');
    expect(html).toContain('14 LPA');
    expect(html).toContain('22 October 2026');
    expect(html).toContain('IST (UTC+05:30)');
    expect(html).toContain('candidate-cv.pdf');
    expect(html).toContain('src="cid:vpd-logo"');
  });

  it('confirms receipt to the applicant without promising an outcome', async () => {
    await processCareerApplication(application(), freshIp());

    const html = String(applicantCall().body.htmlContent);
    expect(html).toContain("we&#39;ve received your application");
    expect(html).toContain('if your profile matches');
    expect(html).toContain('No interview, shortlisting, or offer is implied');
    expect(html).not.toMatch(/we will call you within|guaranteed|your application is selected/i);
    expect(html).not.toContain('info@vpdtechnologies.com');
  });

  it('omits optional answers the applicant never gave', async () => {
    await processCareerApplication(application({ portfolioUrl: '', coverNote: '', college: '' }), freshIp());

    const adminHtml = String(adminCall().body.htmlContent);
    expect(adminHtml).not.toContain('>Portfolio<');
    expect(adminHtml).not.toContain('>College<');
    expect(adminHtml).not.toContain('Cover note');
    expect(adminHtml).not.toContain('N/A');
    expect(adminHtml).not.toContain('undefined');
  });
});

describe('resume screening', () => {
  it('rejects a file whose bytes are not the document it claims to be', async () => {
    const result = await processCareerApplication(
      application({
        resume: resume({ name: 'payload.pdf', type: 'application/pdf', signature: [0x4d, 0x5a, 0x90, 0x00] }),
      }),
      freshIp()
    );
    expect(result.kind).toBe('invalid');
    expect(storeMock).not.toHaveBeenCalled();
    expect(brevoCalls).toHaveLength(0);
  });

  it('accepts a real docx and ole .doc container', async () => {
    const docx = await processCareerApplication(
      application({ resume: resume({ name: 'cv.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', signature: DOCX_SIGNATURE }) }),
      freshIp()
    );
    expect(docx.kind).toBe('processed');

    const doc = await processCareerApplication(
      application({ resume: resume({ name: 'cv.doc', type: 'application/msword', signature: OLE_SIGNATURE }) }),
      freshIp()
    );
    expect(doc.kind).toBe('processed');
  });

  it.each([
    ['an executable renamed .pdf', { name: 'invoice.pdf', type: 'application/pdf', signature: [0x4d, 0x5a, 0x90, 0x00] }],
    ['a zip renamed .pdf', { name: 'cv.pdf', type: 'application/pdf', signature: DOCX_SIGNATURE }],
  ])('rejects %s', async (_label, file) => {
    const result = await processCareerApplication(
      application({ resume: resume(file) }),
      freshIp()
    );
    expect(result.kind).toBe('invalid');
  });

  it.each([
    ['no file at all', null],
    ['a text value instead of a file', 'not-a-file'],
    ['an unsupported extension', resume({ name: 'resume.txt', type: 'text/plain' })],
    ['a mime type that contradicts the extension', resume({ name: 'resume.pdf', type: 'image/png' })],
    ['an empty upload', resume({ size: 0 })],
  ])('rejects %s without storing or emailing', async (_label, file) => {
    const result = await processCareerApplication(application({ resume: file }), freshIp());
    expect(result.kind).toBe('invalid');
    expect(storeMock).not.toHaveBeenCalled();
    expect(brevoCalls).toHaveLength(0);
  });

  it('rejects an oversized resume', async () => {
    const big = new Uint8Array(PDF_SIGNATURE.length);
    PDF_SIGNATURE.forEach((byte, index) => {
      big[index] = byte;
    });
    const result = await processCareerApplication(
      application({
        resume: {
          name: 'huge.pdf',
          type: 'application/pdf',
          size: MAX_RESUME_BYTES + 1,
          arrayBuffer: async () => big.buffer as ArrayBuffer,
        },
      }),
      freshIp()
    );
    expect(result.kind).toBe('invalid');
    if (result.kind === 'invalid') {
      expect(result.errors.join(' ')).toContain('larger than 4 MB');
    }
  });

  it('strips paths and header-breaking characters from the submitted filename', async () => {
    const payload = application({
      resume: resume({ name: '..\\..\\evil\r\nX-Injected: 1 "quote".pdf' }),
    });
    const result = await processCareerApplication(payload, freshIp());
    expect(result.kind).toBe('processed');

    const file = attachmentsOf(adminCall())[1];
    const filename = String(file.filename);
    expect(filename).not.toContain('\r');
    expect(filename).not.toContain('\n');
    expect(filename).not.toContain('"');
    expect(filename).not.toContain('\\');
    expect(filename).not.toContain(':');
    expect(filename.endsWith('.pdf')).toBe(true);
    expect(String(file.headers[0].value)).not.toContain('\r');
  });

  it('falls back to a safe name when nothing usable is submitted', () => {
    expect(sanitizeResumeFilename('')).toBe('resume.pdf');
    expect(sanitizeResumeFilename('../../etc/passwd')).toBe('resume.pdf');
    expect(sanitizeResumeFilename('My CV (final).docx')).toBe('My_CV_(final).docx');
  });
});

describe('validation', () => {
  it.each([
    ['missing name', { fullName: '' }],
    ['missing email', { email: '' }],
    ['invalid email', { email: 'alex@invalid' }],
    ['short phone', { phone: '12345' }],
    ['missing experience', { totalExperience: '' }],
    ['missing skills', { keySkills: '  ' }],
    ['missing expected ctc', { expectedCtc: '' }],
    ['missing notice period', { noticePeriod: '' }],
    ['missing qualification', { highestQualification: '' }],
    ['consent withheld', { consent: 'false' }],
    ['referral with no referrer', { hearAboutUs: 'Referral', referralName: '' }],
  ])('rejects %s', async (_label, overrides) => {
    const result = await processCareerApplication(
      application(overrides as Partial<RawCareerApplication>),
      freshIp()
    );
    expect(result.kind).toBe('invalid');
    if (result.kind === 'invalid') expect(result.errors.length).toBeGreaterThan(0);
    expect(storeMock).not.toHaveBeenCalled();
    expect(brevoCalls).toHaveLength(0);
  });

  it('clamps oversized fields instead of forwarding them to the mailer', async () => {
    const result = await processCareerApplication(
      application({ fullName: 'A'.repeat(500), keySkills: 'S'.repeat(9000), coverNote: 'C'.repeat(9000) }),
      freshIp()
    );
    expect(result.kind).toBe('processed');
    const html = String(adminCall().body.htmlContent);
    expect(html).not.toContain('A'.repeat(161));
    expect(html.length).toBeLessThan(60000);
  });

  it('replaces an untrustworthy client timestamp with server time', async () => {
    await processCareerApplication(application({ submittedAt: '1900-01-01T00:00:00.000Z' }), freshIp());
    expect(String(adminCall().body.htmlContent)).not.toContain('1900');
  });

  it('escapes markup submitted in every applicant-controlled field', async () => {
    const malicious = '<img src=x onerror=alert(1)>';
    await processCareerApplication(
      application({
        fullName: malicious,
        keySkills: `<script>alert("xss")</script>`,
        coverNote: `<a href="javascript:alert(2)">click</a>`,
        linkedinUrl: '"><td>x',
        position: '" onmouseover="evil()',
      }),
      freshIp()
    );

    for (const call of brevoCalls) {
      const html = String(call.body.htmlContent);
      expect(html).not.toContain('<script>');
      expect(html).not.toContain('<img src=x onerror');
      expect(html).not.toContain('onmouseover="evil');
      expect(html).not.toContain('href="javascript:');
      expect(html).not.toContain('"><td>x');
    }
  });
});

describe('provider failures are reported per leg', () => {
  it('keeps the application accepted when the store worked but Brevo failed', async () => {
    brevoResponse = { ok: false, status: 412, text: 'sender not verified' };
    const result = await processCareerApplication(application(), freshIp());

    expect(result.kind).toBe('processed');
    if (result.kind !== 'processed') return;
    expect(result.outcome).toMatchObject({
      stored: true,
      adminNotified: false,
      userNotified: false,
      accepted: true,
    });
  });

  it('reports a hard failure when neither the store nor the recruiter email worked', async () => {
    storeMock.mockImplementationOnce(async () => ({ success: false, message: 'db down' }));
    brevoResponse = { ok: false, status: 500, text: 'provider down' };

    const result = await processCareerApplication(application(), freshIp());

    expect(result.kind).toBe('processed');
    if (result.kind !== 'processed') return;
    expect(result.outcome.accepted).toBe(false);
    expect(result.outcome.message).toContain('could not submit');
  });

  it('still emails the recruiter when the store is unreachable, so the resume is not lost', async () => {
    storeMock.mockImplementationOnce(async () => ({ success: false, message: 'db down' }));
    const result = await processCareerApplication(application(), freshIp());

    if (result.kind !== 'processed') throw new Error('expected processed');
    expect(result.outcome.stored).toBe(false);
    expect(result.outcome.adminNotified).toBe(true);
    expect(result.outcome.accepted).toBe(true);
  });

  it('retries a failed send instead of recording a false success', async () => {
    brevoResponse = { ok: false, status: 412, text: 'sender not verified' };
    const ip = freshIp();
    await processCareerApplication(application(), ip);

    brevoResponse = { ok: true, status: 200, text: JSON.stringify({ messageId: '<m@brevo>' }) };
    const retry = await processCareerApplication(application(), ip);
    if (retry.kind !== 'processed') throw new Error('expected processed');
    // The retried application carries a fresh reference id, so it must not be
    // collapsed as a duplicate when the first attempt delivered nothing.
    expect(retry.outcome.duplicate).toBe(false);
  });

  it('skips email sending entirely when BREVO_API_KEY is absent', async () => {
    delete process.env.BREVO_API_KEY;
    const result = await processCareerApplication(application(), freshIp());

    expect(brevoCalls).toHaveLength(0);
    if (result.kind !== 'processed') throw new Error('expected processed');
    expect(result.outcome.stored).toBe(true);
    expect(result.outcome.accepted).toBe(true);
  });
});

describe('duplicate and rate protection', () => {
  it('collapses the same candidate re-applying to the same role', async () => {
    const ip = freshIp();
    const base = application();
    const first = await processCareerApplication(base, ip);
    const second = await processCareerApplication(
      { ...base, referenceId: `APPREFDUP${uid}` },
      ip
    );

    if (first.kind !== 'processed' || second.kind !== 'processed') throw new Error('expected processed');
    expect(second.outcome.duplicate).toBe(true);
    expect(storeMock).toHaveBeenCalledTimes(1);
    expect(brevoCalls).toHaveLength(2);
  });

  it('limits the fifth application from one connection within the window', async () => {
    const ip = freshIp();
    const kinds: string[] = [];
    for (let i = 0; i < 5; i += 1) {
      kinds.push((await processCareerApplication(application(), ip)).kind);
    }
    expect(kinds.slice(0, 4)).toEqual(new Array(4).fill('processed'));
    expect(kinds[4]).toBe('limited');
  });

  it('does not spend the enquiry forms budget on applications', async () => {
    const ip = freshIp();
    for (let i = 0; i < 4; i += 1) await processCareerApplication(application(), ip);
    const { processEnquiry } = await import('../../src/lib/email/workflows/enquiry');
    const enquiry = await processEnquiry(
      'contact',
      {
        name: 'Alex Morgan',
        email: `alex-ip${ip.replace(/\D/g, '')}@company.com`,
        phone: '+91 83339 19447',
        service: 'Web Development',
        message: 'Independent budget check for the contact form.',
        submittedAt: '2026-10-22T09:30:00.000Z',
      },
      ip
    );
    expect(enquiry.kind).toBe('processed');
  });

  it('discards a honeypot submission without storing or emailing', async () => {
    const result = await processCareerApplication(
      application({ website: 'http://spam.example' }),
      freshIp()
    );
    expect(result.kind).toBe('discarded');
    expect(storeMock).not.toHaveBeenCalled();
    expect(brevoCalls).toHaveLength(0);
  });
});

describe('candidate data stays out of logs', () => {
  it('never logs the phone number, resume bytes or API key', async () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});

    const payload = application();
    const result = await processCareerApplication(payload, freshIp());
    if (result.kind !== 'processed') throw new Error('expected processed');

    const logged = [info, error, log]
      .flatMap((spy) => spy.mock.calls)
      .map((call) => call.map((arg) => JSON.stringify(arg)).join(' '))
      .join('\n');

    expect(logged).not.toContain('+91 83339 19447');
    expect(logged).not.toContain('8333919447');
    expect(logged).not.toContain('SVU Engineering College');
    expect(logged).not.toContain(TEST_KEY);
    expect(logged).not.toMatch(/[A-Za-z0-9+/]{200,}={0,2}$/m);

    info.mockRestore();
    error.mockRestore();
    log.mockRestore();
  });
});

describe('route handler contract', () => {
  function request(form: FormData, ip = freshIp()): NextRequest {
    return {
      headers: new Headers({ 'x-forwarded-for': `${ip}, 70.41.3.18`, 'content-length': '524288' }),
      formData: async () => form,
    } as unknown as NextRequest;
  }

  function formOf(payload: RawCareerApplication): FormData {
    const form = new FormData();
    for (const [key, value] of Object.entries(payload)) {
      if (key === 'resume') continue;
      form.append(key, String(value ?? ''));
    }
    const file = payload.resume as ResumeInput;
    const bytes = bytesOf(PDF_SIGNATURE);
    form.append(
      'resume',
      new File([bytes.buffer as ArrayBuffer], String(file.name), { type: String(file.type) })
    );
    return form;
  }

  it('accepts a valid multipart application and returns the reference', async () => {
    const response = await makeCareerApplicationHandler()(request(formOf(application())));
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.adminNotified).toBe(true);
    expect(json.data.submissionId).toBe(json.referenceId);
  });

  it('returns 400 with applicant-safe errors for an invalid application', async () => {
    const response = await makeCareerApplicationHandler()(
      request(formOf(application({ email: 'nope', consent: 'false' })))
    );
    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.errors.length).toBeGreaterThan(0);
    expect(json.message).toContain('highlighted fields');
  });

  it('returns 502 when nothing captured the application', async () => {
    storeMock.mockImplementationOnce(async () => ({ success: false }));
    brevoResponse = { ok: false, status: 500, text: 'provider down' };
    const response = await makeCareerApplicationHandler()(request(formOf(application())));
    expect(response.status).toBe(502);
  });

  it('returns 429 once the connection exceeds the application window', async () => {
    const handler = makeCareerApplicationHandler();
    const ip = freshIp();
    let last = 0;
    for (let i = 0; i < 6; i += 1) {
      last = (await handler(request(formOf(application()), ip))).status;
    }
    expect(last).toBe(429);
  });

  it('rejects an oversized request before parsing the body', async () => {
    const handler = makeCareerApplicationHandler();
    const req = {
      headers: new Headers({ 'content-length': String(12 * 1024 * 1024) }),
      formData: async () => {
        throw new Error('should never be parsed');
      },
    } as unknown as NextRequest;
    const response = await handler(req);
    expect(response.status).toBe(413);
    expect(brevoCalls).toHaveLength(0);
  });

  it('returns 400 when the body is not parseable multipart', async () => {
    const req = {
      headers: new Headers({ 'content-length': '120' }),
      formData: async () => {
        throw new Error('Malformed multipart');
      },
    } as unknown as NextRequest;
    const response = await makeCareerApplicationHandler()(req);
    expect(response.status).toBe(400);
    expect(storeMock).not.toHaveBeenCalled();
  });

  it('never echoes the API key, the receiver address or provider errors to the browser', async () => {
    storeMock.mockImplementationOnce(async () => ({ success: false }));
    brevoResponse = { ok: false, status: 412, text: 'Invalid credentials, api-key rejected' };
    const response = await makeCareerApplicationHandler()(request(formOf(application())));
    const text = await response.text();
    expect(response.status).toBe(502);
    expect(text).not.toContain(TEST_KEY);
    expect(text).not.toContain('api-key');
    expect(text).not.toContain('Invalid credentials');
    expect(text).not.toContain(RECEIVER);
  });
});
