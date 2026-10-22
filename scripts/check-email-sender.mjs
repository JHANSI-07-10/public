/**
 * Read-only check of the sender identity this app sends as.
 *
 * Answers one question: will recipients see a VPD address, and will their servers
 * believe it? Brevo accepts an unverified sender silently, so the API response is
 * not evidence of anything — the published DNS records are. Uses no mutating
 * endpoint, and never prints the API key or a full address.
 *
 *   cd public && node --env-file=.env scripts/check-email-sender.mjs
 *
 * DNS goes through Google's DNS-over-HTTPS endpoint rather than node:dns: this
 * machine refuses UDP/53 from Node (ECONNREFUSED) while the records do exist, and
 * a checker that reports "no SPF record" because it could not look one up is
 * worse than no checker. Only public domain names leave this script.
 *
 * Three states per check: OK, FAIL, SKIP (not readable here — never reported as a
 * failure, because a send-only API key and a blocked resolver both return empty
 * answers that look identical to a missing record).
 */
const senderEmail = process.env.BREVO_SENDER_EMAIL?.trim() ?? '';
const apiKey = process.env.BREVO_API_KEY?.trim() ?? '';
const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL?.trim() ?? '';

if (senderEmail === '') {
  console.error('BREVO_SENDER_EMAIL is not set — nothing is configured to check.');
  process.exit(1);
}

const senderDomain = senderEmail.split('@')[1] ?? '';
const receiverDomain = receiverEmail.split('@')[1] ?? senderDomain;
const mask = (email) => (email.includes('@') ? `${email.slice(0, 2)}***@${email.split('@')[1]}` : '***');

/** Brevo's own rewrite of an unauthenticated sender — never a VPD identity. */
const REWRITTEN = /@([-a-z0-9]+\.)?brevosend\.com$/i;

const results = [];
const record = (state, label, detail = '') => {
  results.push({ state, line: `${state.padEnd(4)} ${label}${detail ? ` — ${detail}` : ''}` });
};

/** Resolves TXT (or MX) records. Returns null when the lookup itself failed. */
const resolve = async (name, type) => {
  try {
    const response = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${type}`);
    const body = await response.json();
    // 0 = NOERROR (an empty Answer list means the record genuinely does not exist)
    // and 3 = NXDOMAIN are answers. Anything else is a resolver problem, not a
    // missing record, and must not be reported as one.
    if (body.Status !== 0 && body.Status !== 3) return null;
    return (body.Answer ?? []).map((answer) => answer.data.replace(/^"|"$/g, ''));
  } catch {
    return null;
  }
};

const get = async (path) => {
  if (apiKey === '') return { status: 0, body: '', error: 'BREVO_API_KEY is not set' };
  try {
    const response = await fetch(`https://api.brevo.com${path}`, {
      headers: { 'api-key': apiKey, accept: 'application/json' },
    });
    return { status: response.status, body: await response.text() };
  } catch (error) {
    return { status: 0, body: '', error: error.message };
  }
};

/** A route this API key cannot reach is unknown, not a configuration failure. */
const apiCheck = async (path, label, interpret) => {
  const response = await get(path);
  if (response.error !== undefined || response.status !== 200) {
    const why = response.error ?? `HTTP ${response.status}`;
    record('SKIP', label, `GET ${path} is not readable with this API key (${why}) — check the Brevo dashboard`);
    return;
  }
  let parsed;
  try {
    parsed = JSON.parse(response.body);
  } catch {
    record('SKIP', label, `GET ${path} returned a body that is not JSON`);
    return;
  }
  const { ok, detail } = interpret(parsed);
  record(ok ? 'OK' : 'FAIL', label, detail);
};

/** One TXT-record check, with the lookup failure kept distinct from a missing record. */
const txtCheck = async (name, label, pick, absentDetail) => {
  const values = await resolve(name, 'TXT');
  if (values === null) {
    record('SKIP', label, `could not resolve ${name} from here`);
    return undefined;
  }
  const value = pick(values);
  if (value === undefined) {
    record('FAIL', label, absentDetail);
    return undefined;
  }
  return value;
};

