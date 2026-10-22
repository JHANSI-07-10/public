import { describe, expect, it } from 'vitest';
import {
  careersAdminSubject,
  contactAdminSubject,
  headerSafe,
  quotationAdminSubject,
  serviceItems,
  serviceSummary,
} from '../../src/lib/email/templates/subjects';
import {
  consultationAdminNotification,
  contactAdminNotification,
} from '../../src/lib/email/templates/admin-notifications';
import {
  consultationUserConfirmation,
  contactUserConfirmation,
} from '../../src/lib/email/templates/customer-confirmations';
import type { EnquiryEmailData } from '../../src/lib/email/templates/types';

/**
 * Only the three admin subjects are built here. The customer-facing subjects are
 * constants in the email plans, and the last block of this file pins them so a
 * future edit cannot change an acknowledgement someone already received.
 */

const enquiry = (overrides: Partial<EnquiryEmailData> = {}): EnquiryEmailData => ({
  name: 'Alex Morgan',
  email: 'alex@northwind.example',
  phone: '+91 90000 00000',
  company: 'Northwind Retail',
  service: 'Website & Web Application Development',
  message: 'Storefront rebuild on React and Node.',
  preferredTime: '',
  submittedAtLabel: '22 October 2026, 04:15 PM IST (UTC+05:30)',
  submittedAtUtc: '2026-10-22T10:45:00.000Z',
  referenceId: 'VPD-TEST-0001',
  sourceLabel: 'Contact form',
  ...overrides,
});

describe('contact admin subject', () => {
  it('uses the service the visitor actually selected', () => {
    expect(contactAdminSubject('Custom Software Development')).toBe(
      'New Contact - Custom Software Development'
    );
    expect(contactAdminSubject('Website & Web Application Development')).toBe(
      'New Contact - Website & Web Application Development'
    );
  });

  it('falls back to General Inquiry instead of an empty or undefined tail', () => {
    for (const blank of ['', '   ', undefined, null, ',', '; ', '  ,  ']) {
      expect(contactAdminSubject(blank)).toBe('New Contact - General Inquiry');
    }
  });

  it('lists every service when the payload carries more than one', () => {
    expect(contactAdminSubject('Mobile Application Development, UI/UX Design & Product Engineering')).toBe(
      'New Contact - Mobile Application Development & UI/UX Design & Product Engineering'
    );
    expect(serviceItems('ERP, erp, ERP')).toEqual(['ERP']);
  });

  it('keeps a long or crowded subject inside one readable line', () => {
    const many = Array.from({ length: 6 }, (_, i) => `Service number ${i + 1} for the inbox`).join(', ');
    const subject = contactAdminSubject(many);
    expect(subject.length).toBeLessThanOrEqual(120);
    expect(subject).toContain('+5 more');

    expect(contactAdminSubject('A'.repeat(400))).toHaveLength(120);
    expect(contactAdminSubject('A'.repeat(400))).not.toMatch(/[-\s]$/);
  });
});

describe('quotation admin subject', () => {
  it('uses the requested service from the Get a Quote form', () => {
    expect(quotationAdminSubject('Custom Software Development')).toBe(
      'New Quotation Request - Custom Software Development'
    );
  });

  it('never leaves the subject without a service', () => {
    expect(quotationAdminSubject(undefined)).toBe('New Quotation Request - General Inquiry');
  });
});

