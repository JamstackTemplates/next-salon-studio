import { business } from '../content/business.ts';
import { absoluteUrl } from './paths.ts';

/** HairSalon schema.org structured data derived directly from content/business.ts. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const image = absoluteUrl('/og.png');
  const openingHoursSpecification = business.hours
    .filter(entry => entry.opens && entry.closes)
    .map(entry => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${entry.day}`,
      opens: entry.opens,
      closes: entry.closes,
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: business.name,
    description: business.introduction,
    email: business.email,
    telephone: business.phone,
    priceRange: business.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${business.address.floor}, ${business.address.street}`,
      addressLocality: business.address.locality,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    openingHoursSpecification,
    ...(url ? { url } : {}),
    ...(image ? { image } : {}),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
