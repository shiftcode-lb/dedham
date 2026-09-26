import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// The whole CSS bundle is small (~9KB gzipped) and every route needs the
// same global stylesheet (Tailwind, no per-page splitting), so inlining it
// removes a full network round-trip from the critical rendering path —
// the browser can paint straight after the HTML instead of waiting on a
// second request just to fetch the stylesheet.
function inlineCss() {
  let css = '';
  return {
    name: 'inline-css',
    apply: 'build',
    generateBundle(_, bundle) {
      for (const fileName of Object.keys(bundle)) {
        const chunk = bundle[fileName];
        if (chunk.type === 'asset' && fileName.endsWith('.css')) {
          css += chunk.source;
          delete bundle[fileName];
        }
      }
    },
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet"[^>]*href="[^"]+\.css"[^>]*>/,
        `<style>${css}</style>`,
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), inlineCss()],
});
