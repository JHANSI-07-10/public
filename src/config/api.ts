/**
 * Centralized API Configuration & Endpoints for VPD Technologies
 * Supports environment variable overrides for multi-stage deployments (dev/staging/prod)
 */

export const API_BASE_URL: string =
  (process.env.NEXT_PUBLIC_API_URL as string)?.replace(/\/$/, '') ||
  'https://vpd-technologies-pvt-ltd-backend.vercel.app/api';

export const API_ENDPOINTS = {
  services: `${API_BASE_URL}/services`,
  portfolio: `${API_BASE_URL}/portfolio`,
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
  service: string;
  message: string;
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
