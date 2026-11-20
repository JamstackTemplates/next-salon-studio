import { useId } from 'react';

type MotifProps = { className?: string };

/** Crossed salon shears and fine-tooth cutting comb motif for Cut sections. */
export function CutMotif({ className = 'h-14 w-14' }: MotifProps) {
  const dotsId = useId();
  return (
    <svg viewBox="0 0 72 72" className={className} fill="none" aria-hidden="true">
      <defs>
        <pattern id={dotsId} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="var(--blush-ink)" opacity="0.22" />
        </pattern>
      </defs>
      {/* Offset blush halftone circle */}
      <circle cx="38" cy="37" r="24" fill="var(--art-offset)" />
      <circle cx="38" cy="37" r="24" fill={`url(#${dotsId})`} />
      {/* Fine-tooth cutting comb (diagonal) */}
      <g transform="rotate(-38 36 36)" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="13" y="30" width="46" height="5.5" rx="1.8" fill="var(--surface)" />
        <path d="M17 35.5v8M21 35.5v8M25 35.5v8M29 35.5v8M33 35.5v8M37 35.5v7M41 35.5v7M45 35.5v7M49 35.5v7M53 35.5v7" />
      </g>
      {/* Crossed shears */}
      <g stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 23 55 51" />
        <path d="M27 19 52 55" />
        <circle cx="20.5" cy="19.5" r="5" fill="var(--paper)" />
        <circle cx="29" cy="14.5" r="4.5" fill="var(--paper)" />
        <circle cx="36.5" cy="35" r="2" fill="var(--gold-foil)" stroke="var(--ink)" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

/** Colourist tint bowl and angled brush with blush pigment for Colour sections. */
export function ColourMotif({ className = 'h-14 w-14' }: MotifProps) {
  const dotsId = useId();
  return (
    <svg viewBox="0 0 72 72" className={className} fill="none" aria-hidden="true">
      <defs>
        <pattern id={dotsId} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="var(--blush-ink)" opacity="0.22" />
        </pattern>
      </defs>
      {/* Offset blush halftone backdrop */}
      <circle cx="34" cy="39" r="23" fill="var(--art-offset)" />
      <circle cx="34" cy="39" r="23" fill={`url(#${dotsId})`} />
      {/* Angled tint brush resting in bowl */}
      <g stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M56 12 37 38l-3.5-2.6L52.8 9.8a2.2 2.2 0 0 1 3.2 2.2Z" fill="var(--surface)" />
        {/* Bristles dipped in rose pigment */}
        <path d="M37 38 30.5 45l-6-4.4 9-5.2Z" fill="var(--swatch-rose)" />
      </g>
      {/* Misregistered pigment swirl */}
      <ellipse cx="38" cy="42" rx="18" ry="5" fill="var(--blush)" />
      {/* Tint bowl */}
      <g stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 40h44c-1.5 11.5-9.8 18-22 18S15.5 51.5 14 40Z" fill="var(--surface)" />
        <ellipse cx="36" cy="40" rx="22" ry="5.5" fill="var(--paper)" />
        {/* Pigment inside bowl */}
        <path d="M20 40.5c4.5 2.4 27.5 2.4 32 0-4.5-2.6-27.5-2.6-32 0Z" fill="var(--blush-ink)" fillOpacity="0.32" stroke="none" />
        {/* Handle tab */}
        <path d="M56 40.5h6.5a2 2 0 0 1 0 4H55" fill="var(--surface)" />
        {/* Measuring ticks */}
        <path d="M26 48h4M28 52h4" stroke="var(--gold-foil)" />
      </g>
    </svg>
  );
}

/** Round boar-bristle brush and concentrator dryer nozzle for Styling sections. */
export function StylingMotif({ className = 'h-14 w-14' }: MotifProps) {
  const dotsId = useId();
  return (
    <svg viewBox="0 0 72 72" className={className} fill="none" aria-hidden="true">
      <defs>
        <pattern id={dotsId} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="var(--blush-ink)" opacity="0.22" />
        </pattern>
      </defs>
      <circle cx="38" cy="36" r="23" fill="var(--art-offset)" />
      <circle cx="38" cy="36" r="23" fill={`url(#${dotsId})`} />
      {/* Round blow-dry brush */}
      <g transform="rotate(-32 36 36)" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Handle */}
        <rect x="8" y="34" width="22" height="5" rx="2.5" fill="var(--surface)" />
        {/* Barrel */}
        <rect x="30" y="30.5" width="28" height="12" rx="6" fill="var(--paper)" />
        {/* Ceramic core gold stripes */}
        <path d="M36 31v11M44 31v11M52 31v11" stroke="var(--gold-foil)" />
        {/* Bristles */}
        <path d="M34 27v3M39 26.5v3.5M44 26.5v3.5M49 26.5v3.5M54 27v3" />
        <path d="M34 43v3M39 43v3.5M44 43v3.5M49 43v3.5M54 43v3" />
      </g>
      {/* Dryer concentrator nozzle + warm air curls */}
      <g stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 21 26 17l3 10-12 4Z" fill="var(--surface)" />
        <path d="M27.5 18.5 34 17l2.5 8-6.5 1.5" fill="var(--blush)" />
        <path d="M39 17c3-1 5 1 8 0M40 22c3.5-1 5.5 1 9 0" stroke="var(--blush-ink)" strokeWidth="1.3" />
      </g>
    </svg>
  );
}
