import { useId } from 'react';

/**
 * Editorial drawn street-map vignette of London's Seven Dials junction:
 * the central sundial pillar with seven radiating streets and Atelier Blush
 * pinned with a blush swatch tab on Earlham Street. Decorative only.
 */
export function SevenDialsVignette({ className = 'w-full h-auto' }: { className?: string }) {
  const dotsId = useId();

  return (
    <svg viewBox="0 0 420 310" className={className} fill="none" aria-hidden="true">
      <defs>
        <pattern id={dotsId} width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="var(--blush-ink)" opacity="0.2" />
        </pattern>
      </defs>

      {/* Printed editorial map frame */}
      <rect x="8" y="8" width="404" height="294" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="14" y="14" width="392" height="282" fill={`url(#${dotsId})`} stroke="var(--rule)" strokeWidth="1" />

      {/* Seven radiating streets meeting at the Seven Dials roundabout (200, 160) */}
      <g stroke="var(--paper)" strokeWidth="17" strokeLinecap="butt">
        {/* 1. Monmouth St (N) */}
        <line x1="200" y1="160" x2="188" y2="14" />
        {/* 2. Mercer St (NE) */}
        <line x1="200" y1="160" x2="314" y2="14" />
        {/* 3. Shorts Gardens (E) */}
        <line x1="200" y1="160" x2="406" y2="132" />
        {/* 4. Earlham St (SE — studio street!) */}
        <line x1="200" y1="160" x2="394" y2="262" />
        {/* 5. Mercer St (S) */}
        <line x1="200" y1="160" x2="226" y2="296" />
        {/* 6. Monmouth St (SW) */}
        <line x1="200" y1="160" x2="72" y2="296" />
        {/* 7. Earlham St (W) */}
        <line x1="200" y1="160" x2="14" y2="122" />
      </g>

      {/* Street kerb ink contours */}
      <g stroke="var(--ink)" strokeWidth="1.2" strokeOpacity="0.65">
        <line x1="191" y1="138" x2="179" y2="14" />
        <line x1="208" y1="138" x2="197" y2="14" />

        <line x1="212" y1="142" x2="306" y2="14" />
        <line x1="224" y1="150" x2="324" y2="14" />

        <line x1="224" y1="152" x2="406" y2="123" />
        <line x1="224" y1="168" x2="406" y2="141" />

        <line x1="221" y1="166" x2="400" y2="255" />
        <line x1="213" y1="179" x2="388" y2="269" />

        <line x1="209" y1="184" x2="235" y2="296" />
        <line x1="192" y1="184" x2="217" y2="296" />

        <line x1="184" y1="178" x2="80" y2="296" />
        <line x1="172" y1="166" x2="62" y2="296" />

        <line x1="176" y1="164" x2="14" y2="131" />
        <line x1="177" y1="148" x2="14" y2="113" />
      </g>

      {/* Seven Dials central roundabout & sundial pillar */}
      <circle cx="200" cy="160" r="28" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
      <circle cx="200" cy="160" r="14" fill="var(--blush)" stroke="var(--ink)" strokeWidth="1.3" />
      <circle cx="200" cy="160" r="4.5" fill="var(--gold-foil)" stroke="var(--ink)" strokeWidth="1.1" />
      <text
        x="200"
        y="122"
        textAnchor="middle"
        fill="var(--ink)"
        fontFamily="var(--font-display)"
        fontStyle="italic"
        fontSize="12"
      >
        Seven Dials
      </text>

      {/* Street labels */}
      <text
        x="128"
        y="46"
        fill="var(--ink-muted)"
        fontFamily="var(--font-sans)"
        fontSize="8"
        letterSpacing="0.16em"
      >
        MONMOUTH ST
      </text>
      <text
        x="294"
        y="112"
        fill="var(--ink-muted)"
        fontFamily="var(--font-sans)"
        fontSize="8"
        letterSpacing="0.16em"
      >
        SHORTS GARDENS
      </text>
      <text
        x="30"
        y="108"
        fill="var(--ink-muted)"
        fontFamily="var(--font-sans)"
        fontSize="8"
        letterSpacing="0.16em"
      >
        EARLHAM ST
      </text>
      <text
        x="34"
        y="274"
        fill="var(--ink-muted)"
        fontFamily="var(--font-sans)"
        fontSize="7.5"
        letterSpacing="0.15em"
      >
        ← LEICESTER SQ (5 MIN)
      </text>
      <text
        x="248"
        y="286"
        fill="var(--ink-muted)"
        fontFamily="var(--font-sans)"
        fontSize="7.5"
        letterSpacing="0.15em"
      >
        COVENT GARDEN (5 MIN) →
      </text>

      {/* Studio marker: blush swatch tab pinned at 19 Earlham Street */}
      <g transform="translate(262 180)">
        {/* Pin dot on Earlham St */}
        <circle cx="12" cy="24" r="6" fill="var(--primary)" stroke="var(--surface)" strokeWidth="2" />
        {/* Swatch tab flag */}
        <g transform="translate(8 -26)">
          <rect x="3" y="3" width="128" height="44" rx="2" fill="var(--blush)" />
          <rect x="0" y="0" width="128" height="44" rx="2" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.4" />
          <rect x="0" y="0" width="10" height="44" fill="var(--swatch-rose)" stroke="var(--ink)" strokeWidth="1.2" />
          <circle cx="5" cy="9" r="2" fill="var(--gold-foil)" />
          <text
            x="17"
            y="18"
            fill="var(--blush-ink)"
            fontFamily="var(--font-display)"
            fontStyle="italic"
            fontWeight="600"
            fontSize="13"
          >
            Atelier Blush
          </text>
          <text
            x="17"
            y="33"
            fill="var(--ink-muted)"
            fontFamily="var(--font-sans)"
            fontSize="7.4"
            letterSpacing="0.09em"
          >
            19 EARLHAM ST · 1ST FL
          </text>
        </g>
      </g>

      {/* Minimal compass flourish top-left */}
      <g transform="translate(36 40)" stroke="var(--gold-foil)" strokeWidth="1.1">
        <line x1="0" y1="-12" x2="0" y2="12" />
        <line x1="-8" y1="0" x2="8" y2="0" />
        <path d="M0 -12 L-3 -4 L0 -6 L3 -4 Z" fill="var(--gold-foil)" />
        <text
          x="0"
          y="-15"
          textAnchor="middle"
          fill="var(--gold-foil)"
          fontFamily="var(--font-sans)"
          fontSize="7"
          fontWeight="600"
          stroke="none"
        >
          N
        </text>
      </g>
    </svg>
  );
}
