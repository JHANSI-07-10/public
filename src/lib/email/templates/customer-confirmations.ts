/**
 * Customer and applicant confirmations: the copies that go back to whoever
 * submitted a form.
 *
 * These templates acknowledge receipt only. They never state that a meeting is
 * booked, a scope or price is agreed, or an application progressed, and their
 * wording, subjects and branding are deliberately independent of the internal
 * notifications in `admin-notifications.ts`.
 */
import {
  AUTOMATED_NOTICE,
  USER_FOOTER,
  detailRows,
  messageRow,
  shell,
} from './shell';
import type { CareerApplicationEmailData, EnquiryEmailData } from './types';

function greeting(name: string): string {
  const trimmed = name.trim();
  return trimmed === '' ? 'Hello' : `Hi ${trimmed}`;
}

/** Combines the two addresses a reviewer needs without adding a spare row. */
function who(data: EnquiryEmailData): string {
  const company = data.company?.trim() ?? '';
  return company === '' ? data.name : `${data.name} · ${company}`;
}

export function contactUserConfirmation(data: EnquiryEmailData): string {
  return shell({
    heading: 'Enquiry Received',
    preheader: 'We have received your enquiry',
    intro: `${greeting(data.name)}, we've received your enquiry. Our team will review it and you'll get another email once we've responded.`,
    eyebrow: 'Submission confirmation',
    badge: 'We have it',
    reference: data.referenceId,
    bodyLabel: 'What you sent us',
    footer: USER_FOOTER,
    automatedNotice: AUTOMATED_NOTICE,
    note: 'This message confirms receipt only — no scope, timeline or price is agreed until we reply to you.',
    nextSteps: [
      'Your enquiry is stored with the reference above.',
      'The VPD Technologies team reviews what you sent.',
      "We reply by email, and you'll get a separate message once we've responded.",
    ],
    bodyHtml: `${detailRows([
      { label: 'Who', value: who(data) },
      { label: 'Email', value: data.email },
      { label: 'Phone', value: data.phone },
      { label: 'Subject', value: data.service, highlight: true },
      { label: 'Received', value: data.submittedAtLabel },
    ])}${messageRow('Your message', data.message || '(none provided)')}`,
  });
}

export function consultationUserConfirmation(data: EnquiryEmailData): string {
  return shell({
    heading: 'Consultation Request Received',
    preheader: 'We have received your consultation request',
    intro: `${greeting(data.name)}, we've received your consultation request. A VPD Technologies team member will review it and follow up to schedule the session.`,
    eyebrow: 'Submission confirmation',
    badge: 'Request received',
    reference: data.referenceId,
    bodyLabel: 'What you sent us',
    footer: USER_FOOTER,
    automatedNotice: AUTOMATED_NOTICE,
    note: 'Your request has been received, but no appointment is confirmed until we agree a time with you.',
    nextSteps: [
      'Your request is stored with the reference above.',
      'A VPD Technologies engineer reviews the scope you described.',
      'We email you to agree a suitable time before anything is scheduled.',
    ],
    bodyHtml: detailRows([
      { label: 'Who', value: who(data) },
      { label: 'Email', value: data.email },
      { label: 'Phone', value: data.phone },
      { label: 'Service', value: data.service, highlight: true },
      { label: 'Preferred time', value: data.preferredTime, highlight: true },
      { label: 'Received', value: data.submittedAtLabel },
      { label: 'Requirements', value: data.message },
    ]),
  });
}

export function careersUserConfirmation(data: CareerApplicationEmailData): string {
  return shell({
    heading: 'Application Received',
    preheader: 'We have received your job application',
    intro: `${greeting(data.fullName)}, we've received your application. Our team will contact you if your profile matches.`,
    eyebrow: 'Application confirmation',
    badge: 'Application received',
    reference: data.referenceId,
    bodyLabel: 'What you submitted',
    footer:
      'You are receiving this email because an application was submitted through the VPD Technologies careers page.',
    automatedNotice: AUTOMATED_NOTICE,
    note: 'This message confirms receipt only. No interview, shortlisting, or offer is implied by it.',
    nextSteps: [
      'Your application and resume are recorded with the reference above.',
      'Our team reviews your submitted details against the opening.',
      'If your profile matches, we contact you on the email and phone number you provided.',
    ],
    bodyHtml: `${detailRows([
      { label: 'Who', value: data.fullName },
      { label: 'Email', value: data.email },
      { label: 'Phone', value: data.phone },
      { label: 'Position applied', value: data.position, highlight: true },
      { label: 'Work mode', value: data.workMode },
      { label: 'Experience', value: data.totalExperience },
      { label: 'Expected CTC', value: data.expectedCtc },
      { label: 'Notice period', value: data.noticePeriod },
      { label: 'Qualification', value: data.highestQualification },
      { label: 'Resume', value: data.resumeLabel },
      { label: 'Received', value: data.submittedAtLabel },
    ])}${messageRow('Key skills', data.keySkills)}${
      data.coverNote ? messageRow('Your cover note', data.coverNote) : ''
    }`,
  });
}
