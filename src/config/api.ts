/**
 * Centralized API Configuration & Endpoints for VPD Technologies
 * Supports environment variable overrides for multi-stage deployments (dev/staging/prod)
 */

export const API_BASE_URL: string =
  (process.env.NEXT_PUBLIC_API_URL as string)?.replace(/\/$/, '') ||
  'https://vpd-technologies-pvt-ltd-backend.vercel.app/api';

export const API_ENDPOINTS = {
  services: `${API_BASE_URL}/services`,
  blogs: `${API_BASE_URL}/blogs`,
  testimonials: `${API_BASE_URL}/testimonials`,
  contact: `${API_BASE_URL}/contact`,
  adminLogin: `${API_BASE_URL}/admin/login`,
  adminDashboard: `${API_BASE_URL}/admin/dashboard`,
} as const;

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
}

export type EnquiryKind = 'contact' | 'consultation';

export interface CareerApplicationResult {
  success: boolean;
  message?: string;
  /** Field-level problems the server found, in applicant-safe wording. */
  errors?: string[];
  stored?: boolean;
  adminNotified?: boolean;
  userNotified?: boolean;
  duplicate?: boolean;
  data?: { submissionId?: string; timestamp?: string };
}

export interface EnquirySubmitResult {
  success: boolean;
  message?: string;
  stored?: boolean;
  adminNotified?: boolean;
  userNotified?: boolean;
  duplicate?: boolean;
  referenceId?: string;
}

/**
 * Submits an enquiry to this app's own server route, which stores it through the
 * backend API above and sends the Brevo notifications. Returns the per-step
 * outcome so the UI only claims success when the enquiry is actually captured.
 */
export async function submitEnquiry(
  kind: EnquiryKind,
  payload: ContactSubmissionPayload,
  referenceId: string,
  submittedAt: string
): Promise<EnquirySubmitResult> {
  const controller = new AbortController();
  // Server worst case is the 8s store plus two 8s email sends running in
  // parallel, so this has to stay well above 16s: abandoning the request early
  // shows a timeout for an enquiry the server goes on to capture and email,
  // which invites a resubmission and a duplicate enquiry.
  const timeoutId = setTimeout(() => controller.abort(), 45000);

  try {
    const response = await fetch(`/api/${kind}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, referenceId, submittedAt }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = (await response.json().catch(() => ({}))) as EnquirySubmitResult;

    if (!response.ok) {
      return {
        success: false,
        message:
          data.message ||
          (response.status === 429
            ? 'Too many requests. Please try again in a few minutes.'
            : 'We could not transmit your enquiry. Please try again or contact us directly.'),
      };
    }

    return { ...data, success: data.success === true };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const error = err as Error;
    return {
      success: false,
      message:
        error.name === 'AbortError'
          ? 'The request timed out. Please try again.'
          : 'We could not reach our servers. Please try again.',
    };
  }
}

/**
 * Submits a careers job application (multipart, resume included) to this app's
 * own server route, which stores it and sends the recruiter notification plus
 * the applicant confirmation through Brevo.
 */
export async function submitCareerApplication(
  form: FormData
): Promise<CareerApplicationResult> {
  const controller = new AbortController();
  // Server worst case is the store call plus the two emails, one of which
  // uploads the resume, so this has to stay above all of them: aborting early
  // shows a failure for an application the server goes on to capture.
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  try {
    const response = await fetch('/api/careers/apply', {
      method: 'POST',
      body: form,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = (await response.json().catch(() => ({}))) as CareerApplicationResult;

    if (!response.ok || data.success !== true) {
      return {
        ...data,
        success: false,
        message:
          data.message ||
          (response.status === 429
            ? 'Too many requests. Please try again in a few minutes.'
            : 'We could not submit your application. Please try again or email us directly.'),
      };
    }

    return data;
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const error = err as Error;
    return {
      success: false,
      message:
        error.name === 'AbortError'
          ? 'The request timed out. Your resume may be too large — please try again.'
          : 'We could not reach our servers. Please check your connection and try again.',
    };
  }
}

/**
 * Submits client inquiry to the live backend API with timeout and error handling
 */
export async function submitContactInquiry(
  payload: ContactSubmissionPayload
): Promise<{ success: boolean; message?: string; data?: unknown }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(API_ENDPOINTS.contact, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.error || `Server responded with status ${response.status}`,
      };
    }

    const data = await response.json().catch(() => ({}));
    return {
      success: true,
      data,
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const error = err as Error;
    return {
      success: false,
      message: error.name === 'AbortError' ? 'Request timed out' : error.message,
    };
  }
}
