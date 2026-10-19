import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { cx } from '../lib/format';
import { findHotel, HOTELS } from '../lib/hotels';
import { EnquiryForm } from '../components/EnquiryForm';
import { HotelCard } from '../components/HotelCard';
import { CheckIcon, ChevronIcon, GmailIcon, PhoneIcon, PinIcon } from '../components/Icons';

export const HotelDetailPage = () => {
  const { slug = '' } = useParams();
  const hotel = findHotel(slug);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [slug]);

  if (!hotel) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Hotel not found</h1>
        <p className="mt-3 text-slate-600">This link may be incorrect.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Back to home
        </Link>
      </div>
    );
  }

  const { gallery } = hotel;
  const step = (delta: number) => setActiveImage((index) => (index + delta + gallery.length) % gallery.length);
  const others = HOTELS.filter((item) => item.slug !== hotel.slug);

  return (
    <div className="bg-slate-50 pb-16">
      <nav className="border-b border-slate-200 bg-white" aria-label="Breadcrumb">
        <ol className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs text-slate-500 sm:px-6 lg:px-8">
          <li><Link to="/" className="hover:text-brand-700">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li>Hotels</li>
          <li aria-hidden="true">/</li>
          <li className="truncate font-medium text-slate-700">{hotel.name}</li>
        </ol>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-8">
          <div>
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="relative">
                <img
                  src={gallery[activeImage]}
                  alt={`${hotel.name}, photo ${activeImage + 1} of ${gallery.length}`}
                  className="aspect-16/9 w-full object-cover"
                />
                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous photo"
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-slate-800 shadow transition hover:bg-white"
                    >
                      <ChevronIcon className="h-5 w-5 rotate-180" />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next photo"
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-slate-800 shadow transition hover:bg-white"
                    >
                      <ChevronIcon className="h-5 w-5" />
                    </button>
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white">
                      {activeImage + 1} / {gallery.length}
                    </span>
                  </>
                )}
              </div>
              {gallery.length > 1 && (
                <div className="no-scrollbar flex gap-2 overflow-x-auto p-3">
                  {gallery.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-label={`View photo ${index + 1}`}
                      className={cx(
                        'h-16 w-24 shrink-0 overflow-hidden rounded-lg ring-2 transition',
                        index === activeImage ? 'ring-brand-600' : 'ring-transparent hover:ring-slate-300',
                      )}
                    >
                      <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
              <p className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                <PinIcon className="h-4 w-4 text-brand-600" />
                {hotel.place}
              </p>
              <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">{hotel.name}</h1>
              {hotel.tagline && <p className="mt-1 font-medium text-accent-600">{hotel.tagline}</p>}
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                {hotel.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            {hotel.highlights && (
              <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">{hotel.highlightsTitle}</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {hotel.highlights.map((item) => (
                    <li key={item} className="flex gap-2 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-6 lg:mt-0">
            <div className="sticky top-24 space-y-4">
              {hotel.contact && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900">Plan your stay</h3>
                  <ul className="mt-4 space-y-3 text-sm text-slate-700">
                    <li className="flex gap-2">
                      <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                      {hotel.contact.address}
                    </li>
                    <li>
                      <a href={hotel.contact.phoneHref} className="flex gap-2 font-semibold text-brand-700 hover:underline">
                        <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0" />
                        {hotel.contact.phone}
                      </a>
                    </li>
                    <li>
                      <a href={`mailto:${hotel.contact.email}`} className="flex gap-2 break-all font-semibold text-brand-700 hover:underline">
                        <GmailIcon className="mt-0.5 h-4 w-4 shrink-0" />
                        {hotel.contact.email}
                      </a>
                    </li>
                  </ul>
                </div>
              )}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-base font-bold text-slate-900">Request a callback</h3>
                <EnquiryForm hotel={hotel.name} compact />
              </div>
            </div>
          </div>
        </div>

        <section className="mt-14">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Other hotels</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <HotelCard key={item.slug} hotel={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
