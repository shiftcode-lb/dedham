import { useEffect } from 'react';
import { collected, isServer } from '../lib/headCollector';

// Injects one or more JSON-LD <script> tags into <head> for the current
// page, and removes them on unmount/route change so schema never stacks
// or leaks between pages in this single-page app.
export default function SchemaMarkup({ schema }) {
  if (isServer && schema) collected.schemas.push(...(Array.isArray(schema) ? schema : [schema]));

  useEffect(() => {
    if (!schema) return undefined;

    // Drop the copy baked into the static HTML; this effect re-adds it.
    document.head
      .querySelectorAll('script[type="application/ld+json"][data-prerendered]')
      .forEach((node) => node.remove());

    const items = Array.isArray(schema) ? schema : [schema];

    const scripts = items.map((item) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(item);
      document.head.appendChild(script);
      return script;
    });

    return () => {
      scripts.forEach((script) => document.head.removeChild(script));
    };
  }, [schema]);

  return null;
}
