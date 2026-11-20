import type { OpeningHours } from '../lib/hours.ts';

export interface StudioAddress {
  /** Floor or suite within the building. */
  floor: string;
  /** Street number and name. */
  street: string;
  /** Neighbourhood shown in editorial lines. */
  area: string;
  /** City or town. */
  locality: string;
  /** UK postcode. */
  postalCode: string;
  /** ISO 3166-1 alpha-2 country code for schema.org. */
  country: string;
  /** Single-line public address for copy and accessibility. */
  formatted: string;
  /** Address string passed to map helpers. */
  mapQuery: string;
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Editorial masthead title without the descriptor. */
  masthead: string;
  /** Editorial subtitle paired with the masthead. */
  mastheadSub: string;
  /** Magazine issue metadata displayed on the cover and header strip. */
  issue: {
    number: string;
    season: string;
    shortSeason: string;
  };
  /** Short lead headline for the home page. */
  tagline: string;
  /** Plain-text introduction used by fallback metadata and JSON-LD. */
  introduction: string;
  /** Public contact email, always visible on Contact and in the footer. */
  email: string;
  /** Public telephone number (Ofcom drama range for the gallery sample). */
  phone: string;
  /** Schema.org priceRange indicator. */
  priceRange: string;
  /** Studio address in Seven Dials, London. */
  address: StudioAddress;
  /** Plain-English walking directions from nearby landmarks. */
  directions: string;
  /** Accessibility details shown on The Studio page. */
  accessibility: string;
  /** IANA time zone matching site.config.json. */
  timeZone: string;
  /** Seven same-day opening-hours records, Monday to Sunday. */
  hours: readonly OpeningHours[];
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Must state that an appointment is confirmed only when the studio replies. */
    introduction: string;
    /** Suggestions for the message, not additional form inputs. */
    usefulToInclude: readonly string[];
  };
}

export const business: Business = {
  name: 'Atelier Blush Hair Studio',
  masthead: 'Atelier Blush',
  mastheadSub: 'Hair Studio',
  issue: {
    number: 'No. 26',
    season: 'Autumn/Winter',
    shortSeason: 'AW26',
  },
  tagline: 'The cut is the cover story.',
  introduction:
    'Atelier Blush is an editorial hair studio in Seven Dials, London: precision cuts, lived-in colour and occasion styling, priced clearly by stylist level.',
  email: 'hello@atelierblush.co.uk',
  phone: '020 7946 0381',
  priceRange: '££–£££',
  address: {
    floor: 'First floor',
    street: '19 Earlham Street',
    area: 'Seven Dials',
    locality: 'London',
    postalCode: 'WC2H 9LL',
    country: 'GB',
    formatted: 'First floor, 19 Earlham Street, London WC2H 9LL',
    mapQuery: '19 Earlham Street, Seven Dials, London WC2H 9LL, UK',
  },
  directions:
    'Thirty seconds from the Seven Dials sundial pillar; Covent Garden and Leicester Square stations are both a five-minute walk.',
  accessibility:
    'First-floor studio reached by stairs; ground-floor appointments can be arranged at our sister room on request; please mention it in your enquiry.',
  timeZone: 'Europe/London',
  hours: [
    { day: 'Monday' },
    { day: 'Tuesday', opens: '10:00', closes: '19:00' },
    { day: 'Wednesday', opens: '10:00', closes: '20:00' },
    { day: 'Thursday', opens: '10:00', closes: '20:00' },
    { day: 'Friday', opens: '09:00', closes: '18:00' },
    { day: 'Saturday', opens: '09:00', closes: '17:00' },
    { day: 'Sunday', opens: '11:00', closes: '16:00' },
  ],
  enquiries: {
    title: 'Request an appointment',
    introduction:
      "Tell us what you'd like and when you're free. We'll reply within one working day to suggest a time. Your appointment is confirmed only when we reply.",
    usefulToInclude: [
      'the service or lookbook look you have in mind',
      'your preferred stylist or level, if any',
      'two or three days and times that suit you',
      'your current hair: length, and any colour or lightener in the last year',
      "whether you'd like a skin allergy alert test arranged first (needed for any colour service)",
    ],
  },
};
