# Environment variables

Five variables drive the email integration. All of them are **server-side only**.
`readEmailConfig()` in `src/lib/email/provider/sender-config.ts` is the only
reader, and it reports missing variables by name — never by value.

| Variable | Purpose | Required | Where it must be set |
|---|---|---|---|
| `BREVO_API_KEY` | Authenticates `POST /v3/smtp/email` | Yes | `.env` locally, Vercel **Project Settings → Environment Variables → Other** (Production + Preview + Development) |
| `BREVO_SENDER_EMAIL` | The verified Brevo sender used as `sender.email` on every email. Must be a real VPD address — `readEmailConfig()` refuses a `*.brevosend.com` value, because that is Brevo's rewrite of an unauthenticated sender and is never an acceptable fallback | Yes | same |
| `CONTACT_RECEIVER_EMAIL` | The VPD inbox that receives all three admin notifications | Yes | same |
| `SITE_URL` | Origin used in the email footer link | No — falls back to the published domain | same |
| `EMAIL_LOGO_URL` | Absolute HTTPS URL of the logo that mail clients fetch | No — falls back to the currently verified deployment URL | same |

## Rules

1. **Never prefix any of these with `NEXT_PUBLIC_`.** A `NEXT_PUBLIC_BREVO_API_KEY`
   would be inlined into the browser bundle and is then public to anyone who opens
   DevTools. The only `NEXT_PUBLIC_*` variable the site uses is
   `NEXT_PUBLIC_API_URL`, which is the already-public base URL of the marketing
   backend and has nothing to do with Brevo.
2. **Never put a real value in `.env.example`.** It is git-tracked. It documents
   names and empty values only.
3. **Rotate a key the moment it has been pasted anywhere it should not have been**
   — chat, a screenshot, a tracked file, a log. A key that appeared in a
   committed file stays compromised after you delete the line, because Git keeps
   the history.
4. Environment files are read **once, when Next.js boots**. Editing `.env` does
   nothing until the dev server is restarted, which is the single most common
   cause of "I set the key and still no mail".
5. Loading precedence is `.env.local` > `.env`. If both exist and one holds an
   empty value, the file that wins is the one that matters — keep exactly one of
   them populated.

## Local file layout

```dotenv
# public/.env  (git-ignored)
BREVO_API_KEY=<paste the key here, never commit it>
BREVO_SENDER_EMAIL=<a sender address already verified in the Brevo account>
CONTACT_RECEIVER_EMAIL=info@vpdtechnologiespvtltd.com
SITE_URL=https://www.vpdtechnologiespvtltd.com
EMAIL_LOGO_URL=https://<deployment-host>/logo.png
```

`public/.env.example` mirrors these names with comments and no values.

## Verifying without leaking secrets

```bash
# Which variables does the app see? Prints names and lengths, never values.
# Node 20+ reads the file directly; no dotenv dependency is needed.
cd public && node --env-file=.env -e \
  "['BREVO_API_KEY','BREVO_SENDER_EMAIL','CONTACT_RECEIVER_EMAIL','SITE_URL','EMAIL_LOGO_URL'] \
  .forEach(k => console.log(k.padEnd(24), process.env[k] ? 'set ('+process.env[k].length+' chars)' : 'MISSING'))"
```

```bash
# Does Brevo accept this sender? Read-only, no mail sent. Replace the key with a
# shell variable so it never appears in your shell history or in this transcript.
read -rs KEY && curl -s -o /dev/null -w '%{http_code}\n' \
  -H "api-key: $KEY" https://api.brevo.com/v3/senders
```

`200` means the key works. The response body lists the verified senders — the
address in `BREVO_SENDER_EMAIL` should be one of them. It is **not** a sufficient
condition: Brevo accepted an unverified sender with `201` and a `messageId`, and
the mail was then treated as spoofed by the receiver because the domain had no
aligned DKIM signature and an SPF record that does not authorise Brevo. Check
`GET /v3/senders/domains` too — an empty list means the From address cannot be
trusted no matter which sender is configured. See
`deployment-checklist.md` step 1 for the exact records.
