import { it } from 'vitest';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import {
  careersAdminNotification,
  careersUserConfirmation,
  contactAdminNotification,
  contactUserConfirmation,
  consultationAdminNotification,
  consultationUserConfirmation,
  type CareerApplicationEmailData,
  type EnquiryEmailData,
} from '../src/lib/email/templates';

it('writes previews', () => {
  const enquiry: EnquiryEmailData = {
    name: 'Alex Morgan',
    email: 'alex@northwind.example',
    phone: '+91 90000 00000',
    company: 'Northwind Retail',
    service: 'Website & Web Application Development',
    message: 'Looking for a storefront rebuild with a headless catalogue and Stripe checkout.',
    preferredTime: 'Weekday afternoons',
    submittedAtLabel: '22 October 2026, 04:15 PM IST (UTC+05:30)',
    submittedAtUtc: '2026-10-22T10:45:00.000Z',
    referenceId: 'VPD-TEST-0001',
    sourceLabel: 'Contact form',
  };
  const app: CareerApplicationEmailData = {
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
  };
  const files = {
    'contact-admin.html': contactAdminNotification(enquiry),
    'contact-user.html': contactUserConfirmation(enquiry),
    'consult-admin.html': consultationAdminNotification(enquiry),
    'consult-user.html': consultationUserConfirmation(enquiry),
    'careers-admin.html': careersAdminNotification(app),
    'careers-user.html': careersUserConfirmation(app),
  };
  for (const [name, html] of Object.entries(files)) {
    writeFileSync(join(tmpdir(), 'vpd-email-preview', name), html, 'utf8');
  }
});
