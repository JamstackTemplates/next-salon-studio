'use client';

import { useEffect, useState } from 'react';
import type { Look } from '../content/lookbook';
import type { ServiceCategory } from '../content/services';
import { LookPhoto } from './look-photo';
import { SwatchTab } from './art/swatch-fan';
import { SiteLink } from './site-link';

export interface ResolvedLook {
  look: Look;
  stylistName: string;
  stylistLevelName: string;
  services: readonly { id: string; name: string }[];
  fromTotal: number;
  plateNumber: string;
}

type FilterValue = 'all' | ServiceCategory;

const FILTER_TABS: readonly { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'cut', label: 'Cut' },
  { value: 'colour', label: 'Colour' },
  { value: 'styling', label: 'Styling' },
];

/**
 * Varied editorial lookbook gallery with progressive-enhancement category tabs.
 *
 * - Without JavaScript (and during SSR), all looks render and tabs are not shown.
 * - With JavaScript, magazine section tabs filter looks with a subtle fade and
 *   announce the count via an aria-live region ("Showing 3 colour looks").
 * - Layout alternates full-width editorial spreads (art left, caption right) with
 *   pairs of half-width figures rather than a uniform card grid.
 */
export function LookbookGallery({ items }: { items: readonly ResolvedLook[] }) {
  const [hydrated, setHydrated] = useState(false);
  const [filter, setFilter] = useState<FilterValue>('all');

  useEffect(() => {
    setHydrated(true);
  }, []);

  const visible =
    filter === 'all' ? items : items.filter(entry => entry.look.category === filter);

  // Chunk into alternating [full spread (1)] and [pair (2)] for magazine rhythm.
  const rows: { type: 'spread' | 'pair'; entries: ResolvedLook[] }[] = [];
  let cursor = 0;
  let wantSpread = true;
  while (cursor < visible.length) {
    if (wantSpread || cursor === visible.length - 1) {
      rows.push({ type: 'spread', entries: [visible[cursor]] });
      cursor += 1;
    } else {
      rows.push({ type: 'pair', entries: [visible[cursor], visible[cursor + 1]] });
      cursor += 2;
    }
    wantSpread = !wantSpread;
  }

  const liveMessage =
    filter === 'all'
      ? `Showing all ${visible.length} looks`
      : `Showing ${visible.length} ${filter} ${visible.length === 1 ? 'look' : 'looks'}`;

  return (
    <section aria-label="Autumn/Winter lookbook plates" className="pb-16">
      {/* Category tabs rendered only with JavaScript */}
      {hydrated ? (
        <div className="no-print border-y border-rule bg-surface">
          <div className="wrap flex flex-wrap items-center justify-between gap-3 py-2">
            <div role="tablist" aria-label="Filter lookbook by department" className="flex items-center gap-1 overflow-x-auto">
              {FILTER_TABS.map(tab => (
                <button
                  key={tab.value}
                  type="button"
                  role="tab"
                  aria-selected={filter === tab.value}
                  className="mag-tab"
                  onClick={() => setFilter(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <p role="status" aria-live="polite" className="dept-label text-[0.68rem]">
              {liveMessage}
            </p>
          </div>
        </div>
      ) : null}

      <div className="wrap mt-12 space-y-16 sm:space-y-20">
        {rows.map((row, rowIndex) =>
          row.type === 'spread' ? (
            <FullSpreadFigure key={row.entries[0].look.id} entry={row.entries[0]} reverse={rowIndex % 4 === 2} />
          ) : (
            <div
              key={row.entries.map(e => e.look.id).join('-')}
              className="grid gap-12 border-t border-rule pt-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-rule"
            >
              {row.entries.map((entry, idx) => (
                <HalfFigure
                  key={entry.look.id}
                  entry={entry}
                  className={idx === 0 ? 'md:pr-10' : 'md:pl-10'}
                />
              ))}
            </div>
          ),
        )}
      </div>
    </section>
  );
}

function FullSpreadFigure({ entry, reverse }: { entry: ResolvedLook; reverse: boolean }) {
  const { look, stylistName, stylistLevelName, services, fromTotal, plateNumber } = entry;

  return (
    <article className="grid items-center gap-8 border-t border-ink/25 pt-10 transition-opacity duration-200 lg:grid-cols-12 lg:gap-12">
      <div className={`relative lg:col-span-7 ${reverse ? 'lg:order-2' : ''}`}>
        <div className="relative border border-rule bg-surface p-3 sm:p-5">
          <SwatchTab swatchId={look.swatch} className="absolute -top-3.5 left-5 z-10" />
          <LookPhoto look={look} className="aspect-square [&_img]:object-[50%_20%]" />
        </div>
      </div>

      <div className={`lg:col-span-5 ${reverse ? 'lg:order-1' : ''}`}>
        <div className="flex items-center justify-between gap-4 border-b border-rule pb-3">
          <span className="dept-label">{look.category}</span>
          <span className="folio">Plate {plateNumber}</span>
        </div>

        <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-medium italic leading-[1.02] text-ink">
          {look.title}
        </h2>

        <p className="mt-4 text-base leading-relaxed text-muted">{look.caption}</p>

        <dl className="mt-6 space-y-3 border-y border-rule py-4 text-sm">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <dt className="dept-label text-[0.68rem]">{look.creditLabel}</dt>
            <dd className="text-right font-medium text-ink">
              {stylistName} <span className="text-muted font-normal">({stylistLevelName})</span>
            </dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <dt className="dept-label text-[0.68rem]">Services</dt>
            <dd className="flex flex-wrap justify-end gap-x-3 gap-y-1">
              {services.map(service => (
                <SiteLink
                  key={service.id}
                  href={`/prices/#${service.id}`}
                  className="text-link text-sm"
                >
                  {service.name}
                </SiteLink>
              ))}
            </dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 pt-1">
            <dt className="dept-label text-[0.68rem]">Indicative total</dt>
            <dd className="font-display text-2xl font-medium italic text-blush-ink tabular-nums">
              from £{fromTotal}
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

function HalfFigure({ entry, className = '' }: { entry: ResolvedLook; className?: string }) {
  const { look, stylistName, stylistLevelName, services, fromTotal, plateNumber } = entry;

  return (
    <article className={`flex flex-col transition-opacity duration-200 ${className}`}>
      <div className="relative border border-rule bg-surface p-3">
        <SwatchTab swatchId={look.swatch} className="absolute -top-3.5 left-4 z-10" />
        <LookPhoto look={look} className="aspect-[670/754]" />
      </div>

      <div className="mt-5 flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-3">
            <span className="dept-label text-[0.68rem]">{look.category}</span>
            <span className="folio">Plate {plateNumber}</span>
          </div>
          <h2 className="mt-1.5 font-display text-3xl font-medium italic text-ink">{look.title}</h2>
          <p className="mt-2.5 text-sm leading-relaxed text-muted">{look.caption}</p>
        </div>

        <div className="mt-5 space-y-2 border-t border-rule pt-3.5 text-sm">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="dept-label text-[0.66rem]">
              {look.creditLabel}: <strong className="font-semibold text-ink">{stylistName}</strong> ({stylistLevelName})
            </span>
            <span className="font-display text-xl italic text-blush-ink tabular-nums">
              from £{fromTotal}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span className="dept-label text-[0.64rem]">Services:</span>
            {services.map(service => (
              <SiteLink key={service.id} href={`/prices/#${service.id}`} className="text-link">
                {service.name}
              </SiteLink>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
