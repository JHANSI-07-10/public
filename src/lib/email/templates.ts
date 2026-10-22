/**
 * Email-safe HTML for VPD Technologies transactional notifications.
 *
 * Layout is table-based with inline CSS so Outlook's Word engine renders it;
 * the small <style> block only adds mobile stacking and light-mode pinning,
 * which clients that ignore it fall back to the inline styles for. Every value
 * that came from a visitor is escaped, and fields left blank are omitted rather
 * than filled with a placeholder.
 */
import {
  LOGO_CONTENT_ID,
  LOGO_RENDER_HEIGHT,
  LOGO_RENDER_WIDTH,
} from './logo-asset';

const PAGE_BG = '#f3f4f6';
const CARD_BG = '#ffffff';
const BORDER = '#e5e7eb';
const RULE = '#f1f2f4';
const INK = '#111827';
const BODY = '#4b5563';
const MUTED = '#6b7280';
const GOLD = '#c9a84c';
const GOLD_INK = '#8a6a1f';
const GOLD_SOFT = '#fbf6e8';
const BAND_BG = '#0a0a0a';
const PANEL_BG = '#fafafa';

const EMAIL_SAFE_WIDTH = 600;

export const SITE_ORIGIN = 'https://www.vpdtechnologiespvtltd.com';

/**
 * Where mail clients load the logo from. It has to be an absolute, unauthenticated
 * HTTPS URL that is reachable from outside this app, so it is verified with
 * `scripts/check-email-logo-url.mjs` before deployment — a Next.js public path on
 * the parked domain is not enough. Override with EMAIL_LOGO_URL once the custom
 * domain serves the deployed site.
 */
export const LOGO_PUBLIC_URL: string =
  (process.env.EMAIL_LOGO_URL as string | undefined)?.trim() ||
  'https://public-nu-sage-36.vercel.app/logo.png';

const LOGO_ALT = 'VPD Technologies';
const LOGO_CID_SRC = `cid:${LOGO_CONTENT_ID}`;

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Outlook's Word engine cannot fetch remote images unless the reader allows it,
 * but it always resolves an inline cid part; every other client prefers the URL
 * and gets the same file. Both point at the identical published logo.
 */
function logoHtml(): string {
  const shared =
    `width="${LOGO_RENDER_WIDTH}" height="${LOGO_RENDER_HEIGHT}" alt="${LOGO_ALT}" ` +
    `style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;` +
    `width:${LOGO_RENDER_WIDTH}px;height:${LOGO_RENDER_HEIGHT}px;"`;
  return (
    `<!--[if mso]><img src="${LOGO_CID_SRC}" ${shared} /><![endif]-->` +
    `<!--[if !mso]><!--><img src="${LOGO_PUBLIC_URL}" ${shared} /><!--<![endif]-->` +
    `<div style="display:none;max-height:0;overflow:hidden;font-family:Arial,Helvetica,sans-serif;` +
    `font-size:1px;line-height:1px;color:${BAND_BG};">${LOGO_ALT}</div>`
  );
}

export interface DetailField {
  label: string;
  value?: string | null;
  /** Renders the value in gold so key fields stand out in a scanned inbox. */
  highlight?: boolean;
}

/** Fields with no submitted value are omitted entirely rather than faked. */
function detailRows(fields: DetailField[]): string {
  const rows = fields.filter((field) => typeof field.value === 'string' && field.value.trim() !== '');
  return rows
    .map(
      (field, index) => `
            <tr>
              <td class="vpd-label" width="168" style="padding:13px 20px;border-bottom:${
                index === rows.length - 1 ? 'none' : `1px solid ${RULE}`
              };vertical-align:top;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:${MUTED};letter-spacing:0.2px;">${escapeHtml(
                  field.label
                )}</div>
              </td>
              <td class="vpd-cell" style="padding:13px 20px;border-bottom:${
                index === rows.length - 1 ? 'none' : `1px solid ${RULE}`
              };vertical-align:top;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:21px;color:${
                  field.highlight ? GOLD_INK : INK
                };font-weight:bold;word-break:break-word;">${escapeHtml(field.value)}</div>
              </td>
            </tr>`
    )
    .join('');
}

function messageRow(label: string, value: string): string {
  return `
            <tr>
              <td colspan="2" style="padding:18px 20px;background-color:${PANEL_BG};border-top:1px solid ${RULE};">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:19px;color:${MUTED};letter-spacing:0.2px;">${escapeHtml(
                  label
                )}</div>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:23px;padding-top:7px;color:${INK};white-space:pre-wrap;word-break:break-word;">${escapeHtml(
                  value
                )}</div>
              </td>
            </tr>`;
}

