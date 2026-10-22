# Folder structure

## How the layers map

`src/lib/email/` is split by responsibility, not by form. A dependency only ever
points downward: a workflow may use the provider and the templates, the provider
may reuse the header-safety helper from `templates/subjects.ts`, and neither
template nor provider imports a workflow.

| Suggested (Python-style) layer | This repository | Why |
|---|---|---|
| `app/services/email/brevo_client.py` | `src/lib/email/provider/brevo-client.ts` | Transport only: payload shape, timeouts, outcome |
| `app/services/email/sender_config.py` | `src/lib/email/provider/sender-config.ts` | Env reading, sender/inbox identity, address policy |
| `app/services/email/email_service.py` | `src/lib/email/workflows/*.ts` | Per-form pipelines; Next route handlers are the "service" entrypoints |
| `app/templates/emails/admin/*.html` | `src/lib/email/templates/admin-notifications.ts` | Templates stay TypeScript functions, not files read at runtime |
| `app/templates/emails/customer/*.html` | `src/lib/email/templates/customer-confirmations.ts` | Same split by audience |
| `app/templates/emails/partials/*` | `src/lib/email/templates/shell.ts` | Header band, footer block, table primitives, escaping |
| `tests/email/*.py` | `tests/email/*.test.ts` | Vitest, Brevo and the store backend always mocked |

Templates are **not** `.html` files: Next.js on Vercel bundles module graph
dependencies, and a runtime `readFileSync` of a template directory is a classic
missing-asset failure in serverless. Building the HTML in a function keeps the
bundle self-contained, which is why the file extension stayed `.ts`.

## The tree

```text
public/
├── app/api/
│   ├── contact/route.ts             POST → makeEnquiryHandler('contact')
│   ├── consultation/route.ts        POST → makeEnquiryHandler('consultation')
│   └── careers/apply/route.ts       POST → makeCareerApplicationHandler()
├── src/lib/email/
│   ├── assets/
│   │   └── logo-asset.ts            generated: base64 logo, cid, render size
│   ├── provider/
│   │   ├── sender-config.ts         env config, maskEmail, isSendableEmail
│   │   └── brevo-client.ts          POST https://api.brevo.com/v3/smtp/email
│   ├── templates/
│   │   ├── shell.ts                 palette, logo band, footer, detailRows, escapeHtml
│   │   ├── admin-notifications.ts   contact / consultation / careers internal copies
│   │   ├── customer-confirmations.ts visitor + applicant acknowledgements
│   │   ├── subjects.ts              admin subject formats, header-safe normalization
│   │   └── types.ts                 EnquiryEmailData, CareerApplicationEmailData
│   └── workflows/
│       ├── enquiry.ts               contact + consultation pipeline
│       ├── enquiry-handler.ts       HTTP contract, both enquiry routes share it
│       ├── careers.ts               application pipeline, resume screening
│       ├── careers-handler.ts       multipart HTTP contract
│       └── guards.ts                in-memory rate limit + content dedupe
├── public/
│   ├── logo.png                     source artwork (never edited by scripts)
│   └── email-logo.png               copy produced by generate-email-logo.mjs
├── scripts/
│   ├── generate-email-logo.mjs      writes assets/logo-asset.ts + public/email-logo.png
│   └── check-email-logo-url.mjs     proves the HTTPS logo URL before deploy
├── tests/email/
│   ├── enquiry-email.test.ts
│   ├── careers-email.test.ts
│   ├── admin-subjects.test.ts
│   ├── email-addressing.test.ts     sender / recipient / Reply-To for both directions
│   └── email-logo.test.ts
├── docs/email-integration/          this directory
├── .env                             real values, git-ignored, never committed
└── .env.example                     names + comments, empty values, tracked
```

## Deliberately not moved

- `src/config/api.ts` — the shared site-wide backend client. The email workflows
  import `submitContactInquiry` from it; it is not email-only code.
- `src/components/`, `src/views/` — the forms only post JSON/multipart; no email
  logic lives in the UI.
- `_archive/` — logo research intermediates from earlier work, referenced by
  nothing at runtime.
- The FastAPI project outside this repository (`Manu/VPD_/vpd`) — it is a
  separate service on Render and sends no website mail.

## Adding a new form

1. Add a `kind` to `workflows/enquiry.ts` if the pipeline shape matches (validate
   → store → notify), otherwise add a sibling module in `workflows/`.
2. Add the admin copy to `templates/admin-notifications.ts`, the visitor copy to
   `templates/customer-confirmations.ts`, and the subject to `templates/subjects.ts`.
3. Add a route under `app/api/<name>/route.ts` that delegates to a handler in
   `workflows/`.
4. Add a mocked test in `tests/email/` asserting sender, recipient, Reply-To and
   subject, and reuse `provider/sender-config.ts` for every address decision.
