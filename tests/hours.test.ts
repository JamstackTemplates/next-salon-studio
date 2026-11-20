import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { currentDayInZone, DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const genericHours: OpeningHours[] = DAYS.map(day =>
  day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' },
);
const atGeneric = (date: string, zone = 'America/New_York') =>
  openingLabel(genericHours, zone, new Date(date));
const atStudio = (date: string) => openingLabel(business.hours, business.timeZone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(atGeneric('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atGeneric('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(atGeneric('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(atGeneric('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('Atelier Blush Europe/London hours: Monday closed, Wednesday boundary and UK BST transitions', () => {
  // Monday 16 Nov 2026 (GMT): closed all day, opens Tuesday at 10:00
  assert.equal(atStudio('2026-11-16T12:00:00Z'), 'Closed · opens Tuesday at 10:00');
  assert.equal(currentDayInZone('Europe/London', new Date('2026-11-16T12:00:00Z')), 'Monday');

  // Wednesday 18 Nov 2026 (GMT): 19:59 open, 20:00 closed
  assert.equal(atStudio('2026-11-18T19:59:00Z'), 'Open now · until 20:00');
  assert.equal(atStudio('2026-11-18T20:00:00Z'), 'Closed · opens Thursday at 10:00');

  // Last Sunday of March 2026 (29 March, clocks spring forward to BST = UTC+1 at 01:00Z)
  // Sunday hours: 11:00–16:00 BST -> 10:00Z–15:00Z
  assert.equal(atStudio('2026-03-29T09:59:00Z'), 'Closed · opens today at 11:00');
  assert.equal(atStudio('2026-03-29T10:00:00Z'), 'Open now · until 16:00');
  assert.equal(atStudio('2026-03-29T15:00:00Z'), 'Closed · opens Tuesday at 10:00');

  // Last Sunday of October 2026 (25 October, clocks fall back to GMT = UTC+0 at 01:00Z)
  // Sunday hours: 11:00–16:00 GMT -> 11:00Z–16:00Z
  assert.equal(atStudio('2026-10-25T10:59:00Z'), 'Closed · opens today at 11:00');
  assert.equal(atStudio('2026-10-25T11:00:00Z'), 'Open now · until 16:00');
  assert.equal(atStudio('2026-10-25T16:00:00Z'), 'Closed · opens Tuesday at 10:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(atGeneric('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(atGeneric('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(atGeneric('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(atGeneric('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(currentDayInZone('Mars/Base'), null);
  assert.equal(atGeneric('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atGeneric('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(atGeneric('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atGeneric('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(genericHours));
  assert.doesNotThrow(() => validateHours(business.hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(
      () => validateHours(genericHours.map(x => (x.day === 'Tuesday' ? { ...x, opens } : x))),
      /Tuesday/,
    );
  }
  assert.throws(() => validateHours(genericHours.slice(1)), /Monday/);
  assert.throws(
    () => validateHours(genericHours.map(x => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))),
    /Tuesday/,
  );
});
