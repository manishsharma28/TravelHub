import type {
  TravelPackage,
  PackageQuery,
  PackageListResponse,
  PackageFacets,
  SortOption,
  Theme,
  BudgetCategory,
} from '@travelhub/shared';
import { packages } from '../data/packages.js';

/**
 * In-memory catalogue query. Kept free of Express types so it stays unit-testable
 * and so a future database swap only has to replace the `source` argument.
 */

const matchesSearch = (pkg: TravelPackage, term: string): boolean => {
  const haystack = [
    pkg.title,
    pkg.destination,
    pkg.summary,
    pkg.state,
    pkg.operator.name,
    ...pkg.themes,
    ...pkg.itinerary.map((stop) => stop.city),
    ...pkg.highlights,
  ]
    .join(' ')
    .toLowerCase();
  return term
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => haystack.includes(token));
};

/**
 * Applies every filter except the one named in `exclude`. Facet counts are
 * computed with the facet's own dimension excluded, so selecting "Manali"
 * doesn't collapse the other destination counts to zero.
 */
const applyFilters = (
  source: TravelPackage[],
  q: PackageQuery,
  exclude?: 'destination' | 'themes' | 'budgetCategories' | 'price' | 'nights',
): TravelPackage[] =>
  source.filter((pkg) => {
    if (q.search && !matchesSearch(pkg, q.search)) return false;

    if (exclude !== 'destination' && q.destination) {
      const target = q.destination.toLowerCase();
      const inItinerary = pkg.itinerary.some((s) => s.city.toLowerCase() === target);
      if (pkg.destination.toLowerCase() !== target && !inItinerary) return false;
    }

    if (exclude !== 'themes' && q.themes?.length) {
      if (!q.themes.some((theme) => pkg.themes.includes(theme))) return false;
    }

    if (exclude !== 'budgetCategories' && q.budgetCategories?.length) {
      if (!q.budgetCategories.includes(pkg.budgetCategory)) return false;
    }

    if (exclude !== 'price') {
      if (q.minPrice !== undefined && pkg.price < q.minPrice) return false;
      if (q.maxPrice !== undefined && pkg.price > q.maxPrice) return false;
    }

    if (exclude !== 'nights') {
      if (q.minNights !== undefined && pkg.nights < q.minNights) return false;
      if (q.maxNights !== undefined && pkg.nights > q.maxNights) return false;
    }

    return true;
  });

const sorters: Record<SortOption, (a: TravelPackage, b: TravelPackage) => number> = {
  relevance: (a, b) =>
    Number(b.featured) - Number(a.featured) ||
    b.operator.rating - a.operator.rating ||
    a.price - b.price,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'duration-asc': (a, b) => a.nights - b.nights,
  'duration-desc': (a, b) => b.nights - a.nights,
  'rating-desc': (a, b) => b.operator.rating - a.operator.rating,
};

export const queryPackages = (
  q: PackageQuery,
  source: TravelPackage[] = packages,
): PackageListResponse => {
  const filtered = applyFilters(source, q);
  const sorted = [...filtered].sort(sorters[q.sort ?? 'relevance']);

  const page = Math.max(1, q.page ?? 1);
  const pageSize = Math.min(48, Math.max(1, q.pageSize ?? 9));
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const start = (page - 1) * pageSize;

  return {
    items: sorted.slice(start, start + pageSize),
    total: sorted.length,
    page,
    pageSize,
    totalPages,
  };
};

const countBy = <T extends string>(list: TravelPackage[], pick: (p: TravelPackage) => T[]) => {
  const counts = new Map<T, number>();
  for (const pkg of list) {
    for (const value of pick(pkg)) {
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
};

export const buildFacets = (
  q: PackageQuery,
  source: TravelPackage[] = packages,
): PackageFacets => {
  const prices = source.map((p) => p.price);
  const nights = source.map((p) => p.nights);

  return {
    destinations: countBy(applyFilters(source, q, 'destination'), (p) => [p.destination]),
    themes: countBy<Theme>(applyFilters(source, q, 'themes'), (p) => p.themes),
    budgetCategories: countBy<BudgetCategory>(applyFilters(source, q, 'budgetCategories'), (p) => [
      p.budgetCategory,
    ]),
    priceRange: { min: Math.min(...prices), max: Math.max(...prices) },
    nightsRange: { min: Math.min(...nights), max: Math.max(...nights) },
  };
};

export const findPackage = (idOrSlug: string, source: TravelPackage[] = packages) =>
  source.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
