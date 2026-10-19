import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useApi } from '../lib/useApi';
import { formatPrice } from '../lib/format';
import { PackageCard, PackageCardSkeleton } from '../components/PackageCard';
import { EnquiryForm } from '../components/EnquiryForm';
import { PinIcon, SearchIcon, ShieldIcon, StarIcon, UsersIcon } from '../components/Icons';

const TRIP_STYLES = ['Shimla & Manali road trips', 'Winter Spiti 4×4 expeditions', 'Spiti bike tours'];

// Each title is split where it should break on phones, so all three wrap to two balanced lines.
const TRUST = [
  { icon: PinIcon, lines: ['Beyond the', 'usual trail'] },
  { icon: ShieldIcon, lines: ['Thoughtfully', 'planned'] },
  { icon: UsersIcon, lines: ['Authentic', 'and local'] },
];

const HeroSearch = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const term = destination.trim();
    navigate(term ? `/packages?search=${encodeURIComponent(term)}` : '/packages');
  };

  return (
    <form
      onSubmit={submit}
      className="mx-auto mt-10 flex w-full max-w-2xl flex-col gap-3 rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        {/* Visually the placeholder carries the prompt; the label stays for screen readers. */}
        <label htmlFor="hero-destination" className="sr-only">
          Where to?
        </label>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="hero-destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where to?"
            className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25"
          />
        </div>
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
        {/* Fills the first screen below the 4rem header: headline and search are centred,
            the trip chips and tagline sit together at the bottom of the photo. */}
        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-1 flex-col justify-center py-12">
            <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              <span className="block">Escape the Crowds</span>
              <span className="block">
                Discover the <span className="text-accent-400">Unmapped</span>
              </span>
            </h1>
            <HeroSearch />
          </div>
          {/* On phones this group sits higher so the floating WhatsApp button doesn't cover it. */}
          <div className="pb-20 sm:pb-6">
            {/* One per line on phones, a single centred row from sm up. */}
            <ul className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              {TRIP_STYLES.map((style) => (
                <li
                  key={style}
                  className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm sm:text-sm"
                >
                  {style}
                </li>
              ))}
            </ul>
            {/* Same type as it had in the footer; lighter grey so it reads on the photo. */}
            <p className="mt-6 text-xs text-slate-300">Explore Beyond the Map. Discover Beyond the Ordinary.</p>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-slate-200 px-2 py-5 sm:px-6 sm:py-6">
          {TRUST.map(({ icon: Icon, lines }) => (
            <div
              key={lines.join(' ')}
              className="flex flex-col items-center gap-2 px-2 text-center sm:flex-row sm:justify-center sm:gap-3 sm:text-left"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-semibold leading-snug text-slate-800 sm:text-sm">
                <span className="block sm:inline">{lines[0]}</span> <span className="block sm:inline">{lines[1]}</span>
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Destinations */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Popular destinations</h2>
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
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Featured packages</h2>
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
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Can’t find the right package?</h2>
            <p className="mt-4 text-slate-600">Tell us where and when — we’ll plan the rest.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Get a custom quote</h3>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
};
