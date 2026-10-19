import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { BudgetCategory, PackageQuery, SortOption, Theme } from '@travelhub/shared';
import { api } from '../lib/api';
import { useApi } from '../lib/useApi';
import { cx } from '../lib/format';
import { PackageCard, PackageCardSkeleton } from '../components/PackageCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { CloseIcon, FilterIcon, SearchIcon } from '../components/Icons';

const SORT_LABELS: Array<{ value: SortOption; label: string }> = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'duration-asc', label: 'Duration: Short to Long' },
  { value: 'duration-desc', label: 'Duration: Long to Short' },
  { value: 'rating-desc', label: 'Rating' },
];

const PAGE_SIZE = 9;

/** The URL is the single source of truth for filters, so results stay shareable. */
const parseQuery = (params: URLSearchParams): PackageQuery => {
  const num = (key: string) => {
    const raw = params.get(key);
    if (raw === null || raw === '') return undefined;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : undefined;
  };
  const list = <T extends string>(key: string): T[] | undefined => {
    const raw = params.get(key);
    if (!raw) return undefined;
    const values = raw.split(',').map((s) => s.trim()).filter(Boolean) as T[];
    return values.length > 0 ? values : undefined;
  };

  return {
    destination: params.get('destination') ?? undefined,
    search: params.get('search') ?? undefined,
    themes: list<Theme>('themes'),
    budgetCategories: list<BudgetCategory>('budgetCategories'),
    minPrice: num('minPrice'),
    maxPrice: num('maxPrice'),
    minNights: num('minNights'),
    maxNights: num('maxNights'),
    sort: (params.get('sort') as SortOption | null) ?? 'relevance',
    page: num('page') ?? 1,
    pageSize: PAGE_SIZE,
  };
};

export const PackagesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchDraft, setSearchDraft] = useState(searchParams.get('search') ?? '');

  const query = useMemo(() => parseQuery(searchParams), [searchParams]);
  const queryKey = searchParams.toString();

  const results = useApi(() => api.listPackages(query), [queryKey]);
  const facets = useApi(() => api.getFacets(query), [queryKey]);

  const applyPatch = useCallback(
    (patch: Partial<PackageQuery>) => {
      const next = new URLSearchParams(searchParams);
      for (const [key, value] of Object.entries(patch)) {
        if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
          next.delete(key);
        } else {
          next.set(key, Array.isArray(value) ? value.join(',') : String(value));
        }
      }
      // Any filter change invalidates the current page offset.
      if (!('page' in patch)) next.delete('page');
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    setSearchDraft(query.search ?? '');
  }, [query.search]);

  useEffect(() => {
    const term = searchDraft.trim();
    if (term === (query.search ?? '')) return;
    const timer = window.setTimeout(() => applyPatch({ search: term || undefined }), 250);
    return () => window.clearTimeout(timer);
  }, [searchDraft, query.search, applyPatch]);

  const resetFilters = useCallback(() => {
    const next = new URLSearchParams();
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    if (search) next.set('search', search);
    if (sort) next.set('sort', sort);
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  const total = results.data?.total ?? 0;
  const totalPages = results.data?.totalPages ?? 1;
  const currentPage = results.data?.page ?? 1;

  const heading = query.destination
    ? `${query.destination} Tour Packages`
    : query.search
      ? `Results for “${query.search}”`
      : 'Himachal Pradesh Tour Packages';

  const sidebar = (
    <FilterSidebar facets={facets.data} query={query} onChange={applyPatch} onReset={resetFilters} />
  );

  return (
    <div className="bg-slate-50">
      {/* Page banner */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-4 pt-6 sm:px-6 sm:py-8 lg:px-8">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{heading}</h1>
          <p className="mt-2 text-sm text-slate-600">
            {results.loading
              ? 'Finding packages…'
              : `${total} package${total === 1 ? '' : 's'}`}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-8 pt-3 sm:px-6 sm:py-8 lg:px-8">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
          <div className="hidden lg:block">
            <div className="sticky top-24">{sidebar}</div>
          </div>

          <div>
            {/* Toolbar */}
            <div className="mb-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm sm:px-4">
              <p className="hidden text-sm text-slate-600 lg:block">
                Showing{' '}
                <span className="font-semibold text-slate-900">
                  {total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–
                  {Math.min(currentPage * PAGE_SIZE, total)}
                </span>{' '}
                of <span className="font-semibold text-slate-900">{total}</span>
              </p>

              <div className="ml-auto flex min-w-0 flex-1 items-center gap-2 lg:flex-none">
                <form
                  className="relative min-w-0 flex-1 lg:w-64"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const term = searchDraft.trim();
                    applyPatch({ search: term || undefined });
                  }}
                >
                  <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={searchDraft}
                    onChange={(event) => setSearchDraft(event.target.value)}
                    placeholder="Search packages…"
                    aria-label="Search packages"
                    className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25"
                  />
                </form>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Filters"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-300 text-slate-700"
                >
                  <FilterIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Results */}
            {results.error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                <p className="text-sm font-medium text-red-800">{results.error}</p>
              </div>
            ) : results.loading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => <PackageCardSkeleton key={i} />)}
              </div>
            ) : total === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
                <p className="text-lg font-semibold text-slate-900">No packages match these filters</p>
                <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                  Try widening the price range or clearing a theme to see more options.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {results.data?.items.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
                </div>

                {totalPages > 1 && (
                  <nav className="mt-10 flex items-center justify-center gap-1.5" aria-label="Pagination">
                    <button
                      type="button"
                      onClick={() => applyPatch({ page: currentPage - 1 })}
                      disabled={currentPage <= 1}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Prev
                    </button>
                    {Array.from({ length: totalPages }).map((_, index) => {
                      const page = index + 1;
                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() => applyPatch({ page })}
                          aria-current={page === currentPage ? 'page' : undefined}
                          className={cx(
                            'h-9 w-9 rounded-lg border text-sm font-medium transition',
                            page === currentPage
                              ? 'border-brand-600 bg-brand-600 text-white'
                              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
                          )}
                        >
                          {page}
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => applyPatch({ page: currentPage + 1 })}
                      disabled={currentPage >= totalPages}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-[88%] max-w-sm overflow-y-auto bg-slate-50 p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Filters</h2>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="rounded-md p-2 text-slate-600 hover:bg-slate-200"
                aria-label="Close filters"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <label htmlFor="sort-drawer" className="mb-2 block text-sm font-semibold text-slate-900">
                Sort by
              </label>
              <select
                id="sort-drawer"
                value={query.sort}
                onChange={(event) => applyPatch({ sort: event.target.value as SortOption })}
                className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-8 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25"
              >
                {SORT_LABELS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {sidebar}
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="mt-4 w-full rounded-lg bg-brand-600 px-4 py-3 text-sm font-bold text-white"
            >
              Show {total} package{total === 1 ? '' : 's'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
