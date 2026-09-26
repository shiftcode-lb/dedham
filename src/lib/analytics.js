// Thin wrapper around gtag so call sites don't need to guard for it being
// unavailable (blocked by an ad blocker, or not yet loaded).
export function trackEvent(name, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}
