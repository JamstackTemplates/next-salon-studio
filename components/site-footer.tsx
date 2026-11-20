import { business } from '../content/business';
import { EnvelopeIcon, PhoneIcon, PinIcon } from './art/icons';
import { Wordmark } from './art/wordmark';
import { HoursTable } from './hours-table';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

/**
 * Full-width "back cover" editorial footer on blush halftone paper with
 * the full masthead, three ruled columns (Visit, Hours, Write to us) and folio p.48.
 */
export function SiteFooter() {
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <footer className="halftone-band mt-20 border-t-2 border-ink pt-14 pb-10">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink/25 pb-10">
          <Wordmark variant="footer" />
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <span className="folio">
              Issue {business.issue.number} · {business.issue.season}
            </span>
            <SiteLink href="/contact/" className="button">
              Request an appointment
            </SiteLink>
          </div>
        </div>

        {/* Three editorial columns with hairline rules */}
        <div className="grid gap-10 border-b border-ink/25 py-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-ink/20">
          {/* Column 1: Visit */}
          <div className="space-y-3 md:pr-8">
            <h2 className="dept-label flex items-center gap-2 text-blush-ink">
              <PinIcon className="h-4 w-4" />
              <span>Visit</span>
            </h2>
            <p className="font-display text-lg leading-snug text-ink">
              {business.address.floor}, {business.address.street}
              <br />
              {business.address.area}, {business.address.locality} {business.address.postalCode}
            </p>
            <p className="text-sm text-muted">{business.directions}</p>
            <p className="pt-1 text-xs font-semibold tracking-[0.15em] uppercase">
              <SiteLink href="/studio/#visit" className="editorial-link text-blush-ink">
                Studio map &amp; access notes →
              </SiteLink>
            </p>
          </div>

          {/* Column 2: Hours */}
          <div className="space-y-3 md:px-8">
            <h2 className="dept-label text-blush-ink">Hours</h2>
            <HoursTable hours={business.hours} compact />
            <TimeZoneNote className="text-muted" />
          </div>

          {/* Column 3: Write to us */}
          <div className="space-y-3 md:pl-8">
            <h2 className="dept-label text-blush-ink">Write to us</h2>
            <p className="text-sm text-muted">
              For appointment enquiries, colour consultations and occasion hair requests:
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="editorial-link inline-flex items-center gap-2 font-medium text-ink wrap-anywhere"
                >
                  <EnvelopeIcon className="h-4 w-4 shrink-0 text-blush-ink" />
                  <span>{business.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={telHref}
                  className="editorial-link inline-flex items-center gap-2 font-medium text-ink"
                >
                  <PhoneIcon className="h-4 w-4 shrink-0 text-blush-ink" />
                  <span>{business.phone}</span>
                </a>
              </li>
            </ul>
            <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-2 pt-3 text-xs font-semibold tracking-[0.14em] uppercase">
              <SiteLink href="/prices/" className="editorial-link text-ink">
                Prices
              </SiteLink>
              <SiteLink href="/lookbook/" className="editorial-link text-ink">
                Lookbook
              </SiteLink>
              <SiteLink href="/studio/" className="editorial-link text-ink">
                The Studio
              </SiteLink>
              <SiteLink href="/contact/" className="editorial-link text-ink">
                Contact
              </SiteLink>
            </nav>
          </div>
        </div>

        {/* Small-print colophon line with folio p.48 */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 text-xs text-muted">
          <p>
            <span className="folio mr-3">p.48</span>
            {business.name} · Sample gallery studio · All prices in GBP incl. VAT.
          </p>
          <span title="Made with love by jamstacks.net">
            with{' '}
            <span role="img" aria-label="love">
              ❤️
            </span>{' '}
            <a className="no-underline hover:text-blush-ink hover:underline" href="https://jamstacks.net">
              jamstacks.net
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
