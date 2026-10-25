// Runs after `vite build`: writes sitemap.xml from the page data and emits a
// per-route index.html with that route's own <title>, description,
// canonical and Open Graph tags. The app is a client-rendered SPA, so
// without this every URL initially serves the homepage's head to any
// crawler or link preview that doesn't execute JavaScript. Static files win
// over the SPA rewrite on Vercel/Netlify/Apache, so these are served as-is
// and React still takes over in the browser.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { hubPages, landingPages } from '../src/data/landingPages.js';

const SITE_URL = 'https://dedhamairporttaxi.com';
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const template = readFileSync(join(dist, 'index.html'), 'utf8');
const today = new Date().toISOString().slice(0, 10);

// Hosts that rewrite extensionless paths to the SPA shell only serve the
// prerendered head at the trailing-slash URL, so that is the canonical form.
const slashed = (path) => (path.endsWith('/') ? path : `${path}/`);

const escape = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const staticPages = [
  ['/', '1.0', 'monthly'],
  ['/about', '0.8', 'monthly'],
  ['/services', '0.8', 'monthly'],
  ['/contact', '0.9', 'monthly'],
  ['/safety', '0.5', 'yearly'],
  ['/terms', '0.3', 'yearly'],
];
const hubs = hubPages.map((p) => [p.path, '0.8', 'monthly']);
const landing = landingPages.map((p) => [p.path, p.type === 'town' ? '0.8' : '0.7', 'monthly']);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPages, ...hubs, ...landing]
  .map(
    ([path, priority, changefreq]) => `  <url>
    <loc>${SITE_URL}${slashed(path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);

function setHead(html, page) {
  const title = escape(page.title);
  const description = escape(page.description);
  const url = `${SITE_URL}${slashed(page.path)}`;
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(property="og:title"\s+content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(property="og:description"\s+content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(property="og:url"\s+content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(name="twitter:title"\s+content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(name="twitter:description"\s+content=")[^"]*(")/, `$1${description}$2`);
}

for (const page of [...hubPages, ...landingPages]) {
  const dir = join(dist, page.path);
  mkdirSync(dir, { recursive: true });
  const html = setHead(template, page);
  writeFileSync(join(dir, 'index.html'), html);
  // Also emit /<route>.html: hosts that rewrite every extensionless path to
  // the SPA shell (the catch-all in public/_redirects) still serve this
  // file for the canonical no-trailing-slash URL.
  writeFileSync(join(dist, `${page.path}.html`), html);
}

console.log(`postbuild: sitemap + ${hubPages.length + landingPages.length} prerendered heads`);
