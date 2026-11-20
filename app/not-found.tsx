import { ErratumArt } from '../components/art/erratum-art';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="halftone-band py-16 sm:py-24">
      <div className="wrap flex max-w-2xl flex-col items-center text-center">
        <p className="dept-label">
          Erratum <span className="mx-1.5 text-gold">—</span> <span className="folio">p.00</span>
        </p>

        <div className="my-6 w-full max-w-sm">
          <ErratumArt />
        </div>

        <h1 className="font-display text-[clamp(2.4rem,6vw,4.2rem)] font-medium italic leading-tight text-headline-italic">
          This page has been cut.
        </h1>

        <p className="mt-4 max-w-md text-base text-muted">
          The page you asked for isn&rsquo;t in this issue. Try the front cover, the price list or
          this season&rsquo;s lookbook instead.
        </p>

        <nav
          aria-label="Recovery links"
          className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-ink/25 pt-6"
        >
          <SiteLink href="/" className="editorial-link dept-label text-ink hover:text-blush-ink">
            Home
          </SiteLink>
          <SiteLink href="/prices/" className="editorial-link dept-label text-ink hover:text-blush-ink">
            Prices
          </SiteLink>
          <SiteLink href="/lookbook/" className="editorial-link dept-label text-ink hover:text-blush-ink">
            Lookbook
          </SiteLink>
        </nav>
      </div>
    </section>
  );
}
