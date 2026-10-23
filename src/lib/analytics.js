// Thin wrapper around gtag so call sites don't need to guard for it being
// unavailable (blocked by an ad blocker, or not yet loaded).
export function trackEvent(name, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

// Google Ads conversion actions (account AW-16623859488). `send_to` is
// "<ads id>/<conversion label>"; the labels come from each conversion
// action's event snippet in Google Ads > Goals > Conversions.
const ADS_CONVERSIONS = {
  lead: 'AW-16623859488/TcqwCMrulacdEKDu7_Y9',
  phoneCall: 'AW-16623859488/XjwBCMifoacdEKDu7_Y9',
};

export function trackAdsConversion(name) {
  const sendTo = ADS_CONVERSIONS[name];
  if (sendTo) trackEvent('conversion', { send_to: sendTo });
}
