/** Ordered stylist level IDs from entry tier to Art Director. */
export const LEVEL_IDS = ['graduate', 'stylist', 'senior', 'art-director'] as const;
export type LevelId = (typeof LEVEL_IDS)[number];

export interface StylistLevel {
  /** Stable URL-safe identifier used as the key in service prices and URL hashes. */
  id: LevelId;
  /** Full title shown in tables, keys and profiles. */
  name: string;
  /** Compact column and segmented-control label. */
  shortName: string;
  /** Plural group heading used on The Studio masthead page. */
  pluralName: string;
  /** One-sentence explanation of experience and supervision. */
  description: string;
}

export const levels: readonly StylistLevel[] = [
  {
    id: 'graduate',
    name: 'Graduate Stylist',
    shortName: 'Graduate',
    pluralName: 'Graduate Stylists',
    description:
      'Fully qualified and in their first two years on the floor; every appointment is checked by a senior.',
  },
  {
    id: 'stylist',
    name: 'Stylist',
    shortName: 'Stylist',
    pluralName: 'Stylists',
    description: 'Confident across cutting, colour and finishing.',
  },
  {
    id: 'senior',
    name: 'Senior Stylist',
    shortName: 'Senior',
    pluralName: 'Senior Stylists',
    description: "Eight or more years' experience; takes on corrective and complex work.",
  },
  {
    id: 'art-director',
    name: 'Art Director',
    shortName: 'Art Director',
    pluralName: 'Art Directors',
    description: "Leads the studio's education and editorial work. Limited availability.",
  },
];

export function levelById(id: string): StylistLevel | undefined {
  return levels.find(level => level.id === id);
}
