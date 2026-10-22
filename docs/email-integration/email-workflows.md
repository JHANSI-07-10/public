# Email workflows

## Addressing

`sender.email` is always `BREVO_SENDER_EMAIL`, which must be an address verified
in the Brevo account. A submitter's address is only ever a recipient or a
validated Reply-To — never the sender (Brevo rejects unverified senders with a
4xx, and using a visitor's address would read as spoofing). `sender.name` is the
constant `VPD Technologies`, so the inbox still reads the brand even while the
verified sender is an interim address.

| Direction | `sender` | `to` | `replyTo` |
|---|---|---|---|
| Visitor confirmation (contact) | `VPD Technologies <BREVO_SENDER_EMAIL>` | the email the visitor typed | `VPD Technologies <CONTACT_RECEIVER_EMAIL>` |
| Visitor confirmation (quote / consultation) | same | the email the visitor typed | same |
| Applicant confirmation (careers) | same | the email the applicant typed | same |
| Admin notification (contact) | same | `CONTACT_RECEIVER_EMAIL` | `<submitter name>` `<submitter email>` |
| Admin notification (quote / consultation) | same | `CONTACT_RECEIVER_EMAIL` | `<submitter name>` `<submitter email>` |
| Recruiter notification (careers, resume attached) | same | `CONTACT_RECEIVER_EMAIL` | `<applicant name>` `<applicant email>` |

Reply-To is built in `provider/brevo-client.ts`: the address must pass
`isSendableEmail()`, and the display name is stripped of control characters and
clamped to 80 characters, so a form value can neither forge a header line nor
produce a blank Reply-To. An invalid Reply-To is dropped and logged, and the mail
still sends.

## Subjects

Admin subjects are built from submitted values in `templates/subjects.ts`; every
piece is normalized (control characters stripped, whitespace collapsed, total
length clamped to 120). Missing optional pieces drop out instead of leaving
`undefined` or a doubled separator, and a service field with nothing usable
becomes `General Inquiry`.

| Workflow | Admin subject | Confirmation subject (unchanged wording) |
|---|---|---|
| Contact | `New Contact - <Service Interest>` | `We've Received Your Enquiry \| VPD Technologies` |
| Get a Quote / Book consultation | `New Quotation Request - <Service Requested>` | `Your Consultation Request Has Been Received \| VPD Technologies` |
| Careers | `<Applicant Name> - <Applied Position> - <Experience> - <Applied Location>` | `We've Received Your Job Application \| VPD Technologies` |

Careers detail: the experience picker submits ranges such as `3 - 5 years`; the
inner ` - ` is closed up to `3-5 years` so the separator stays unambiguous, and
if the whole line would exceed 120 characters it falls back to
`Name - Position`.

Admin bodies carry a highlighted **Service Requested** row for contact and
quote/consultation. Customer confirmations keep their own labels (`Subject`,
`Service`) and are not touched by the admin subject work.

## Per-submission behaviour

Both pipelines do the same walk, and each step reports independently:

1. **Honeypot** — a filled `website` field is discarded with a fake `200` success
   so a bot does not adapt. Nothing is stored and no mail is sent.
2. **Validation** — required fields, address format, per-field length caps. A
   reference ID is reused when the client sends a valid one
   (`[A-Za-z0-9_-]{8,64}`), otherwise the server mints `VPD-CT-*` / `VPD-CS-*` /
   `VPD-APP-*`. Timestamps more than 24 h away from the server clock are replaced.
3. **Guard** (`workflows/guards.ts`, in-memory per instance) — 5 enquiry
   submissions per 10 minutes per connection, 4 applications per 10 minutes, and
   a 15-minute content fingerprint dedupe so a double-click cannot mail the same
   enquiry twice. 429 is returned when the window is exceeded.
4. **Store** — `submitContactInquiry()` posts to the marketing backend
   `${NEXT_PUBLIC_API_URL}/contact` (default
   `https://vpd-technologies-pvt-ltd-backend.vercel.app/api`). Careers
   applications go through the same endpoint because that service has no careers
   route yet: the stored record is a summary of the candidate's answers with a
   `Job application` marker, and the resume itself is never persisted — it only
   travels as an attachment on the recruiter copy.
5. **Admin notification** and **confirmation** are sent in parallel, so the
   route's worst case stays inside the browser's request budget.
6. **Outcome** — `accepted = stored || adminNotified`. A valid enquiry is never
   lost silently: if the store fails the admin mail is the record, and if both
   fail the caller gets a 502 with a "email us directly" message. `userNotified`
   failing alone does not mark the submission as rejected, and is logged.

Field caps (contact/consultation): name 120, email 160, phone 32, company 160,
service 200, preferred time 120, message 5000 characters. JSON bodies are capped
at 32 KB; the careers multipart request at 6 MB framing with a 4 MB resume.

## Resume handling (careers only)

- Magic-byte screening: `%PDF`, the docx/ZIP signature `PK\x03\x04`, or the OLE
  signature — a renamed executable is rejected before it reaches the provider.
- 4 MB ceiling, checked before the file is base64-encoded; Vercel's 4.5 MB body
  limit is the reason it is not larger.
- The filename is sanitized for the `Content-Disposition` header, and only the
  recruiter copy carries the attachment. The file is never uploaded to storage
  and never exposed at a URL.
- Sends with an attachment get a 20 s timeout instead of the 8 s used for
  text-only mail.

## Logo inside the mail

`templates/shell.ts` emits two sources for the same artwork: an MSO conditional
using `cid:vpd-logo` (Outlook's Word engine resolves inline parts but blocks
remote images) and an HTTPS `<img>` for every other client. The bytes behind the
cid part come from `assets/logo-asset.ts`, generated from `public/logo.png` at
400×200 so it renders at 200×100 on Retina screens. The artwork itself is never
recolored, cropped or redrawn.

Because the brand domain is currently parked at the host, the URL defaults to a
verified deployment path and can be overridden with `EMAIL_LOGO_URL`. Check it
from outside before deploying:

```bash
node scripts/check-email-logo-url.mjs
```
