import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  LOGO_BASE64,
  LOGO_CONTENT_ID,
  LOGO_RENDER_HEIGHT,
  LOGO_RENDER_WIDTH,
} from '../src/lib/email/logo-asset';
import {
  LOGO_PUBLIC_URL,
  careersAdminNotification,
  careersUserConfirmation,
  contactAdminNotification,
  contactUserConfirmation,
  consultationAdminNotification,
  consultationUserConfirmation,
  type CareerApplicationEmailData,
  type EnquiryEmailData,
} from '../src/lib/email/templates';

/**
 * The logo used to ship as a bare `cid:` reference, so every client that could
 * not resolve the attachment showed a broken image. These tests pin the fixes:
 * a public HTTPS source for normal clients, the cid only inside the Outlook
 * conditional, and geometry that matches the asset instead of stretching it.
 */

/** PNG width/height live in the IHDR chunk, bytes 16-23. */
function pngDimensions(base64: string): { width: number; height: number } {
  const bytes = Buffer.from(base64, 'base64');
  expect(bytes.subarray(1, 4).toString('ascii')).toBe('PNG');
  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
  };
}

const enquiry = (overrides: Partial<EnquiryEmailData> = {}): EnquiryEmailData => ({
  name: 'Alex Morgan',
  email: 'alex@northwind.example',
  phone: '+91 90000 00000',
  company: 'Northwind Retail',
  service: 'Website & Web Application Development',
  message: 'Looking for a storefront rebuild.',
  preferredTime: 'Weekday afternoons',
  submittedAtLabel: '22 October 2026, 04:15 PM IST (UTC+05:30)',
  submittedAtUtc: '2026-10-22T10:45:00.000Z',
  referenceId: 'VPD-TEST-0001',
  sourceLabel: 'Contact form',
  ...overrides,
});

const application = (overrides: Partial<CareerApplicationEmailData> = {}): CareerApplicationEmailData => ({
  position: 'Full-Stack Software Engineer',
  workMode: 'Onsite',
  fullName: 'Ravi Kumar',
  email: 'ravi.kumar@example.com',
  phone: '+91 98888 77777',
  currentLocation: 'Kurnool, Andhra Pradesh',
  totalExperience: '4 years 3 months',
  currentCompany: 'Northwind Retail',
  currentDesignation: 'Software Engineer',
  keySkills: 'React, Node.js, PostgreSQL',
  currentCtc: 'Confidential',
  expectedCtc: 'As per company standards',
  noticePeriod: '30 days',
  highestQualification: 'B.Tech, Computer Science',
  college: 'Annamacharya University',
  yearOfPassing: '2021',
  resumeLabel: 'ravi-kumar.pdf · 248 KB',
  submittedAtLabel: '22 October 2026, 04:15 PM IST (UTC+05:30)',
  referenceId: 'VPD-TEST-0002',
  ...overrides,
});

const allTemplates: Array<[string, () => string]> = [
  ['contact admin', () => contactAdminNotification(enquiry())],
  ['contact user', () => contactUserConfirmation(enquiry())],
  ['consultation admin', () => consultationAdminNotification(enquiry({ sourceLabel: 'Consultation form' }))],
  ['consultation user', () => consultationUserConfirmation(enquiry())],
  ['careers admin', () => careersAdminNotification(application())],
  ['careers user', () => careersUserConfirmation(application())],
];

