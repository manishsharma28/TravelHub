import { Link } from 'react-router-dom';
import type { TravelPackage } from '@travelhub/shared';
import { formatDuration, formatItinerary, formatPrice } from '../lib/format';
import { ClockIcon, PinIcon, StarIcon } from './Icons';

const BUDGET_STYLES: Record<TravelPackage['budgetCategory'], string> = {
  Budget: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'Mid-Range': 'bg-sky-50 text-sky-700 ring-sky-200',
  Luxury: 'bg-violet-50 text-violet-700 ring-violet-200',
};

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
        <span className="inline-flex items-center gap-1">
          <ClockIcon className="h-3.5 w-3.5" />
          {formatDuration(pkg.nights, pkg.days)}
        </span>
        <span className="inline-flex items-center gap-1">
          <PinIcon className="h-3.5 w-3.5" />
          {pkg.destination}
        </span>
      </div>

      <h3 className="mt-2 text-base font-semibold leading-snug text-slate-900">
        <Link to={`/packages/${pkg.slug}`} className="transition hover:text-brand-700">
          {pkg.title}
        </Link>
      </h3>

      <p className="mt-1.5 line-clamp-1 text-xs text-slate-500">{formatItinerary(pkg.itinerary)}</p>

      <div className="mt-3 flex items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1 rounded bg-brand-600 px-1.5 py-0.5 font-bold text-white">
          {pkg.operator.rating.toFixed(1)}
          <StarIcon className="h-3 w-3" />
        </span>
        <span className="truncate text-slate-600">
          {pkg.operator.name} · {pkg.operator.reviewCount} reviews
        </span>
      </div>

      <p className="mt-2 text-xs text-slate-500">{pkg.hotelType}</p>

      <ul className="mt-3 flex flex-wrap gap-1.5">
        {pkg.themes.slice(0, 3).map((theme) => (
          <li
            key={theme}
            className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
          >
            {theme}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-end justify-between gap-3 pt-4">
        <div>
          {pkg.discountPercent > 0 && (
            <p className="text-xs text-slate-400 line-through">{formatPrice(pkg.basePrice)}</p>
          )}
          <p className="text-lg font-bold text-slate-900">{formatPrice(pkg.price)}</p>
          <p className="text-[11px] text-slate-500">per person</p>
        </div>
        <Link
          to={`/packages/${pkg.slug}`}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Get Offers
        </Link>
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
      <div className="flex items-end justify-between pt-4">
        <div className="h-6 w-24 animate-pulse rounded bg-slate-200" />
        <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-200" />
      </div>
    </div>
  </div>
);
