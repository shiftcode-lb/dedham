// Post-build sanity check: every sitemap <loc> has a prerendered file, the
// sitemap lists each route once, and every prerendered page has an H1.
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const locs = [...readFileSync(join(dist, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
let bad = 0;
const fail = (msg) => { bad += 1; console.error('FAIL', msg); };

if (new Set(locs).size !== locs.length) fail('duplicate sitemap entries');
for (const loc of locs) {
  const path = new URL(loc).pathname;
  if (!path.endsWith('/')) fail(`${loc} is not trailing-slash`);
  const file = join(dist, path, 'index.html');
  if (!existsSync(file)) { fail(`${loc} has no ${file}`); continue; }
  const html = readFileSync(file, 'utf8');
  if (!/<h1[\s>]/.test(html)) fail(`${loc} has no <h1>`);
  if (!html.includes(`href="${loc}"`) || !/rel="canonical"/.test(html)) fail(`${loc} canonical mismatch`);
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(json); } catch { fail(`${loc} has invalid JSON-LD`); }
  }
}
if (!existsSync(join(dist, '404.html'))) fail('missing 404.html');
console.log(`check-dist: ${locs.length} sitemap URLs checked, ${bad} problem(s)`);
process.exit(bad ? 1 : 0);
