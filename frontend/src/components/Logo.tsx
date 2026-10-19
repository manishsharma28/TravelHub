// Imported (not served from public/) so the built filename is content-hashed:
// browsers and the CDN can't keep showing an old version after the logo changes.
import logoMark from '../assets/logo-mark.png';

/** The logo's U+T mark in a white, navy-bordered rounded square. */
export const LogoMark = () => (
  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-800 bg-white">
    {/* Optically centred (between box centre and visual weight); same fit as favicon.png. */}
    <img src={logoMark} alt="" width={263} height={240} className="w-[78%] translate-y-[1.2%]" />
  </span>
);

/** Monogram plus a wordmark echoing the "UN·MAPPED / — TRIPS —" lockup. */
export const Logo = () => (
  <span className="flex items-center gap-1.5">
    <LogoMark />
    {/* The space keeps the accessible name "Unmapped Trips"; flex drops it from layout. */}
    <span className="flex flex-col leading-none">
      <span className="text-[13px] font-extrabold uppercase tracking-tight text-brand-800">
        Un<span className="text-accent-500">mapped</span>
      </span>{' '}
      <span className="mt-0.5 flex items-center gap-1.5">
        <span className="h-px flex-1 bg-accent-500" />
        <span className="mr-[-0.4em] text-[8px] font-semibold uppercase tracking-[0.4em] text-brand-800">
          Trips
        </span>
        <span className="h-px flex-1 bg-accent-500" />
      </span>
    </span>
  </span>
);
