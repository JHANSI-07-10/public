/**
 * Verifies that the logo URL the emails reference is actually reachable the way
 * a mail client will reach it: from outside, over HTTPS, with no authentication,
 * and serving image bytes rather than an HTML page.
 *
 *   node scripts/check-email-logo-url.mjs [url]
 *
 * With no argument it checks the default baked into src/lib/email/templates.ts,
 * so it also catches a stale deployment URL after a project rename.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const templates = readFileSync(join(ROOT, 'src', 'lib', 'email', 'templates.ts'), 'utf8');
const baked = templates.match(/https:\/\/[^'"]+\/logo\.png/)?.[0];

const url = process.argv[2] ?? baked;
if (!url) {
  console.error('No logo URL found in src/lib/email/templates.ts and none was passed.');
  process.exit(1);
}

const failures = [];
if (!url.startsWith('https://')) failures.push('is not an absolute HTTPS URL');
if (/localhost|127\.0\.0\.1|0\.0\.0\.0|\.local/.test(url)) failures.push('points at a development host');

let response;
try {
  response = await fetch(url, {
    headers: { accept: 'image/*', 'user-agent': 'VPD-email-logo-check' },
    redirect: 'follow',
  });
} catch (error) {
  console.error(`FAIL ${url} — ${error.message}`);
  process.exit(1);
}

if (!response.ok) failures.push(`responded ${response.status} ${response.statusText}`);

const contentType = response.headers.get('content-type') ?? '';
if (!/^image\/(png|jpeg|webp|gif)/i.test(contentType)) {
  failures.push(`serves "${contentType || 'no content-type'}" instead of an image`);
}

const bytes = await response.arrayBuffer();
if (bytes.byteLength === 0) failures.push('returned an empty body');

const signature = Buffer.from(new Uint8Array(bytes, 0, 8)).toString('hex');
if (!signature.startsWith('89504e47')) failures.push(`is not a PNG file (starts with ${signature.slice(0, 8)})`);

if (failures.length) {
  console.error(`FAIL ${url} — ${failures.join('; ')}`);
  console.error('Email clients will show a broken or missing logo. Publish the asset and re-run.');
  process.exit(1);
}

console.log(
  `OK   ${url} — ${contentType}, ${(bytes.byteLength / 1024).toFixed(1)} KB, ` +
    `cache: ${response.headers.get('cache-control') ?? 'unset'}`
);
