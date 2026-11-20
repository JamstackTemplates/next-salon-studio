import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { PhoneIcon } from './art/icons';
import { Wordmark } from './art/wordmark';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

const NAV_ITEMS = [
  { href: '/prices/', label: 'Prices' },
  { href: '/lookbook/', label: 'Lookbook' },
  { href: '/studio/', label: 'The Studio' },
  { href: '/contact/', label: 'Contact' },
] as const;

export function SiteHeader() {
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <header className="relative z-40 border-b border-rule bg-paper/95 backdrop-blur-xs">
      {/* Top editorial masthead strip — collapses on small mobile screens */}
      <div className="no-print hidden border-b border-rule/80 bg-surface/80 sm:block">
        <div className="wrap flex min-h-9 items-center justify-between gap-4 text-[0.72rem] tracking-[0.14em] text-muted uppercase">
          <div className="flex items-center gap-4">
            <span className="folio">
              Issue {business.issue.number} · {business.issue.season}
            </span>
            <span className="h-3 w-px bg-rule" aria-hidden="true" />
            <OpenBadge hours={business.hours} className="normal-case tracking-[0.04em] text-ink" />
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">{business.address.area}, {business.address.locality}</span>
            <span className="hidden h-3 w-px bg-rule md:inline-block" aria-hidden="true" />
            <a
              href={telHref}
              className="editorial-link inline-flex items-center gap-1.5 font-medium text-ink"
            >
              <PhoneIcon className="h-3.5 w-3.5 text-blush-ink" />
              <span>{business.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main header bar */}
      <div className="wrap flex min-h-20 items-center justify-between gap-4 py-3">
        <SiteLink
          href="/"
          className="shrink-0 no-underline focus-visible:outline-offset-4"
          aria-label={`${business.name} — Home`}
        >
          <Wordmark variant="compact" />
        </SiteLink>

        {/* Desktop navigation */}
        <div className="no-print hidden items-center gap-5 lg:flex">
          <nav aria-label="Main" className="flex items-center">
            {NAV_ITEMS.map((item, idx) => (
              <span
                key={item.href}
                className={`flex items-center ${idx > 0 ? 'border-l border-rule pl-5' : ''} ${
                  idx < NAV_ITEMS.length - 1 ? 'pr-5' : ''
                }`}
              >
                <SiteLink
                  href={item.href}
                  markCurrent="page"
                  className="editorial-link py-1 text-[0.75rem] font-semibold tracking-[0.16em] text-ink uppercase hover:text-blush-ink aria-[current=page]:text-blush-ink"
                >
                  {item.label}
                </SiteLink>
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-3 border-l border-rule pl-5">
            <DarkModeToggle />
            <SiteLink href="/contact/" className="button">
              Request an appointment
            </SiteLink>
          </div>
        </div>

        {/* Mobile controls: theme toggle + progressive no-JS <details> disclosure menu */}
        <div className="no-print flex items-center gap-2.5 lg:hidden">
          <DarkModeToggle />
          <details className="mobile-nav-details relative">
            <summary
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 border border-rule bg-surface px-3.5 text-[0.72rem] font-semibold tracking-[0.16em] text-ink uppercase hover:border-blush-ink hover:text-blush-ink"
              aria-label="Open navigation menu"
            >
              <span>Menu</span>
              <svg viewBox="0 0 18 14" className="h-3.5 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M1 2h16M1 7h16M1 12h16" strokeLinecap="round" />
              </svg>
            </summary>

            <div className="absolute right-0 mt-2 w-[min(calc(100vw-2rem),21rem)] border border-ink bg-surface p-5 shadow-lg">
              <p className="folio pb-3">
                Issue {business.issue.number} · {business.issue.shortSeason}
              </p>
              <nav aria-label="Main mobile" className="flex flex-col divide-y divide-rule border-y border-rule">
                {NAV_ITEMS.map(item => (
                  <SiteLink
                    key={item.href}
                    href={item.href}
                    markCurrent="page"
                    className="flex items-center justify-between py-3 text-[0.8rem] font-semibold tracking-[0.16em] text-ink uppercase no-underline hover:text-blush-ink aria-[current=page]:text-blush-ink"
                  >
                    <span>{item.label}</span>
                    <span className="font-display text-base italic text-gold" aria-hidden="true">→</span>
                  </SiteLink>
                ))}
              </nav>

              <div className="mt-4 space-y-3">
                <SiteLink href="/contact/" className="button w-full">
                  Request an appointment
                </SiteLink>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-muted">
                  <OpenBadge hours={business.hours} />
                  <a href={telHref} className="font-medium text-ink underline">
                    {business.phone}
                  </a>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
