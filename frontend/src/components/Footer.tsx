import { Link } from 'react-router-dom';

const COLUMNS = [
  {
    heading: 'Destinations',
    links: [
      { label: 'Manali', to: '/packages?destination=Manali' },
      { label: 'Shimla', to: '/packages?destination=Shimla' },
      { label: 'Spiti Valley', to: '/packages?destination=Spiti%20Valley' },
      { label: 'Dharamshala', to: '/packages?destination=Dharamshala' },
      { label: 'Kasol', to: '/packages?destination=Kasol' },
    ],
  },
  {
    heading: 'Themes',
    links: [
      { label: 'Honeymoon', to: '/packages?themes=Honeymoon' },
      { label: 'Adventure', to: '/packages?themes=Adventure' },
      { label: 'Trekking', to: '/packages?themes=Trekking' },
      { label: 'Family', to: '/packages?themes=Family' },
      { label: 'Pilgrimage', to: '/packages?themes=Pilgrimage' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About us', to: '/about' },
      { label: 'All packages', to: '/packages' },
      { label: 'Contact', to: '/about#contact' },
    ],
  },
];

export const Footer = () => (
  <footer className="mt-20 bg-slate-900 text-slate-300">
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <svg className="h-9 w-9" viewBox="0 0 32 32" aria-hidden="true">
              <rect width="32" height="32" rx="7" className="fill-brand-500" />
              <path d="M6 23 L13 11 L17.5 18 L20.5 13.5 L26 23 Z" fill="#fff" />
              <circle cx="22.5" cy="8.5" r="2.6" className="fill-accent-400" />
            </svg>
            <span className="text-xl font-bold text-white">
              Travel<span className="text-brand-400">Hub</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            Compare curated Himalayan holiday packages from verified tour operators. Real
            itineraries, transparent inclusions, and a human on the phone when you need one.
          </p>
          <p className="mt-5 text-sm">
            <a href="tel:+919876543210" className="font-semibold text-white hover:text-brand-300">
              +91 98765 43210
            </a>
            <span className="mx-2 text-slate-600">·</span>
            <a href="mailto:hello@travelhub.example" className="hover:text-brand-300">
              hello@travelhub.example
            </a>
          </p>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.heading}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {column.heading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-slate-400 transition hover:text-brand-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TravelHub. Demo project — packages shown are sample data.</p>
        <p>Made for the Himalayas 🏔</p>
      </div>
    </div>
  </footer>
);
