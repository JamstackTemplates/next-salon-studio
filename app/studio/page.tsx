import type { Metadata } from 'next';
import { CutMotif } from '../../components/art/section-motifs';
import { PageHead } from '../../components/page-head';
import {
  StudioExpectations,
  StudioMastheadTeam,
  StudioVisit,
} from '../../components/studio-sections';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'The Studio',
  description:
    'Meet the six stylists on the Atelier Blush masthead, see what to expect at your visit and find our first-floor studio in Seven Dials, London.',
  alternates: { canonical: absoluteUrl('/studio/') },
};

export default function StudioPage() {
  return (
    <>
      <PageHead
        department="The Studio"
        folio="p.32"
        title="Masthead"
        motif={<CutMotif className="h-12 w-12" />}
      >
        <p>
          Six stylists, tall Georgian windows overlooking Earlham Street and a calm first-floor
          room where every appointment gets the time it deserves. Meet the team below, see how an
          appointment unfolds and plan your visit to Seven Dials.
        </p>
      </PageHead>

      <StudioMastheadTeam
        heading="The stylists on the floor."
        intro="Our team works across four clear levels. Every Graduate appointment is checked by a Senior Stylist or Art Director before you leave the chair."
      />

      <StudioExpectations department="How A Visit Works" folio="p.36" heading="What to expect.">
        <StudioExpectations.Step number="01" title="Consultation">
          Every appointment begins at the mirror—discussing texture, grow-out, references and a
          confirmed quote before we start.
        </StudioExpectations.Step>
        <StudioExpectations.Step number="02" title="Patch test">
          Pop in for a free five-minute skin allergy alert test at least 48 hours ahead of any
          colour or lightener service.
        </StudioExpectations.Step>
        <StudioExpectations.Step number="03" title="The wash">
          Unhurried cleanse, bond or moisture masque and warm towel scalp massage at our quiet
          backwash room.
        </StudioExpectations.Step>
        <StudioExpectations.Step number="04" title="The finish">
          Dry detail work after styling so fringes, layers and curls fall exactly as they will on
          day thirty.
        </StudioExpectations.Step>
        <StudioExpectations.Step number="05" title="Aftercare">
          Practical styling tips and realistic upkeep timing—never a hard sell at the reception
          desk.
        </StudioExpectations.Step>
      </StudioExpectations>

      <StudioVisit
        department="Find Us"
        folio="p.38"
        heading="Visit us in Seven Dials."
        accessHeading="Step-free access note"
      />
    </>
  );
}
