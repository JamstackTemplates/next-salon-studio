import type { ReactNode } from 'react';
import { business } from '../content/business';
import { levels } from '../content/levels';
import { stylists } from '../content/stylists';
import { mapDirectionsUrl } from '../lib/maps';
import { ClockIcon, EnvelopeIcon, PhoneIcon, PinIcon, StairsIcon } from './art/icons';
import { SevenDialsVignette } from './art/seven-dials-map';
import { StylistPortrait } from './art/stylist-portraits';
import { GoogleMap } from './google-map';
import { HoursTable } from './hours-table';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

/**
 * Magazine "Masthead" team credits page grouped under level headings in descending
 * editorial order (Art Directors -> Senior Stylists -> Stylists -> Graduate Stylists).
 */
export function StudioMastheadTeam({
  heading,
  intro,
}: {
  heading: ReactNode;
  intro: ReactNode;
}) {
  const orderedLevels = [...levels].reverse();

  return (
    <section aria-labelledby="masthead-team-heading" className="border-b border-rule bg-paper py-12 sm:py-16">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-5">
          <div>
            <p className="dept-label">
              Editorial Credits <span className="mx-1.5 text-gold">—</span> <span className="folio">p.33</span>
            </p>
            <h2
              id="masthead-team-heading"
              className="mt-1.5 font-display text-[clamp(2rem,4.5vw,3.1rem)] font-medium italic text-headline-italic"
            >
              {heading}
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted">{intro}</p>
        </div>

        <div className="mt-10 space-y-12">
          {orderedLevels.map(level => {
            const members = stylists.filter(s => s.levelId === level.id);
            if (!members.length) return null;

            return (
              <div
                key={level.id}
                className="grid gap-6 border-b border-rule pb-10 last:border-b-0 last:pb-0 lg:grid-cols-12"
              >
                <div className="lg:col-span-4 lg:pr-6">
                  <p className="folio">Level · {level.shortName}</p>
                  <h3 className="mt-1 font-display text-2xl font-medium italic text-blush-ink sm:text-3xl">
                    {level.pluralName}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{level.description}</p>
                </div>

                <div
                  className={`grid gap-8 lg:col-span-8 ${
                    members.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1 md:max-w-xl'
                  }`}
                >
                  {members.map(stylist => (
                    <article
                      key={stylist.id}
                      className="flex flex-col gap-5 border-t border-rule pt-6 sm:flex-row sm:items-start lg:border-t-0 lg:border-l lg:pt-0 lg:pl-7"
                    >
                      <StylistPortrait variant={stylist.portrait} className="h-36 w-28 shrink-0" />
                      <div className="min-w-0">
                        <h4 className="font-display text-2xl font-medium italic text-ink sm:text-[1.75rem]">
                          {stylist.name}
                        </h4>
                        <p className="mt-1.5 dept-label text-[0.68rem] text-gold">
                          {stylist.specialisms.join(' · ')}
                        </p>
                        <blockquote className="mt-3 font-display text-base italic leading-relaxed text-muted">
                          &ldquo;{stylist.quote}&rdquo;
                        </blockquote>
                        {!stylist.bookable ? (
                          <p className="mt-3 inline-block border border-rule bg-paper-blush px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.12em] text-blush-ink uppercase">
                            Not taking new clients this season
                          </p>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Five numbered studio steps along a horizontal editorial rule, wrapping vertically at 390px. */
function ExpectationsRoot({
  department,
  folio,
  heading,
  children,
}: {
  department: string;
  folio: string;
  heading: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="halftone-band reveal-on-scroll border-b border-rule py-16 sm:py-20">
      <div className="wrap">
        <p className="dept-label">
          {department} <span className="mx-1.5 text-gold">—</span> <span className="folio">{folio}</span>
        </p>
        <h2 className="mt-2 font-display text-[clamp(2rem,4.8vw,3.3rem)] font-medium italic text-headline-italic">
          {heading}
        </h2>

        <ol className="mt-10 grid gap-8 border-t-2 border-ink pt-8 md:grid-cols-5 md:gap-6">
          {children}
        </ol>
      </div>
    </section>
  );
}

function ExpectationStep({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="border-b border-ink/15 pb-5 last:border-b-0 md:border-b-0 md:border-l md:border-ink/20 md:pl-5 md:first:border-l-0 md:first:pl-0">
      <span className="font-display text-4xl font-medium italic leading-none text-gold tabular-nums">
        {number}
      </span>
      <h3 className="mt-3 font-display text-xl font-medium text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{children}</p>
    </li>
  );
}

export const StudioExpectations = Object.assign(ExpectationsRoot, { Step: ExpectationStep });

/** Visit & Accessibility section on /studio/: Seven Dials vignette + hours on left, GoogleMap + access note on right. */
export function StudioVisit({
  department,
  folio,
  heading,
  accessHeading,
}: {
  department: string;
  folio: string;
  heading: ReactNode;
  accessHeading: ReactNode;
}) {
  const directionsHref = mapDirectionsUrl(business.address.mapQuery);
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <section id="visit" className="scroll-mt-24 bg-paper py-16 sm:py-20">
      <div className="wrap">
        <div className="border-b border-ink pb-5">
          <p className="dept-label">
            {department} <span className="mx-1.5 text-gold">—</span> <span className="folio">{folio}</span>
          </p>
          <h2 className="mt-2 font-display text-[clamp(2.2rem,5vw,3.4rem)] font-medium italic text-headline-italic">
            {heading}
          </h2>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          {/* Left column: drawn vignette, address, full weekly hours with today highlight */}
          <div className="space-y-8 lg:col-span-5">
            <SevenDialsVignette />

            <div className="space-y-3 text-sm">
              <p className="flex items-start gap-2.5">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-blush-ink" />
                <span>
                  <strong className="block font-semibold text-ink">{business.address.formatted}</strong>
                  <span className="text-muted">{business.directions}</span>
                </span>
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                <a href={telHref} className="editorial-link inline-flex items-center gap-1.5 font-medium text-ink">
                  <PhoneIcon className="h-4 w-4 text-blush-ink" />
                  <span>{business.phone}</span>
                </a>
                <a
                  href={`mailto:${business.email}`}
                  className="editorial-link inline-flex items-center gap-1.5 font-medium text-ink wrap-anywhere"
                >
                  <EnvelopeIcon className="h-4 w-4 text-blush-ink" />
                  <span>{business.email}</span>
                </a>
              </div>
            </div>

            <div className="border border-rule bg-surface p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h3 className="dept-label flex items-center gap-2 text-blush-ink">
                  <ClockIcon className="h-4 w-4" />
                  <span>Opening hours</span>
                </h3>
                <OpenBadge hours={business.hours} className="text-xs font-medium text-ink" />
              </div>
              <HoursTable hours={business.hours} />
              <TimeZoneNote />
            </div>
          </div>

          {/* Right column: GoogleMap embed, Get directions link, accessibility note & CTA */}
          <div className="space-y-8 lg:col-span-7">
            <div className="border border-rule bg-surface p-3">
              <GoogleMap
                address={business.address.mapQuery}
                title={`Map showing ${business.name} at ${business.address.formatted}`}
              />
              <div className="flex flex-wrap items-center justify-between gap-3 px-2 pt-3 pb-1 text-xs">
                <span className="dept-label text-[0.68rem]">
                  {business.address.street}, {business.address.postalCode}
                </span>
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link dept-label text-blush-ink"
                >
                  Get directions ↗
                </a>
              </div>
            </div>

            <aside
              aria-label="Studio accessibility"
              className="border border-ink/70 bg-paper-blush/55 p-6 sm:p-7"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-rule bg-surface text-blush-ink">
                  <StairsIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="dept-label text-blush-ink">{accessHeading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink">{business.accessibility}</p>
                </div>
              </div>
            </aside>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <SiteLink href="/contact/" className="button">
                Request an appointment
              </SiteLink>
              <SiteLink href="/prices/" className="button button-quiet">
                See the price list
              </SiteLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
