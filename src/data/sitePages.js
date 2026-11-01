// Every static (non-town, non-route) page, in one plain-JS list shared by the
// router, the prerender/sitemap build script and the sitemap, so the three
// can never drift apart. `index: false` keeps a page out of the sitemap and
// marks it noindex.
export const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.9', changefreq: 'monthly' },
  { path: '/safety', priority: '0.5', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
];
