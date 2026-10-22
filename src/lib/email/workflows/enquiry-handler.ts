import { NextRequest, NextResponse } from 'next/server';
import { clientIpFrom, processEnquiry, type EnquiryKind, type RawEnquiry } from './enquiry';

const MAX_BODY_BYTES = 32 * 1024;

async function readJson(req: NextRequest): Promise<RawEnquiry | null> {
  const text = await req.text().catch(() => '');
  if (text.length === 0 || text.length > MAX_BODY_BYTES) return null;
  try {
    const parsed = JSON.parse(text) as unknown;
    return parsed && typeof parsed === 'object' ? (parsed as RawEnquiry) : null;
  } catch {
    return null;
  }
}

/**
 * Shared POST handler for both enquiry forms. Responses carry only generic,
 * user-safe text: no exception messages, provider bodies, or env details.
 */
export function makeEnquiryHandler(kind: EnquiryKind) {
  return async function POST(req: NextRequest): Promise<NextResponse> {
    const raw = await readJson(req);
    if (!raw) {
      return NextResponse.json({ success: false, message: 'Invalid request payload.' }, { status: 400 });
    }

    const result = await processEnquiry(kind, raw, clientIpFrom(req.headers));

    if (result.kind === 'invalid') {
      return NextResponse.json(
        { success: false, message: result.errors.join(' '), errors: result.errors },
        { status: 400 }
      );
    }
    if (result.kind === 'limited') {
      return NextResponse.json(
        { success: false, message: 'Too many requests from this connection. Please try again later.' },
        { status: 429 }
      );
    }
    if (result.kind === 'discarded') {
      // Bot filled the honeypot: pretend success so it does not adapt.
      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json(
      { success: result.outcome.accepted, ...result.outcome },
      { status: result.outcome.accepted ? 200 : 502 }
    );
  };
}
