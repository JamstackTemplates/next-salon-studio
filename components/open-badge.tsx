'use client';

import { useEffect, useState } from 'react';
import { openingLabel, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Browser-computed studio opening status in the configured IANA zone (Europe/London),
 * refreshed every minute. Static and no-JS output remains neutral ("Opening hours").
 */
export function OpenBadge({
  hours,
  className = '',
}: {
  hours: readonly OpeningHours[];
  className?: string;
}) {
  const [label, setLabel] = useState('Opening hours');
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => {
      const next = openingLabel(hours, site.timeZone);
      setLabel(next);
      setIsOpen(next.startsWith('Open now'));
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`inline-block h-2 w-2 rounded-full ${
          isOpen === true
            ? 'bg-blush-ink'
            : isOpen === false
              ? 'border border-muted bg-transparent'
              : 'bg-gold'
        }`}
        aria-hidden="true"
      />
      <span>{label}</span>
    </span>
  );
}
