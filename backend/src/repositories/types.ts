import type {
  Destination,
  PackageFacets,
  PackageListResponse,
  PackageQuery,
  Testimonial,
  TravelPackage,
} from '@travelhub/shared';

/**
 * The contract every data source implements. Routes depend on this interface
 * and never on a concrete store, so swapping the in-memory seed data for
 * DynamoDB means adding a new implementation — no route changes.
 *
 * Every method is async even though the in-memory version resolves immediately.
 * That is deliberate: a synchronous signature here would have to change when a
 * real database arrives, and that change would ripple through every caller.
 */
export interface PackageRepository {
  list(query: PackageQuery): Promise<PackageListResponse>;
  facets(query: PackageQuery): Promise<PackageFacets>;
  featured(): Promise<TravelPackage[]>;
  findByIdOrSlug(idOrSlug: string): Promise<TravelPackage | undefined>;
  related(pkg: TravelPackage, limit?: number): Promise<TravelPackage[]>;
  destinations(): Promise<Destination[]>;
  testimonials(): Promise<Testimonial[]>;
}