/** Small gold section caption that separates the blocks of a long email. */
function sectionLabel(text: string): string {
  return `
        <tr>
          <td style="padding:26px 30px 10px 30px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:0 10px 0 0;border-bottom:2px solid ${GOLD};">
                  <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:${GOLD_INK};font-weight:bold;text-transform:uppercase;letter-spacing:1.2px;">${escapeHtml(
                    text
                  )}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>`;
}

function numberedSteps(steps: string[]): string {
  return steps
    .map(
      (step, index) => `
          <tr>
            <td width="26" style="padding:6px 10px 6px 0;vertical-align:top;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:20px;color:${GOLD_INK};font-weight:bold;">${
                index + 1
              }.</div>
            </td>
            <td style="padding:6px 0;vertical-align:top;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:${BODY};">${escapeHtml(
                step
              )}</div>
            </td>
          </tr>`
    )
    .join('');
}

interface ShellOptions {
  heading: string;
  intro: string;
  preheader: string;
  /** Gold uppercase tag in the logo band, e.g. "Internal notification". */
  eyebrow: string;
  /** Status pill under the band, with the reference it points to. */
  badge: string;
  reference: string;
  /** Already-safe HTML for the details table rows. */
  bodyHtml: string;
  bodyLabel?: string;
  note?: string;
  nextSteps?: string[];
  footer: string;
  automatedNotice?: string;
}

function shell({
  heading,
  intro,
  preheader,
  eyebrow,
  badge,
  reference,
  bodyHtml,
  bodyLabel,
  note,
  nextSteps,
  footer,
  automatedNotice,
}: ShellOptions): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="color-scheme" content="light-only" />
  <meta name="supported-color-schemes" content="light-only" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${escapeHtml(heading)} | ${escapeHtml(LOGO_ALT)}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    html,body{margin:0 !important;padding:0 !important;height:100% !important;width:100% !important;}
    img{border:0;line-height:100%;text-decoration:none;}
    table{border-collapse:collapse !important;mso-table-lspace:0 !important;mso-table-rspace:0 !important;}
    a{color:${GOLD_INK};text-decoration:none;}
    @media only screen and (max-width:602px){
      .vpd-pad{padding-left:18px !important;padding-right:18px !important;}
      .vpd-label{display:block !important;width:100% !important;padding:12px 18px 0 18px !important;}
      .vpd-cell{display:block !important;width:100% !important;padding:2px 18px 12px 18px !important;}
      .vpd-eyebrow{display:none !important;}
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${PAGE_BG};width:100% !important;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;font-size:1px;line-height:1px;">${escapeHtml(
    preheader
  )}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${PAGE_BG};">
    <tr>
      <td align="center" style="padding:28px 12px;">
        <table role="presentation" class="vpd-card" width="${EMAIL_SAFE_WIDTH}" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:${EMAIL_SAFE_WIDTH}px;background-color:${CARD_BG};border:1px solid ${BORDER};border-radius:12px;">
          <tr>
            <td class="vpd-pad" style="padding:24px 30px;background-color:${BAND_BG};border-bottom:3px solid ${GOLD};border-radius:11px 11px 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" valign="middle" style="font-size:0;line-height:0;">${logoHtml()}</td>
                  <td class="vpd-eyebrow" align="right" valign="middle" style="text-align:right;">
                    <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:16px;color:${GOLD};text-transform:uppercase;letter-spacing:1.6px;font-weight:bold;">${escapeHtml(
                      eyebrow
                    )}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="vpd-pad" style="padding:16px 30px;background-color:${GOLD_SOFT};border-bottom:1px solid ${BORDER};">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:5px 12px;background-color:${CARD_BG};border:1px solid ${GOLD};border-radius:999px;">
                    <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:17px;color:${GOLD_INK};font-weight:bold;text-transform:uppercase;letter-spacing:0.8px;">${escapeHtml(
                      badge
                    )}</div>
                  </td>
                  <td style="padding:0 0 0 12px;">
                    <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:17px;color:${MUTED};">Reference&nbsp;<span style="color:${INK};font-weight:bold;">${escapeHtml(
                      reference
                    )}</span></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="vpd-pad" style="padding:28px 30px 6px 30px;">
              <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:23px;line-height:30px;color:${INK};font-weight:bold;">${escapeHtml(
                heading
              )}</h1>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1px;color:${GOLD};padding:14px 0 0 0;">&nbsp;</div>
              <p style="margin:14px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:${BODY};">${escapeHtml(
                intro
              )}</p>
            </td>
          </tr>
