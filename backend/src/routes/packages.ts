import { Router } from 'express';
import { z } from 'zod';
import type { PackageQuery } from '@travelhub/shared';
import { queryPackages, buildFacets, findPackage } from '../lib/query.js';
import { packages, destinations, testimonials } from '../data/packages.js';

export const packagesRouter: Router = Router();

const THEMES = [
  'Adventure',
  'Honeymoon',
  'Family',
  'Trekking',
  'Pilgrimage',
  'Wildlife',
  'Road Trip',
  'Flights Included',
] as const;

const BUDGETS = ['Budget', 'Mid-Range', 'Luxury'] as const;

const SORTS = [
  'relevance',
  'price-asc',
  'price-desc',
  'duration-asc',
  'duration-desc',
  'rating-desc',
] as const;

/**
 * Accepts either repeated params (?themes=A&themes=B) or a comma-joined
 * string (?themes=A,B), which is what the web client sends.
 */
const csvArray = <T extends readonly [string, ...string[]]>(values: T) =>
  z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((raw) => {
      if (raw === undefined) return undefined;
      const list = Array.isArray(raw) ? raw : raw.split(',');
      return list.map((s) => s.trim()).filter(Boolean);
    })
    .pipe(z.array(z.enum(values)).optional());

const numeric = z.coerce.number().int().nonnegative().optional();

const querySchema = z.object({
  destination: z.string().trim().min(1).optional(),
  search: z.string().trim().min(1).max(120).optional(),
  themes: csvArray(THEMES),
  budgetCategories: csvArray(BUDGETS),
  minPrice: numeric,
  maxPrice: numeric,
  minNights: numeric,
  maxNights: numeric,
  sort: z.enum(SORTS).optional(),
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce.number().int().positive().max(48).optional(),
});

packagesRouter.get('/packages', (req, res) => {
  const parsed = querySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid query parameters',
      details: parsed.error.flatten().fieldErrors as Record<string, string>,
    });
  }
  return res.json(queryPackages(parsed.data as PackageQuery));
});

packagesRouter.get('/packages/facets', (req, res) => {
  const parsed = querySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid query parameters' });
  }
  return res.json(buildFacets(parsed.data as PackageQuery));
});

packagesRouter.get('/packages/featured', (_req, res) => {
  res.json(packages.filter((p) => p.featured));
});

// Declared after the literal sub-paths so "/packages/featured" is not
// swallowed by this wildcard.
packagesRouter.get('/packages/:idOrSlug', (req, res) => {
  const pkg = findPackage(req.params.idOrSlug);
  if (!pkg) return res.status(404).json({ error: 'Package not found' });

  const related = packages
    .filter((p) => p.id !== pkg.id && (p.destination === pkg.destination || p.themes.some((t) => pkg.themes.includes(t))))
    .slice(0, 3);

  return res.json({ ...pkg, related });
});

packagesRouter.get('/destinations', (_req, res) => {
  res.json(destinations);
});

packagesRouter.get('/testimonials', (_req, res) => {
  res.json(testimonials);
});
