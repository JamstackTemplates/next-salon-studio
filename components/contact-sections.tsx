import type { ReactNode } from 'react';
import { business } from '../content/business';
import { EnvelopeIcon, PhoneIcon, PinIcon, ScissorsIcon } from './art/icons';
import { CopyEmail } from './copy-email';
import { JamstacksSupportForm } from './jamstacks-support-form';
import { OpenBadge } from './open-badge';

/**
 * Editorial "Letters page" Contact layout:
 * Left column holds the page head, "Useful to include" motif list, and the
 * "Letters to the editor" column with email, phone and address.
 * Right column holds the hosted Jamstacks form (or unconfigured email fallback)
 * inside a bordered panel with a subtle blush corner fold.
 */
export function ContactLettersPage({
  head,
  usefulHeading,
  lettersHeading,
  fallbackHeading,
  fallbackBody,
  hosted,
  siteId,
  embedUrl,
}: {
  head: ReactNode;
  usefulHeading: ReactNode;
  lettersHeading: ReactNode;
  fallbackHeading: ReactNode;
  fallbackBody: ReactNode;
  hosted: boolean;
  siteId: string;
  embedUrl: string;
}) {
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <div className="wrap py-10 sm:py-14">
      <div className="grid items-start gap-12 lg:grid-cols-12">
        {/* Left column: page head, useful to include, letters to the editor */}
        <div className="space-y-8 lg:col-span-6">
          {head}

          <section aria-labelledby="useful-to-include-heading">
            <h2 id="useful-to-include-heading" className="dept-label text-blush-ink">
              {usefulHeading}
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
              {business.enquiries.usefulToInclude.map(tip => (
                <li key={tip} className="flex items-start gap-3">
                  <ScissorsIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          <aside
            aria-label="Direct contact details"
            className="border-y border-ink/70 bg-paper-blush/45 px-6 py-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl font-medium italic text-ink">{lettersHeading}</h2>
              <span className="folio">Desk · WC2H</span>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${business.email}`}
                  className="text-link inline-flex items-center gap-2 font-medium wrap-anywhere"
                >
                  <EnvelopeIcon className="h-4 w-4 shrink-0" />
                  <span>{business.email}</span>
                </a>
                <CopyEmail email={business.email} />
              </div>

              <p>
                <a
                  href={telHref}
                  className="editorial-link inline-flex items-center gap-2 font-medium text-ink"
                >
                  <PhoneIcon className="h-4 w-4 text-blush-ink" />
                  <span>{business.phone}</span>
                </a>
              </p>

              <p className="flex items-start gap-2 text-muted">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-blush-ink" />
                <span>{business.address.formatted}</span>
              </p>

              <p className="pt-1 text-xs text-muted">
                <OpenBadge hours={business.hours} />
              </p>
            </div>
          </aside>
        </div>

        {/* Right column: bordered panel with blush corner fold hosting the Jamstacks form */}
        <section
          aria-label="Appointment enquiry form"
          className="corner-fold-panel p-6 sm:p-9 lg:col-span-6 lg:mt-4"
        >
          <div className="mb-6 border-b border-rule pb-4">
            <p className="dept-label text-gold">Enquiry Dispatch — p.43</p>
            <p className="mt-1.5 font-display text-2xl font-medium italic text-ink">
              Send your request to the studio desk
            </p>
          </div>

          {hosted ? (
            <JamstacksSupportForm siteId={siteId} embedUrl={embedUrl} email={business.email} />
          ) : (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-medium text-ink">{fallbackHeading}</h2>
              <p className="text-sm leading-relaxed text-muted">{fallbackBody}</p>
              <p className="pt-1">
                <a
                  href={`mailto:${business.email}`}
                  className="button"
                >
                  Email {business.email}
                </a>
              </p>
            </div>
          )}

          <p className="mt-6 border-t border-rule pt-4 text-xs leading-relaxed text-muted">
            Enquiries do not hold a slot or take a deposit. Your appointment is confirmed only when we
            reply with a suggested time.
          </p>
        </section>
      </div>
    </div>
  );
}
