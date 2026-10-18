// Imported (not served from public/) so the built filename is content-hashed:
// browsers and the CDN can't keep showing an old version after the logo changes.
import logoMark from '../assets/logo-mark.png';

/** The logo's U+T mark in a white, navy-ringed circle — matches public/favicon.png. */
export const LogoMark = () => (
  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-brand-800 bg-white">
    {/* Set slightly low so the gap under the U is a bit smaller than above the T; same fit as favicon.png. */}
    <img src={logoMark} alt="" width={263} height={240} className="w-[68%] translate-y-[10%]" />
  </span>
);

/** Monogram plus a wordmark echoing the "UN·MAPPED / — TRIPS —" lockup. */
export const Logo = () => (
  <span className="flex items-center gap-2">
    <LogoMark />
    {/* The space keeps the accessible name "Unmapped Trips"; flex drops it from layout. */}
    <span className="flex flex-col leading-none">
      <span className="text-[15px] font-extrabold uppercase tracking-tight text-brand-800">
        Un<span className="text-accent-500">mapped</span>
      </span>{' '}
      <span className="mt-1 flex items-center gap-1.5">
        <span className="h-px flex-1 bg-accent-500" />
        <span className="mr-[-0.4em] text-[9px] font-semibold uppercase tracking-[0.4em] text-brand-800">
          Trips
        </span>
        <span className="h-px flex-1 bg-accent-500" />
      </span>
    </span>
  </span>
);