describe('email logo source', () => {
  it('publishes the logo over an absolute, unauthenticated HTTPS URL', () => {
    expect(LOGO_PUBLIC_URL).toMatch(/^https:\/\/[^\s/]+\/[^\s]+$/);
    expect(LOGO_PUBLIC_URL).not.toMatch(/localhost|127\.0\.0\.1|0\.0\.0\.0|\.local\//);
    expect(LOGO_PUBLIC_URL).not.toMatch(/\/(src|app|public)\//);
    expect(LOGO_PUBLIC_URL.startsWith('https://')).toBe(true);
  });

  it('renders every template from that URL, with the cid only for Outlook', () => {
    for (const [name, render] of allTemplates) {
      const html = render();
      expect(html, name).toContain(`<!--[if !mso]><!--><img src="${LOGO_PUBLIC_URL}"`);
      expect(html, name).toContain(`<!--[if mso]><img src="cid:${LOGO_CONTENT_ID}"`);
      // Outside the Outlook conditional a cid reference is what broke the header.
      const nonOutlook = html.replace(/<!--\[if mso\][\s\S]*?<!\[endif\]-->/g, '');
      expect(nonOutlook, name).not.toContain('cid:');
    }
  });

  it('sizes the image to the asset so no client stretches it', () => {
    const { width, height } = pngDimensions(LOGO_BASE64);
    const assetRatio = width / height;
    const renderRatio = LOGO_RENDER_WIDTH / LOGO_RENDER_HEIGHT;
    expect(Math.abs(assetRatio - renderRatio)).toBeLessThan(0.02);

    for (const [, render] of allTemplates) {
      const html = render();
      expect(html).toContain(
        `width="${LOGO_RENDER_WIDTH}" height="${LOGO_RENDER_HEIGHT}" alt="VPD Technologies"`
      );
      expect(html).toContain(`width:${LOGO_RENDER_WIDTH}px;height:${LOGO_RENDER_HEIGHT}px;`);
    }
  });

  it('keeps the logo as an inline attachment so a blocked URL still renders', () => {
    expect(LOGO_BASE64).toMatch(/^[A-Za-z0-9+/=]{2000,}$/);
    // Never pasted into the markup as a data URI: Brevo and Gmail both reject that.
    for (const [, render] of allTemplates) {
      expect(render()).not.toContain('data:image');
    }
  });

  it('honours EMAIL_LOGO_URL once the custom domain serves the asset', async () => {
    const override = 'https://www.vpdtechnologiespvtltd.com/email-logo.png';
    const previous = process.env.EMAIL_LOGO_URL;
    process.env.EMAIL_LOGO_URL = override;
    try {
      vi.resetModules();
      const reloaded = await import('../src/lib/email/templates');
      expect(reloaded.LOGO_PUBLIC_URL).toBe(override);
      expect(reloaded.contactAdminNotification(enquiry())).toContain(`src="${override}"`);
    } finally {
      if (previous === undefined) delete process.env.EMAIL_LOGO_URL;
      else process.env.EMAIL_LOGO_URL = previous;
      vi.resetModules();
    }
  });
});

describe('corporate shell', () => {
  it('pins light mode, a 600px card and Outlook pixel density', () => {
    for (const [name, render] of allTemplates) {
      const html = render();
      expect(html, name).toContain('<meta name="color-scheme" content="light-only" />');
      expect(html, name).toContain('max-width:600px');
      expect(html, name).toContain('width="600"');
      expect(html, name).toContain('<o:PixelsPerInch>96</o:PixelsPerInch>');
    }
  });

  it('stays within what email clients support', () => {
    for (const [name, render] of allTemplates) {
      const html = render();
      expect(html, name).not.toMatch(/linear-gradient|radial-gradient|animation:|@keyframes|position:fixed/);
      expect(html, name).toMatch(/<table role="presentation"/);
    }
  });

  it('signs every email with the published company details and no invented ones', () => {
    for (const [name, render] of allTemplates) {
      const html = render();
      expect(html, name).toContain('VPD Technologies Private Limited');
      expect(html, name).toContain('Kurnool, Andhra Pradesh, India');
    }
  });

  it('escapes submitted values instead of injecting markup', () => {
    const html = contactAdminNotification(
      enquiry({ name: '<script>alert(1)</script>', company: 'A & B "Quoted" Co' })
    );
    expect(html).not.toContain('<script>alert(1)</script>');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(html).toContain('A &amp; B &quot;Quoted&quot; Co');
  });

  it('never leaks credentials, local paths or provider hosts into the markup', () => {
    process.env.BREVO_API_KEY = 'test-secret-key-must-never-leak';
    for (const [name, render] of allTemplates) {
      const html = render();
      expect(html, name).not.toContain('test-secret-key-must-never-leak');
      expect(html, name).not.toContain('api.brevo.com');
      expect(html, name).not.toMatch(/[A-Za-z]:\\[A-Za-z]|\/home\/|\/Users\/|\/workspace\//);
    }
    delete process.env.BREVO_API_KEY;
  });
});
