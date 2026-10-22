/**
 * Subject-line building for the three admin notifications.
 *
 * Every value here originates in a website form, so it is normalised before it
 * reaches an email header: control characters (CR/LF in particular) would let a
 * visitor inject additional header lines, and unbounded text would produce
 * subjects no client can display. Customer-facing subjects are plain constants
 * in the email plans and never pass through this file.
 */

/** Longer than this and most inbox views truncate anyway, so cut on a boundary. */
const MAX_SUBJECT_LENGTH = 120;

const SERVICE_FALLBACK = 'General Inquiry';

/** Never leave a dangling separator or stray space where a cut was made. */
function clamp(value: string): string {
  return value.slice(0, MAX_SUBJECT_LENGTH).replace(/[\s-]+$/, '').trim();
}

/** Strip header-unsafe characters and collapse whitespace runs. */
export function headerSafe(value: unknown): string {
  return String(value ?? '')
    .replace(/[\u0000-\u001f\u007f\u2028\u2029\uFEFF]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Selected services, as separate readable items. The forms submit one option
 * today; a combined or repeated value is still listed cleanly rather than
 * dumped into the subject verbatim.
 */
export function serviceItems(value: unknown): string[] {
  const byKey = new Map<string, string>();
  for (const part of String(value ?? '').split(/[,;\n]+/)) {
    const item = headerSafe(part);
    // Keyed case-insensitively so "Web Dev, web dev" lists once, but the first
    // spelling is what gets displayed.
    if (item !== '' && !byKey.has(item.toLowerCase())) byKey.set(item.toLowerCase(), item);
  }
  return [...byKey.values()];
}

/** "Custom Software Development" or "Web Development, Mobile Apps & UI/UX". */
export function serviceSummary(value: unknown, fallback = SERVICE_FALLBACK): string {
  const items = serviceItems(value);
  if (items.length === 0) return fallback;
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(', ')} & ${items[items.length - 1]}`;
}

/** `Prefix - services`, with overflow collapsed into a count so nothing is lost. */
function serviceSubject(prefix: string, value: unknown): string {
  const items = serviceItems(value);
  if (items.length === 0) return `${prefix} - ${SERVICE_FALLBACK}`;

  const full = `${prefix} - ${items.join(' & ')}`;
  if (full.length <= MAX_SUBJECT_LENGTH) return full;

  const lead = items[0];
  const rest = items.length - 1;
  const compact = rest > 0 ? `${lead} +${rest} more` : lead;
  return clamp(`${prefix} - ${compact}`);
}

export function contactAdminSubject(service: unknown): string {
  return serviceSubject('New Contact', service);
}

export function quotationAdminSubject(service: unknown): string {
  return serviceSubject('New Quotation Request', service);
}

export interface CareersSubjectFields {
  fullName: unknown;
  position: unknown;
  totalExperience: unknown;
  /** The work mode the applicant chose: Hybrid, Onsite or Remote. */
  workMode: unknown;
}

/**
 * `Name - Position - Experience - Applied Location`. Optional pieces drop out
 * entirely, so a blank experience can never leave a doubled separator, and the
 * constant fallback keeps the subject meaningful if every field is empty.
 */
export function careersAdminSubject(fields: CareersSubjectFields): string {
  const parts = [
    headerSafe(fields.fullName),
    headerSafe(fields.position),
    // The experience picker submits ranges like "3 - 5 years"; closing that up
    // keeps " - " unique to the field separator, so a scan of the inbox stays
    // readable. The value itself is not rewritten.
    headerSafe(fields.totalExperience).replace(/\s-\s/g, '-'),
    headerSafe(fields.workMode),
  ].filter((part) => part !== '');

  if (parts.length === 0) return 'New Job Application | VPD Technologies';

  const subject = parts.join(' - ');
  if (subject.length <= MAX_SUBJECT_LENGTH) return subject;

  // Name and position matter most to a recruiter scanning the inbox.
  return clamp([parts[0], parts[1]].filter(Boolean).join(' - '));
}
