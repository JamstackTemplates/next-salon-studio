import type { Metadata } from 'next';
import { StylingMotif } from '../../components/art/section-motifs';
import { LookbookGallery, type ResolvedLook } from '../../components/lookbook-gallery';
import { PageHead } from '../../components/page-head';
import { EditorialCta } from '../../components/prices-sections';
import { levelById } from '../../content/levels';
import { lookbook, lookFromTotal } from '../../content/lookbook';
import { serviceById } from '../../content/services';
import { stylistById } from '../../content/stylists';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Lookbook AW26',
  description:
    'Eight seasonal cuts, lived-in colour placements and occasion finishes from Atelier Blush Hair Studio, with stylist credits and indicative totals.',
  alternates: { canonical: absoluteUrl('/lookbook/') },
};

export default function LookbookPage() {
  const resolvedLooks: ResolvedLook[] = lookbook.map((look, index) => {
    const stylist = stylistById(look.stylistId)!;
    const level = levelById(stylist.levelId)!;
    const usedServices = look.serviceIds.map(id => {
      const service = serviceById(id)!;
      return { id: service.id, name: service.name };
    });

    return {
      look,
      stylistName: stylist.name,
      stylistLevelName: level.name,
      services: usedServices,
      fromTotal: lookFromTotal(look),
      plateNumber: String(index + 1).padStart(2, '0'),
    };
  });

  return (
    <>
      <PageHead
        department="Lookbook"
        folio="p.20"
        title="Lookbook AW26"
        motif={<StylingMotif className="h-12 w-12" />}
      >
        <p>
          This season our chairs lean into crisp silhouettes that need minimal heat at home—glass
          bobs tucked beneath wool collars, burnished coppers, hand-painted buttercream ribbons and
          dry-cut coils with weightless bounce. Each plate below lists the stylist, the services
          behind the finish and an indicative starting total at their level.
        </p>
        <p className="mt-3 font-display text-base italic text-blush-ink">
          — Margaux Lin, Art Director
        </p>
      </PageHead>

      <LookbookGallery items={resolvedLooks} />

      <EditorialCta
        eyebrow="Autumn / Winter Consultation"
        line="Bring a look to your consultation."
        buttonLabel="Request an appointment"
        secondaryHref="/prices/"
        secondaryLabel="See the full price list"
      />
    </>
  );
}