console.log(`Configured sender: ${mask(senderEmail)}\n`);

await apiCheck('/v3/senders', `${mask(senderEmail)} is registered as a Brevo sender`, (body) => {
  const list = body.senders ?? [];
  const match = list.find((s) => s.email?.toLowerCase() === senderEmail.toLowerCase());
  return { ok: Boolean(match), detail: match ? `display name "${match.name}"` : `${list.length} registered, none matching` };
});

await apiCheck('/v3/senders/domains', `${senderDomain} is authenticated in Brevo`, (body) => {
  const list = body.domains ?? [];
  const authed = list.find((d) => d.domain?.toLowerCase() === senderDomain.toLowerCase() && d.active);
  return {
    ok: Boolean(authed),
    detail: authed ? 'Brevo can DKIM-sign as this domain' : `${list.length} domain(s) on the account, none authenticated`,
  };
});

const spf = await txtCheck(
  senderDomain,
  'SPF authorises Brevo to send for the sender domain',
  (values) => values.find((v) => v.startsWith('v=spf1')),
  'no SPF record on the sender domain',
);
if (spf !== undefined) {
  const ok = /include:(spf\.)?(sendinblue|brevo)\.com/i.test(spf);
  record(ok ? 'OK' : 'FAIL', 'SPF includes a Brevo/SMTP relay', ok ? spf : `${spf} — Brevo is not listed, so SPF fails on every send`);
}

const dmarc = await txtCheck(
  `_dmarc.${senderDomain}`,
  'DMARC policy published for the sender domain',
  (values) => values.find((v) => v.startsWith('v=DMARC1')),
  'no DMARC record',
);
if (dmarc !== undefined && /p=none/i.test(dmarc)) {
  record('FAIL', 'DMARC policy is enforced', `${dmarc} — p=none only observes, it does not protect the domain`);
}

const dkimSelectors = ['default', 'mail', 's1', 's2', 'k1', 'k2', 'a', 'b', 'selector1', 'selector2'];
const dkimHits = [];
let dkimUnreadable = false;
for (const selector of dkimSelectors) {
  const values = await resolve(`${selector}._domainkey.${senderDomain}`, 'TXT');
  if (values === null) dkimUnreadable = true;
  for (const value of values ?? []) {
    if (value.includes('p=')) dkimHits.push(`${selector} ${value.slice(value.indexOf('p=')).slice(0, 24)}…`);
  }
}
if (dkimHits.length > 0) {
  record('OK', `DKIM key published for ${senderDomain}`, dkimHits.join(' | '));
} else if (dkimUnreadable) {
  record('SKIP', `DKIM key published for ${senderDomain}`, 'some selector lookups failed');
} else {
  record('FAIL', `DKIM key published for ${senderDomain}`, `none of the ${dkimSelectors.length} common selectors answered`);
}

const mx = await resolve(receiverDomain, 'MX');
if (mx === null) {
  record('SKIP', `admin inbox domain ${receiverDomain} can receive`, `could not resolve ${receiverDomain}`);
} else {
  record(mx.length > 0 ? 'OK' : 'FAIL', `admin inbox domain ${receiverDomain} can receive`, mx.map((r) => r.replace(/^\d+\s+/, '')).join(', ') || 'no MX record');
}

const rewritten = REWRITTEN.test(senderEmail);
record(rewritten ? 'FAIL' : 'OK', 'sender is not a Brevo rewrite address', rewritten ? 'readEmailConfig() refuses to send with it' : undefined);

console.log(results.map((r) => r.line).join('\n'));

const failures = results.filter((r) => r.state === 'FAIL').length;
const skipped = results.filter((r) => r.state === 'SKIP').length;
console.log(
  `\n${failures === 0 ? 'All readable checks passed.' : `${failures} check(s) failed.`} ` +
    (skipped > 0 ? `${skipped} could not be read from here and need the Brevo dashboard. ` : '') +
    `A 201 from POST /v3/smtp/email is not evidence of delivery: Brevo queues mail from an ` +
    `unauthorised sender and the recipient's server decides what happens to it.`,
);
