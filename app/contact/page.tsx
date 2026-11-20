import type { Metadata } from 'next';
import { ContactLettersPage } from '../../components/contact-sections';
import { PageHead } from '../../components/page-head';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <ContactLettersPage
      head={
        <PageHead
          department="Correspondence"
          folio="p.42"
          title={business.enquiries.title}
          compact
        >
          <p>{business.enquiries.introduction}</p>
        </PageHead>
      }
      usefulHeading="Useful to include in your message"
      lettersHeading="Letters to the editor"
      fallbackHeading="Write to the studio desk directly"
      fallbackBody="The online enquiry form is not connected in this preview. Please email or telephone the studio desk directly using the details alongside—we reply within one working day."
      hosted={hosted}
      siteId={site.jamstacksSite}
      embedUrl={site.jamstacksEmbedUrl}
    />
  );
}
