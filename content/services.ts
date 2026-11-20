import { LEVEL_IDS, type LevelId } from './levels.ts';
import type { SwatchId } from './swatches.ts';

export const SERVICE_CATEGORIES = ['cut', 'colour', 'styling'] as const;
export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

export interface Service {
  /** URL-safe unique slug; also used as the row anchor on /prices/#<id>. */
  id: string;
  /** Department grouping on /prices/ and Home's "In this issue" contents. */
  category: ServiceCategory;
  /** Display name of the service. */
  name: string;
  /** Concise one-sentence editorial description. */
  description: string;
  /** Typical appointment length in minutes at Stylist level. */
  durationMinutes: number;
  /** Whole GBP price (1–500) per stylist level, or null when not offered at that level. */
  prices: Record<LevelId, number | null>;
  /** True when the listed figure is a starting ("from") price. */
  from: boolean;
  /** True for any service that applies colour or lightener (requires a 48h patch test). */
  patchTest: boolean;
  /** Set to false to hide a service from the price list without deleting it. */
  available: boolean;
  /** Optional swatch to lift on the colour swatch fan when hovering/focusing this row. */
  swatch?: SwatchId;
}

export const services: readonly Service[] = [
  // Cut & finish
  {
    id: 'cut-and-finish',
    category: 'cut',
    name: 'Cut & finish',
    description: 'Thorough consultation, wash, tailored cut and signature blow-dry.',
    durationMinutes: 60,
    prices: { graduate: 55, stylist: 70, senior: 85, 'art-director': 110 },
    from: false,
    patchTest: false,
    available: true,
  },
  {
    id: 'short-cut',
    category: 'cut',
    name: 'Short cut & finish',
    description: 'Scissor-over-comb or textured crop precision cut for short hair, finished dry.',
    durationMinutes: 45,
    prices: { graduate: 35, stylist: 45, senior: 55, 'art-director': 70 },
    from: false,
    patchTest: false,
    available: true,
  },
  {
    id: 'restyle',
    category: 'cut',
    name: 'Restyle with consultation',
    description: 'Extra time for a significant change of length, silhouette or fringe architecture.',
    durationMinutes: 90,
    prices: { graduate: 75, stylist: 90, senior: 110, 'art-director': 140 },
    from: false,
    patchTest: false,
    available: true,
  },
  {
    id: 'curl-cut',
    category: 'cut',
    name: 'Curl & coil cut',
    description: 'Dry curl-by-curl shaping followed by a hydrating cleanse and diffused finish.',
    durationMinutes: 75,
    prices: { graduate: 65, stylist: 80, senior: 95, 'art-director': 120 },
    from: false,
    patchTest: false,
    available: true,
  },
  {
    id: 'fringe-tidy',
    category: 'cut',
    name: 'Fringe tidy',
    description: 'Quick dry trim to keep curtain, blunt or micro fringes sitting cleanly between cuts.',
    durationMinutes: 15,
    prices: { graduate: 12, stylist: 12, senior: 12, 'art-director': 12 },
    from: false,
    patchTest: false,
    available: true,
  },
  {
    id: 'childrens-cut',
    category: 'cut',
    name: "Children's cut (under 12)",
    description: 'Gentle wash and trim for under-twelves, finished dry or lightly diffused.',
    durationMinutes: 30,
    prices: { graduate: 25, stylist: 30, senior: 35, 'art-director': null },
    from: false,
    patchTest: false,
    available: true,
  },

  // Colour
  {
    id: 'root-colour',
    category: 'colour',
    name: 'Root colour',
    description: 'Seamless regrowth tint matched precisely to your lengths for crisp coverage.',
    durationMinutes: 75,
    prices: { graduate: 65, stylist: 75, senior: 85, 'art-director': 105 },
    from: false,
    patchTest: true,
    available: true,
    swatch: 'espresso',
  },
  {
    id: 'full-colour',
    category: 'colour',
    name: 'Full-head colour',
    description: 'Rich root-to-tip colour formulated for even tone and mirror-like shine.',
    durationMinutes: 105,
    prices: { graduate: 85, stylist: 100, senior: 120, 'art-director': 150 },
    from: true,
    patchTest: true,
    available: true,
    swatch: 'copper',
  },
  {
    id: 'half-foils',
    category: 'colour',
    name: 'Half-head foils',
    description: 'Fine woven highlights through the parting and crown to lift and brighten.',
    durationMinutes: 120,
    prices: { graduate: 95, stylist: 115, senior: 135, 'art-director': 165 },
    from: true,
    patchTest: true,
    available: true,
    swatch: 'honey',
  },
  {
    id: 'full-foils',
    category: 'colour',
    name: 'Full-head foils',
    description: 'All-over babylights or ribbons tailored for luminous, dimensional blonding.',
    durationMinutes: 150,
    prices: { graduate: 130, stylist: 155, senior: 180, 'art-director': 220 },
    from: true,
    patchTest: true,
    available: true,
    swatch: 'butter',
  },
  {
    id: 'balayage',
    category: 'colour',
    name: 'Balayage & tone',
    description: 'Hand-painted lived-in lightness with a bespoke gloss toner for soft grow-out.',
    durationMinutes: 180,
    prices: { graduate: 160, stylist: 190, senior: 225, 'art-director': 275 },
    from: true,
    patchTest: true,
    available: true,
    swatch: 'rose',
  },
  {
    id: 'gloss-toner',
    category: 'colour',
    name: 'Gloss or toner',
    description: 'Translucent demi-permanent glaze to refine tone, neutralise brass or add glass shine.',
    durationMinutes: 30,
    prices: { graduate: 30, stylist: 35, senior: 40, 'art-director': 50 },
    from: false,
    patchTest: true,
    available: true,
    swatch: 'ash',
  },
  {
    id: 'colour-correction',
    category: 'colour',
    name: 'Colour correction',
    description: 'Hourly starting rate for multi-step corrective colour; a consultation comes first.',
    durationMinutes: 240,
    prices: { graduate: null, stylist: null, senior: 90, 'art-director': 120 },
    from: true,
    patchTest: true,
    available: true,
    swatch: 'rose',
  },

  // Styling
  {
    id: 'blow-dry',
    category: 'styling',
    name: 'Blow-dry',
    description: 'Cleanse, conditioning masque and round-brush finish with lasting movement.',
    durationMinutes: 45,
    prices: { graduate: 35, stylist: 40, senior: 48, 'art-director': 60 },
    from: false,
    patchTest: false,
    available: true,
  },
  {
    id: 'occasion-hair',
    category: 'styling',
    name: 'Occasion hair & up-do',
    description: 'Pinned chignons, editorial waves or structured twists for events and evenings.',
    durationMinutes: 75,
    prices: { graduate: 65, stylist: 75, senior: 90, 'art-director': 120 },
    from: false,
    patchTest: false,
    available: true,
  },
  {
    id: 'bridal-trial',
    category: 'styling',
    name: 'Bridal trial',
    description: 'Two-hour studio session exploring silhouettes, veil placement and timing ahead of the day.',
    durationMinutes: 120,
    prices: { graduate: null, stylist: null, senior: 150, 'art-director': 190 },
    from: false,
    patchTest: false,
    available: true,
  },
  {
    id: 'bond-treatment',
    category: 'styling',
    name: 'Bond-repair treatment',
    description: 'In-basin disulphide bond treatment paired with a warm towel scalp massage.',
    durationMinutes: 20,
    prices: { graduate: 25, stylist: 25, senior: 25, 'art-director': 25 },
    from: false,
    patchTest: false,
    available: true,
  },
];

export function serviceById(id: string, list: readonly Service[] = services): Service | undefined {
  return list.find(service => service.id === id);
}

export function availableServices(
  category?: ServiceCategory,
  list: readonly Service[] = services,
): Service[] {
  return list.filter(
    service => service.available && (category === undefined || service.category === category),
  );
}

export function lowestServicePrice(service: Service): number | null {
  const values = LEVEL_IDS.map(levelId => service.prices[levelId]).filter(
    (price): price is number => typeof price === 'number',
  );
  return values.length ? Math.min(...values) : null;
}

export function lowestCategoryPrice(
  category: ServiceCategory,
  list: readonly Service[] = services,
): number | null {
  const prices = availableServices(category, list)
    .map(lowestServicePrice)
    .filter((price): price is number => price !== null);
  return prices.length ? Math.min(...prices) : null;
}

export function formatPrice(amount: number | null, from = false): string {
  if (amount === null) return '—';
  return `${from ? 'from ' : ''}£${amount}`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hrs = Math.floor(minutes / 60);
  const rem = minutes % 60;
  return rem === 0 ? `${hrs} hr${hrs > 1 ? 's' : ''}` : `${hrs} hr ${rem} min`;
}
