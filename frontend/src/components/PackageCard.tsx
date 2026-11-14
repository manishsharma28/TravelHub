import { Link } from 'react-router-dom';
import type { TravelPackage } from '@travelhub/shared';
import { formatDuration, formatItinerary, formatPrice } from '../lib/format';
import { BedIcon, ClockIcon, PinIcon, StarIcon, UsersIcon } from './Icons';

const BUDGET_STYLES: Record<TravelPackage['budgetCategory'], string> = {
  Budget: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'Mid-Range': 'bg-sky-50 text-sky-700 ring-sky-200',
  Luxury: 'bg-violet-50 text-violet-700 ring-violet-200',
};

const FACT_CHIP = 'inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-brand-700';
const THEME_CHIP = 'rounded-full bg-slate-100 px-2 py-0.5 text-slate-600';

export const PackageCard = ({ pkg }: { pkg: TravelPackage }) => (
  <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg">
    <Link to={`/packages/${pkg.slug}`} className="relative block aspect-16/10 overflow-hidden">
      <img
        src={pkg.imageUrl}
        alt={pkg.title}
        loading="lazy"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      {pkg.discountPercent > 0 && (
        <span className="absolute left-3 top-3 rounded-full bg-accent-500 px-2.5 py-1 text-xs font-bold text-white shadow">
          {pkg.discountPercent}% OFF
        </span>
      )}
      <span
        className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${BUDGET_STYLES[pkg.budgetCategory]}`}
      >
        {pkg.budgetCategory}
      </span>
    </Link>

    <div className="flex flex-1 flex-col p-4">
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span className="inline-flex shrink-0 items-center gap-1">
          <ClockIcon className="h-3.5 w-3.5" />
          {formatDuration(pkg.nights, pkg.days)}
        </span>
        <span className="inline-flex min-w-0 items-center gap-1">
          <PinIcon className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{pkg.destination}</span>
        </span>
      </div>

      <h3 className="mt-1.5 text-base font-semibold leading-snug text-slate-900">
        <Link to={`/packages/${pkg.slug}`} className="transition hover:text-brand-700">
          {pkg.title}
        </Link>
      </h3>
      <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{formatItinerary(pkg.itinerary)}</p>

      {pkg.operator && (
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded bg-brand-600 px-1.5 py-0.5 font-bold text-white">
            {pkg.operator.rating.toFixed(1)}
            <StarIcon className="h-3 w-3" />
          </span>
          <span className="truncate text-slate-600">
            {pkg.operator.name} · {pkg.operator.reviewCount} reviews
          </span>
        </div>
      )}

      {/* Stay and group size first, tinted, so they read as facts rather than themes. */}
      <ul className="mt-2.5 flex flex-wrap gap-1.5 text-[11px] font-medium">
        <li className={FACT_CHIP}>
          <BedIcon className="h-3 w-3" />
          {pkg.hotelType}
        </li>
        {pkg.minGroupSize ? (
          <li className={FACT_CHIP}>
            <UsersIcon className="h-3 w-3" />
            Min. {pkg.minGroupSize} travellers
          </li>
        ) : null}
        {pkg.themes.slice(0, 3).map((theme) => (
          <li key={theme} className={THEME_CHIP}>
            {theme}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-3">
        <div className="flex items-end justify-between gap-3 border-t border-slate-100 pt-3">
          <div className="min-w-0">
            {pkg.discountPercent > 0 && (
              <p className="text-xs leading-tight">
                <span className="text-slate-400 line-through">{formatPrice(pkg.basePrice)}</span>
                <span className="ml-1.5 font-semibold text-emerald-700">
                  Save {formatPrice(pkg.basePrice - pkg.price)}
                </span>
              </p>
            )}
            <p className="mt-0.5 whitespace-nowrap">
              <span className="text-lg font-bold text-slate-900">{formatPrice(pkg.price)}</span>
              <span className="ml-1 text-xs text-slate-500">per {pkg.pricedPer}</span>
            </p>
          </div>
          <Link
            to={`/packages/${pkg.slug}`}
            className="shrink-0 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Get Offers
          </Link>
        </div>
      </div>
    </div>
  </article>
);

export const PackageCardSkeleton = () => (
  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
    <div className="aspect-16/10 animate-pulse bg-slate-200" />
    <div className="space-y-3 p-4">
      <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />
      <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200" />
      <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200" />
      <div className="flex items-end justify-between border-t border-slate-100 pt-3">
        <div className="h-6 w-24 animate-pulse rounded bg-slate-200" />
        <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-200" />
      </div>
    </div>
  </div>
);
