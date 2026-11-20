import { business } from '../../content/business';

/**
 * Editorial masthead wordmark in Playfair Display with italic "Hair Studio"
 * and a hairline gold-foil rule. Used in compact form in the header and full form in the footer.
 */
export function Wordmark({ variant = 'compact' }: { variant?: 'compact' | 'footer' }) {
  if (variant === 'footer') {
    return (
      <div className="inline-flex flex-col items-start">
        <span className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.88] tracking-[-0.04em] text-ink uppercase">
          {business.masthead}
        </span>
        <span className="mt-2.5 flex w-full items-center gap-3">
          <span className="h-px flex-1 bg-gold" aria-hidden="true" />
          <span className="font-display text-lg italic text-blush-ink">{business.mastheadSub}</span>
          <span className="h-px w-8 bg-gold" aria-hidden="true" />
        </span>
      </div>
    );
  }

  return (
    <span className="inline-flex flex-col leading-none">
      <span className="font-display text-[1.45rem] font-black tracking-[-0.035em] text-ink uppercase sm:text-[1.65rem]">
        {business.masthead}
      </span>
      <span className="mt-0.5 flex items-center gap-2">
        <span className="h-px w-5 bg-gold" aria-hidden="true" />
        <span className="font-display text-[0.78rem] italic tracking-[0.04em] text-blush-ink">
          {business.mastheadSub}
        </span>
      </span>
    </span>
  );
}
