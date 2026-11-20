import type { ReactNode } from 'react';
import { CutLineDivider } from './art/dividers';

/**
 * Magazine department PageHead: tracked-caps department label & folio,
 * bespoke motif, oversized italic Playfair headline extending toward the
 * right edge on desktop, drop-cap stand-first, and cut-line divider beneath.
 */
export function PageHead({
  department,
  folio,
  title,
  motif,
  children,
  id,
  compact = false,
}: {
  department: string;
  folio: string;
  title: ReactNode;
  motif?: ReactNode;
  children?: ReactNode;
  id?: string;
  compact?: boolean;
}) {
  return (
    <header className={compact ? 'pb-6' : 'overflow-x-clip pt-10 pb-4 sm:pt-14'}>
      <div className={compact ? '' : 'wrap'}>
        <div className="flex items-center justify-between gap-4 border-b border-rule pb-3">
          <p className="dept-label">
            <span>{department}</span>
            <span className="mx-2 text-gold" aria-hidden="true">
              —
            </span>
            <span className="folio">{folio}</span>
          </p>
          {motif ? <div className="shrink-0">{motif}</div> : null}
        </div>

        <h1
          id={id}
          className={
            compact
              ? 'mt-5 font-display text-[clamp(2.4rem,5vw,3.6rem)] font-medium italic leading-[0.98] text-headline-italic'
              : 'mt-5 font-display text-[clamp(3rem,8.8vw,6.8rem)] font-medium italic leading-[0.92] tracking-[-0.025em] text-headline-italic lg:mr-[-3rem]'
          }
        >
          {title}
        </h1>

        {children ? (
          <div className="editorial-dropcap mt-6 max-w-(--measure) text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-muted">
            {children}
          </div>
        ) : null}

        <CutLineDivider className={compact ? 'my-6' : 'mt-8 mb-2'} />
      </div>
    </header>
  );
}
