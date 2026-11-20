import { serviceById, services, type Service, type ServiceCategory } from './services.ts';
import { stylistById, stylists, type Stylist } from './stylists.ts';
import type { SwatchId } from './swatches.ts';

export interface Look {
  /** Stable URL-safe identifier. */
  id: string;
  /** Editorial title set in Playfair italic. */
  title: string;
  /** Lookbook filter department. */
  category: ServiceCategory;
  /** Credit role prefix (e.g. "Cut", "Colour", "Styling"). */
  creditLabel: string;
  /** One- or two-sentence caption describing the cut, colour or finish. */
  caption: string;
  /** Credited stylist; lookbook totals use this stylist's current level. */
  stylistId: string;
  /** One to three available service IDs used to achieve this look. */
  serviceIds: readonly string[];
  /** Signature hair-colour swatch carried as a tab on this figure. */
  swatch: SwatchId;
}

export type LookPhotoTheme = 'light' | 'dark';

/**
 * Public path of a look's photograph. Every look needs a matching pair in
 * `public/looks/`: `<id>-light.webp` (blush backdrop) and `<id>-dark.webp` (plum backdrop).
 */
export function lookPhotoPath(lookId: string, theme: LookPhotoTheme): `/looks/${string}.webp` {
  return `/looks/${lookId}-${theme}.webp`;
}

export const lookbook: readonly Look[] = [
  {
    id: 'the-glass-bob',
    title: 'The Glass Bob',
    category: 'cut',
    creditLabel: 'Cut',
    caption:
      'A razor-clean chin-length bob cut with subtle internal bevel so the perimeter tucks naturally under the jaw, finished with a translucent espresso gloss.',
    stylistId: 'margaux-lin',
    serviceIds: ['cut-and-finish', 'gloss-toner'],
    swatch: 'espresso',
  },
  {
    id: 'rose-gold-melt',
    title: 'Rose-Gold Melt',
    category: 'colour',
    creditLabel: 'Colour',
    caption:
      'Hand-painted rosewood ribbons melting seamlessly from a soft natural root into luminous blush lengths that catch winter light.',
    stylistId: 'ines-duarte',
    serviceIds: ['balayage'],
    swatch: 'rose',
  },
  {
    id: 'copper-shag',
    title: 'Copper Shag',
    category: 'colour',
    creditLabel: 'Colour & cut',
    caption:
      'Shattered 1970s layers and a feathery curtain fringe paired with a burnished terracotta tint that deepens after every wash.',
    stylistId: 'jun-park',
    serviceIds: ['full-colour', 'cut-and-finish'],
    swatch: 'copper',
  },
  {
    id: 'nineties-blowout',
    title: "The '90s Blow-Out",
    category: 'styling',
    creditLabel: 'Styling',
    caption:
      'Velvet root lift and oversized round-brush bends set on rollers until cool, giving effortless bounce from desk to late supper.',
    stylistId: 'rosie-kaplan',
    serviceIds: ['blow-dry'],
    swatch: 'honey',
  },
  {
    id: 'buttercream-balayage',
    title: 'Buttercream Balayage',
    category: 'colour',
    creditLabel: 'Colour',
    caption:
      'Warm vanilla ribbons painted around the cheekbones and ends, toned with a sheer pearl glaze so regrowth stays soft for months.',
    stylistId: 'ines-duarte',
    serviceIds: ['balayage', 'gloss-toner'],
    swatch: 'butter',
  },
  {
    id: 'sculpted-crop',
    title: 'Sculpted Crop',
    category: 'cut',
    creditLabel: 'Cut',
    caption:
      'A close scissor-over-comb taper at the nape meeting directional, piecey texture across the crown that styles in thirty seconds.',
    stylistId: 'theo-marsh',
    serviceIds: ['short-cut'],
    swatch: 'ash',
  },
  {
    id: 'defined-coils',
    title: 'Defined Coils',
    category: 'cut',
    creditLabel: 'Cut & care',
    caption:
      'Cut dry coil by coil for a balanced rounded silhouette, then steeped in a bond-repair masque for weightless spring and shine.',
    stylistId: 'amara-bello',
    serviceIds: ['curl-cut', 'bond-treatment'],
    swatch: 'espresso',
  },
  {
    id: 'low-chignon',
    title: 'The Low Chignon',
    category: 'styling',
    creditLabel: 'Styling',
    caption:
      'A sleek nape-level knot anchored with French pins and softened with two fine tendrils—built to last cleanly through speeches and dancing.',
    stylistId: 'amara-bello',
    serviceIds: ['occasion-hair'],
    swatch: 'honey',
  },
];

/**
 * Computes the indicative "from" total for a look from its referenced services
 * at the credited stylist's level. Never typed by hand so price or level edits
 * update the lookbook automatically.
 */
export function lookFromTotal(
  look: Look,
  allServices: readonly Service[] = services,
  allStylists: readonly Stylist[] = stylists,
): number {
  const stylist = stylistById(look.stylistId, allStylists);
  if (!stylist) {
    throw new Error(`lookbook[${look.id}].stylistId: unknown stylist "${look.stylistId}"`);
  }
  let total = 0;
  for (const serviceId of look.serviceIds) {
    const service = serviceById(serviceId, allServices);
    if (!service) {
      throw new Error(`lookbook[${look.id}].serviceIds: unknown service "${serviceId}"`);
    }
    if (!service.available) {
      throw new Error(`lookbook[${look.id}].serviceIds: service "${serviceId}" is unavailable`);
    }
    const price = service.prices[stylist.levelId];
    if (price === null || price === undefined) {
      throw new Error(
        `lookbook[${look.id}].serviceIds: "${serviceId}" is not offered at stylist "${stylist.id}" level "${stylist.levelId}"`,
      );
    }
    total += price;
  }
  return total;
}
