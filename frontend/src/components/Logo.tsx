import { cx } from '../lib/format';

interface LogoProps {
  /** `dark` is for navy backgrounds: the mark sits on a white tile and the wordmark turns white. */
  tone?: 'light' | 'dark';
}

/** U+T monogram plus a wordmark echoing the logo's "UN·MAPPED / — TRIPS —" lockup. */
export const Logo = ({ tone = 'light' }: LogoProps) => {
  const dark = tone === 'dark';
  return (
    <span className="flex items-center gap-2.5">
      <span className={cx('flex shrink-0', dark && 'rounded-lg bg-white p-1.5')}>
        <img src="/logo-mark.png" alt="" width={289} height={240} className="h-10 w-auto" />
      </span>
      {/* The space keeps the accessible name "Unmapped Trips"; flex drops it from layout. */}
      <span className="flex flex-col leading-none">
        <span
          className={cx(
            'text-lg font-extrabold uppercase tracking-tight',
            dark ? 'text-white' : 'text-brand-800',
          )}
        >
          Un<span className="text-accent-500">mapped</span>
        </span>{' '}
        <span className="mt-1 flex items-center gap-1.5">
          <span className="h-px flex-1 bg-accent-500" />
          <span
            className={cx(
              '-mr-[0.4em] text-[10px] font-semibold uppercase tracking-[0.4em]',
              dark ? 'text-slate-200' : 'text-brand-800',
            )}
          >
            Trips
          </span>
          <span className="h-px flex-1 bg-accent-500" />
        </span>
      </span>
    </span>
  );
};
