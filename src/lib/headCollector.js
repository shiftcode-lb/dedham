// Server-render only: PageMeta and SchemaMarkup report what they would put in
// <head> here (their effects never run during prerender), and the build
// script writes it into each route's static HTML. Unused in the browser.
export const collected = { meta: null, schemas: [] };

export function resetCollected() {
  collected.meta = null;
  collected.schemas = [];
}

export const isServer = typeof window === 'undefined';
