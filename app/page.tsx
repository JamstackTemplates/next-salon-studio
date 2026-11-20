import type { Metadata } from 'next';
import {
  balayageLowestPrice,
  ContentsIssue,
  CoverHero,
  EditorialPullQuote,
  LevelLadder,
  LookbookPreview,
  VisitStrip,
} from '../components/home-sections';
import { business } from '../content/business';
import { stylistById } from '../content/stylists';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  const balayageMin = balayageLowestPrice();
  const artDirector = stylistById('margaux-lin');

  return (
    <>
      {/* 1. Magazine Cover Hero */}
      <CoverHero
        mastheadTop="Atelier"
        mastheadBottom="Blush"
        coverLines={
          <>
            <CoverHero.CoverLine label="Feature · Cut" href="/lookbook/">
              The Glass Bob, cut to last five weeks
            </CoverHero.CoverLine>
            <CoverHero.CoverLine label="Colour Desk" href="/prices/#balayage">
              Balayage from £{balayageMin}
            </CoverHero.CoverLine>
            <CoverHero.CoverLine label="Evening & Bridal" href="/prices/#occasion-hair">
              Occasion hair for the season
            </CoverHero.CoverLine>
          </>
        }
        headline={business.tagline}
        subline="Precision cutting, lived-in colour and occasion hair in Seven Dials, priced by the stylist you choose."
        primaryCta="Request an appointment"
        secondaryCta="See the price list"
      />

      {/* 2. "In this issue" — Typeset magazine contents list on blush halftone */}
      <ContentsIssue
        department="In This Issue"
        folio="p.04"
        heading="Three departments, priced transparently."
        intro="Every appointment begins with an unhurried consultation and ends with a dry check and finish. Starting prices reflect our Graduate Stylist tier."
      >
        <ContentsIssue.Entry number="01" category="cut" title="Cut & finish" pageNote="p.13">
          Razor-clean bobs, dry curl shaping, short sculpted crops and fringe tidies tailored to grow out cleanly.
        </ContentsIssue.Entry>
        <ContentsIssue.Entry number="02" category="colour" title="Colour" pageNote="p.14">
          Hand-painted balayage, fine foils, glossy demi-permanent toners and multi-step corrective colour.
        </ContentsIssue.Entry>
        <ContentsIssue.Entry number="03" category="styling" title="Styling" pageNote="p.16">
          Velvet round-brush blow-dries, pinned occasion hair, bridal trials and in-basin bond-repair care.
        </ContentsIssue.Entry>
      </ContentsIssue>

      {/* 3. "How our levels work" — Four-tier ladder with stepped SVG price graph */}
      <LevelLadder
        department="Stylist Levels"
        folio="p.08"
        heading="Choose the chair that suits your hair."
        intro="All four levels share the same studio training, products and consultation time. Pricing reflects years on the floor and specialist complexity—shown below for a Cut & finish."
      />

      {/* 4. Lookbook Preview — Asymmetric 8/4 editorial spread on surface */}
      <LookbookPreview
        department="Lookbook AW26"
        folio="p.20"
        heading="Seen on the studio floor."
        ctaLabel="Open the full lookbook"
      />

      {/* 5. Pull Quote from the Art Director */}
      <EditorialPullQuote
        quote={artDirector?.quote ?? 'A good cut should still look right on the fifth week.'}
        attribution={artDirector?.name ?? 'Margaux Lin'}
        role="Art Director"
      />

      {/* 6. Visit Strip — Seven Dials map vignette, hours, contact & CTA */}
      <VisitStrip
        department="Visit The Studio"
        folio="p.38"
        heading="First floor, thirty seconds from the sundial."
        ctaLabel="Request an appointment"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
