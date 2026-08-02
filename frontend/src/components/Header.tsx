import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { cx } from '../lib/format';
import { CloseIcon, SearchIcon } from './Icons';

const NAV = [
  { to: '/packages', label: 'All Packages' },
  { to: '/packages?themes=Honeymoon', label: 'Honeymoon' },
  { to: '/packages?themes=Adventure', label: 'Adventure' },
  { to: '/packages?themes=Family', label: 'Family' },
  { to: '/about', label: 'About' },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = term.trim();
    navigate(trimmed ? `/packages?search=${encodeURIComponent(trimmed)}` : '/packages');
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <svg className="h-9 w-9" viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" rx="7" className="fill-brand-600" />
            <path d="M6 23 L13 11 L17.5 18 L20.5 13.5 L26 23 Z" fill="#fff" />
            <circle cx="22.5" cy="8.5" r="2.6" className="fill-accent-400" />
          </svg>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Travel<span className="text-brand-600">Hub</span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                cx(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive && item.to === '/about'
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={submitSearch} className="ml-auto hidden max-w-xs flex-1 md:block">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search destinations…"
              aria-label="Search packages"
              className="w-full rounded-full border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25"
            />
          </div>
        </form>

        <a
          href="tel:+919876543210"
          className="hidden shrink-0 rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-600 sm:block"
        >
          +91 98765 43210
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="ml-auto rounded-md p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 lg:hidden">
          <form onSubmit={submitSearch} className="py-3 md:hidden">
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search destinations…"
                aria-label="Search packages"
                className="w-full rounded-full border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25"
              />
            </div>
          </form>
          <nav className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
