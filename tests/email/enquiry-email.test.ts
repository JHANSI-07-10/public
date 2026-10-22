import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { processEnquiry, type RawEnquiry } from '../../src/lib/email/workflows/enquiry';
import { makeEnquiryHandler } from '../../src/lib/email/workflows/enquiry-handler';
import type { NextRequest } from 'next/server';

const TEST_KEY = 'test-secret-key-must-never-leak';
const BREVO_URL = 'https://api.brevo.com/v3/smtp/email';

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
let fetchBehaviour: 'normal' | 'network-error' = 'normal';

const storeMock = vi.fn(async (_payload: unknown) => ({ success: true }));

vi.mock('../../src/config/api', () => ({
  submitContactInquiry: (payload: unknown) => storeMock(payload),
  API_ENDPOINTS: {},
  API_BASE_URL: 'https://example.invalid/api',
}));

function setEnv() {
  process.env.BREVO_API_KEY = TEST_KEY;
  process.env.BREVO_SENDER_EMAIL = 'info@vpdtechnologiespvtltd.com';
  process.env.CONTACT_RECEIVER_EMAIL = 'info@vpdtechnologiespvtltd.com';
}

let ipCounter = 0;
function freshIp(): string {
  ipCounter += 1;
  return `10.10.${ipCounter}.1`;
}

let refCounter = 0;
function freshReference(prefix: string): string {
  refCounter += 1;
  return `${prefix}${String(refCounter).padStart(4, '0')}abcdef`;
}

/**
 * The dedupe guard collapses identical content within its TTL, so every call
 * gets a unique sender/message pair unless a test deliberately reuses a payload.
 */
let uid = 0;

beforeEach(() => {
  setEnv();
  brevoCalls.length = 0;
  brevoResponse = { ok: true, status: 200, text: JSON.stringify({ messageId: '<abc-123@brevo.com>' }) };
  fetchBehaviour = 'normal';
  storeMock.mockClear();

  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string, init: RequestInit) => {
      const call: BrevoCall = {
        url: String(url),
        headers: (init.headers ?? {}) as Record<string, string>,
        body: JSON.parse(String(init.body)),
      };
      brevoCalls.push(call);
      if (fetchBehaviour === 'network-error') throw new Error('ECONNREFUSED');
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
});

function contactPayload(overrides: Partial<RawEnquiry> = {}): RawEnquiry {
  uid += 1;
  return {
    name: 'Alex Morgan',
    email: `alex${uid}@company.com`,
    phone: '+91 83339 19447',
    company: 'Northwind Retail',
    service: 'Website & Web Application Development',
    message: `We need a B2B logistics platform rebuilt on React and Node. Ref ${uid}.`,
    referenceId: freshReference(`cta${uid}`),
    submittedAt: '2026-10-22T09:30:00.000Z',
    ...overrides,
  };
}

function consultationPayload(overrides: Partial<RawEnquiry> = {}): RawEnquiry {
  uid += 1;
  return {
    name: 'Priya Nandi',
    email: `priya${uid}@startup.io`,
    phone: '+91 90000 00000',
    service: 'Enterprise Architecture Consulting',
    message: `Looking for a platform audit before our funding round. Ref ${uid}.`,
    referenceId: freshReference(`csl${uid}`),
    submittedAt: '2026-10-22T09:30:00.000Z',
    ...overrides,
  };
}

