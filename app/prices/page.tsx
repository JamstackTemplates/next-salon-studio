import type { Metadata } from 'next';
import { ColourMotif } from '../../components/art/section-motifs';
import { PageHead } from '../../components/page-head';
import { CategoryJumpBar, PriceListInteractive } from '../../components/price-list';
import { EditorialCta, LevelKey, SmallPrint } from '../../components/prices-sections';
import { availableServices } from '../../content/services';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Prices',
  description:
    'Full cut, colour and styling price list at Atelier Blush Hair Studio in Seven Dials, London, priced transparently across all four stylist levels.',
  alternates: { canonical: absoluteUrl('/prices/') },
};

export default function PricesPage() {
  const cutServices = availableServices('cut');
  const colourServices = availableServices('colour');
  const stylingServices = availableServices('styling');

  return (
    <>
      <PageHead
        department="The Price List"
        folio="p.12"
        title="The Price List"
        motif={<ColourMotif className="h-12 w-12" />}
      >
        <p>
          Prices vary by stylist level—from Graduate Stylist to Art Director—and every appointment
          includes a thorough consultation, wash and tailored finish. Any colour or lightener service
          requires a complimentary skin allergy alert test at least 48 hours beforehand.
        </p>
      </PageHead>

      <LevelKey heading="Understanding our four stylist levels">
        <CategoryJumpBar
          items={[
            { id: 'cut', label: 'Cut & finish', folio: 'p.13' },
            { id: 'colour', label: 'Colour', folio: 'p.14' },
            { id: 'styling', label: 'Styling', folio: 'p.16' },
          ]}
        />
      </LevelKey>

      <PriceListInteractive
        cutServices={cutServices}
        colourServices={colourServices}
        stylingServices={stylingServices}
        cutIntro="Tailored cutting built around natural movement, density and how your hair settles five weeks later."
        colourIntro="Dimensional, low-maintenance colour formulated for shine. Hover or focus any colour row to lift its swatch."
        stylingIntro="Polished blow-dries, pinned occasion shapes and restorative in-basin treatments."
        patchTestNote="Skin allergy alert test: required at least 48 hours before any colour service, including for returning clients who haven't had colour with us in six months. It takes five minutes and is free."
      />

      <SmallPrint heading="Colophon &amp; small print">
        <SmallPrint.Note number="01">
          &ldquo;From&rdquo; prices depend on hair length, density and the amount of colour product
          needed for an even result.
        </SmallPrint.Note>
        <SmallPrint.Note number="02">
          Final quotes are always confirmed aloud during your consultation before a single scissor or
          tint brush is lifted.
        </SmallPrint.Note>
        <SmallPrint.Note number="03">
          We kindly ask for at least 48 hours&rsquo; notice if you need to move or cancel an
          appointment so we can offer the chair to another guest.
        </SmallPrint.Note>
        <SmallPrint.Note number="04">
          All listed figures are in whole British pounds (GBP) and include VAT.
        </SmallPrint.Note>
      </SmallPrint>

      <EditorialCta
        eyebrow="Appointment Enquiries"
        line="Not sure which level? Tell us what you have in mind."
        buttonLabel="Request an appointment"
        secondaryHref="/studio/"
        secondaryLabel="Meet the stylists"
      />
    </>
  );
}
