import { useEffect } from 'react';

// Injects one or more JSON-LD <script> tags into <head> for the current
// page, and removes them on unmount/route change so schema never stacks
// or leaks between pages in this single-page app.
export default function SchemaMarkup({ schema }) {
  useEffect(() => {
    if (!schema) return undefined;

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
