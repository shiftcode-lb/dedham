// Single source for the business contact details shown on the site, so the
// navbar, footer, contact page and schema can't disagree.
export const BUSINESS = {
  name: 'Dedham Airport Taxi & Livery',
  phoneDisplay: '781-777-8033',
  phoneE164: '+17817778033',
  // TODO(client): domain email to replace the Gmail address.
  email: 'dedhamairporttaxi@gmail.com',
};

export const ADDRESS = {
  street: '3 Allied Dr Ste 303',
  city: 'Dedham',
  region: 'MA',
  postalCode: '02026',
};

// Set to false if the client decides to run as a service-area business and
// hide the street address; the footer, contact page and schema all follow.
// (Town/route page copy mentions "3 Allied Drive" in landingPages.js.)
export const SHOW_ADDRESS = true;

export const SERVICE_AREA_LABEL = 'Boston Metro Area & Logan Airport';

export const TEL_HREF = `tel:${BUSINESS.phoneE164}`;
export const SMS_HREF = `sms:${BUSINESS.phoneE164}`;
