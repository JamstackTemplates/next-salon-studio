import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const baseProps: IconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export function ClockIcon({ className = 'h-4 w-4', ...props }: IconProps) {
  return (
    <svg {...baseProps} className={className} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
      <circle cx="12" cy="12" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PinIcon({ className = 'h-4 w-4', ...props }: IconProps) {
  return (
    <svg {...baseProps} className={className} {...props}>
      <path d="M12 21s6.5-5.8 6.5-11a6.5 6.5 0 1 0-13 0c0 5.2 6.5 11 6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function PhoneIcon({ className = 'h-4 w-4', ...props }: IconProps) {
  return (
    <svg {...baseProps} className={className} {...props}>
      <path d="M6.8 3.5h2.6l1.2 4-1.8 1.4a11.5 11.5 0 0 0 6.3 6.3l1.4-1.8 4 1.2v2.6a1.8 1.8 0 0 1-1.9 1.8C10.9 18.6 5.4 13.1 5 5.4A1.8 1.8 0 0 1 6.8 3.5Z" />
    </svg>
  );
}

export function EnvelopeIcon({ className = 'h-4 w-4', ...props }: IconProps) {
  return (
    <svg {...baseProps} className={className} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="1.2" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  );
}

/** Patch-test / skin allergy alert dropper icon used on colour price rows. */
export function DropperIcon({ className = 'h-4 w-4', ...props }: IconProps) {
  return (
    <svg {...baseProps} className={className} {...props}>
      <path d="M14.8 4.4a2.3 2.3 0 0 1 3.3 3.3l-1.5 1.5-3.3-3.3 1.5-1.5Z" fill="var(--blush)" />
      <path d="m11.5 6.8 4.2 4.2" />
      <path d="M13.6 8.9 7.2 15.3c-.7.7-1.1 1.6-1.2 2.6l-.3 1.9 1.9-.3c1-.1 1.9-.5 2.6-1.2l6.4-6.4" />
      <path d="M18.2 17.4c0 1.4-1.1 2.4-2.2 2.4s-2.2-1-2.2-2.4c0-1.3 2.2-3.7 2.2-3.7s2.2 2.4 2.2 3.7Z" fill="var(--blush-ink)" stroke="none" />
    </svg>
  );
}

/** Accessibility stairs icon for The Studio visit notes. */
export function StairsIcon({ className = 'h-5 w-5', ...props }: IconProps) {
  return (
    <svg {...baseProps} className={className} {...props}>
      <path d="M4 19h4v-4h4v-4h4V7h4" />
      <path d="M4 13.5 13.5 4" strokeDasharray="2 2.2" />
      <path d="M10.5 4h3v3" />
    </svg>
  );
}

export function ScissorsIcon({ className = 'h-4 w-4', ...props }: IconProps) {
  return (
    <svg {...baseProps} className={className} {...props}>
      <circle cx="6.2" cy="7.2" r="2.6" />
      <circle cx="6.2" cy="16.8" r="2.6" />
      <path d="M8.5 8.6 19.5 16.5" />
      <path d="M8.5 15.4 19.5 7.5" />
      <circle cx="12.6" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
