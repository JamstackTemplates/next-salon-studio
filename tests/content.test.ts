import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { business } from '../content/business.ts';
import { levels } from '../content/levels.ts';
import { lookbook, lookFromTotal, lookPhotoPath } from '../content/lookbook.ts';
import { availableServices, lowestServicePrice, serviceById, services } from '../content/services.ts';
import { stylists } from '../content/stylists.ts';
import { swatches } from '../content/swatches.ts';
import {
  validateAllContent,
  validateLevels,
  validateLookbook,
  validateServices,
  validateStylists,
  validateSwatches,
} from '../content/validate.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

const ROOT = fileURLToPath(new URL('../', import.meta.url));

function walkSourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walkSourceFiles(full, out);
    else if (/\.(ts|tsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

test('all business, level, swatch, service, stylist and lookbook content is valid', () => {
  assert.doesNotThrow(() => validateAllContent());
  assert.equal(levels.length, 4);
  assert.equal(swatches.length, 6);
  assert.equal(services.length, 17);
  assert.equal(stylists.length, 6);
  assert.equal(lookbook.length, 8);
});

test('content validators produce item- and field-specific failures', () => {
  // Duplicate / unsafe IDs
  assert.throws(
    () => validateLevels([{ ...levels[0], id: 'Bad ID' as never }, ...levels.slice(1)]),
    /levels\[Bad ID\]\.id/,
  );
  assert.throws(
    () => validateSwatches([...swatches, { ...swatches[0] }]),
    /swatches\[rose\]\.id: duplicate/,
  );

  // Service price boundaries, missing keys, decreasing tiers, null-only available service, non-colour patchTest
  const cut = services[0];
  assert.throws(
    () => validateServices([{ ...cut, prices: { ...cut.prices, graduate: 0 } }]),
    /services\[cut-and-finish\]\.prices\.graduate/,
  );
  assert.throws(
    () => validateServices([{ ...cut, prices: { ...cut.prices, 'art-director': 501 } }]),
    /services\[cut-and-finish\]\.prices\.art-director/,
  );
  assert.throws(
    () => validateServices([{ ...cut, prices: { ...cut.prices, stylist: 55.5 } }]),
    /services\[cut-and-finish\]\.prices\.stylist/,
  );
  assert.throws(
    () => validateServices([{ ...cut, prices: { graduate: 80, stylist: 70, senior: 85, 'art-director': 110 } }]),
    /services\[cut-and-finish\]\.prices\.stylist.*decreases/,
  );
  // Flat prices across all levels are allowed
  assert.doesNotThrow(() =>
    validateServices([{ ...cut, prices: { graduate: 40, stylist: 40, senior: 40, 'art-director': 40 } }]),
  );
  assert.throws(
    () =>
      validateServices([
        { ...cut, prices: { graduate: null, stylist: null, senior: null, 'art-director': null } },
      ]),
    /services\[cut-and-finish\]\.prices.*at least one level/,
  );
  assert.throws(
    () => validateServices([{ ...cut, patchTest: true }]),
    /services\[cut-and-finish\]\.patchTest/,
  );

  // Stylist level reference
  assert.throws(
    () => validateStylists([{ ...stylists[0], levelId: 'principal' as never }]),
    /stylists\[margaux-lin\]\.levelId/,
  );

  // Lookbook reference & availability constraints
  const firstLook = lookbook[0];
  assert.throws(
    () => validateLookbook([{ ...firstLook, stylistId: 'nobody' }], services, stylists),
    /lookbook\[the-glass-bob\]\.stylistId/,
  );
  assert.throws(
    () => validateLookbook([{ ...firstLook, swatch: 'neon' as never }], services, stylists),
    /lookbook\[the-glass-bob\]\.swatch/,
  );
  assert.throws(
    () => validateLookbook([{ ...firstLook, serviceIds: ['missing-service'] }], services, stylists),
    /lookbook\[the-glass-bob\]\.serviceIds/,
  );
  // Unavailable service referenced by a look fails validation
  const unavailableCut = services.map(s => (s.id === 'cut-and-finish' ? { ...s, available: false } : s));
  assert.throws(
    () => validateLookbook([firstLook], unavailableCut, stylists),
    /lookbook\[the-glass-bob\]\.serviceIds.*unavailable/,
  );
  // Service not offered at stylist's level (bridal-trial is null at graduate level)
  assert.throws(
    () => validateLookbook([{ ...firstLook, stylistId: 'jun-park', serviceIds: ['bridal-trial'] }], services, stylists),
    /lookbook\[the-glass-bob\]\.serviceIds.*not offered/,
  );
});

test('lookbook indicative totals compute dynamically from service prices and stylist level', () => {
  const copperShag = lookbook.find(l => l.id === 'copper-shag')!;
  // Jun Park is Graduate: full-colour (£85) + cut-and-finish (£55) = £140
  assert.equal(lookFromTotal(copperShag), 140);

  const roseGold = lookbook.find(l => l.id === 'rose-gold-melt')!;
  const buttercream = lookbook.find(l => l.id === 'buttercream-balayage')!;
  assert.equal(lookFromTotal(roseGold), 275);
  assert.equal(lookFromTotal(buttercream), 325);

  // Simulate common owner edits: update balayage prices and retire bridal-trial
  const editedServices = services.map(s => {
    if (s.id === 'balayage') {
      return { ...s, prices: { ...s.prices, graduate: 170, 'art-director': 285 } };
    }
    if (s.id === 'bridal-trial') {
      return { ...s, available: false };
    }
    return s;
  });

  assert.doesNotThrow(() => validateServices(editedServices));
  assert.doesNotThrow(() => validateLookbook(lookbook, editedServices, stylists));
  assert.equal(lowestServicePrice(serviceById('balayage', editedServices)!), 170);
  assert.equal(lookFromTotal(roseGold, editedServices, stylists), 285);
  assert.equal(lookFromTotal(buttercream, editedServices, stylists), 335);
  assert.equal(
    availableServices('styling', editedServices).some(s => s.id === 'bridal-trial'),
    false,
  );
});

test('HairSalon JSON-LD derives from content and escapes closing script tags', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'HairSalon');
  assert.equal(schema.name, business.name);
  assert.equal(schema.email, business.email);
  assert.equal(schema.telephone, business.phone);
  assert.equal(schema.priceRange, '££–£££');
  assert.equal(schema.address.postalCode, 'WC2H 9LL');
  assert.equal(schema.openingHoursSpecification.length, 6);
  assert.ok(
    !schema.openingHoursSpecification.some(entry => entry.dayOfWeek.endsWith('/Monday')),
    'Monday is closed and should not appear in openingHoursSpecification',
  );

  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});

