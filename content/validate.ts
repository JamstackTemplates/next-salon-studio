import { validateHours } from '../lib/hours.ts';
import { business, type Business } from './business.ts';
import { LEVEL_IDS, levels, type StylistLevel } from './levels.ts';
import { lookbook, lookFromTotal, type Look } from './lookbook.ts';
import { SERVICE_CATEGORIES, services, type Service } from './services.ts';
import { PORTRAIT_VARIANTS, stylists, type Stylist } from './stylists.ts';
import { swatches, type HairSwatch } from './swatches.ts';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX = /^#[0-9a-fA-F]{6}$/;

function assertUniqueSlug(collection: string, id: string, seen: Set<string>): void {
  if (!id || !SLUG.test(id)) {
    throw new Error(`${collection}[${id || 'empty'}].id: must be a lowercase URL-safe slug`);
  }
  if (seen.has(id)) {
    throw new Error(`${collection}[${id}].id: duplicate id`);
  }
  seen.add(id);
}

export function validateBusiness(data: Business = business): void {
  for (const key of [
    'name',
    'masthead',
    'mastheadSub',
    'tagline',
    'introduction',
    'email',
    'phone',
    'priceRange',
    'directions',
    'accessibility',
    'timeZone',
  ] as const) {
    if (!data[key]?.trim()) {
      throw new Error(`business.${key}: required`);
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw new Error(`business.email: valid public email required (got "${data.email}")`);
  }
  for (const field of ['floor', 'street', 'area', 'locality', 'postalCode', 'country', 'formatted', 'mapQuery'] as const) {
    if (!data.address[field]?.trim()) {
      throw new Error(`business.address.${field}: required`);
    }
  }
  validateHours(data.hours);
  if (!data.enquiries.title.trim()) throw new Error('business.enquiries.title: required');
  if (!data.enquiries.introduction.trim()) throw new Error('business.enquiries.introduction: required');
  if (!data.enquiries.usefulToInclude.length) {
    throw new Error('business.enquiries.usefulToInclude: must list message guidance');
  }
  for (const [index, tip] of data.enquiries.usefulToInclude.entries()) {
    if (!tip.trim()) throw new Error(`business.enquiries.usefulToInclude[${index}]: empty tip`);
  }
}

export function validateLevels(list: readonly StylistLevel[] = levels): Set<string> {
  const seen = new Set<string>();
  if (list.length !== LEVEL_IDS.length) {
    throw new Error(`levels: expected ${LEVEL_IDS.length} levels, got ${list.length}`);
  }
  for (const level of list) {
    assertUniqueSlug('levels', level.id, seen);
    if (!level.name.trim()) throw new Error(`levels[${level.id}].name: required`);
    if (!level.shortName.trim()) throw new Error(`levels[${level.id}].shortName: required`);
    if (!level.pluralName.trim()) throw new Error(`levels[${level.id}].pluralName: required`);
    if (!level.description.trim()) throw new Error(`levels[${level.id}].description: required`);
  }
  return seen;
}

export function validateSwatches(list: readonly HairSwatch[] = swatches): Set<string> {
  const seen = new Set<string>();
  for (const swatch of list) {
    assertUniqueSlug('swatches', swatch.id, seen);
    if (!swatch.name.trim()) throw new Error(`swatches[${swatch.id}].name: required`);
    if (!swatch.code.trim()) throw new Error(`swatches[${swatch.id}].code: required`);
    if (!HEX.test(swatch.light)) throw new Error(`swatches[${swatch.id}].light: invalid hex "${swatch.light}"`);
    if (!HEX.test(swatch.dark)) throw new Error(`swatches[${swatch.id}].dark: invalid hex "${swatch.dark}"`);
  }
  return seen;
}

export function validateServices(
  list: readonly Service[] = services,
  swatchIds: Set<string> = new Set(swatches.map(s => s.id)),
): Set<string> {
  const seen = new Set<string>();
  const categories = new Set<string>(SERVICE_CATEGORIES);

  for (const service of list) {
    assertUniqueSlug('services', service.id, seen);
    if (!categories.has(service.category)) {
      throw new Error(`services[${service.id}].category: invalid category "${service.category}"`);
    }
    if (!service.name.trim()) throw new Error(`services[${service.id}].name: required`);
    if (!service.description.trim()) throw new Error(`services[${service.id}].description: required`);
    if (!Number.isInteger(service.durationMinutes) || service.durationMinutes <= 0) {
      throw new Error(`services[${service.id}].durationMinutes: must be a positive integer`);
    }
    if (service.patchTest && service.category !== 'colour') {
      throw new Error(`services[${service.id}].patchTest: only colour services may set patchTest: true`);
    }
    if (service.swatch && !swatchIds.has(service.swatch)) {
      throw new Error(`services[${service.id}].swatch: unknown swatch "${service.swatch}"`);
    }

    const keys = Object.keys(service.prices);
    for (const levelId of LEVEL_IDS) {
      if (!(levelId in service.prices)) {
        throw new Error(`services[${service.id}].prices.${levelId}: missing level key`);
      }
    }
    if (keys.length !== LEVEL_IDS.length) {
      throw new Error(`services[${service.id}].prices: unexpected level key`);
    }

    let previousPrice: number | null = null;
    let offeredCount = 0;

    for (const levelId of LEVEL_IDS) {
      const price = service.prices[levelId];
      if (price === null) continue;
      if (!Number.isInteger(price) || price < 1 || price > 500) {
        throw new Error(
          `services[${service.id}].prices.${levelId}: expected whole GBP in 1–500 or null (got ${String(price)})`,
        );
      }
      if (previousPrice !== null && price < previousPrice) {
        throw new Error(
          `services[${service.id}].prices.${levelId}: price £${price} decreases below previous level (£${previousPrice})`,
        );
      }
      previousPrice = price;
      offeredCount++;
    }

    if (service.available && offeredCount === 0) {
      throw new Error(`services[${service.id}].prices: available service must be offered by at least one level`);
    }
  }
  return seen;
}

export function validateStylists(
  list: readonly Stylist[] = stylists,
  levelIds: Set<string> = new Set(levels.map(l => l.id)),
): Set<string> {
  const seen = new Set<string>();
  const portraits = new Set<string>(PORTRAIT_VARIANTS);
  for (const stylist of list) {
    assertUniqueSlug('stylists', stylist.id, seen);
    if (!stylist.name.trim()) throw new Error(`stylists[${stylist.id}].name: required`);
    if (!levelIds.has(stylist.levelId)) {
      throw new Error(`stylists[${stylist.id}].levelId: unknown level "${stylist.levelId}"`);
    }
    if (stylist.specialisms.length < 1 || stylist.specialisms.length > 3) {
      throw new Error(`stylists[${stylist.id}].specialisms: must have 1–3 entries`);
    }
    for (const [index, spec] of stylist.specialisms.entries()) {
      if (!spec.trim()) throw new Error(`stylists[${stylist.id}].specialisms[${index}]: empty specialism`);
    }
    if (!stylist.quote.trim()) throw new Error(`stylists[${stylist.id}].quote: required`);
    if (!portraits.has(stylist.portrait)) {
      throw new Error(`stylists[${stylist.id}].portrait: unknown portrait variant "${stylist.portrait}"`);
    }
  }
  return seen;
}

export function validateLookbook(
  list: readonly Look[] = lookbook,
  allServices: readonly Service[] = services,
  allStylists: readonly Stylist[] = stylists,
  swatchIds: Set<string> = new Set(swatches.map(s => s.id)),
): Set<string> {
  const seen = new Set<string>();
  const categories = new Set<string>(SERVICE_CATEGORIES);
  const serviceMap = new Map(allServices.map(s => [s.id, s]));
  const stylistMap = new Map(allStylists.map(s => [s.id, s]));

  for (const look of list) {
    assertUniqueSlug('lookbook', look.id, seen);
    if (!look.title.trim()) throw new Error(`lookbook[${look.id}].title: required`);
    if (!categories.has(look.category)) {
      throw new Error(`lookbook[${look.id}].category: invalid category "${look.category}"`);
    }
    if (!look.caption.trim()) throw new Error(`lookbook[${look.id}].caption: required`);
    if (!swatchIds.has(look.swatch)) {
      throw new Error(`lookbook[${look.id}].swatch: unknown swatch "${look.swatch}"`);
    }
    const stylist = stylistMap.get(look.stylistId);
    if (!stylist) {
      throw new Error(`lookbook[${look.id}].stylistId: unknown stylist "${look.stylistId}"`);
    }
    if (look.serviceIds.length < 1 || look.serviceIds.length > 3) {
      throw new Error(`lookbook[${look.id}].serviceIds: must reference 1–3 services`);
    }
    for (const serviceId of look.serviceIds) {
      const service = serviceMap.get(serviceId);
      if (!service) {
        throw new Error(`lookbook[${look.id}].serviceIds: unknown service "${serviceId}"`);
      }
      if (!service.available) {
        throw new Error(`lookbook[${look.id}].serviceIds: service "${serviceId}" is unavailable`);
      }
      if (service.prices[stylist.levelId] === null) {
        throw new Error(
          `lookbook[${look.id}].serviceIds: service "${serviceId}" is not offered at stylist "${stylist.id}" level "${stylist.levelId}"`,
        );
      }
    }
    // Verify computed total succeeds and is positive.
    const total = lookFromTotal(look, allServices, allStylists);
    if (total <= 0) {
      throw new Error(`lookbook[${look.id}]: computed total must be positive`);
    }
  }
  return seen;
}

export function validateAllContent(): void {
  validateBusiness();
  const levelIds = validateLevels();
  const swatchIds = validateSwatches();
  validateServices(services, swatchIds);
  validateStylists(stylists, levelIds);
  validateLookbook(lookbook, services, stylists, swatchIds);
}
