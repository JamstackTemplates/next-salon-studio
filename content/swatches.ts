/** Stable IDs for the studio's six signature hair-colour swatches. */
export const SWATCH_IDS = ['rose', 'copper', 'honey', 'butter', 'ash', 'espresso'] as const;
export type SwatchId = (typeof SWATCH_IDS)[number];

export interface HairSwatch {
  /** Stable URL-safe swatch key referenced by lookbook entries and colour rows. */
  id: SwatchId;
  /** Human-readable shade name shown on swatch tags. */
  name: string;
  /** Short editorial shade code printed at the tip of the swatch weft. */
  code: string;
  /** Primary hair-weft fill hex in light mode. */
  light: string;
  /** Primary hair-weft fill hex in dark ("evening edition") mode. */
  dark: string;
}

export const swatches: readonly HairSwatch[] = [
  {
    id: 'rose',
    name: 'Rose Gold',
    code: '01 · RG',
    light: '#D9939B',
    dark: '#C97B86',
  },
  {
    id: 'copper',
    name: 'Copper',
    code: '02 · CU',
    light: '#C1623B',
    dark: '#D4734C',
  },
  {
    id: 'honey',
    name: 'Honey',
    code: '03 · HN',
    light: '#CFA059',
    dark: '#D8AD6B',
  },
  {
    id: 'butter',
    name: 'Buttercream',
    code: '04 · BC',
    light: '#E3CCA2',
    dark: '#D5BD8E',
  },
  {
    id: 'ash',
    name: 'Cool Ash',
    code: '05 · CA',
    light: '#948F8D',
    dark: '#A5A09E',
  },
  {
    id: 'espresso',
    name: 'Espresso',
    code: '06 · ES',
    light: '#3E2925',
    dark: '#63443E',
  },
];

export function swatchById(id: string): HairSwatch | undefined {
  return swatches.find(swatch => swatch.id === id);
}
