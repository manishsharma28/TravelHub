import { Link } from 'react-router-dom';
import type { Hotel } from '../lib/hotels';
import { PinIcon } from './Icons';

export const HotelCard = ({ hotel }: { hotel: Hotel }) => (
  <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg">
    <Link to={`/hotels/${hotel.slug}`} className="relative block aspect-16/10 overflow-hidden">
      <img
        src={hotel.gallery[0]}
        alt={hotel.name}
        loading="lazy"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      {hotel.gallery.length > 1 && (
        <span className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white">
          {hotel.gallery.length} photos
        </span>
      )}
    </Link>

    <div className="flex flex-1 flex-col p-4">
      <p className="inline-flex items-center gap-1 text-xs text-slate-500">
        <PinIcon className="h-3.5 w-3.5" />
        {hotel.place}
      </p>
      <h3 className="mt-2 text-lg font-bold text-slate-900">
        <Link to={`/hotels/${hotel.slug}`} className="transition hover:text-brand-700">
          {hotel.name}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{hotel.about[0]}</p>
      <div className="mt-auto flex justify-end pt-4">
        <Link
          to={`/hotels/${hotel.slug}`}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          View details
        </Link>
      </div>
    </div>
  </article>
);
