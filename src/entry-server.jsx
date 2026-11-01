import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import App from './App';
import { collected, resetCollected } from './lib/headCollector';

// Renders one route to an HTML string (waiting for lazy pages) and returns
// the head data PageMeta/SchemaMarkup reported while rendering.
export async function render(url) {
  resetCollected();
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  const html = await new Response(prelude).text();
  return { html, meta: collected.meta, schemas: [...collected.schemas] };
}
