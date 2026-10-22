# Troubleshooting

Work the chain in order — a key that is present proves nothing about the sender,
and a verified sender proves nothing about placement:

`variable loaded by the running process` → `server restarted since the edit` →
`Brevo accepts this sender` → `recipient mailbox exists` → `DNS places the mail`
→ `template renders the asset`.

## "Nothing arrives at all"

| Check | How | Meaning |
|---|---|---|
| Which file does the runtime load? | `node --env-file=.env -e "…"` from [environment-variables.md](environment-variables.md), and confirm no `.env.local` shadows it with empty values | `.env.local` wins over `.env` |
| Did the server restart after the edit? | look for `[enquiry] email not configured, missing …` in the dev log | env is read once at boot |
| Does Brevo accept the sender? | `GET https://api.brevo.com/v3/senders` with the key in a shell variable | an unverified `BREVO_SENDER_EMAIL` makes **every** send fail |
| Is the route even hit? | network tab: `POST /api/contact` → 200 / 400 / 429 / 502 | 429 = rate window, 400 = validation |

Server log lines, and what each one costs you:

- `[brevo] send rejected { status, to, subject, providerMessage }` — Brevo refused
  the send. `providerMessage` carries the reason; the usual one is an unverified
  sender ("some recipients are not acceptable") or a wrong key (4xx on
  `api-key`). The address is masked, the key never appears.
- `[brevo] send failed locally { cause: 'timeout' | 'network' }` — the request
  never completed. 8 s for text mail, 20 s when a resume is attached.
- `[brevo] accepted without a messageId` — Brevo answered 2xx but gave no
  message id, so there is no evidence the send was queued. Treated as a failure.
- `[brevo] send accepted { to, subject, messageId }` — the only positive signal
  available. A messageId means Brevo took it, **not** that it reached the inbox.
- `[brevo] reply-to dropped: address failed validation` — the admin copy went out
  without a Reply-To, so answering it will not reach the submitter.
- `[enquiry] backend store failed` / `[careers] backend store failed` — the
  marketing backend refused the submission; if the admin mail still succeeded the
  enquiry is in the mailbox only.
- `[enquiry] processed` / `[careers] processed` — the per-leg scoreboard:
  `stored`, `adminNotified`, `userNotified`.

## "The visitor's copy arrives but the admin copy does not"

`CONTACT_RECEIVER_EMAIL` is a recipient, not a sender, so it works before the
domain is authenticated — but only if the mailbox exists. Confirm in Hostinger →
*Emails* that `info@vpdtechnologiespvtltd.com` is a real mailbox, then check its
Spam folder. Two addresses appear in this project's content
(`info@vpdtechnologies.com` and `info@vpdtechnologiespvtltd.com`); verify which
one the team actually watches before trusting the inbox.

## "Nothing arrives but the logs say accepted"

Placement, not code. Start with
`node --env-file=.env scripts/check-email-sender.mjs`, which reads items 1–3 back
from public DNS and names the ones that fail:

1. SPF must include Brevo **and** Hostinger, e.g.
   `v=spf1 include:_spf.mail.hostinger.com include:spf.sendinblue.com ~all` —
   merging, never replacing.
2. Add the DKIM CNAME Brevo gives you for the authenticated domain.
3. DMARC is currently `p=none`; once SPF and DKIM align, move to `p=quarantine`.
4. Send a test to a Gmail and a corporate address, and inspect
   *Show original* for `spf=pass`, `dkim=pass` and `dmarc=pass`. Alignment, not
   just passes, is what the receiving system checks.

## "The logo is a broken image / wrong size"

- `node scripts/check-email-logo-url.mjs` — must report `image/png`. `text/html`
  means the domain is parked and every non-Outlook client shows a broken image.
- Outlook gets `cid:vpd-logo`; other clients get the HTTPS URL. If the cid part
  is missing, `src/lib/email/assets/logo-asset.ts` was not regenerated —
  `node scripts/generate-email-logo.mjs`.
- Do not "fix" a distorted logo by editing `public/logo.png`. The generator only
  downscales to 400×200 for a 200×100 render box and optimises the PNG; colours,
  transparency and aspect ratio are preserved, and nothing redraws the artwork.

## "Test suites behave oddly"

- A test that records more Brevo calls than expected, or a call to a URL other
  than `https://api.brevo.com/v3/smtp/email`, means `vi.mock()` in
  `tests/email/*.test.ts` no longer points at `../../src/config/api` — the real
  backend client ran instead of the mock. The global `fetch` is stubbed, so no
  request leaves the machine, but the assertion counts drift.
- The store guard is module-level in-memory state. Anything that changes the
  guard's shape needs `vi.resetModules()` in the test that exercises it.

## "A submission disappeared"

Three ways a request produces no mail by design, each returning a success-shaped
response so a bot cannot learn from it:

- honeypot filled (`website` non-empty) → `200 { success: true }`, nothing stored;
- duplicate within 15 minutes (same reference or same sender + service + message
  prefix) → `200` with `duplicate: true`, no second mail;
- over the window (5 enquiries or 4 applications per 10 minutes per connection) →
  `429`.

If a real visitor reports a lost enquiry, ask for the reference shown in their
confirmation and grep the server log for it — `… processed { referenceId, stored,
adminNotified, userNotified }` says exactly which leg failed.
