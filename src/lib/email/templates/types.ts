/**
 * The input contract for every transactional email. Workflow modules build one
 * of these per submission and hand it to a template; the templates never read
 * request data directly.
 */

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
