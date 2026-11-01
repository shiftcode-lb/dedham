// Single source for the business contact details shown on the site, so the
// navbar, footer, contact page and schema can't disagree.
export const BUSINESS = {
  name: 'Dedham Airport Taxi & Livery',
  phoneDisplay: '781-777-8033',
  phoneE164: '+17817778033',
};

export const TEL_HREF = `tel:${BUSINESS.phoneE164}`;
export const SMS_HREF = `sms:${BUSINESS.phoneE164}`;
