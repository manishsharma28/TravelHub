import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { cx } from '../lib/format';
import { EnquiryForm } from './EnquiryForm';
import { CloseIcon, SearchIcon } from './Icons';
import { Logo } from './Logo';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/packages', label: 'Packages' },
  { to: '/contact', label: 'Contact' },
  { to: '/about', label: 'About' },
];

const QuoteDialog = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-56 sm:items-center sm:p-4" role="presentation">
      <button type="button" className="fixed inset-0 bg-black/10 backdrop-blur-[1px]" aria-label="Close quote form" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        className="relative flex max-h-[min(34rem,calc(100svh-16rem))] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex shrink-0 items-start justify-between gap-4">
          <h2 id="quote-title" className="text-lg font-bold text-slate-900">
            Get a free quote
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <EnquiryForm pinnedSubmit />
      </div>
    </div>,
    document.body,
  );
};

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(true);
  const closeQuote = useCallback(() => setQuoteOpen(false), []);
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
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="ml-8 hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cx(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={submitSearch} className="ml-auto hidden w-40 shrink-0 md:block">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search..."
              aria-label="Search packages"
              className="w-full rounded-full border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25"
            />
          </div>
        </form>

        <button
          type="button"
          onClick={() => setQuoteOpen(true)}
          className="hidden shrink-0 rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-600 sm:block"
        >
          Get Free Quote
        </button>

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
                placeholder="Search..."
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
      {quoteOpen && <QuoteDialog onClose={closeQuote} />}
    </header>
  );
};
