import { lookPhotoPath, type Look } from '../content/lookbook';
import { asset } from '../lib/paths';

/** Intrinsic size of the sliced look photographs in `public/looks/`. */
const PHOTO_WIDTH = 670;
const PHOTO_HEIGHT = 754;

/**
 * A look's editorial photograph, swapping between the blush (light) and plum (dark)
 * backdrop versions with the active theme. The adjacent caption describes the look,
 * so the photographs are presentational.
 */
export function LookPhoto({
  look,
  className = '',
  eager = false,
}: {
  look: Pick<Look, 'id'>;
  className?: string;
  eager?: boolean;
}) {
  const shared = {
    alt: '',
    width: PHOTO_WIDTH,
    height: PHOTO_HEIGHT,
    loading: eager ? ('eager' as const) : ('lazy' as const),
    decoding: 'async' as const,
  };

  return (
    <div className={`look-photo relative overflow-hidden bg-paper-blush ${className}`}>
      <img {...shared} src={asset(lookPhotoPath(look.id, 'light'))} className="look-photo-light h-full w-full object-cover" />
      <img {...shared} src={asset(lookPhotoPath(look.id, 'dark'))} className="look-photo-dark h-full w-full object-cover" />
    </div>
  );
}
