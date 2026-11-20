import type { ReactNode } from 'react';
import { levels } from '../content/levels';
import { CutLineDivider } from './art/dividers';
import { SiteLink } from './site-link';

/** Magazine "Key" box explaining the four stylist levels; 4 columns on desktop, 2x2 grid at 390px. */
export function LevelKey({
  heading,
  children,
}: {
  heading: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section aria-label="Stylist level key" className="pb-10">
      <div className="wrap">
        <div className="border border-ink/70 bg-surface p-5 sm:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule pb-3">
            <h2 className="dept-label text-blush-ink">{heading}</h2>
            <span className="folio">Key · Four levels</span>
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-5 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-rule">
            {levels.map((level, idx) => (
              <div
                key={level.id}
                className="lg:px-5 lg:first:pl-0 lg:last:pr-0"
              >
                <dt className="font-display text-lg font-medium italic text-ink sm:text-xl">
                  <span className="folio mr-1.5 text-[0.65rem] not-italic">0{idx + 1}</span>
                  {level.name}
                </dt>
                <dd className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">
                  {level.description}
                </dd>
              </div>
            ))}
          </dl>
          {children}
        </div>
      </div>
    </section>
  );
}

/** Two-column footnote-sized colophon with numbered notes at the end of /prices/. */
function SmallPrintRoot({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  return (
    <section aria-label="Price list small print" className="border-b border-rule bg-paper py-12">
      <div className="wrap">
        <h2 className="dept-label text-blush-ink">{heading}</h2>
        <ol className="mt-5 grid gap-x-10 gap-y-4 text-xs leading-relaxed text-muted sm:grid-cols-2 sm:text-sm">
          {children}
        </ol>
      </div>
    </section>
  );
}

function SmallPrintNote({ number, children }: { number: string; children: ReactNode }) {
  return (
    <li className="flex items-baseline gap-3 border-t border-rule pt-3">
      <span className="folio shrink-0">{number}</span>
      <span>{children}</span>
    </li>
  );
}

export const SmallPrint = Object.assign(SmallPrintRoot, { Note: SmallPrintNote });

/** Editorial closing call-to-action strip used at the foot of Prices and Lookbook. */
export function EditorialCta({
  eyebrow,
  line,
  buttonLabel,
  secondaryHref,
  secondaryLabel,
}: {
  eyebrow?: string;
  line: ReactNode;
  buttonLabel: ReactNode;
  secondaryHref?: string;
  secondaryLabel?: ReactNode;
}) {
  return (
    <section className="bg-paper py-14 sm:py-18">
      <div className="wrap max-w-2xl text-center">
        <CutLineDivider className="mx-auto mb-8 max-w-md" />
        {eyebrow ? <p className="dept-label mb-2 text-gold">{eyebrow}</p> : null}
        <p className="font-display text-[clamp(1.7rem,3.8vw,2.6rem)] font-medium italic leading-snug text-ink">
          {line}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <SiteLink href="/contact/" className="button">
            {buttonLabel}
          </SiteLink>
          {secondaryHref && secondaryLabel ? (
            <SiteLink href={secondaryHref} className="button button-quiet">
              {secondaryLabel}
            </SiteLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}
