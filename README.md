# Atelier Blush Hair Studio (`next-salon-studio`)

An editorial hair salon website built as a static Next.js export for the Jamstacks gallery. Styled
as a fashion magazine issue printed on soft blush paper (with an aubergine-and-blush "evening
edition" dark mode), it features a cut/colour/styling price list by stylist level, a seasonal
lookbook with computed totals, a studio masthead and map page, and an enquiry-first Contact page.

Every person, price, address detail and contact address in this sample is fictitious. Replace them
with your real salon details before launching.

## Local preview

Local development requires Node 24 or later and npm:

```sh
npm ci
npm run dev
```

To build and serve the static export locally:

```sh
npm run check
npm start
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Cover hero with masthead and cover portrait, "In this issue" contents, 4-level price ladder, lookbook preview, pull quote, visit strip and `HairSalon` JSON-LD |
| `/prices/` | Full Cut & finish, Colour (with interactive swatch fan & patch-test Editor's note) and Styling price tables across four stylist levels, plus progressive-enhancement level picker (`#level=senior`) |
| `/lookbook/` | AW26 Lookbook with eight editorial photographs (light & dark versions), category filter tabs, stylist credits, service links and computed "from" totals |
| `/studio/` | Team masthead credits grouped by stylist level, five-step visit expectations, weekly opening hours (`Europe/London`), drawn Seven Dials map vignette, Google Map embed and accessibility notes |
| `/contact/` | Appointment enquiry letters page: hosted Jamstacks support form when configured, visible email/phone desk column in every state |
| `/404.html` | Themed "Erratum" static error page |

## Make it yours (file ownership & common edits)

| File | Owns |
| --- | --- |
| `content/business.ts` | Studio name, masthead, issue line, email, phone, address, directions, accessibility note, weekly `hours` (`Europe/London`) and Contact guidance |
| `content/levels.ts` | The four stylist levels (`graduate`, `stylist`, `senior`, `art-director`) and descriptions |
| `content/services.ts` | All 17 Cut, Colour and Styling services, prices per level, durations, `from` flags, `patchTest` flags and `available` toggles |
| `content/stylists.ts` | The six stylists, their current `levelId`, specialisms, quotes, cameo portrait keys and `bookable` status |
| `content/lookbook.ts` | Seasonal looks referencing stylist IDs, service IDs and swatch IDs; indicative "from" totals are always computed from `content/services.ts` |
| `content/swatches.ts` | The six signature hair-colour swatches (light & dark hex values) used in the swatch fan and lookbook tabs |
| `content/validate.ts` | Item- and field-specific content integrity validators exercised by `tests/content.test.ts` |
| `app/page.tsx`, `app/prices/page.tsx`, `app/lookbook/page.tsx`, `app/studio/page.tsx`, `app/contact/page.tsx`, `app/not-found.tsx` | Page-specific editable headings, stand-first copy, notes and calls to action |
| `components/art/` | Inline SVG fashion illustrations (swatch fan, 6 cameo portraits, motifs, dividers, icons, Seven Dials map vignette, 404 erratum) |
| `app/tailwind.input.css` | Light and dark palette tokens, editorial textures (paper grain & halftone screens), responsive `@container` price table styles, motion and print stylesheet |
| `site.config.json` | Public site name, meta description, domain, `timeZone` (`Europe/London`) and Jamstacks integration (`siteId`, `cdnUrl`) |
| `lib/structured-data.ts` | `HairSalon` JSON-LD derived from `content/business.ts` |
| `app/sitemap.ts` | Static sitemap listing all public routes |

### Frequent owner edits

- **Update a service price:** edit the `prices` record in `content/services.ts` (whole GBP in `1–500`, or `null` when a level does not offer the service; prices must not decrease across levels). Updating `balayage` automatically updates the `/prices/` table, the Home cover line (`Balayage from £…`) and the `rose-gold-melt` and `buttercream-balayage` lookbook totals.
- **Hide a service temporarily:** set `available: false` on a service in `content/services.ts` (note: remove it from any lookbook entry's `serviceIds` first if referenced).
- **Promote a stylist:** change their `levelId` in `content/stylists.ts`; their Masthead group and lookbook totals update automatically.
- **Pause new clients for a stylist:** set `bookable: false` on that stylist in `content/stylists.ts`.
- **Add or retire a lookbook look:** edit `content/lookbook.ts` and run `npm test` to validate all service, stylist and swatch references.
- **Replace a look's photograph:** each look needs two matching portrait images (670×754, about 8:9) in `public/looks/`, named after the look's `id`: `<id>-light.webp` on the blush backdrop and `<id>-dark.webp` on the plum backdrop. The site shows the one for the active theme, and `npm test` fails if a look is missing either file or a file has no matching look.
- **Edit page copy:** edit headings, stand-first paragraphs, small print and CTAs directly inside the route's `app/**/page.tsx` file.
- **Replace the homepage portrait:** update `public/salon-light.webp` and `public/salon-dark.webp` with matching square images. The site uses the portrait for the active theme.
- **Rename the salon:** update `business.name` / `business.masthead` in `content/business.ts` and `name` in `site.config.json`. Never add business data to `site.config.json` (the Jamstacks provisioner replaces that file wholesale).

## Typography, themes & licences

Self-hosted variable fonts installed through npm (no external font CDN requests):

- **Display:** `@fontsource-variable/playfair-display` (roman & italic) — SIL Open Font License 1.1 (OFL)
- **Body & UI:** `@fontsource-variable/epilogue` (roman & italic) — SIL Open Font License 1.1 (OFL)

Light and dark ("evening edition") tokens are defined in `app/tailwind.input.css` across `:root`,
`@media (prefers-color-scheme: dark)` and `:root.dark`, integrated with `jamstacks`' `ThemeProvider`,
`ThemeScript` and `DarkModeToggle`. Reduced motion disables fan, reveal and underline transitions;
the print stylesheet keeps the masthead and price tables in crisp black on white.

## Public configuration

```json
{
  "name": "Atelier Blush Hair Studio",
  "description": "Atelier Blush is an editorial hair studio in Seven Dials, London: precision cuts, lived-in colour and occasion styling, priced clearly by stylist level.",
  "domain": "next-salon-studio.jamstacks.net",
  "timeZone": "Europe/London",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config `timeZone` (`Europe/London`) |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

Copy `.env.example` to `.env.local` for local overrides. Never add tokens, SMTP credentials or
publishing keys.

## Contact contract

`/contact/` alone renders `<jamstacks-support-form>` and one `{cdn}/sites/{siteId}/embed.js`
bootstrap when a public site ID is configured. Without a site ID there is no embed host or script
request, and the email fallback appears inside the same panel frame. `hello@atelierblush.co.uk` and
`020 7946 0381` remain visible in every state. Navigation to and from `/contact/` uses full-document
loads via `SiteLink`. All wording describes appointment enquiries and states that an appointment is
confirmed only when the studio replies.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

`npm run check` runs unit tests (configuration, content validation, lookbook totals, `HairSalon`
JSON-LD escaping, wording rules, `Europe/London` opening hours & UK BST transitions, and embed
status state machine), `next typegen && tsc --noEmit`, and the static export build.

## GitHub Pages deployment & CSP

`.github/workflows/pages.yml` builds pull requests without deploying and publishes `main` or manual
dispatches while preserving Jamstacks' `provisioning_id` input and correlated run name. Do not add
`public/CNAME`. A host-level CSP must permit same-origin Next.js assets, the inline theme bootstrap,
the configured Jamstacks CDN/form API origins when enabled, and `frame-src https://www.google.com`
for The Studio map embed.

## Gallery publishing assets

`jamstacks/` is removable gallery-only source metadata (`config.json`, `home-light.jpg`,
`home-dark.jpg`, `screenshots.json`, `config.test.mjs`). Customer builds, tests and GitHub Pages do
not read it. After a fresh normal build, run:

```sh
node --test jamstacks/config.test.mjs
```

Remove `plan/` and `.claude/skills/` after reviewing the finished template before publication.
