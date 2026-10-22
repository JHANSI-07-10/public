import { NextRequest, NextResponse } from 'next/server';
import { clientIpFrom } from './enquiry';
import { processCareerApplication, type RawCareerApplication } from './careers';

/** Upload plus multipart framing. */
const MAX_REQUEST_BYTES = 6 * 1024 * 1024;

const TEXT_FIELDS = [
  'position',
  'workMode',
  'fullName',
  'email',
  'phone',
  'currentLocation',
  'totalExperience',
  'currentCompany',
  'currentDesignation',
  'keySkills',
  'currentCtc',
  'expectedCtc',
  'noticePeriod',
  'highestQualification',
  'college',
  'yearOfPassing',
  'linkedinUrl',
  'portfolioUrl',
  'hearAboutUs',
  'referralName',
  'coverNote',
  'consent',
  'referenceId',
  'submittedAt',
  'website',
] as const;

/**
 * Multipart sibling of the enquiry handler. Responses carry only applicant-safe
 * text: no provider bodies, env details, or candidate data belonging to someone
 * else.
 */
export function makeCareerApplicationHandler() {
  return async function POST(req: NextRequest): Promise<NextResponse> {
    const declaredSize = Number(req.headers.get('content-length') ?? '0');
    if (declaredSize > MAX_REQUEST_BYTES) {
      return NextResponse.json(
        { success: false, message: 'Your resume is too large to submit. Please attach a smaller file.' },
        { status: 413 }
      );
    }

    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid request payload. Please resubmit your application.' },
        { status: 400 }
      );
    }

    const raw: RawCareerApplication = {};
    for (const field of TEXT_FIELDS) {
      (raw as Record<string, unknown>)[field] = form.get(field);
    }

    const resume = form.get('resume');
    raw.resume = typeof resume === 'string' ? null : resume;

    const result = await processCareerApplication(raw, clientIpFrom(req.headers));

    if (result.kind === 'invalid') {
      return NextResponse.json(
        {
          success: false,
          message: 'Please review the highlighted fields before submitting.',
          errors: result.errors,
        },
        { status: 400 }
      );
    }
    if (result.kind === 'limited') {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many applications from this connection. Please try again later.',
        },
        { status: 429 }
      );
    }
    if (result.kind === 'discarded') {
      // Bot filled the honeypot: pretend success so it does not adapt.
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const { outcome } = result;

    return NextResponse.json(
      {
        ...outcome,
        success: outcome.accepted,
        message: outcome.accepted
          ? "Thanks, we've received your application. Our team will contact you if your profile matches."
          : outcome.message,
        data: {
          submissionId: outcome.referenceId,
          timestamp: new Date().toISOString(),
        },
      },
      { status: outcome.accepted ? 200 : 502 }
    );
  };
}