test('wording rules: no booking confirmation claims, clear reply confirmation and patch-test notices', () => {
  const forbidden = /\b(book now|booked|confirmed booking)\b/i;
  const filesToCheck = [
    ...walkSourceFiles(join(ROOT, 'app')),
    ...walkSourceFiles(join(ROOT, 'content')),
    ...walkSourceFiles(join(ROOT, 'components')),
  ];

  for (const filePath of filesToCheck) {
    const source = readFileSync(filePath, 'utf8');
    const match = forbidden.exec(source);
    assert.equal(
      match,
      null,
      `Forbidden wording "${match?.[0]}" found in ${filePath.replace(ROOT, '')}`,
    );
  }

  assert.match(business.enquiries.introduction, /confirmed only when we reply/i);
  assert.ok(
    business.enquiries.usefulToInclude.some(tip => /skin allergy alert test/i.test(tip)),
    'Contact usefulToInclude must mention the skin allergy alert test',
  );

  const pricesSource = readFileSync(join(ROOT, 'app/prices/page.tsx'), 'utf8');
  assert.match(pricesSource, /Skin allergy alert test: required at least 48 hours/i);
});

test('every look has a light and dark photograph and no photograph is orphaned', () => {
  const expected: string[] = lookbook.flatMap(look => [lookPhotoPath(look.id, 'light'), lookPhotoPath(look.id, 'dark')]);
  const present = readdirSync(join(ROOT, 'public/looks')).map(name => `/looks/${name}`);
  for (const path of expected) {
    assert.ok(present.includes(path), `missing public${path} for lookbook entry`);
  }
  assert.deepEqual(present.filter(path => !expected.includes(path)), [], 'orphaned files in public/looks/');
});
