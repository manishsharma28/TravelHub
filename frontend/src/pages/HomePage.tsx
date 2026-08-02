import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useApi } from '../lib/useApi';
import { formatPrice } from '../lib/format';
import { PackageCard, PackageCardSkeleton } from '../components/PackageCard';
import { EnquiryForm } from '../components/EnquiryForm';
import { HeadsetIcon, SearchIcon, ShieldIcon, StarIcon, WalletIcon } from '../components/Icons';

const DURATIONS = [
  { label: 'Any duration', min: '', max: '' },
  { label: '1 – 3 Nights', min: '1', max: '3' },
  { label: '4 – 5 Nights', min: '4', max: '5' },
  { label: '6 – 7 Nights', min: '6', max: '7' },
  { label: '8 – 9 Nights', min: '8', max: '9' },
  { label: '10+ Nights', min: '10', max: '' },
];

const TRUST = [
  { icon: ShieldIcon, title: 'Verified operators', body: 'Every partner is vetted for licences, insurance and on-ground support before listing.' },
  { icon: WalletIcon, title: 'Transparent pricing', body: 'Full inclusions and exclusions on every package. No surprise charges after booking.' },
  { icon: HeadsetIcon, title: 'Human support', body: 'Talk to a real travel expert who has actually been on these routes.' },
];

const HeroSearch = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [durationIndex, setDurationIndex] = useState(0);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (destination.trim()) params.set('search', destination.trim());
    const duration = DURATIONS[durationIndex];
    if (duration?.min) params.set('minNights', duration.min);
    if (duration?.max) params.set('maxNights', duration.max);
    navigate(`/packages${params.toString() ? `?${params}` : ''}`);
  };

  return (
    <form
      onSubmit={submit}
      className="mx-auto mt-8 flex w-full max-w-3xl flex-col gap-3 rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <label htmlFor="hero-destination" className="mb-1 block text-xs font-semibold text-slate-600">
          Where to?
        </label>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="hero-destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Manali, Spiti, Shimla…"
            className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25"
          />
        </div>
      </div>

      <div className="sm:w-44">
        <label htmlFor="hero-duration" className="mb-1 block text-xs font-semibold text-slate-600">
          Duration
        </label>
        <select
          id="hero-duration"
          value={durationIndex}
          onChange={(e) => setDurationIndex(Number(e.target.value))}
          className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-8 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25"
        >
          {DURATIONS.map((option, index) => (
            <option key={option.label} value={index}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="rounded-lg bg-accent-500 px-7 py-2.5 text-sm font-bold text-white shadow transition hover:bg-accent-600"
      >
        Search
      </button>
    </form>
  );
};

export const HomePage = () => {
  const featured = useApi(() => api.getFeatured(), []);
  const destinations = useApi(() => api.getDestinations(), []);
  const testimonials = useApi(() => api.getTestimonials(), []);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <img
          src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 photo-scrim" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">
            Himalayan holidays, done right
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Find your next trip to the mountains
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-slate-200 sm:text-lg">
            Compare curated packages from verified operators across Himachal, Spiti and Ladakh —
            with real itineraries and transparent pricing.
          </p>
          <HeroSearch />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-200">
            <span className="font-semibold">1M+ travellers served</span>
            <span className="hidden h-4 w-px bg-white/30 sm:block" />
            <span className="font-semibold">500+ verified operators</span>
            <span className="hidden h-4 w-px bg-white/30 sm:block" />
            <span className="font-semibold">15+ years of trust</span>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
          {TRUST.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Destinations */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Popular destinations</h2>
            <p className="mt-2 text-sm text-slate-600">Handpicked bases for your Himalayan trip.</p>
          </div>
          <Link to="/packages" className="shrink-0 text-sm font-semibold text-brand-600 hover:underline">
            View all →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-56 animate-pulse rounded-xl bg-slate-200" />
            ))}
          {destinations.data?.map((destination) => (
            <Link
              key={destination.slug}
              to={`/packages?destination=${encodeURIComponent(destination.name)}`}
              className="group relative overflow-hidden rounded-xl shadow-sm transition hover:shadow-lg"
            >
              <img
                src={destination.imageUrl}
                alt={destination.name}
                loading="lazy"
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 photo-scrim" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <h3 className="text-lg font-bold">{destination.name}</h3>
                <p className="mt-0.5 line-clamp-2 text-xs text-slate-200">{destination.blurb}</p>
                <p className="mt-2 text-xs font-semibold text-accent-300">
                  {destination.packageCount} package{destination.packageCount === 1 ? '' : 's'} · from{' '}
                  {formatPrice(destination.startingPrice)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured packages */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Featured packages</h2>
              <p className="mt-2 text-sm text-slate-600">
                Our most-booked itineraries this season.
              </p>
            </div>
            <Link to="/packages" className="shrink-0 text-sm font-semibold text-brand-600 hover:underline">
              All packages →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.loading && Array.from({ length: 3 }).map((_, i) => <PackageCardSkeleton key={i} />)}
            {featured.error && (
              <p className="col-span-full rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {featured.error}
              </p>
            )}
            {featured.data?.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          What travellers say
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.data?.map((item) => (
            <figure key={item.id} className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex gap-0.5 text-accent-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" filled={i < item.rating} />
                ))}
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                “{item.comment}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                <img src={item.avatarUrl} alt="" loading="lazy" className="h-10 w-10 rounded-full object-cover" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="truncate text-xs text-slate-500">{item.location}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className="bg-brand-800">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="text-white">
            <h2 className="text-2xl font-bold sm:text-3xl">Can’t find the right package?</h2>
            <p className="mt-4 text-brand-100">
              Tell us where you want to go and how long you have. We’ll get quotes from up to three
              matching operators — usually within 24 hours, and always free.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-brand-100">
              <li>✓ Compare up to 3 custom quotes</li>
              <li>✓ Save up to 30% versus walk-in rates</li>
              <li>✓ No obligation to book</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Get a custom quote</h3>
            <p className="mb-4 mt-1 text-sm text-slate-600">
              Fill this in and a travel expert will call you.
            </p>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
};