${bodyLabel ? sectionLabel(bodyLabel) : ''}
          <tr>
            <td class="vpd-pad" style="padding:10px 30px 8px 30px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BORDER};border-radius:10px;background-color:${CARD_BG};">${bodyHtml}
              </table>
            </td>
          </tr>
          ${
            note
              ? `<tr>
            <td class="vpd-pad" style="padding:18px 30px 4px 30px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:${BODY};border-left:3px solid ${GOLD};background-color:${PANEL_BG};padding:12px 16px;border-radius:0 8px 8px 0;">${escapeHtml(
                note
              )}</div>
            </td>
          </tr>`
              : ''
          }
          ${
            nextSteps && nextSteps.length > 0
              ? `${sectionLabel('What happens next')}
          <tr>
            <td class="vpd-pad" style="padding:6px 30px 10px 30px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td>
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">${numberedSteps(
                    nextSteps
                  )}
                  </table>
                </td></tr>
              </table>
            </td>
          </tr>`
              : ''
          }
          <tr>
            <td class="vpd-pad" style="padding:22px 30px 24px 30px;border-top:1px solid ${BORDER};background-color:${PANEL_BG};border-radius:0 0 11px 11px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:${INK};font-weight:bold;">VPD Technologies Private Limited</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:19px;padding-top:4px;color:${MUTED};">Kurnool, Andhra Pradesh, India &nbsp;&middot;&nbsp; <a href="${SITE_ORIGIN}" style="color:${GOLD_INK};text-decoration:none;">${SITE_ORIGIN.replace(
                'https://',
                ''
              )}</a></div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:19px;padding-top:10px;color:${MUTED};">${escapeHtml(
                footer
              )}</div>
              ${
                automatedNotice
                  ? `<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:19px;padding-top:6px;color:${MUTED};">${escapeHtml(
                      automatedNotice
                    )}</div>`
                  : ''
              }
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export interface EnquiryEmailData {
  /** Values are raw user input; every template escapes them before rendering. */
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
  preferredTime?: string;
  submittedAtLabel: string;
  submittedAtUtc: string;
  referenceId: string;
  /** Which form produced this submission, used for the enquiry summary. */
  sourceLabel: string;
}

/** Combines the two addresses a reviewer needs without adding a spare row. */
function who(data: EnquiryEmailData): string {
  const company = data.company?.trim() ?? '';
  return company === '' ? data.name : `${data.name} · ${company}`;
}

const ADMIN_EYEBROW = 'Internal notification';
const ADMIN_FOOTER =
  'This notification was generated by the VPD Technologies website forms.';
const ADMIN_REPLY_LINE = 'Reply to this message to answer the visitor directly.';

const USER_FOOTER =
  'You are receiving this email because a submission was made through the VPD Technologies website.';
const AUTOMATED_NOTICE = 'This is an automated message. Please do not reply to this email.';

export function contactAdminNotification(data: EnquiryEmailData): string {
  return shell({
    heading: 'New Website Enquiry',
    preheader: `New contact enquiry from ${data.name}`,
    intro: `A visitor submitted the contact form on the VPD Technologies website on ${data.submittedAtLabel}.`,
    eyebrow: ADMIN_EYEBROW,
    badge: 'Enquiry received',
    reference: data.referenceId,
    bodyLabel: 'Submitted details',
    footer: `${ADMIN_FOOTER} ${ADMIN_REPLY_LINE}`,
    bodyHtml: `${detailRows([
      { label: 'Who', value: data.name },
      { label: 'Email', value: data.email },
      { label: 'Phone', value: data.phone },
      { label: 'Company', value: data.company },
      { label: 'Subject', value: data.service, highlight: true },
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
    footer: `${ADMIN_FOOTER} ${ADMIN_REPLY_LINE}`,
    bodyHtml: detailRows([
      { label: 'Who', value: data.name },
      { label: 'Email', value: data.email },
      { label: 'Phone', value: data.phone },
      { label: 'Company', value: data.company },
      { label: 'Service requested', value: data.service, highlight: true },
      { label: 'Preferred time', value: data.preferredTime, highlight: true },
      { label: 'Received', value: data.submittedAtLabel },
      { label: 'Requirements', value: data.message },
    ]),
  });
}

function greeting(name: string): string {
  const trimmed = name.trim();
  return trimmed === '' ? 'Hello' : `Hi ${trimmed}`;
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

export interface CareerApplicationEmailData {
  /** Values are raw applicant input; every field is escaped before rendering. */
  position: string;
  workMode: string;
  fullName: string;
  email: string;
  phone: string;
  currentLocation?: string;
  totalExperience: string;
  currentCompany?: string;
  currentDesignation?: string;
  keySkills: string;
  currentCtc?: string;
  expectedCtc: string;
  noticePeriod: string;
  highestQualification: string;
  college?: string;
  yearOfPassing?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  hearAboutUs?: string;
  referralName?: string;
  coverNote?: string;
  /** Server-built "name · size" label; the resume itself travels as an attachment. */
  resumeLabel: string;
  submittedAtLabel: string;
  referenceId: string;
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
