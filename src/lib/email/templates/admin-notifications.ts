/**
 * Internal notifications: the copies that go to the VPD inbox.
 *
 * Each one lists the submitted fields for a reviewer scanning the mail on a
 * phone, and the "Service Requested" row is the normalized service answer rather
 * than the raw form value. Subjects for these emails are built in
 * `templates/subjects.ts`; nothing in this file is customer-facing.
 */
import { serviceSummary } from './subjects';
import {
  ADMIN_EYEBROW,
  ADMIN_FOOTER,
  detailRows,
  messageRow,
  shell,
} from './shell';
import type { CareerApplicationEmailData, EnquiryEmailData } from './types';

export function contactAdminNotification(data: EnquiryEmailData): string {
  return shell({
    heading: 'New Website Enquiry',
    preheader: `New contact enquiry from ${data.name}`,
    intro: `A visitor submitted the contact form on the VPD Technologies website on ${data.submittedAtLabel}.`,
    eyebrow: ADMIN_EYEBROW,
    badge: 'Enquiry received',
    reference: data.referenceId,
    bodyLabel: 'Submitted details',
    footer: `${ADMIN_FOOTER} Reply to this message to answer the visitor directly.`,
    bodyHtml: `${detailRows([
      { label: 'Who', value: data.name },
      { label: 'Email', value: data.email },
      { label: 'Phone', value: data.phone },
      { label: 'Company', value: data.company },
      { label: 'Service Requested', value: serviceSummary(data.service), highlight: true },
      { label: 'Received', value: data.submittedAtLabel },
    ])}${messageRow('Message', data.message || '(none provided)')}`,
  });
}

export function consultationAdminNotification(data: EnquiryEmailData): string {
  return shell({
    heading: 'New Consultation Request',
    preheader: `New consultation request from ${data.name}`,
    intro: `A visitor requested a consultation through the VPD Technologies website on ${data.submittedAtLabel}.`,
    eyebrow: ADMIN_EYEBROW,
    badge: 'Request received',
    reference: data.referenceId,
    bodyLabel: 'Submitted details',
    footer: `${ADMIN_FOOTER} Reply to this message to answer the visitor directly.`,
    bodyHtml: detailRows([
      { label: 'Who', value: data.name },
      { label: 'Email', value: data.email },
      { label: 'Phone', value: data.phone },
      { label: 'Company', value: data.company },
      { label: 'Service Requested', value: serviceSummary(data.service), highlight: true },
      { label: 'Preferred time', value: data.preferredTime, highlight: true },
      { label: 'Received', value: data.submittedAtLabel },
      { label: 'Requirements', value: data.message },
    ]),
  });
}

const CAREERS_ADMIN_FOOTER = `${ADMIN_FOOTER} The candidate resume is attached to this message.`;

/** Joins two optional halves of one answer instead of inventing a third row. */
function pair(first?: string, second?: string): string {
  return [first?.trim(), second?.trim()].filter((part) => part && part !== '').join(' · ');
}

export function careersAdminNotification(data: CareerApplicationEmailData): string {
  return shell({
    heading: 'New Job Application',
    preheader: `Application for ${data.position} from ${data.fullName}`,
    intro: `${data.fullName} applied for ${data.position} through the VPD Technologies careers page on ${data.submittedAtLabel}.`,
    eyebrow: ADMIN_EYEBROW,
    badge: 'Application received',
    reference: data.referenceId,
    bodyLabel: 'Candidate details',
    footer: CAREERS_ADMIN_FOOTER,
    bodyHtml: `${detailRows([
      { label: 'Candidate', value: data.fullName },
      { label: 'Email', value: data.email },
      { label: 'Phone', value: data.phone },
      { label: 'Location', value: data.currentLocation },
      { label: 'Position', value: data.position, highlight: true },
      { label: 'Work mode', value: data.workMode },
      { label: 'Experience', value: data.totalExperience },
      { label: 'Current role', value: pair(data.currentCompany, data.currentDesignation) },
      { label: 'Expected CTC', value: data.expectedCtc, highlight: true },
      { label: 'Current CTC', value: data.currentCtc },
      { label: 'Notice period', value: data.noticePeriod },
      { label: 'Qualification', value: data.highestQualification },
      { label: 'College', value: data.college },
      { label: 'Year of passing', value: data.yearOfPassing },
      { label: 'Found us via', value: data.hearAboutUs },
      { label: 'Referred by', value: data.referralName },
      { label: 'LinkedIn', value: data.linkedinUrl },
      { label: 'Portfolio', value: data.portfolioUrl },
      { label: 'Resume', value: data.resumeLabel },
    ])}${messageRow('Key skills', data.keySkills)}${
      data.coverNote ? messageRow('Cover note', data.coverNote) : ''
    }`,
  });
}