describe('contact enquiry: storage and both emails', () => {
  it('stores the enquiry and sends admin notification plus user confirmation', async () => {
    const payload = contactPayload();
    const result = await processEnquiry('contact', payload, freshIp());

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

    const admin = brevoCalls[0];
    expect(admin.url).toBe(BREVO_URL);
    expect(admin.headers['api-key']).toBe(TEST_KEY);
    expect(admin.body.sender).toEqual({
      name: 'VPD Technologies',
      email: 'info@vpdtechnologiespvtltd.com',
    });
    expect(admin.body.to).toEqual([{ email: 'info@vpdtechnologiespvtltd.com' }]);
    expect(admin.body.subject).toBe('New Contact - Website & Web Application Development');
    expect(admin.body.replyTo).toEqual({ email: payload.email, name: 'Alex Morgan' });

    const user = brevoCalls[1];
    expect(user.body.to).toEqual([{ email: payload.email }]);
    expect(user.body.subject).toBe("We've Received Your Enquiry | VPD Technologies");
    expect(user.body.replyTo).toEqual({
      email: 'info@vpdtechnologiespvtltd.com',
      name: 'VPD Technologies',
    });
  });

  it('puts the real submitted values and an explicit timezone into the admin email', async () => {
    const payload = contactPayload();
    await processEnquiry('contact', payload, freshIp());

    const html = String(brevoCalls[0].body.htmlContent);
    expect(html).toContain('Alex Morgan');
    expect(html).toContain(String(payload.email));
    expect(html).toContain('Northwind Retail');
    expect(html).toContain('Website &amp; Web Application Development');
    expect(html).toContain('22 October 2026');
    expect(html).toContain('IST (UTC+05:30)');
    expect(html).toContain('src="cid:vpd-logo"');
    expect(html).toContain('alt="VPD Technologies"');
  });

  it('carries the logo as an inline attachment on every email', async () => {
    await processEnquiry('contact', contactPayload(), freshIp());

    for (const call of brevoCalls) {
      const attachment = (call.body.attachment as Array<Record<string, unknown>>)[0];
      expect(attachment.type).toBe('image/png');
      expect(attachment.content as string).toMatch(/^[A-Za-z0-9+/=]{2000,}$/);
      expect(attachment.headers).toEqual(
        expect.arrayContaining([
          { name: 'Content-ID', value: '<vpd-logo>' },
          { name: 'Content-Disposition', value: 'inline; filename=vpd-logo.png' },
        ])
      );
      // The image travels as an attachment, not pasted into the HTML body.
      expect(String(call.body.htmlContent)).not.toContain('data:image');
    }
  });

  it('omits optional fields that were never submitted instead of inventing them', async () => {
    await processEnquiry('contact', contactPayload({ company: '' }), freshIp());

    const html = String(brevoCalls[0].body.htmlContent);
    expect(html).not.toContain('>Company<');
    expect(html).not.toContain('N/A');
    expect(html).not.toContain('undefined');
    // Phone is required by the deployed backend, so it is always present.
    expect(html).toContain('>Phone<');
  });
});

describe('consultation enquiry', () => {
  it('uses the consultation subjects, heading and highlighted service', async () => {
    const result = await processEnquiry('consultation', consultationPayload(), freshIp());

    expect(result.kind).toBe('processed');
    expect(brevoCalls).toHaveLength(2);
    // The "Get a Quote" button opens this form, so the admin copy is filed as a
    // quotation request; the acknowledgement to the visitor is unchanged.
    expect(brevoCalls[0].body.subject).toBe(
      'New Quotation Request - Enterprise Architecture Consulting'
    );
    expect(brevoCalls[1].body.subject).toBe(
      'Your Consultation Request Has Been Received | VPD Technologies'
    );

    const adminHtml = String(brevoCalls[0].body.htmlContent);
    expect(adminHtml).toContain('New Consultation Request');
    expect(adminHtml).toContain('Service Requested');
    expect(adminHtml).toContain('Enterprise Architecture Consulting');
    expect(adminHtml).not.toContain('Preferred time');

    const userHtml = String(brevoCalls[1].body.htmlContent);
    expect(userHtml).toContain('no appointment is confirmed');
    expect(userHtml).not.toContain('Your meeting is booked');
  });

  it('highlights a submitted preferred time on both emails', async () => {
    const result = await processEnquiry(
      'consultation',
      consultationPayload({ preferredTime: 'Friday 24 October, 4:00 pm IST' }),
      freshIp()
    );
    expect(result.kind).toBe('processed');

    const adminHtml = String(brevoCalls[0].body.htmlContent);
    const userHtml = String(brevoCalls[1].body.htmlContent);
    expect(adminHtml).toContain('Preferred time');
    expect(adminHtml).toContain('Friday 24 October, 4:00 pm IST');
    expect(userHtml).toContain('Friday 24 October, 4:00 pm IST');
  });

  it('never implies the appointment is confirmed', async () => {
    await processEnquiry('consultation', consultationPayload(), freshIp());
    const userHtml = String(brevoCalls[1].body.htmlContent);
    expect(userHtml).toMatch(/request has been received|received and logged/i);
  });

  it('requires a phone number and a message on both forms, matching the deployed backend', async () => {
    const noPhone = await processEnquiry('consultation', consultationPayload({ phone: '' }), freshIp());
    expect(noPhone.kind).toBe('invalid');

    const noMessage = await processEnquiry('consultation', consultationPayload({ message: '' }), freshIp());
    expect(noMessage.kind).toBe('invalid');

    const shortPhone = await processEnquiry('contact', contactPayload({ phone: '12345' }), freshIp());
    expect(shortPhone.kind).toBe('invalid');

    expect(storeMock).not.toHaveBeenCalled();
    expect(brevoCalls).toHaveLength(0);
  });
});

