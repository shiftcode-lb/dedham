import { useEffect } from 'react';

const SITE_URL = 'https://dedhamairporttaxi.com';

// Swaps one attribute on an existing <head> tag and hands back its previous
// value so the effect cleanup can restore it — mirrors SchemaMarkup's
// mount/unmount pattern so head data never leaks between routes in this SPA.
function swapAttr(selector, attr, value) {
  const el = document.querySelector(selector);
  if (!el) return undefined;
  const previous = el.getAttribute(attr);
  el.setAttribute(attr, value);
  return previous;
}

// Sets the per-route title, meta description, canonical URL, and Open Graph
// tags, restoring the previous (index.html default) values on unmount so
// every route gets its own SEO identity instead of sharing the homepage's.
export default function PageMeta({ title, description, path = '/' }) {
  useEffect(() => {
    const url = new URL(path, SITE_URL).href;
    const previousTitle = document.title;
    document.title = title;

    const restores = [
      ['meta[name="description"]', 'content', description],
      ['meta[property="og:title"]', 'content', title],
      ['meta[property="og:description"]', 'content', description],
      ['meta[property="og:url"]', 'content', url],
      ['meta[name="twitter:title"]', 'content', title],
      ['meta[name="twitter:description"]', 'content', description],
      ['link[rel="canonical"]', 'href', url],
    ].map(([selector, attr, value]) => [selector, attr, swapAttr(selector, attr, value)]);

    return () => {
      document.title = previousTitle;
      restores.forEach(([selector, attr, previous]) => {
        if (previous !== undefined) swapAttr(selector, attr, previous);
      });
    };
  }, [title, description, path]);

  return null;
}
