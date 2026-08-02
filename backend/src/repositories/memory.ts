import type { PackageQuery, TravelPackage } from '@travelhub/shared';
import { packages } from '../data/packages.js';
import { destinations } from '../data/destinations.js';
import { testimonials } from '../data/testimonials.js';
import { buildFacets, findPackage, queryPackages } from '../lib/query.js';
import type { PackageRepository } from './types.js';

/**
 * Repository backed by the static seed data in src/data.
 *
 * All filtering, sorting and faceting happens in-process via src/lib/query.ts.
 * A DynamoDB implementation would push some of that into the query itself
 * (see dynamo.ts.example) but must return the same shapes.
 */
export const memoryRepository: PackageRepository = {
  async list(query: PackageQuery) {
    return queryPackages(query, packages);
  },

  async facets(query: PackageQuery) {
    return buildFacets(query, packages);
  },

  async featured() {
    return packages.filter((p) => p.featured);
  },

  async findByIdOrSlug(idOrSlug: string) {
    return findPackage(idOrSlug, packages);
  },

  async related(pkg: TravelPackage, limit = 3) {
    return packages
      .filter(
        (p) =>
          p.id !== pkg.id &&
          (p.destination === pkg.destination || p.themes.some((t) => pkg.themes.includes(t))),
      )
      .slice(0, limit);
  },

  async destinations() {
    return destinations;
  },

  async testimonials() {
    return testimonials;
  },
};