describe('validation', () => {
  it.each([
    ['missing name', contactPayload({ name: '' })],
    ['missing email', contactPayload({ email: '' })],
    ['invalid email', contactPayload({ email: 'alex@invalid' })],
    ['whitespace email', contactPayload({ email: '   ' })],
  ])('rejects %s without calling the store or Brevo', async (_label, payload) => {
    const result = await processEnquiry('contact', payload, freshIp());
    expect(result.kind).toBe('invalid');
    if (result.kind === 'invalid') expect(result.errors.length).toBeGreaterThan(0);
    expect(storeMock).not.toHaveBeenCalled();
    expect(brevoCalls).toHaveLength(0);
  });

  it('clamps oversized fields to their configured limits', async () => {
    const result = await processEnquiry(
      'contact',
      contactPayload({ name: 'A'.repeat(500), message: 'M'.repeat(9000) }),
      freshIp()
    );
    expect(result.kind).toBe('processed');
    const html = String(brevoCalls[0].body.htmlContent);
    expect(html).not.toContain('A'.repeat(121));
    expect((brevoCalls[0].body.htmlContent as string).length).toBeLessThan(20000);
  });

  it('replaces an untrustworthy client timestamp with server time', async () => {
    await processEnquiry('contact', contactPayload({ submittedAt: '1900-01-01T00:00:00.000Z' }), freshIp());
    const html = String(brevoCalls[0].body.htmlContent);
    expect(html).not.toContain('1900');
  });

  it('rejects a non-ISO submittedAt instead of crashing', async () => {
    const result = await processEnquiry('contact', contactPayload({ submittedAt: 'not-a-date' }), freshIp());
    expect(result.kind).toBe('processed');
  });
});

describe('HTML injection and escaping', () => {
  it('escapes markup submitted in every user-controlled field', async () => {
    const malicious = '<img src=x onerror=alert(1)>';
    await processEnquiry(
      'contact',
      contactPayload({
        name: malicious,
        company: `<script>alert("xss")</script>`,
        service: '" onmouseover="evil()',
        message: `<a href="javascript:alert(2)">click</a>`,
      }),
      freshIp()
    );

    const adminHtml = String(brevoCalls[0].body.htmlContent);
    const userHtml = String(brevoCalls[1].body.htmlContent);

    for (const html of [adminHtml, userHtml]) {
      expect(html).not.toContain('<script>');
      expect(html).not.toContain('<img src=x onerror');
      expect(html).not.toContain('onmouseover="evil');
      expect(html).not.toContain('href="javascript:');
    }
    expect(adminHtml).toContain('&lt;img src=x onerror=alert(1)&gt;');
  });

  it('quotes-escapes values so attributes cannot be broken out of', async () => {
    await processEnquiry('contact', contactPayload({ name: `"><td>x` }), freshIp());
    expect(String(brevoCalls[0].body.htmlContent)).not.toContain('"><td>x');
  });
});

