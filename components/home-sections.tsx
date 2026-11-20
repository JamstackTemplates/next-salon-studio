import type { CSSProperties, ReactNode } from 'react';
import { business } from '../content/business';
import { LEVEL_IDS, levels } from '../content/levels';
import { lookbook, lookFromTotal } from '../content/lookbook';
import {
  formatPrice,
  lowestCategoryPrice,
  lowestServicePrice,
  serviceById,
  type ServiceCategory,
} from '../content/services';
import { stylistById } from '../content/stylists';
import { asset } from '../lib/paths';
import { IssueBarcode } from './art/cover-portrait';
import { ColumnRuleDivider, CutLineDivider } from './art/dividers';
import { ClockIcon, EnvelopeIcon, PhoneIcon, PinIcon } from './art/icons';
import { ColourMotif, CutMotif, StylingMotif } from './art/section-motifs';
import { SevenDialsVignette } from './art/seven-dials-map';
import { SwatchTab } from './art/swatch-fan';
import { LookPhoto } from './look-photo';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

/* ============================================================================
   1. Cover Hero — Magazine front cover on plain blush-tinted paper
   ============================================================================ */

function CoverHeroRoot({
  mastheadTop,
  mastheadBottom,
  coverLines,
  headline,
  subline,
  primaryCta,
  secondaryCta,
}: {
  mastheadTop: string;
  mastheadBottom: string;
  coverLines: ReactNode;
  headline: ReactNode;
  subline: ReactNode;
  primaryCta: ReactNode;
  secondaryCta: ReactNode;
}) {
  return (
    <section className="relative overflow-x-clip border-b border-rule bg-paper pt-3 pb-12 sm:pt-5 lg:pb-16">
      <div className="wrap">
        {/* Edge-to-edge magazine masthead: two stacked lines on mobile, unified edge-to-edge cover masthead on wide screens */}
        <div className="relative z-10 border-y border-ink/80 py-1.5 sm:py-2" aria-hidden="true">
          <p className="flex flex-col items-center justify-center font-display text-[clamp(3.05rem,15.5vw,4.6rem)] font-black leading-[0.86] tracking-[-0.045em] text-ink uppercase sm:flex-row sm:gap-[0.22em] sm:text-[clamp(4.2rem,10.6vw,9.3rem)] sm:leading-[0.84]">
            <span>{mastheadTop}</span>
            <span className="text-blush-ink">{mastheadBottom}</span>
          </p>
        </div>

        {/* 12-column cover spread: portrait on the left, cover lines and lead on the right */}
        <div className="relative grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left 7 columns: full-bleed cover portrait, the hero of the page */}
          <figure className="relative mx-auto mt-5 w-full max-w-[23rem] sm:mt-7 sm:max-w-[32rem] lg:col-span-7 lg:mt-8 lg:max-w-none print:hidden">
            <div className="relative">
              {/* Offset blush plate behind the photograph, like a tipped-in print */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-2 translate-y-2 bg-paper-blush sm:translate-x-4 sm:translate-y-4"
              />

              <div
                aria-hidden="true"
                className="cover-portrait relative aspect-square w-full bg-cover bg-center shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)] ring-1 ring-ink/10"
                style={{
                  '--cover-portrait-light': `url("${asset('/salon-light.webp')}")`,
                  '--cover-portrait-dark': `url("${asset('/salon-dark.webp')}")`,
                } as CSSProperties}
              />

              {/* Barcode tucked into the portrait's bottom-left corner on desktop */}
              <div className="hidden lg:absolute lg:bottom-5 lg:left-5 lg:z-10 lg:block lg:bg-paper lg:p-2">
                <IssueBarcode />
              </div>
            </div>

            <figcaption className="relative mt-5 flex items-baseline justify-between gap-4 sm:mt-7">
              <span className="dept-label text-[0.65rem] text-gold">On the cover</span>
              <span className="font-display text-sm text-muted italic">The Glass Bob, cut in {business.address.area}</span>
            </figcaption>
          </figure>

          {/* Right 5 columns: Cover lines, lead headline, subline & actions */}
          <div className="relative z-20 flex flex-col justify-between lg:col-span-5 lg:border-l lg:border-rule lg:pt-8 lg:pl-8 lg:pb-4">
            {/* Editorial cover lines (shown above lead on desktop, compact strip below on mobile) */}
            <div className="hidden space-y-4 border-b border-rule pb-6 lg:block">
              <p className="folio">Cover Story · {business.address.area}</p>
              <ul className="space-y-3">{coverLines}</ul>
            </div>

            {/* Lead story headline & primary/secondary actions */}
            <div className="lg:pt-7">
              <h1 className="font-display text-[clamp(2.1rem,8.5vw,3.9rem)] font-medium italic leading-[0.98] tracking-[-0.02em] text-headline-italic">
                {headline}
              </h1>
              <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted sm:mt-4 sm:text-base">
                {subline}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6">
                <SiteLink href="/contact/" className="button">
                  {primaryCta}
                </SiteLink>
                <SiteLink href="/prices/" className="button button-quiet">
                  {secondaryCta}
                </SiteLink>
              </div>
            </div>

            {/* Mobile cover lines + barcode below primary action so CTA stays above fold at 390px */}
            <div className="mt-8 flex flex-wrap items-end justify-between gap-5 border-t border-rule pt-5 lg:hidden">
              <ul className="flex-1 min-w-52 space-y-2.5">{coverLines}</ul>
              <IssueBarcode />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoverLine({
  label,
  children,
  href,
}: {
  label: string;
  children: ReactNode;
  href: string;
}) {
  return (
    <li className="group">
      <SiteLink href={href} className="block no-underline">
        <span className="dept-label block text-[0.65rem] text-gold">{label}</span>
        <span className="font-display text-lg leading-snug text-ink italic transition-colors group-hover:text-blush-ink sm:text-xl">
          {children}
        </span>
      </SiteLink>
    </li>
  );
}

export const CoverHero = Object.assign(CoverHeroRoot, { CoverLine });

/* ============================================================================
   2. "In this issue" — Magazine contents list on blush halftone paper
   ============================================================================ */

const CATEGORY_MOTIFS: Record<ServiceCategory, ReactNode> = {
  cut: <CutMotif className="h-12 w-12 sm:h-14 sm:w-14" />,
  colour: <ColourMotif className="h-12 w-12 sm:h-14 sm:w-14" />,
  styling: <StylingMotif className="h-12 w-12 sm:h-14 sm:w-14" />,
};

function ContentsIssueRoot({
  department,
  folio,
  heading,
  intro,
  children,
}: {
  department: string;
  folio: string;
  heading: ReactNode;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="halftone-band reveal-on-scroll border-b border-rule py-14 sm:py-20">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="dept-label">
              {department} <span className="mx-1.5 text-gold">—</span> <span className="folio">{folio}</span>
            </p>
            <h2 className="mt-2 font-display text-[clamp(2.2rem,5vw,3.5rem)] font-medium italic leading-[1.02] text-headline-italic">
              {heading}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted lg:col-span-7 lg:justify-self-end">
            {intro}
          </p>
        </div>

        <ol className="mt-10 divide-y divide-ink/20 border-y border-ink/30">{children}</ol>
      </div>
    </section>
  );
}

function ContentsEntry({
  number,
  category,
  title,
  pageNote,
  children,
}: {
  number: string;
  category: ServiceCategory;
  title: string;
  pageNote: string;
  children: ReactNode;
}) {
  const lowest = lowestCategoryPrice(category);

  return (
    <li>
      <SiteLink
        href={`/prices/#${category}`}
        className="group grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-2 py-6 no-underline sm:grid-cols-[4.5rem_auto_1fr_auto] sm:gap-x-7 sm:py-7"
      >
        <span className="font-display text-[clamp(2.4rem,4.5vw,3.5rem)] font-medium italic leading-none text-gold tabular-nums">
          {number}
        </span>

        <div className="hidden sm:block">{CATEGORY_MOTIFS[category]}</div>

        <div className="min-w-0">
          <div className="flex items-baseline gap-3">
            <h3 className="font-display text-2xl font-medium text-ink transition-colors group-hover:text-blush-ink sm:text-3xl">
              {title}
            </h3>
            <span className="contents-leader hidden sm:block" aria-hidden="true" />
          </div>
          <p className="mt-1 text-sm text-muted sm:text-base">{children}</p>
        </div>

        <div className="col-span-2 flex items-baseline justify-between gap-4 pl-14 sm:col-span-1 sm:flex-col sm:items-end sm:pl-0">
          <span className="font-display text-xl italic text-blush-ink tabular-nums sm:text-2xl">
            {lowest !== null ? `from £${lowest}` : 'See list'}
          </span>
          <span className="folio text-[0.68rem]">{pageNote} →</span>
        </div>
      </SiteLink>
    </li>
  );
}

export const ContentsIssue = Object.assign(ContentsIssueRoot, { Entry: ContentsEntry });

/* ============================================================================
   3. "How our levels work" — 4-column ladder + stepped SVG price polyline
   ============================================================================ */

export function LevelLadder({
  department,
  folio,
  heading,
  intro,
}: {
  department: string;
  folio: string;
  heading: ReactNode;
  intro: ReactNode;
}) {
  const cutAndFinish = serviceById('cut-and-finish');
  const stepPrices = LEVEL_IDS.map(id => cutAndFinish?.prices[id] ?? 0);
  const maxPrice = Math.max(...stepPrices, 110);
  const minPrice = Math.min(...stepPrices.filter(Boolean), 40);

  // Build stepped SVG polyline points across 4 equal columns (0..800 x 0..92)
  const colW = 200;
  const yFor = (price: number) => {
    const ratio = maxPrice === minPrice ? 0.5 : (price - minPrice) / (maxPrice - minPrice);
    return Math.round(74 - ratio * 52);
  };

  const steppedPath = stepPrices
    .map((price, idx) => {
      const x1 = idx * colW + 18;
      const x2 = (idx + 1) * colW - 18;
      const y = yFor(price);
      if (idx === 0) return `M ${x1} ${y} L ${x2} ${y}`;
      return `L ${x1} ${y} L ${x2} ${y}`;
    })
    .join(' ');

  return (
    <section className="reveal-on-scroll border-b border-rule bg-paper py-16 sm:py-22">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="dept-label">
              {department} <span className="mx-1.5 text-gold">—</span> <span className="folio">{folio}</span>
            </p>
            <h2 className="mt-2 font-display text-[clamp(2.2rem,5vw,3.4rem)] font-medium italic leading-[1.02] text-headline-italic">
              {heading}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted">{intro}</p>
        </div>

        {/* 4-column editorial ladder separated by vertical hairline rules */}
        <div className="mt-10 grid gap-8 border-t border-ink pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-rule">
          {levels.map((level, idx) => {
            const price = cutAndFinish?.prices[level.id] ?? null;
            return (
              <div
                key={level.id}
                className="flex flex-col justify-between lg:px-6 lg:first:pl-0 lg:last:pr-0"
              >
                <div>
                  <span className="folio text-[0.68rem]">Tier 0{idx + 1}</span>
                  <h3 className="mt-1.5 font-display text-2xl font-medium italic text-ink">
                    {level.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{level.description}</p>
                </div>

                <div className="mt-6 flex items-baseline justify-between border-t border-dotted border-rule pt-3">
                  <span className="dept-label text-[0.66rem]">Cut &amp; finish</span>
                  <span className="font-display text-2xl font-medium text-blush-ink tabular-nums">
                    {formatPrice(price)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stepped hairline SVG price graph driven from content/services.ts */}
        <div className="mt-8 hidden border-t border-rule pt-5 lg:block" aria-hidden="true">
          <div className="mb-1 flex items-center justify-between text-[0.68rem] tracking-[0.16em] text-muted uppercase">
            <span>Cut &amp; finish progression by stylist level</span>
            <span className="folio">
              £{stepPrices[0]} → £{stepPrices[stepPrices.length - 1]}
            </span>
          </div>
          <svg viewBox="0 0 800 96" className="h-24 w-full" fill="none">
            {/* Subtle horizontal reference hairlines */}
            <line x1="0" y1="22" x2="800" y2="22" stroke="var(--rule)" strokeDasharray="3 4" />
            <line x1="0" y1="48" x2="800" y2="48" stroke="var(--rule)" strokeDasharray="3 4" />
            <line x1="0" y1="74" x2="800" y2="74" stroke="var(--rule)" strokeDasharray="3 4" />
            {/* Vertical column separators */}
            <line x1="200" y1="8" x2="200" y2="88" stroke="var(--rule)" />
            <line x1="400" y1="8" x2="400" y2="88" stroke="var(--rule)" />
            <line x1="600" y1="8" x2="600" y2="88" stroke="var(--rule)" />
            {/* Stepped hairline curve */}
            <path d={steppedPath} stroke="var(--blush-ink)" strokeWidth="1.8" strokeLinejoin="round" />
            {/* Node markers & tabular labels */}
            {stepPrices.map((price, idx) => {
              const cx = idx * colW + colW / 2;
              const cy = yFor(price);
              return (
                <g key={LEVEL_IDS[idx]}>
                  <circle cx={cx} cy={cy} r="4.5" fill="var(--paper)" stroke="var(--blush-ink)" strokeWidth="1.8" />
                  <circle cx={cx} cy={cy} r="1.8" fill="var(--gold-foil)" />
                  <text
                    x={cx}
                    y={cy - 10}
                    textAnchor="middle"
                    fill="var(--ink)"
                    fontFamily="var(--font-sans)"
                    fontSize="11"
                    fontWeight="600"
                  >
                    £{price}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-8 flex justify-end">
          <SiteLink href="/prices/" className="editorial-link dept-label text-blush-ink">
            Compare all 17 services by level →
          </SiteLink>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   4. Lookbook Preview — Asymmetric 8/4 editorial magazine spread on --surface
   ============================================================================ */

export function LookbookPreview({
  department,
  folio,
  heading,
  ctaLabel,
}: {
  department: string;
  folio: string;
  heading: ReactNode;
  ctaLabel: ReactNode;
}) {
  const featured = lookbook.find(l => l.id === 'the-glass-bob') ?? lookbook[0];
  const secondary = [
    lookbook.find(l => l.id === 'rose-gold-melt') ?? lookbook[1],
    lookbook.find(l => l.id === 'defined-coils') ?? lookbook[6],
  ];

  const renderMeta = (look: (typeof lookbook)[number]) => {
    const stylist = stylistById(look.stylistId);
    const total = lookFromTotal(look);
    return (
      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2 border-t border-rule pt-2.5 text-xs">
        <span className="dept-label text-[0.68rem]">
          {look.creditLabel}: <strong className="font-semibold text-ink">{stylist?.name}</strong>
        </span>
        <span className="font-display text-base italic text-blush-ink tabular-nums">
          from £{total}
        </span>
      </div>
    );
  };

  return (
    <section className="reveal-on-scroll border-b-2 border-ink bg-surface py-16 sm:py-22">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-6">
          <div>
            <p className="dept-label">
              {department} <span className="mx-1.5 text-gold">—</span> <span className="folio">{folio}</span>
            </p>
            <h2 className="mt-2 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-medium italic leading-[1.02] text-headline-italic">
              {heading}
            </h2>
          </div>
          <SiteLink href="/lookbook/" className="editorial-link dept-label text-blush-ink">
            {ctaLabel} →
          </SiteLink>
        </div>

        {/* Asymmetric 8/4 spread */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-0">
          {/* Left 7 columns: Hero spread figure */}
          <figure className="relative lg:col-span-7 lg:border-r lg:border-rule lg:pr-10">
            <div className="relative border border-rule bg-paper p-3 sm:p-4">
              <SwatchTab swatchId={featured.swatch} className="absolute -top-3 left-5 z-10" />
              <LookPhoto look={featured} className="aspect-square sm:aspect-[5/4] [&_img]:object-[50%_15%]" />
            </div>
            <figcaption className="mt-4">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-3xl font-medium italic text-ink">{featured.title}</h3>
                <span className="folio">Plate 01</span>
              </div>
              <p className="mt-2 max-w-xl text-sm italic leading-relaxed text-muted">{featured.caption}</p>
              {renderMeta(featured)}
            </figcaption>
          </figure>

          {/* Right 5 columns: Two stacked editorial figures */}
          <div className="flex flex-col justify-between gap-10 lg:col-span-5 lg:pl-10">
            {secondary.map((look, idx) => (
              <figure key={look.id} className="grid gap-5 sm:grid-cols-2 sm:items-center">
                <div className="relative border border-rule bg-paper p-2">
                  <SwatchTab swatchId={look.swatch} className="absolute -top-3 left-3 z-10 scale-90 origin-left" />
                  <LookPhoto look={look} className="aspect-[670/754]" />
                </div>
                <figcaption>
                  <span className="folio">Plate 0{idx + 2}</span>
                  <h3 className="mt-1 font-display text-2xl font-medium italic text-ink">{look.title}</h3>
                  <p className="mt-1.5 text-sm italic leading-relaxed text-muted">{look.caption}</p>
                  {renderMeta(look)}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   5. Pull Quote — Centred large blush-ink Didone quote on plain paper
   ============================================================================ */

export function EditorialPullQuote({
  quote,
  attribution,
  role,
}: {
  quote: ReactNode;
  attribution: string;
  role: string;
}) {
  return (
    <section className="reveal-on-scroll border-b border-rule bg-paper py-16 sm:py-24">
      <div className="wrap max-w-3xl text-center">
        <span
          className="block font-display text-[5rem] leading-[0.5] text-blush select-none sm:text-[6.5rem]"
          aria-hidden="true"
        >
          “
        </span>
        <blockquote className="mt-3 font-display text-[clamp(1.8rem,4.2vw,3rem)] font-medium italic leading-[1.2] text-blush-ink">
          {quote}
        </blockquote>
        <CutLineDivider className="mx-auto mt-8 mb-5 max-w-md" />
        <p className="dept-label text-ink">
          {attribution} <span className="mx-2 text-gold">·</span> <span className="text-muted">{role}</span>
        </p>
      </div>
    </section>
  );
}

/* ============================================================================
   6. Visit Strip — 2-column halftone band with Seven Dials map vignette
   ============================================================================ */

export function VisitStrip({
  department,
  folio,
  heading,
  ctaLabel,
}: {
  department: string;
  folio: string;
  heading: ReactNode;
  ctaLabel: ReactNode;
}) {
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <section className="halftone-band reveal-on-scroll py-16 sm:py-20">
      <div className="wrap">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Left: Seven Dials editorial street map vignette */}
          <div className="lg:col-span-6">
            <SevenDialsVignette />
          </div>

          {/* Right: Address, directions, today's hours, contact details & CTA */}
          <div className="border border-rule bg-surface p-7 sm:p-9 lg:col-span-6">
            <p className="dept-label">
              {department} <span className="mx-1.5 text-gold">—</span> <span className="folio">{folio}</span>
            </p>
            <h2 className="mt-2 font-display text-[clamp(2rem,4vw,2.9rem)] font-medium italic leading-tight text-headline-italic">
              {heading}
            </h2>

            <ColumnRuleDivider className="my-5" />

            <div className="space-y-4 text-sm">
              <p className="flex items-start gap-3">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-blush-ink" />
                <span>
                  <strong className="block font-semibold text-ink">{business.address.formatted}</strong>
                  <span className="text-muted">{business.directions}</span>
                </span>
              </p>

              <p className="flex items-center gap-3">
                <ClockIcon className="h-4 w-4 shrink-0 text-blush-ink" />
                <OpenBadge hours={business.hours} className="font-medium text-ink" />
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
                <a href={telHref} className="editorial-link inline-flex items-center gap-2 font-medium text-ink">
                  <PhoneIcon className="h-4 w-4 text-blush-ink" />
                  <span>{business.phone}</span>
                </a>
                <a
                  href={`mailto:${business.email}`}
                  className="editorial-link inline-flex items-center gap-2 font-medium text-ink wrap-anywhere"
                >
                  <EnvelopeIcon className="h-4 w-4 text-blush-ink" />
                  <span>{business.email}</span>
                </a>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <SiteLink href="/contact/" className="button">
                {ctaLabel}
              </SiteLink>
              <SiteLink href="/studio/#visit" className="editorial-link dept-label text-blush-ink">
                Full hours &amp; map →
              </SiteLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Helper exported for Home page cover line so "Balayage from £160" always reflects content/services.ts. */
export function balayageLowestPrice(): number {
  const balayage = serviceById('balayage');
  return (balayage ? lowestServicePrice(balayage) : null) ?? 160;
}
