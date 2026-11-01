// Runs after `vite build` and the SSR build (see package.json "build").
// Renders every route with the real React app (src/entry-server.jsx) into
// dist/<route>/index.html, so crawlers and link previews get the full page
// text, headings, links, head tags and JSON-LD without running JavaScript;
// the browser then hydrates the same markup. Also writes sitemap.xml and
// dist/404.html from the same route list so none of them can drift.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { hubPages, landingPages } from '../src/data/landingPages.js';
import { staticPages } from '../src/data/sitePages.js';

const SITE_URL = 'https://dedhamairporttaxi.com';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const serverDir = join(root, 'dist-server');
const { render } = await import(pathToFileURL(join(serverDir, 'entry-server.js')).href);
const template = readFileSync(join(dist, 'index.html'), 'utf8');
const today = new Date().toISOString().slice(0, 10);

// Canonicals, sitemap entries and internal links all use the trailing-slash
// form, which is the only form the host serves with a 200.
const slashed = (path) => (path.endsWith('/') ? path : `${path}/`);

const escape = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const pages = [
  ...staticPages,
  ...hubPages.map((p) => ({ path: p.path, priority: '0.8', changefreq: 'monthly' })),
  ...landingPages.map((p) => ({
    path: p.path,
    priority: p.type === 'town' ? '0.8' : '0.7',
    changefreq: 'monthly',
  })),
];

function setHead(html, { title, description, path, noindex }) {
  const t = escape(title);
  const d = escape(description);
  const url = `${SITE_URL}${slashed(path)}`;
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(property="og:title"\s+content=")[^"]*(")/, `$1${t}$2`)
    .replace(/(property="og:description"\s+content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(property="og:url"\s+content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(name="twitter:title"\s+content=")[^"]*(")/, `$1${t}$2`)
    .replace(/(name="twitter:description"\s+content=")[^"]*(")/, `$1${d}$2`);
  if (noindex) {
    out = out.replace(/(<meta\s+name="robots"\s+content=")[^"]*(")/, '$1noindex, follow$2');
  }
  return out;
}

const schemaTags = (schemas) =>
  schemas
    .map(
      (item) =>
        // "<" is escaped so no schema string can close the script tag early.
        `<script type="application/ld+json" data-prerendered>${JSON.stringify(item).replace(/</g, '\u003c')}</script>`,
    )
    .join('\n    ');

function inject(html, rendered) {
  let out = html.replace('<div id="root"></div>', () => `<div id="root">${rendered.html}</div>`);
  if (rendered.schemas.length > 0) {
    out = out.replace('</head>', () => `${schemaTags(rendered.schemas)}\n  </head>`);
  }
  return out;
}

for (const page of pages) {
  const rendered = await render(slashed(page.path));
  if (!rendered.meta) throw new Error(`prerender: ${page.path} reported no PageMeta`);
  const html = inject(setHead(template, rendered.meta), rendered);
  const isHome = page.path === '/';
  const dir = isHome ? dist : join(dist, page.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
}

// Unknown URLs: the host serves this file with a real 404 status.
const notFound = await render('/page-not-found/');
const notFoundHtml = inject(template, notFound)
  .replace(/<title>[\s\S]*?<\/title>/, '<title>Page Not Found | Dedham Airport Taxi &amp; Livery</title>')
  .replace(/<link\s+rel="canonical"[^>]*>\s*/, '')
  .replace(/(<meta\s+name="robots"\s+content=")[^"]*(")/, '$1noindex, follow$2');
writeFileSync(join(dist, '404.html'), notFoundHtml);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .filter((p) => p.index !== false)
  .map(
    (p) => `  <url>
    <loc>${SITE_URL}${slashed(p.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);

rmSync(serverDir, { recursive: true, force: true });
console.log(`postbuild: prerendered ${pages.length} routes + 404.html, wrote sitemap.xml`);
