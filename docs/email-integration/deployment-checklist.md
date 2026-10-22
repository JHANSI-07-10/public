# Deployment checklist

Ordered, because most failures are the earlier steps silently unfinished.
"Your turn" = the Brevo / Hostinger / Vercel consoles, which only you can open;
"my turn" = code and commands in this repository.

## A. Local, before anything goes to production

1. **Your turn** — confirm one verified sender exists in Brevo:
   Brevo → *Senders, Domains & Dedicated IPs* → *Senders*. The list must contain
   the address you intend to put in `BREVO_SENDER_EMAIL`. Until the brand domain
   is authenticated, the only verified sender is the owner's Gmail address, which
   is why the interim configuration sends from Gmail with the display name
   `VPD Technologies`.
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
9. **Your turn** — authenticate the brand domain so `info@vpdtechnologiespvtltd.com`
   can send: Brevo → *Senders, Domains & Dedicated IPs* → *Domains* → add
   `vpdtechnologiespvtltd.com`, then merge the returned SPF value into the
   Hostinger DNS record and add the DKIM CNAME. Today the SPF is
   `v=spf1 include:_spf.mail.hostinger.com ~all` with no Brevo include, DMARC is
   `p=none`, and no DKIM selector resolves — mail leaves the account but is weakly
   authenticated, which is what lands it in spam.
10. **my turn** — once the sender is verified, change one line in both places:
    `BREVO_SENDER_EMAIL=info@vpdtechnologiespvtltd.com`.
11. **Your turn** — redeploy so the new env is baked into the runtime, then repeat
    step 6 against the production URL.
12. **Your turn (optional, placement)** — after DMARC is at `p=quarantine` or
    `p=reject` and DKIM aligns, remove the interim Gmail sender entirely.

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
