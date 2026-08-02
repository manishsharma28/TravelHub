import { Router } from 'express';
import { z } from 'zod';
import type { PackageQuery } from '@travelhub/shared';
import { repository } from '../repositories/index.js';
import { asyncRoute } from '../lib/asyncRoute.js';

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

packagesRouter.get(
  '/packages',
  asyncRoute(async (req, res) => {
    const parsed = querySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Invalid query parameters',
        details: parsed.error.flatten().fieldErrors as Record<string, string>,
      });
    }
    return res.json(await repository.list(parsed.data as PackageQuery));
  }),
);

packagesRouter.get(
  '/packages/facets',
  asyncRoute(async (req, res) => {
    const parsed = querySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid query parameters' });
    }
    return res.json(await repository.facets(parsed.data as PackageQuery));
  }),
);

packagesRouter.get(
  '/packages/featured',
  asyncRoute(async (_req, res) => {
    res.json(await repository.featured());
  }),
);

// Declared after the literal sub-paths so "/packages/featured" is not
// swallowed by this wildcard.
packagesRouter.get(
  '/packages/:idOrSlug',
  asyncRoute(async (req, res) => {
    const pkg = await repository.findByIdOrSlug(req.params.idOrSlug ?? '');
    if (!pkg) return res.status(404).json({ error: 'Package not found' });

    const related = await repository.related(pkg);
    return res.json({ ...pkg, related });
  }),
);

packagesRouter.get(
  '/destinations',
  asyncRoute(async (_req, res) => {
    res.json(await repository.destinations());
  }),
);

packagesRouter.get(
  '/testimonials',
  asyncRoute(async (_req, res) => {
    res.json(await repository.testimonials());
  }),
);
