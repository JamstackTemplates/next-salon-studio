import { useId } from 'react';

/** 404 "Erratum" illustration: a snipped lock of hair beside open shears and a tilted correction slip. */
export function ErratumArt({ className = 'w-full max-w-md' }: { className?: string }) {
  const dotsId = useId();
  return (
    <svg viewBox="0 0 360 220" className={className} fill="none" aria-hidden="true">
      <defs>
        <pattern id={dotsId} width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="var(--blush-ink)" opacity="0.2" />
        </pattern>
      </defs>

      {/* Soft blush halftone ellipse */}
      <ellipse cx="184" cy="122" rx="134" ry="74" fill="var(--art-offset)" />
      <ellipse cx="184" cy="122" rx="134" ry="74" fill={`url(#${dotsId})`} />

      {/* Snipped lock of glossy espresso hair curving across the paper */}
      <g transform="translate(3 3)" opacity="0.55">
        <path
          d="M78 148 C118 110 156 176 210 152 C244 137 268 112 288 122 C264 148 232 178 184 176 C138 174 114 140 82 158 Z"
          fill="var(--blush)"
        />
      </g>
      <path
        d="M76 146 C116 108 154 174 208 150 C242 135 266 110 286 120 C262 146 230 176 182 174 C136 172 112 138 80 156 Z"
        fill="var(--swatch-espresso)"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M95 144 C132 126 164 166 208 156 C234 148 254 134 270 126"
        stroke="var(--paper)"
        strokeOpacity="0.45"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Stray snipped hair wisps */}
      <path
        d="M66 154 C74 149 82 151 88 156 M262 144 C274 146 284 140 294 136"
        stroke="var(--ink)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      {/* Open editorial shears resting beside the snipped lock */}
      <g stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M124 88 260 124" />
        <path d="M120 118 258 74" />
        <ellipse cx="106" cy="82" rx="16" ry="11" transform="rotate(-14 106 82)" fill="var(--paper)" />
        <ellipse cx="104" cy="124" rx="16" ry="11" transform="rotate(14 104 124)" fill="var(--paper)" />
        <circle cx="176" cy="100" r="3" fill="var(--gold-foil)" />
      </g>

      {/* Tilted printed correction slip reading "Erratum" */}
      <g transform="rotate(-5 186 84)">
        <rect x="116" y="34" width="144" height="58" fill="var(--blush)" transform="translate(4 4)" />
        <rect x="114" y="32" width="144" height="58" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.5" />
        <rect x="120" y="38" width="132" height="46" fill="none" stroke="var(--gold-foil)" strokeWidth="0.9" strokeDasharray="3 2" />
        <text
          x="186"
          y="67"
          textAnchor="middle"
          fill="var(--blush-ink)"
          fontFamily="var(--font-display)"
          fontStyle="italic"
          fontWeight="600"
          fontSize="24"
        >
          Erratum
        </text>
        <text
          x="186"
          y="79"
          textAnchor="middle"
          fill="var(--ink-muted)"
          fontFamily="var(--font-sans)"
          fontSize="7.5"
          letterSpacing="0.2em"
        >
          FOLIO 404 · EXCISED
        </text>
      </g>
    </svg>
  );
}
