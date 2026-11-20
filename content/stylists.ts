import type { LevelId } from './levels.ts';

export const PORTRAIT_VARIANTS = ['margaux', 'ines', 'amara', 'theo', 'rosie', 'jun'] as const;
export type PortraitVariant = (typeof PORTRAIT_VARIANTS)[number];

export interface Stylist {
  /** Stable URL-safe identifier referenced by lookbook credits. */
  id: string;
  /** Full public name. */
  name: string;
  /** Current pricing tier; updating this promotes the stylist across the site. */
  levelId: LevelId;
  /** One to three core specialisms shown in tracked small caps. */
  specialisms: readonly string[];
  /** One-line editorial quote set in italic beside the cameo portrait. */
  quote: string;
  /** Key selecting the bespoke oval cameo illustration. */
  portrait: PortraitVariant;
  /** Set to false to note "Not taking new clients this season" on The Studio page. */
  bookable: boolean;
}

export const stylists: readonly Stylist[] = [
  {
    id: 'margaux-lin',
    name: 'Margaux Lin',
    levelId: 'art-director',
    specialisms: ['Precision bobs', 'Editorial cutting'],
    quote: 'A good cut should still look right on the fifth week.',
    portrait: 'margaux',
    bookable: true,
  },
  {
    id: 'ines-duarte',
    name: 'Inès Duarte',
    levelId: 'art-director',
    specialisms: ['Balayage', 'Colour correction'],
    quote: 'Colour is a fabric. You choose it for how it moves.',
    portrait: 'ines',
    bookable: false,
  },
  {
    id: 'amara-bello',
    name: 'Amara Bello',
    levelId: 'senior',
    specialisms: ['Curls and coils', 'Occasion hair'],
    quote: 'I cut curls dry, one at a time, the way they actually sit.',
    portrait: 'amara',
    bookable: true,
  },
  {
    id: 'theo-marsh',
    name: 'Theo Marsh',
    levelId: 'senior',
    specialisms: ['Short and textured cuts'],
    quote: 'Short hair has nowhere to hide, which is why I love it.',
    portrait: 'theo',
    bookable: true,
  },
  {
    id: 'rosie-kaplan',
    name: 'Rosie Kaplan',
    levelId: 'stylist',
    specialisms: ['Blow-dries', 'Bridal styling'],
    quote: 'The finish is half the haircut.',
    portrait: 'rosie',
    bookable: true,
  },
  {
    id: 'jun-park',
    name: 'Jun Park',
    levelId: 'graduate',
    specialisms: ['Lived-in colour', 'Glosses'],
    quote: 'I like colour that grows out as nicely as it goes in.',
    portrait: 'jun',
    bookable: true,
  },
];

export function stylistById(id: string, list: readonly Stylist[] = stylists): Stylist | undefined {
  return list.find(stylist => stylist.id === id);
}