describe('provider failures and partial delivery', () => {
  it('treats a Brevo rejection as not delivered while the stored enquiry still succeeds', async () => {
    brevoResponse = { ok: false, status: 412, text: 'some recipients are not acceptable: sender not verified' };

    const result = await processEnquiry('contact', contactPayload(), freshIp());

    expect(result.kind).toBe('processed');
    if (result.kind !== 'processed') return;
    expect(result.outcome.adminNotified).toBe(false);
    expect(result.outcome.userNotified).toBe(false);
    expect(result.outcome.accepted).toBe(true);
    expect(result.outcome.message).toBe('');
  });

  it('retries both emails after a provider outage instead of recording a false success', async () => {
    brevoResponse = { ok: false, status: 412, text: 'sender not verified' };
    const payload = contactPayload();
    const ip = freshIp();

    await processEnquiry('contact', payload, ip);
    expect(brevoCalls).toHaveLength(2);

    // Same reference retries after the provider recovers: notification was never
    // recorded as sent, so it is attempted again rather than lost.
    brevoResponse = { ok: true, status: 200, text: JSON.stringify({ messageId: '<m@brevo>' }) };
    const retry = await processEnquiry('contact', payload, ip);
    expect(brevoCalls).toHaveLength(4);
    if (retry.kind === 'processed') expect(retry.outcome.duplicate).toBe(false);
  });

  it('surfaces a hard failure when neither the store nor the admin email worked', async () => {
    storeMock.mockImplementationOnce(async () => ({ success: false, message: 'boom' }));
    brevoResponse = { ok: false, status: 500, text: 'provider down' };

    const result = await processEnquiry('contact', contactPayload(), freshIp());

    expect(result.kind).toBe('processed');
    if (result.kind !== 'processed') return;
    expect(result.outcome.accepted).toBe(false);
    expect(result.outcome.stored).toBe(false);
    expect(result.outcome.message).toContain('could not transmit');
  });

  it('still notifies the admin when the store is unreachable, so nothing is silently lost', async () => {
    storeMock.mockImplementationOnce(async () => ({ success: false, message: 'db down' }));

    const result = await processEnquiry('contact', contactPayload(), freshIp());

    if (result.kind !== 'processed') throw new Error('expected processed');
    expect(result.outcome.stored).toBe(false);
    expect(result.outcome.adminNotified).toBe(true);
    expect(result.outcome.accepted).toBe(true);
  });

  it('handles a network error to Brevo without throwing', async () => {
    fetchBehaviour = 'network-error';
    const result = await processEnquiry('contact', contactPayload(), freshIp());
    expect(result.kind).toBe('processed');
    if (result.kind !== 'processed') return;
    expect(result.outcome.adminNotified).toBe(false);
  });

  it('skips email sending entirely when BREVO_API_KEY is absent', async () => {
    delete process.env.BREVO_API_KEY;
    const result = await processEnquiry('contact', contactPayload(), freshIp());
    expect(brevoCalls).toHaveLength(0);
    if (result.kind !== 'processed') throw new Error('expected processed');
    expect(result.outcome.stored).toBe(true);
    expect(result.outcome.accepted).toBe(true);
  });
});

describe('duplicate submission protection', () => {
  it('does not store or email twice for the same reference id', async () => {
    const payload = contactPayload();
    const ip = freshIp();

    const first = await processEnquiry('contact', payload, ip);
    const second = await processEnquiry('contact', payload, ip);

    if (first.kind !== 'processed' || second.kind !== 'processed') throw new Error('expected processed');
    expect(first.outcome.duplicate).toBe(false);
    expect(second.outcome.duplicate).toBe(true);
    expect(storeMock).toHaveBeenCalledTimes(1);
    expect(brevoCalls).toHaveLength(2);
  });

  it('collapses a re-submitted identical enquiry from a different reference id', async () => {
    const ip = freshIp();
    const base = contactPayload();
    await processEnquiry('contact', base, ip);
    const again = await processEnquiry(
      'contact',
      { ...base, referenceId: freshReference('ctdup') },
      ip
    );
    if (again.kind !== 'processed') throw new Error('expected processed');
    expect(again.outcome.duplicate).toBe(true);
    expect(brevoCalls).toHaveLength(2);
  });
});

