import { useId } from 'react';
import type { PortraitVariant } from '../../content/stylists';

/**
 * Six bespoke line-drawn fashion-illustration cameo portraits inside oval frames
 * for The Studio masthead credits page. Each stylist has distinct hair and pose.
 */
export function StylistPortrait({
  variant,
  className = 'h-32 w-24 shrink-0',
}: {
  variant: PortraitVariant;
  className?: string;
}) {
  const clipId = useId();
  const dotsId = useId();

  return (
    <svg viewBox="0 0 120 156" className={className} fill="none" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <ellipse cx="60" cy="78" rx="48" ry="64" />
        </clipPath>
        <pattern id={dotsId} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.95" fill="var(--blush-ink)" opacity="0.2" />
        </pattern>
      </defs>

      {/* Misregistered blush cameo backdrop */}
      <ellipse cx="63" cy="81" rx="49" ry="65" fill="var(--art-offset)" />

      {/* Oval paper frame */}
      <ellipse cx="60" cy="78" rx="48" ry="64" fill="var(--surface)" />
      <ellipse cx="60" cy="78" rx="48" ry="64" fill={`url(#${dotsId})`} />

      <g clipPath={`url(#${clipId})`} stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {variant === 'margaux' && (
          <>
            {/* Margaux Lin — sleek architectural micro-fringe bob, poised three-quarter gaze */}
            <path d="M22 148 C28 124 42 115 60 115 C78 115 92 124 98 148" fill="var(--paper-blush)" />
            <path d="M51 96 L51 118 L69 118 L69 96" fill="var(--paper)" />
            {/* Sleek espresso bob back */}
            <path d="M28 60 C24 88 28 106 38 112 L84 112 C94 104 96 86 92 60 C88 34 74 24 60 24 C44 24 32 36 28 60 Z" fill="var(--swatch-espresso)" />
            {/* Face */}
            <path d="M40 62 C40 84 48 102 62 104 C75 102 82 84 82 62 C82 44 72 36 60 36 C48 36 40 44 40 62 Z" fill="var(--paper)" />
            {/* Sharp micro fringe */}
            <path d="M36 56 L86 52 C84 36 74 26 60 26 C46 26 37 38 36 56 Z" fill="var(--swatch-espresso)" />
            {/* Features */}
            <path d="M47 68 Q53 65 58 68 M66 68 Q71 65 76 68" />
            <path d="M62 69 L63 80 L59 82" strokeWidth="1.2" />
            <path d="M54 90 Q61 94 69 90 Q61 88 54 90 Z" fill="var(--blush-ink)" strokeWidth="1" />
          </>
        )}

        {variant === 'ines' && (
          <>
            {/* Inès Duarte — long luminous rose-copper waves cascading over one shoulder */}
            <path d="M20 148 C26 122 44 114 60 114 C76 114 94 122 100 148" fill="var(--paper)" />
            <path d="M22 68 C16 96 22 128 32 146 L94 146 C100 120 102 92 94 64 C88 36 74 24 58 24 C40 24 26 40 22 68 Z" fill="var(--swatch-copper)" />
            <path d="M51 96 L51 118 L69 118 L69 96" fill="var(--paper)" />
            <path d="M40 60 C40 84 49 102 61 103 C73 102 81 84 81 60 C81 44 71 36 60 36 C48 36 40 44 40 60 Z" fill="var(--paper)" />
            {/* Soft side-swept wave framing cheek */}
            <path d="M36 56 C44 44 58 40 72 48 C82 54 88 74 92 108 C86 84 82 64 74 54 C62 46 46 52 38 66 Z" fill="var(--swatch-copper)" />
            <path d="M28 92 Q36 106 30 126 M88 94 Q96 110 88 130" stroke="var(--paper)" strokeOpacity="0.4" strokeWidth="1.1" />
            <path d="M47 68 Q53 66 57 68 M65 68 Q71 66 75 68" />
            <path d="M60 70 L59 80 L63 81" strokeWidth="1.2" />
            <path d="M54 90 Q61 95 68 90 Q61 87 54 90 Z" fill="var(--blush-ink)" strokeWidth="1" />
          </>
        )}

        {variant === 'amara' && (
          <>
            {/* Amara Bello — sculptural crown of defined coils, joyful profile tilt */}
            <path d="M22 148 C28 124 44 114 60 114 C76 114 92 124 98 148" fill="var(--blush)" />
            {/* Rounded coil halo silhouette */}
            <path
              d="M28 84 C18 76 18 58 28 50 C24 38 36 24 50 26 C56 18 70 18 76 26 C90 26 98 40 94 52 C104 60 102 78 92 86 C94 98 84 108 74 104 L46 104 C36 108 26 96 28 84 Z"
              fill="var(--swatch-espresso)"
            />
            <path d="M51 96 L51 118 L69 118 L69 96" fill="var(--paper)" />
            <path d="M42 64 C42 86 50 102 60 103 C70 102 78 86 78 64 C78 48 70 40 60 40 C50 40 42 48 42 64 Z" fill="var(--paper)" />
            {/* Drawn coil curls */}
            <path d="M32 52 c3-4 8-2 6 3 M44 34 c4-3 8 0 5 4 M74 34 c4-3 8 1 4 5 M86 54 c4-2 6 4 2 6" stroke="var(--paper)" strokeOpacity="0.45" strokeWidth="1.2" />
            {/* Gold hoop earrings */}
            <circle cx="39" cy="84" r="5" fill="none" stroke="var(--gold-foil)" strokeWidth="1.4" />
            <circle cx="81" cy="84" r="5" fill="none" stroke="var(--gold-foil)" strokeWidth="1.4" />
            <path d="M48 68 Q53 65 57 68 M64 68 Q69 65 73 68" />
            <path d="M60 69 L60 79 Q60 82 63 81" strokeWidth="1.2" />
            <path d="M52 89 Q60 95 68 89 Q60 87 52 89 Z" fill="var(--blush-ink)" strokeWidth="1" />
          </>
        )}

        {variant === 'theo' && (
          <>
            {/* Theo Marsh — sharp textured short crop, clean side-turned jawline */}
            <path d="M22 148 C28 122 44 114 60 114 C76 114 92 122 98 148" fill="var(--paper-blush)" />
            <path d="M50 94 L50 118 L70 118 L70 94" fill="var(--paper)" />
            <path d="M40 60 C40 84 48 102 60 104 C72 102 80 84 80 60 C80 42 70 34 60 34 C48 34 40 42 40 60 Z" fill="var(--paper)" />
            {/* Sculpted ash short crop with directional crown texture */}
            <path
              d="M36 62 C34 44 42 28 60 26 C78 26 86 42 84 62 L79 56 C78 44 70 40 60 40 C50 40 42 46 41 56 Z"
              fill="var(--swatch-ash)"
            />
            <path d="M46 36 L54 42 M58 32 L66 40 M70 34 L76 42" stroke="var(--ink)" strokeWidth="1.1" />
            <path d="M47 68 L57 67 M64 67 L74 68" strokeWidth="1.7" />
            <path d="M60 69 L61 81 L58 82" strokeWidth="1.2" />
            <path d="M54 91 Q60 93 67 91" stroke="var(--blush-ink)" strokeWidth="1.7" />
          </>
        )}

        {variant === 'rosie' && (
          <>
            {/* Rosie Kaplan — bouncy honey blowout with lifted crown & flicked ends */}
            <path d="M20 148 C26 124 44 114 60 114 C76 114 94 124 100 148" fill="var(--paper)" />
            <path
              d="M24 72 C18 94 20 116 32 124 C42 130 50 124 54 114 L68 114 C72 124 80 130 90 124 C102 116 102 94 96 72 C92 40 78 24 60 24 C42 24 28 40 24 72 Z"
              fill="var(--swatch-honey)"
            />
            <path d="M51 96 L51 118 L69 118 L69 96" fill="var(--paper)" />
            <path d="M41 62 C41 84 49 101 60 102 C71 101 79 84 79 62 C79 44 70 36 60 36 C50 36 41 44 41 62 Z" fill="var(--paper)" />
            {/* Soft curtain bangs */}
            <path d="M40 58 C46 46 54 40 60 38 C66 40 74 46 80 58 C78 40 70 30 60 30 C50 30 42 40 40 58 Z" fill="var(--swatch-honey)" />
            <path d="M26 102 Q34 118 44 114 M94 102 Q86 118 76 114" stroke="var(--ink)" strokeWidth="1.2" />
            <path d="M48 68 Q53 65 57 68 M64 68 Q69 65 73 68" />
            <path d="M60 70 L61 80 L58 81" strokeWidth="1.2" />
            <path d="M53 89 Q60 94 67 89 Q60 87 53 89 Z" fill="var(--blush-ink)" strokeWidth="1" />
          </>
        )}

        {variant === 'jun' && (
          <>
            {/* Jun Park — soft layered wolf-cut with airy centre-parted fringe */}
            <path d="M22 148 C28 124 44 114 60 114 C76 114 92 124 98 148" fill="var(--paper-blush)" />
            <path
              d="M28 66 C24 94 26 114 38 122 L82 122 C94 114 96 94 92 66 C88 38 76 26 60 26 C44 26 32 38 28 66 Z"
              fill="var(--swatch-rose)"
            />
            <path d="M51 96 L51 118 L69 118 L69 96" fill="var(--paper)" />
            <path d="M41 62 C41 84 49 101 60 102 C71 101 79 84 79 62 C79 44 70 36 60 36 C50 36 41 44 41 62 Z" fill="var(--paper)" />
            {/* Airy wispy centre-parted layers */}
            <path d="M38 64 C44 48 53 40 60 34 C67 40 76 48 82 64 C80 42 71 28 60 28 C49 28 40 42 38 64 Z" fill="var(--swatch-rose)" />
            <path d="M48 48 L44 62 M72 48 L76 62 M34 102 L30 116 M86 102 L90 116" stroke="var(--ink)" strokeWidth="1.15" />
            <path d="M48 69 Q53 67 57 69 M64 69 Q69 67 73 69" />
            <path d="M60 70 L60 80 L62 81" strokeWidth="1.2" />
            <path d="M54 90 Q60 93 66 90 Q60 88 54 90 Z" fill="var(--blush-ink)" strokeWidth="1" />
          </>
        )}
      </g>

      {/* Double hairline oval cameo border & gold foil top diamond */}
      <ellipse cx="60" cy="78" rx="48" ry="64" stroke="var(--ink)" strokeWidth="1.5" />
      <ellipse cx="60" cy="78" rx="43.5" ry="59.5" stroke="var(--gold-foil)" strokeWidth="0.9" />
      <path d="M60 9 L64 14 L60 19 L56 14 Z" fill="var(--gold-foil)" />
    </svg>
  );
}
