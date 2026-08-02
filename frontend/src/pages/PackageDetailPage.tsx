import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { useApi } from '../lib/useApi';
import { cx, formatDuration, formatPrice } from '../lib/format';
import { EnquiryForm } from '../components/EnquiryForm';
import { PackageCard } from '../components/PackageCard';
import { CheckIcon, ClockIcon, PinIcon, StarIcon } from '../components/Icons';

type Tab = 'itinerary' | 'inclusions' | 'highlights';

const TABS: Array<{ id: Tab; label: string }> = [
  { id: 'itinerary', label: 'Day-wise Itinerary' },
  { id: 'inclusions', label: 'Inclusions & Exclusions' },
  { id: 'highlights', label: 'Highlights' },
];

export const PackageDetailPage = () => {
  const { slug = '' } = useParams();
  const { data: pkg, loading, error } = useApi(() => api.getPackage(slug), [slug]);
  const [tab, setTab] = useState<Tab>('itinerary');
  const [activeImage, setActiveImage] = useState(0);

  // Reset view state when navigating between packages via the "related" cards.
  useEffect(() => {
    setActiveImage(0);
    setTab('itinerary');
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="h-80 animate-pulse rounded-2xl bg-slate-200" />
        <div className="mt-6 h-8 w-2/3 animate-pulse rounded bg-slate-200" />
        <div className="mt-3 h-4 w-1/3 animate-pulse rounded bg-slate-200" />
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Package not found</h1>
        <p className="mt-3 text-slate-600">
          {error ?? 'This package may have been removed or the link is incorrect.'}
        </p>
        <Link
          to="/packages"
          className="mt-6 inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Browse all packages
        </Link>
      </div>
    );
  }

  const gallery = pkg.gallery.length > 0 ? pkg.gallery : [pkg.imageUrl];

  return (
    <div className="bg-slate-50 pb-16">
      {/* Breadcrumb */}
      <nav className="border-b border-slate-200 bg-white" aria-label="Breadcrumb">
        <ol className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs text-slate-500 sm:px-6 lg:px-8">
          <li><Link to="/" className="hover:text-brand-700">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to="/packages" className="hover:text-brand-700">Packages</Link></li>
          <li aria-hidden="true">/</li>
          <li className="truncate font-medium text-slate-700">{pkg.title}</li>
        </ol>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-8">
          <div>
            {/* Gallery */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <img
                src={gallery[activeImage]}
                alt={pkg.title}
                className="aspect-16/9 w-full object-cover"
              />
              {gallery.length > 1 && (
                <div className="flex gap-2 p-3">
                  {gallery.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-label={`View image ${index + 1}`}
                      className={cx(
                        'h-16 w-24 overflow-hidden rounded-lg ring-2 transition',
                        index === activeImage ? 'ring-brand-600' : 'ring-transparent hover:ring-slate-300',
                      )}
                    >
                      <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title block */}
            <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-200">
                  {pkg.budgetCategory}
                </span>
                {pkg.themes.map((theme) => (
                  <span key={theme} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {theme}
                  </span>
                ))}
              </div>

              <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">{pkg.title}</h1>
              <p className="mt-3 text-slate-600">{pkg.summary}</p>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-slate-100 pt-5 text-sm">
                <span className="inline-flex items-center gap-1.5 text-slate-700">
                  <ClockIcon className="h-4 w-4 text-brand-600" />
                  {formatDuration(pkg.nights, pkg.days)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-700">
                  <PinIcon className="h-4 w-4 text-brand-600" />
                  {pkg.itinerary.map((stop) => `${stop.city} ${stop.nights}N`).join(' · ')}
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-700">
                  <span className="inline-flex items-center gap-1 rounded bg-brand-600 px-1.5 py-0.5 text-xs font-bold text-white">
                    {pkg.operator.rating.toFixed(1)}
                    <StarIcon className="h-3 w-3" />
                  </span>
                  {pkg.operator.name} · {pkg.operator.reviewCount} reviews
                </span>
                <span className="text-slate-700">{pkg.hotelType}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 rounded-2xl bg-white shadow-sm">
              <div className="flex gap-1 overflow-x-auto border-b border-slate-200 px-3 pt-3" role="tablist">
                {TABS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={tab === item.id}
                    onClick={() => setTab(item.id)}
                    className={cx(
                      'whitespace-nowrap rounded-t-lg px-4 py-2.5 text-sm font-semibold transition',
                      tab === item.id
                        ? 'border-b-2 border-brand-600 text-brand-700'
                        : 'text-slate-500 hover:text-slate-800',
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {tab === 'itinerary' && (
                  <ol className="space-y-6">
                    {pkg.dayPlan.map((day) => (
                      <li key={day.day} className="relative border-l-2 border-brand-100 pl-6">
                        <span className="absolute -left-[11px] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                          {day.day}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{day.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">{day.description}</p>
                      </li>
                    ))}
                  </ol>
                )}

                {tab === 'inclusions' && (
                  <div className="grid gap-8 sm:grid-cols-2">
                    <div>
                      <h3 className="mb-3 text-sm font-bold text-slate-900">What’s included</h3>
                      <ul className="space-y-2">
                        {pkg.inclusions.map((item) => (
                          <li key={item} className="flex gap-2 text-sm text-slate-600">
                            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-3 text-sm font-bold text-slate-900">Not included</h3>
                      <ul className="space-y-2">
                        {pkg.exclusions.map((item) => (
                          <li key={item} className="flex gap-2 text-sm text-slate-600">
                            <span className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true">✕</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {tab === 'highlights' && (
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {pkg.highlights.map((item) => (
                      <li key={item} className="flex gap-2 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Booking sidebar */}
          <div className="mt-6 lg:mt-0">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-end gap-2">
                  {pkg.discountPercent > 0 && (
                    <span className="text-sm text-slate-400 line-through">{formatPrice(pkg.basePrice)}</span>
                  )}
                  {pkg.discountPercent > 0 && (
                    <span className="rounded bg-accent-100 px-1.5 py-0.5 text-xs font-bold text-accent-700">
                      {pkg.discountPercent}% OFF
                    </span>
                  )}
                </div>
                <p className="mt-1 text-3xl font-bold text-slate-900">{formatPrice(pkg.price)}</p>
                <p className="text-xs text-slate-500">per person, on twin sharing</p>

                <div className="mt-5 border-t border-slate-100 pt-5">
                  <h3 className="text-base font-bold text-slate-900">Request a callback</h3>
                  <p className="mb-4 mt-1 text-xs text-slate-600">
                    Get quotes from up to 3 verified operators.
                  </p>
                  <EnquiryForm packageId={pkg.id} packageTitle={pkg.title} compact />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {pkg.related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Similar packages</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pkg.related.map((item) => <PackageCard key={item.id} pkg={item} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