describe('rate limiting and spam protection', () => {
  it('limits the sixth enquiry from one connection within the window', async () => {
    const ip = freshIp();
    const kinds: string[] = [];
    for (let i = 0; i < 6; i += 1) {
      const result = await processEnquiry('contact', contactPayload(), ip);
      kinds.push(result.kind);
    }
    expect(kinds.slice(0, 5)).toEqual(new Array(5).fill('processed'));
    expect(kinds[5]).toBe('limited');
  });

  it('tracks the two forms independently', async () => {
    const ip = freshIp();
    for (let i = 0; i < 5; i += 1) await processEnquiry('contact', contactPayload(), ip);
    const consultation = await processEnquiry('consultation', consultationPayload(), ip);
    expect(consultation.kind).toBe('processed');
  });

  it('discards a honeypot submission without storing or emailing, and reports success', async () => {
    const result = await processEnquiry('contact', contactPayload({ website: 'http://spam.example' }), freshIp());
    expect(result.kind).toBe('discarded');
    expect(storeMock).not.toHaveBeenCalled();
    expect(brevoCalls).toHaveLength(0);
  });
});

describe('route handler contract', () => {
  function request(body: unknown, ip = freshIp()): NextRequest {
    const headers = new Headers({ 'x-forwarded-for': `${ip}, 70.41.3.18` });
    return {
      headers,
      text: async () => (typeof body === 'string' ? body : JSON.stringify(body)),
    } as unknown as NextRequest;
  }

  it('returns 200 with the outcome flags for a valid contact enquiry', async () => {
    const response = await makeEnquiryHandler('contact')(request(contactPayload()));
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.adminNotified).toBe(true);
  });

  it('returns 400 for invalid input and 502 when nothing captured the enquiry', async () => {
    const bad = await makeEnquiryHandler('contact')(request(contactPayload({ email: 'nope' })));
    expect(bad.status).toBe(400);

    storeMock.mockImplementationOnce(async () => ({ success: false }));
    brevoResponse = { ok: false, status: 500, text: 'down' };
    const failed = await makeEnquiryHandler('contact')(request(contactPayload()));
    expect(failed.status).toBe(502);
  });

  it('returns 429 once the connection exceeds the enquiry window', async () => {
    const handler = makeEnquiryHandler('contact');
    const ip = freshIp();
    let last = 0;
    for (let i = 0; i < 7; i += 1) {
      last = (await handler(request(contactPayload(), ip))).status;
    }
    expect(last).toBe(429);
  });

  it.each([
    ['malformed JSON', '{not json'],
    ['a JSON array', '[]'],
    ['an empty body', ''],
    ['an oversized body', JSON.stringify({ message: 'x'.repeat(40 * 1024) })],
  ])('rejects %s with 400 and touches nothing', async (_label, body) => {
    const response = await makeEnquiryHandler('contact')(request(body));
    expect(response.status).toBe(400);
    expect(storeMock).not.toHaveBeenCalled();
    expect(brevoCalls).toHaveLength(0);
  });

  it('never echoes the API key or the sender configuration into the response', async () => {
    const response = await makeEnquiryHandler('contact')(request(contactPayload()));
    const text = await response.text();
    expect(text).not.toContain(TEST_KEY);
    expect(text).not.toContain('api-key');
    expect(JSON.stringify(brevoCalls.map((c) => c.body))).not.toContain(TEST_KEY);
  });

  it('does not leak provider error bodies into the user-facing message', async () => {
    storeMock.mockImplementationOnce(async () => ({ success: false }));
    brevoResponse = { ok: false, status: 412, text: 'Invalid credentials, api-key rejected' };
    const response = await makeEnquiryHandler('contact')(request(contactPayload()));
    const text = await response.text();
    expect(response.status).toBe(502);
    expect(text).not.toContain('api-key');
    expect(text).not.toContain('Invalid credentials');
  });
});
