'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { LEVEL_IDS, levels, type LevelId } from '../content/levels';
import {
  formatDuration,
  formatPrice,
  type Service,
  type ServiceCategory,
} from '../content/services';
import type { SwatchId } from '../content/swatches';
import { DropperIcon } from './art/icons';
import { ColourMotif, CutMotif, StylingMotif } from './art/section-motifs';
import { SwatchFan } from './art/swatch-fan';

type SelectedLevel = 'all' | LevelId;

function parseLevelHash(hash: string): SelectedLevel {
  const match = /^#level=([a-z-]+)$/i.exec(hash.trim());
  if (!match) return 'all';
  const candidate = match[1].toLowerCase();
  return (LEVEL_IDS as readonly string[]).includes(candidate) ? (candidate as LevelId) : 'all';
}

/**
 * Interactive progressive-enhancement price list.
 *
 * - Without JavaScript (and during SSR), the segmented level picker is not rendered
 *   and every level price for every available service is visible.
 * - With JavaScript, visitors can select a stylist level (`#level=senior`) to highlight
 *   that column on desktop and simplify each mobile block to just that level with a
 *   "Compare all levels" disclosure button.
 * - Hovering or focusing any Colour row lifts its matching swatch in the SwatchFan.
 */
export function PriceListInteractive({
  cutServices,
  colourServices,
  stylingServices,
  patchTestNote,
  cutIntro,
  colourIntro,
  stylingIntro,
}: {
  cutServices: readonly Service[];
  colourServices: readonly Service[];
  stylingServices: readonly Service[];
  patchTestNote: ReactNode;
  cutIntro: ReactNode;
  colourIntro: ReactNode;
  stylingIntro: ReactNode;
}) {
  const [hydrated, setHydrated] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<SelectedLevel>('all');
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [activeSwatch, setActiveSwatch] = useState<SwatchId | null>(null);

  useEffect(() => {
    setHydrated(true);
    const syncFromHash = () => setSelectedLevel(parseLevelHash(window.location.hash));
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  function chooseLevel(next: SelectedLevel) {
    setSelectedLevel(next);
    setExpandedRows({});
    if (typeof window !== 'undefined') {
      const nextHash = next === 'all' ? '' : `#level=${next}`;
      const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;
      window.history.replaceState(null, '', nextUrl);
    }
  }

  function toggleRowCompare(serviceId: string) {
    setExpandedRows(prev => ({ ...prev, [serviceId]: !prev[serviceId] }));
  }

  const activeLevelObj = selectedLevel === 'all' ? null : levels.find(l => l.id === selectedLevel);

  return (
    <div>
      {/* Progressive-enhancement level picker — rendered only when JS hydrates */}
      {hydrated ? (
        <div className="no-print border-b border-rule bg-surface/95">
          <div className="wrap py-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="dept-label text-[0.68rem]">Highlight a stylist level</span>
              <div
                role="group"
                aria-label="Filter or highlight prices by stylist level"
                className="flex items-center gap-1 overflow-x-auto pb-0.5"
              >
                <button
                  type="button"
                  className="mag-tab"
                  aria-pressed={selectedLevel === 'all'}
                  onClick={() => chooseLevel('all')}
                >
                  All levels
                </button>
                {levels.map(level => (
                  <button
                    key={level.id}
                    type="button"
                    className="mag-tab"
                    aria-pressed={selectedLevel === level.id}
                    onClick={() => chooseLevel(level.id)}
                  >
                    {level.shortName}
                  </button>
                ))}
              </div>
            </div>
            <p className="sr-only" role="status" aria-live="polite">
              {activeLevelObj
                ? `Highlighting ${activeLevelObj.name} prices.`
                : 'Showing prices for all stylist levels.'}
            </p>
          </div>
        </div>
      ) : null}

      {/* Section 1: Cut & finish */}
      <section id="cut" className="scroll-mt-24 border-b border-rule bg-paper py-14 sm:py-18">
        <div className="wrap">
          <DepartmentHeader
            folio="p.13"
            label="Department 01"
            title="Cut & finish"
            intro={cutIntro}
            motif={<CutMotif className="h-14 w-14" />}
          />
          <ServiceTable
            caption="Cut and finish prices by stylist level"
            services={cutServices}
            selectedLevel={selectedLevel}
            expandedRows={expandedRows}
            onToggleRow={toggleRowCompare}
            headBg="var(--paper)"
          />
        </div>
      </section>

      {/* Section 2: Colour — with SwatchFan sidebar & Editor's note patch-test box */}
      <section id="colour" className="scroll-mt-24 border-b border-rule bg-surface py-14 sm:py-18">
        <div className="wrap">
          <DepartmentHeader
            folio="p.14"
            label="Department 02"
            title="Colour"
            intro={colourIntro}
            motif={<ColourMotif className="h-14 w-14" />}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start">
            {/* Swatch fan: 3-column sticky sidebar on desktop, compact above table on mobile */}
            <aside className="lg:sticky lg:top-24 lg:col-span-3" aria-label="Colour swatch palette">
              <div className="mx-auto max-w-64 lg:max-w-none">
                <SwatchFan activeSwatch={activeSwatch} variant="sidebar" />
              </div>
              <p className="no-print mt-3 text-center text-xs italic text-muted">
                {activeSwatch
                  ? 'Shade highlighted from the colour menu'
                  : 'Hover or focus any colour service to lift its swatch.'}
              </p>
            </aside>

            {/* Colour table + Editor's note box */}
            <div className="lg:col-span-9">
              <ServiceTable
                caption="Colour service prices by stylist level"
                services={colourServices}
                selectedLevel={selectedLevel}
                expandedRows={expandedRows}
                onToggleRow={toggleRowCompare}
                onRowSwatch={setActiveSwatch}
                headBg="var(--surface)"
              />

              {/* Boxed "Editor's note" for skin allergy alert test */}
              <aside
                aria-label="Skin allergy alert test notice"
                className="mt-8 border border-ink bg-paper p-6 sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-rule bg-surface text-blush-ink">
                    <DropperIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="dept-label text-blush-ink">Editor&rsquo;s note</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink">{patchTestNote}</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Styling on blush halftone band */}
      <section id="styling" className="halftone-band scroll-mt-24 border-b border-rule py-14 sm:py-18">
        <div className="wrap">
          <DepartmentHeader
            folio="p.16"
            label="Department 03"
            title="Styling"
            intro={stylingIntro}
            motif={<StylingMotif className="h-14 w-14" />}
          />
          <ServiceTable
            caption="Styling service prices by stylist level"
            services={stylingServices}
            selectedLevel={selectedLevel}
            expandedRows={expandedRows}
            onToggleRow={toggleRowCompare}
            headBg="var(--paper-blush)"
          />
        </div>
      </section>
    </div>
  );
}

function DepartmentHeader({
  label,
  folio,
  title,
  intro,
  motif,
}: {
  label: string;
  folio: string;
  title: string;
  intro: ReactNode;
  motif: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="shrink-0">{motif}</div>
        <div>
          <p className="dept-label">
            {label} <span className="mx-1.5 text-gold">—</span> <span className="folio">{folio}</span>
          </p>
          <h2 className="mt-1 font-display text-[clamp(2rem,4.5vw,3.1rem)] font-medium italic leading-none text-headline-italic">
            {title}
          </h2>
        </div>
      </div>
      <p className="max-w-md text-sm text-muted">{intro}</p>
    </div>
  );
}

function ServiceTable({
  caption,
  services,
  selectedLevel,
  expandedRows,
  onToggleRow,
  onRowSwatch,
  headBg,
}: {
  caption: string;
  services: readonly Service[];
  selectedLevel: SelectedLevel;
  expandedRows: Record<string, boolean>;
  onToggleRow: (id: string) => void;
  onRowSwatch?: (swatch: SwatchId | null) => void;
  headBg: string;
}) {
  return (
    <div
      className="price-table-container"
      style={{ '--price-head-bg': headBg } as React.CSSProperties}
    >
      <table className="price-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col" className="w-[44%]">
              Service
            </th>
            {levels.map(level => (
              <th
                key={level.id}
                scope="col"
                data-highlighted={selectedLevel === level.id ? 'true' : 'false'}
              >
                {level.shortName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {services.map(service => {
            const isExpanded = !!expandedRows[service.id];
            const collapseOthersOnMobile = selectedLevel !== 'all' && !isExpanded;

            return (
              <tr
                key={service.id}
                id={service.id}
                onMouseEnter={onRowSwatch ? () => onRowSwatch(service.swatch ?? null) : undefined}
                onMouseLeave={onRowSwatch ? () => onRowSwatch(null) : undefined}
                onFocus={onRowSwatch ? () => onRowSwatch(service.swatch ?? null) : undefined}
                onBlur={onRowSwatch ? () => onRowSwatch(null) : undefined}
              >
                <th scope="row">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-display text-xl font-medium text-ink">{service.name}</span>
                    {service.patchTest ? (
                      <span
                        className="inline-flex items-center gap-1 text-[0.68rem] font-semibold tracking-[0.12em] text-blush-ink uppercase"
                        title="Requires a skin allergy alert test 48 hours prior"
                      >
                        <DropperIcon className="h-3.5 w-3.5" />
                        <span>Patch test</span>
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 max-w-md font-sans text-xs leading-relaxed text-muted sm:text-sm">
                    {service.description}
                  </p>
                  <p className="mt-1 font-sans text-[0.7rem] font-medium tracking-[0.12em] text-gold uppercase tabular-nums">
                    Approx. {formatDuration(service.durationMinutes)}
                  </p>
                </th>

                {levels.map(level => {
                  const amount = service.prices[level.id];
                  const isHighlighted = selectedLevel === level.id;
                  const hideOnMobile = collapseOthersOnMobile && !isHighlighted;
                  return (
                    <td
                      key={level.id}
                      data-level-label={level.name}
                      data-highlighted={isHighlighted ? 'true' : 'false'}
                      data-mobile-hidden={hideOnMobile ? 'true' : 'false'}
                    >
                      {amount === null ? (
                        <>
                          <span aria-hidden="true" className="text-muted">
                            —
                          </span>
                          <span className="sr-only">Not offered at this level</span>
                        </>
                      ) : (
                        <span className="tabular-nums">
                          {service.from ? (
                            <>
                              <span className="mr-1 text-xs font-normal italic text-muted">from</span>
                              <span className="font-medium">£{amount}</span>
                            </>
                          ) : (
                            <span className="font-medium">{formatPrice(amount, false)}</span>
                          )}
                        </span>
                      )}
                    </td>
                  );
                })}

                {/* Mobile-only expand control when a single stylist level is selected */}
                {selectedLevel !== 'all' ? (
                  <td className="price-table-expand-cell md:hidden">
                    <button
                      type="button"
                      className="text-xs font-semibold tracking-[0.14em] text-blush-ink uppercase underline"
                      aria-expanded={isExpanded}
                      onClick={() => onToggleRow(service.id)}
                    >
                      {isExpanded ? 'Show selected level only' : 'Compare all levels'}
                    </button>
                  </td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** Category anchor links used on the Prices level key. */
export function CategoryJumpBar({
  items,
}: {
  items: readonly { id: ServiceCategory; label: string; folio: string }[];
}) {
  return (
    <nav aria-label="Price list sections" className="no-print mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs">
      {items.map(item => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="editorial-link dept-label text-ink hover:text-blush-ink"
        >
          <span>{item.label}</span>
          <span className="folio">{item.folio}</span>
        </a>
      ))}
    </nav>
  );
}