describe('careers admin subject', () => {
  const base = {
    fullName: 'Rahul Sharma',
    position: 'Frontend Developer',
    totalExperience: '1 - 2 years',
    workMode: 'Hybrid',
  };

  it('orders name, position, experience and applied location', () => {
    expect(careersAdminSubject(base)).toBe('Rahul Sharma - Frontend Developer - 1-2 years - Hybrid');
  });

  it('supports every work mode the form offers', () => {
    for (const workMode of ['Hybrid', 'Onsite', 'Remote']) {
      expect(careersAdminSubject({ ...base, workMode })).toContain(`- ${workMode}`);
    }
    expect(careersAdminSubject({ ...base, workMode: 'Onsite' })).toBe(
      'Rahul Sharma - Frontend Developer - 1-2 years - Onsite'
    );
  });

  it('drops missing optional pieces without leaving empty separators', () => {
    expect(careersAdminSubject({ ...base, totalExperience: '' })).toBe(
      'Rahul Sharma - Frontend Developer - Hybrid'
    );
    expect(careersAdminSubject({ ...base, workMode: '   ', totalExperience: undefined })).toBe(
      'Rahul Sharma - Frontend Developer'
    );
    expect(careersAdminSubject({ fullName: '', position: '', totalExperience: '', workMode: '' })).toBe(
      'New Job Application | VPD Technologies'
    );
  });

  it('keeps the fresher wording the form submits', () => {
    expect(careersAdminSubject({ ...base, totalExperience: 'Fresher (< 1 year)' })).toBe(
      'Rahul Sharma - Frontend Developer - Fresher (< 1 year) - Hybrid'
    );
  });

  it('clamps an oversized application to the leading fields', () => {
    const subject = careersAdminSubject({
      fullName: 'P'.repeat(200),
      position: 'Q'.repeat(200),
      totalExperience: '8+ years',
      workMode: 'Remote',
    });
    expect(subject.length).toBeLessThanOrEqual(120);
    expect(subject.startsWith('P')).toBe(true);
  });
});

describe('subject normalisation', () => {
  it('removes header-splitting characters from submitted values', () => {
    const hostile = 'Priya\r\nBcc: spammer@example.com\u0000';
    for (const build of [
      contactAdminSubject(hostile),
      quotationAdminSubject(hostile),
      careersAdminSubject({ fullName: hostile, position: hostile, totalExperience: hostile, workMode: hostile }),
    ]) {
      // Removing the CR/LF is what stops a second header being forged; the
      // remaining text is only ever rendered as subject content.
      expect(build).not.toMatch(/[\r\n\u0000]/);
      expect(build).toBe(headerSafe(build));
    }
    // The newline also ends the first service, so the remainder is listed as a
    // second item rather than being able to forge anything.
    expect(contactAdminSubject(hostile)).toBe('New Contact - Priya & Bcc: spammer@example.com');
    expect(headerSafe('a\t\t\tb\u2028c')).toBe('a b c');
  });

  it('renders selected services as a readable list for the body', () => {
    expect(serviceSummary('Enterprise Software / ERP / CRM')).toBe('Enterprise Software / ERP / CRM');
    expect(serviceSummary('Web Development, Mobile Apps')).toBe('Web Development & Mobile Apps');
    expect(serviceSummary('')).toBe('General Inquiry');
  });
});

describe('admin bodies carry the requested service', () => {
  it('labels it Service Requested in the contact notification', () => {
    const html = contactAdminNotification(enquiry());
    expect(html).toContain('Service Requested');
    expect(html).toContain('Website &amp; Web Application Development');
  });

  it('labels it Service Requested in the quotation notification', () => {
    const html = consultationAdminNotification(enquiry({ service: 'Custom Software Development' }));
    expect(html).toContain('Service Requested');
    expect(html).toContain('Custom Software Development');
  });

  it('lists multiple services rather than dumping the raw value', () => {
    const html = contactAdminNotification(
      enquiry({ service: 'Mobile Application Development, UI/UX Design & Product Engineering' })
    );
    expect(html).toContain('Mobile Application Development &amp; UI/UX Design &amp; Product Engineering');
  });

  it('shows the fallback rather than undefined when no service arrived', () => {
    for (const html of [
      contactAdminNotification(enquiry({ service: '' })),
      consultationAdminNotification(enquiry({ service: undefined })),
    ]) {
      expect(html).toContain('General Inquiry');
      expect(html).not.toMatch(/undefined|null/);
    }
  });
});

describe('customer-facing emails are untouched', () => {
  it('keeps the original labels and copy in both confirmations', () => {
    const contact = contactUserConfirmation(enquiry());
    expect(contact).toContain('>Subject<');
    expect(contact).not.toContain('Service Requested');
    expect(contact).toContain("we&#39;ve received your enquiry");

    const quote = consultationUserConfirmation(enquiry({ service: 'Custom Software Development' }));
    expect(quote).toContain('>Service<');
    expect(quote).not.toContain('Service Requested');
    expect(quote).toContain('no appointment is confirmed');
  });
});
