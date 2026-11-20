import { useId } from 'react';
import { business } from '../../content/business';

/**
 * Hero fashion illustration: three-quarter profile of a woman with a sharp
 * chin-length glass bob, framed against a blush halftone disc with open shears
 * resting along the bottom edge. Designed to overlap the masthead from below.
 */
export function CoverPortrait({ className = 'w-full h-auto' }: { className?: string }) {
  const dotsId = useId();
  const shineId = useId();

  return (
    <svg viewBox="0 46 460 494" className={className} fill="none" aria-hidden="true">
      <defs>
        <pattern id={dotsId} width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="1.35" fill="var(--blush-ink)" opacity="0.22" />
        </pattern>
        <linearGradient id={shineId} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="var(--paper)" stopOpacity="0.05" />
          <stop offset="48%" stopColor="var(--paper)" stopOpacity="0.52" />
          <stop offset="100%" stopColor="var(--paper)" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Large editorial halftone blush circle behind head & shoulders */}
      <circle cx="238" cy="248" r="168" fill="var(--art-offset)" />
      <circle cx="238" cy="248" r="168" fill={`url(#${dotsId})`} />
      <circle
        cx="232"
        cy="242"
        r="168"
        stroke="var(--gold-foil)"
        strokeOpacity="0.55"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      {/* Printed misregistration blush silhouette under shoulders & neck */}
      <path
        d="M114 490 C124 420 162 384 206 376 L206 318 C206 292 276 292 276 320 L276 374 C324 384 360 422 372 490 Z"
        fill="var(--blush)"
        opacity="0.65"
        transform="translate(5 4)"
      />

      {/* Minimalist coat lapel & elegant collarbones */}
      <path
        d="M110 492 C122 422 162 386 206 378 L210 318 L272 318 L276 376 C322 386 358 424 368 492"
        fill="var(--art-face)"
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tailored blazer V-neck & blush silk slip */}
      <path
        d="M168 392 L240 486 L312 392"
        fill="var(--paper-blush)"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M168 392 L192 462 L240 486 L288 462 L312 392" stroke="var(--ink)" strokeWidth="1.4" />
      <path d="M212 382 Q240 398 268 382" stroke="var(--ink)" strokeWidth="1.2" opacity="0.55" />

      {/* Three-quarter profile face & neck */}
      <path
        d="M204 204 C202 252 212 308 242 332 C264 350 296 340 312 314 C324 294 328 264 326 232 C324 196 300 168 266 164 C228 160 206 178 204 204 Z"
        fill="var(--art-face)"
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Subtle blush cheek wash on the cheekbone */}
      <ellipse cx="256" cy="266" rx="16" ry="10" fill="var(--blush)" opacity="0.72" />

      {/* Minimal fashion-editorial facial features */}
      {/* Arched brows */}
      <path d="M250 226 Q266 218 282 224" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M300 225 Q311 220 320 225" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" />
      {/* Quiet lowered lashes / eyelid lines */}
      <path d="M253 242 Q267 236 280 242" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M279 242 L284 239" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M301 242 Q310 238 318 242" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Delicate nose bridge */}
      <path d="M294 236 C298 254 302 266 296 273 C292 276 286 275 284 273" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" />
      {/* Editorial lips in --blush-ink */}
      <path
        d="M272 296 C279 291 287 293 292 295 C296 292 303 292 308 296 C302 305 282 306 272 296 Z"
        fill="var(--blush-ink)"
        stroke="var(--ink)"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
      <path d="M274 297 Q291 300 306 296" stroke="var(--paper)" strokeOpacity="0.45" strokeWidth="0.9" />
      {/* Single gold-foil drop earring peeking under the bob */}
      <circle cx="212" cy="296" r="4.2" fill="var(--gold-foil)" stroke="var(--ink)" strokeWidth="1.2" />

      {/* Misregistered colour print offset behind the glass bob */}
      <path
        d="M252 86 C182 86 134 134 122 214 C114 268 124 318 144 344 L220 332 C202 290 206 232 232 184 C256 150 296 146 318 182 C330 204 330 242 322 288 L346 280 C354 224 350 164 330 124 C312 96 286 86 252 86 Z"
        fill="var(--blush-ink)"
        opacity="0.22"
        transform="translate(5 4)"
      />

      {/* HERO HAIR: Razor-sharp chin-length Glass Bob (sleek fashion silhouette) */}
      {/* Back curtain of hair behind neck */}
      <path
        d="M132 234 C128 286 134 326 150 344 L220 334 L214 222 Z"
        fill="var(--swatch-espresso)"
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Main sculpted glass bob helmet & precision razor-cut chin line */}
      <path
        d="M248 84 C178 84 132 132 120 212 C112 268 122 320 146 346 L226 332 C204 288 210 226 240 176 C264 142 302 146 320 184 C330 206 332 246 322 292 L346 284 C354 226 350 162 330 122 C312 94 282 84 248 84 Z"
        fill="var(--swatch-espresso)"
        stroke="var(--ink)"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      {/* Precision sweeping side-parted front lock curving cleanly into the jaw */}
      <path
        d="M242 104 C204 130 178 198 186 282 C190 306 200 324 218 334 C200 316 198 274 208 226 C218 178 242 138 274 120"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Glass-hair specular sheen ribbon across the bob */}
      <path
        d="M134 196 C168 170 208 168 236 182 C210 200 170 204 130 222 Z"
        fill={`url(#${shineId})`}
      />
      <path
        d="M144 156 C178 134 214 130 250 140"
        stroke="var(--paper)"
        strokeOpacity="0.45"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Fine engraved hair-strand lines following the precision bevel */}
      <path
        d="M156 122 C136 178 132 254 152 334 M176 108 C156 168 152 250 174 330 M202 98 C180 158 176 246 198 326 M292 104 C322 136 336 200 332 276"
        stroke="var(--paper)"
        strokeOpacity="0.28"
        strokeWidth="1.15"
        strokeLinecap="round"
      />

      {/* Open editorial shears resting across the lower margin of the cover */}
      <g transform="translate(36 456) rotate(-4)" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* Blush print offset behind finger rings */}
        <ellipse cx="44" cy="18" rx="20" ry="12" fill="var(--blush)" stroke="none" transform="translate(3 3)" />
        <ellipse cx="48" cy="48" rx="20" ry="12" fill="var(--blush)" stroke="none" transform="translate(3 3)" />
        {/* Long precision blades */}
        <path d="M66 24 L256 44" />
        <path d="M68 42 L252 12" />
        {/* Finger rings */}
        <ellipse cx="42" cy="17" rx="19" ry="11" fill="var(--paper)" />
        <ellipse cx="46" cy="47" rx="19" ry="11" fill="var(--paper)" />
        {/* Tang & foil-gold pivot screw */}
        <path d="M22 49 C12 52 8 56 4 54" />
        <circle cx="136" cy="30" r="3.4" fill="var(--gold-foil)" />
      </g>
    </svg>
  );
}

/** Magazine cover barcode block: "No. 26 · AW26" with drawn vertical barcode bars. */
export function IssueBarcode({ className = '' }: { className?: string }) {
  const widths = [2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 2, 1, 3, 1];
  let x = 8;

  return (
    <div
      className={`inline-flex flex-col border border-rule bg-surface px-3 py-2 text-ink ${className}`}
      aria-label={`Issue ${business.issue.number}, ${business.issue.season}`}
    >
      <span className="folio text-[0.65rem] leading-none">
        {business.issue.number} · {business.issue.shortSeason}
      </span>
      <svg viewBox="0 0 92 26" className="mt-1.5 h-6 w-24" aria-hidden="true">
        {widths.map((w, i) => {
          const rectX = x;
          x += w + (i % 3 === 0 ? 2.6 : 1.7);
          return (
            <rect
              key={i}
              x={rectX}
              y={1}
              width={w}
              height={i === 0 || i === widths.length - 1 ? 24 : 20}
              fill="var(--ink)"
            />
          );
        })}
      </svg>
      <span className="mt-0.5 text-[0.6rem] tracking-[0.2em] text-muted uppercase">
        WC2H · SEVEN DIALS
      </span>
    </div>
  );
}
