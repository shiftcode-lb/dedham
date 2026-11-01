// Sample flat rates shown on town and route pages, keyed by page path
// (e.g. '/norwood-taxi'). Amounts are whole US dollars. Every value is null
// until the client supplies real prices, and LandingPage renders nothing
// for a page with no rate, so no price shows on the site yet.
// TODO(client): flat rates per town/route, to Logan, for sedan and SUV.
export const rates = {
  // '/norwood-taxi': { sedan: null, suv: null },
};

const EMPTY = { sedan: null, suv: null };

export function getRates(path) {
  const entry = { ...EMPTY, ...rates[path] };
  return entry.sedan == null && entry.suv == null ? null : entry;
}
