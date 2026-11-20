import type { CSSProperties } from 'react';
import { swatches, type SwatchId } from '../../content/swatches';

const SWATCH_CSS_VAR: Record<SwatchId, string> = {
  rose: 'var(--swatch-rose)',
  copper: 'var(--swatch-copper)',
  honey: 'var(--swatch-honey)',
  butter: 'var(--swatch-butter)',
  ash: 'var(--swatch-ash)',
  espresso: 'var(--swatch-espresso)',
};

/**
 * Signature visual element: a colourist's ring of six hair-colour weft swatches
 * rendered dynamically from content/swatches.ts. Fans out on load (respecting
 * prefers-reduced-motion) and lifts any active swatch on colour-row hover/focus.
 */
export function SwatchFan({
  activeSwatch = null,
  variant = 'cover',
  className = '',
}: {
  activeSwatch?: SwatchId | null;
  variant?: 'cover' | 'sidebar';
  className?: string;
}) {
  const angles = variant === 'cover' ? [-44, -26, -8, 10, 28, 46] : [-38, -22, -7, 8, 23, 38];

  return (
    <div className={`swatch-fan-wrap ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 360 320"
        className="h-auto w-full overflow-visible"
        fill="none"
      >
        {/* Subtle circular halo behind the colourist's ring */}
        <circle
          cx="180"
          cy="252"
          r="98"
          fill="var(--art-offset)"
          opacity={variant === 'cover' ? 0.5 : 0.35}
        />

        {/* Six rounded hair-weft strips fanned from the brass eyelet pin */}
        {swatches.map((swatch, index) => {
          const angle = angles[index] ?? 0;
          const isActive = activeSwatch === swatch.id;
          const style = {
            '--swatch-angle': `${angle}deg`,
            '--swatch-delay': `${index * 65}ms`,
          } as CSSProperties;

          return (
            <g
              key={swatch.id}
              className="swatch-weft"
              data-swatch={swatch.id}
              data-active={isActive ? 'true' : 'false'}
              style={style}
            >
              {/* Misregistered printed-spread offset silhouette */}
              <path
                d="M161 258 L155 62 C154 44 166 32 182 32 C198 32 210 44 209 62 L203 258 C202 271 193 279 182 279 C171 279 162 271 161 258 Z"
                fill="var(--blush)"
                opacity="0.45"
                transform="translate(2.5 2.5)"
              />
              {/* Main hair weft body */}
              <path
                d="M159 256 L153 60 C152 42 164 30 180 30 C196 30 208 42 207 60 L201 256 C200 269 191 277 180 277 C169 277 160 269 159 256 Z"
                fill={SWATCH_CSS_VAR[swatch.id]}
                stroke="var(--ink)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              {/* Fine hair-strand contour lines & silky specular highlight */}
              <path
                d="M168 48 C165 110 166 175 168 236 M176 40 C174 105 175 178 176 238 M185 40 C187 108 186 176 185 238 M193 48 C195 112 194 176 192 236"
                stroke="var(--ink)"
                strokeOpacity="0.28"
                strokeWidth="1"
                strokeLinecap="round"
              />
              {/* Satin sheen band across hair fibres */}
              <path
                d="M156 112 Q180 100 204 112 L203 128 Q180 116 157 128 Z"
                fill="var(--art-highlight)"
                opacity="0.35"
              />
              {/* Printed paper collar near the pin */}
              <rect
                x="160"
                y="222"
                width="40"
                height="30"
                rx="2"
                fill="var(--surface)"
                stroke="var(--ink)"
                strokeWidth="1.2"
              />
              <text
                x="180"
                y="240"
                textAnchor="middle"
                fill="var(--ink)"
                fontSize="8"
                fontFamily="var(--font-sans)"
                fontWeight="600"
                letterSpacing="0.08em"
              >
                {swatch.code.split('·')[1]?.trim() ?? swatch.id.slice(0, 2).toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Metallic foil-gold binding ring & rivet pin */}
        <circle
          cx="180"
          cy="262"
          r="17"
          fill="var(--surface)"
          stroke="var(--gold-foil)"
          strokeWidth="2.5"
        />
        <circle
          cx="180"
          cy="262"
          r="9"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="1.5"
        />
        <circle cx="180" cy="262" r="3" fill="var(--gold-foil)" />
      </svg>
    </div>
  );
}

/** Small lookbook swatch tab showing both the shade colour chip and its accessible text label. */
export function SwatchTab({
  swatchId,
  className = '',
}: {
  swatchId: SwatchId;
  className?: string;
}) {
  const swatch = swatches.find(item => item.id === swatchId);
  if (!swatch) return null;

  return (
    <span
      className={`inline-flex items-center gap-2 border border-rule bg-surface px-2.5 py-1 text-[0.7rem] font-semibold tracking-[0.14em] text-ink uppercase ${className}`}
    >
      <span
        className="inline-block h-3.5 w-3.5 rounded-full border border-ink/70"
        style={{ backgroundColor: SWATCH_CSS_VAR[swatch.id] }}
        aria-hidden="true"
      />
      <span>{swatch.name}</span>
    </span>
  );
}
