'use client';

import { useEffect, useState } from 'react';
import { currentDayInZone, type Day, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Weekly opening hours table. Highlights today's row only in the browser using
 * the business IANA time zone (Europe/London); static and no-JS markup stays neutral.
 */
export function HoursTable({
  hours,
  compact = false,
}: {
  hours: readonly OpeningHours[];
  compact?: boolean;
}) {
  const [today, setToday] = useState<Day | null>(null);

  useEffect(() => {
    const update = () => setToday(currentDayInZone(site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <dl className={compact ? 'space-y-1.5 text-sm' : 'divide-y divide-rule border-y border-rule text-sm'}>
      {hours.map(entry => {
        const isToday = today === entry.day;
        const closed = !entry.opens || !entry.closes;
        return (
          <div
            key={entry.day}
            className={`flex items-baseline justify-between gap-4 ${
              compact ? 'py-0.5' : 'px-2 py-2.5'
            } ${isToday && !compact ? 'bg-blush/35 font-medium text-ink' : ''}`}
          >
            <dt className="flex items-center gap-2">
              <span className={isToday ? 'font-semibold text-blush-ink' : 'text-ink'}>
                {compact ? entry.day.slice(0, 3) : entry.day}
              </span>
              {isToday && !compact ? (
                <span className="folio text-[0.65rem] text-blush-ink">Today</span>
              ) : null}
            </dt>
            <dd
              className={`tabular-nums ${
                closed ? 'italic text-muted' : isToday ? 'font-semibold text-blush-ink' : 'text-muted'
              }`}
            >
              {closed ? 'Closed' : `${entry.opens}–${entry.closes}`}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
