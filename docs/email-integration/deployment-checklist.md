# Deployment checklist

Ordered, because most failures are the earlier steps silently unfinished.
"Your turn" = the Brevo / Hostinger / Vercel consoles, which only you can open;
"my turn" = code and commands in this repository.

## A. Local, before anything goes to production

1. **Your turn — this is the current blocker.** `info@vpdtechnologiespvtltd.com`
   is **not a verified sender** and the domain is **not authenticated** in Brevo.
   Verified today (read-only probes): `GET /v3/senders` returns only the owner's
   Gmail (registered as "Edunova Global Academy" and "CoralSwift Technologies"),
   `GET /v3/senders/domains` returns `{"domains":[],"count":0}`, DNS shows
   `v=spf1 include:_spf.mail.hostinger.com ~all` (no Brevo include), no
   `_domainkey` DKIM record, and `_dmarc` = `p=none`.
   **Correction to an earlier version of this checklist:** sending as an
   unverified address is *not* refused. `POST /v3/smtp/email` with
   `sender.email = info@vpdtechnologiespvtltd.com` returned `201` and a
   `messageId`, so the mail left the app and entered Brevo's queue. What fails is
   authentication: the receiving server sees a message claiming a domain whose SPF
   does not authorise Brevo and with no aligned DKIM signature, so it is treated
   as spoofed. Admin notifications are the worst case — they arrive at the very
   domain they claim to come from, which is the pattern spam filters punish
   hardest. `BREVO_SENDER_EMAIL` is therefore set back to the verified Gmail for
   now; mail flows, but the visible From is Brevo's rewrite. Do these in order to
   get both:
   1. Brevo → *Senders, Domains & Dedicated IPs* → **Domains** → *Add a domain*:
      `vpdtechnologiespvtltd.com`. Brevo replies with a DKIM CNAME, an SPF value
      and a host-verification record.
   2. **Your turn** — Hostinger → *DNS Zone Editor* for that domain: add the DKIM
      CNAME, then **merge** Brevo's SPF into the existing record rather than
      replacing it. Today it is `v=spf1 include:_spf.mail.hostinger.com ~all`, so
      the merged form is
      `v=spf1 include:_spf.mail.hostinger.com include:spf.sendinblue.com ~all`
      (use exactly the value Brevo shows you). Leave MX on Hostinger untouched.
   3. Back in Brevo → *Verify* the domain until it reports authenticated, then
      *Senders* → *Add sender*: name `VPD Technologies`, email
      `info@vpdtechnologiespvtltd.com`, and click the confirmation link that
      arrives in that Hostinger mailbox.
      Adding the sender **without** the authenticated domain is what produced the
      `…@11622325.brevosend.com` display: Brevo rewrites the From address to its
      own sending domain whenever it cannot DKIM-sign as yours. The address is
      verified, the domain authentication is what makes it display correctly.
   4. **my turn** — as soon as `GET /v3/senders` lists `info@vpdtechnologiespvtltd.com`
      *and* the domain reports authenticated, set `BREVO_SENDER_EMAIL` back to it,
      restart the dev server, send a real test from each form, then confirm in the
      received message that the sender line reads exactly
      `VPD Technologies <info@vpdtechnologiespvtltd.com>` and that it lands in the
      inbox rather than spam.
2. **Your turn** — create `public/.env` with the five names from
   `.env.example` and real values. Never write values into `.env.example`.
3. **my turn** — restart the dev server so the file is read (Next.js loads env
   once at boot). Editing `.env` while it runs changes nothing. Never kill or
   restart a server you did not start without asking.
4. **my turn** — `npm run lint && npm test` must be clean, then
   `NEXT_DIST_DIR=.next-build npx next build` to prove the serverless bundle
   compiles while the dev server keeps running.
5. **my turn** — `node scripts/check-email-logo-url.mjs` must print `OK` with an
   `image/png` content type. A `text/html` answer means the domain is parked and
   the logo will be a broken image in every mail.
   `node --env-file=.env scripts/check-email-sender.mjs` does the same for step 1:
   it reads the configured sender back from Brevo and checks the sender domain's
   published SPF, DKIM, DMARC and the admin inbox's MX, printing OK / FAIL / SKIP.
   Run it before and after the DNS work — it is the only check here that reflects
   what a receiving server actually sees.
6. **Your turn** — submit each real form once: contact, consultation (Get a
   Quote), careers with a resume. Check both the inbox and the address you typed,
   and reply to the admin copy to confirm it opens the submitter's mailbox.
7. **Your turn** — delete those test rows afterwards: the submissions land in the
   marketing backend's contact store, and diagnostic rows should not stay in
   production data.

## B. Production on Vercel

8. **Your turn** — Vercel → project → *Settings → Environment Variables*. Add all
   five in the *Other* type, for Production **and** Preview. Do not add them as
   *Environmental Variable for Frameworks* frontend entries, and never as
   `NEXT_PUBLIC_BREVO_API_KEY`.
9. **Your turn** — finish step 1 (domain authentication + sender verification)
   first. It is one account-wide change, so production inherits it; nothing else
   in this section can succeed while `GET /v3/senders/domains` returns zero
   domains. Placement is also still weak: DMARC is `p=none` and no DKIM selector
   resolves for the brand domain, which is what puts authenticated-looking mail
   in spam.
10. **Your turn** — set `BREVO_SENDER_EMAIL=info@vpdtechnologiespvtltd.com` in the
    Vercel project too (local `.env` is already on that value), then redeploy so
    the runtime picks it up.
11. **my turn** — after the redeploy, send one live test per workflow and read the
    received message: the sender line must be exactly
    `VPD Technologies <info@vpdtechnologiespvtltd.com>`, with no
    `brevosend.com` in it. Anything else means the domain is still not
    authenticated, and the code will keep refusing to send rather than fall back.
12. **Your turn (placement follow-up)** — once SPF, DKIM and DMARC align, move
    DMARC from `p=none` to `p=quarantine` and watch the reports for a week before
    `p=reject`.

## C. Logo hosting

13. The logo needs a stable, unauthenticated HTTPS URL reachable from a mail
    client. Options, best first:
    - the brand domain serving `/logo.png` once DNS is un-parked (then set
      `EMAIL_LOGO_URL` and drop the deployment fallback);
    - a current Vercel deployment URL, which must be re-checked after a project
      rename — `check-email-logo-url.mjs` exists for exactly that.
14. `public/email-logo.png` and `src/lib/email/assets/logo-asset.ts` come from
    `node scripts/generate-email-logo.mjs`. Re-run it whenever `public/logo.png`
    changes; it only downscales and optimises, never redraws.

## D. Rollback

Removing or blanking `BREVO_API_KEY`, `BREVO_SENDER_EMAIL` or
`CONTACT_RECEIVER_EMAIL` disables sending without breaking the forms: submissions
still store, the response still reports which leg failed, and nothing is lost
silently. That is the safe way to stop mail in an emergency.
