/**
 * Shared domain contract between the TravelHub API and web client.
 * Both workspaces compile against this package, so a change to a field
 * name here surfaces as a type error on the other side.
 */

export type BudgetCategory = 'Budget' | 'Mid-Range' | 'Luxury';

export type Theme =
  | 'Adventure'
  | 'Honeymoon'
  | 'Family'
  | 'Trekking'
  | 'Pilgrimage'
  | 'Wildlife'
  | 'Road Trip'
  | 'Flights Included';

/** One leg of an itinerary, e.g. "Manali - 3N". */
export interface ItineraryStop {
  city: string;
  nights: number;
}

/** A single day's plan on the package detail page. */
export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface Operator {
  name: string;
  rating: number;
  reviewCount: number;
}

export interface TravelPackage {
  id: string;
  slug: string;
  title: string;
  /** Marketing one-liner shown under the title on the detail page. */
  summary: string;
  destination: string;
  state: string;
  imageUrl: string;
  gallery: string[];
  nights: number;
  days: number;
  itinerary: ItineraryStop[];
  dayPlan: ItineraryDay[];
  themes: Theme[];
  budgetCategory: BudgetCategory;
  hotelType: string;
  operator: Operator;
  /** Pre-discount price per person, in INR. */
  basePrice: number;
  /** Payable price per person, in INR. */
  price: number;
  discountPercent: number;
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  featured: boolean;
}

export type SortOption =
  | 'relevance'
  | 'price-asc'
  | 'price-desc'
  | 'duration-asc'
  | 'duration-desc'
  | 'rating-desc';

/** Query accepted by GET /api/packages. Arrays arrive as repeated or comma-joined params. */
export interface PackageQuery {
  destination?: string;
  search?: string;
  themes?: Theme[];
  budgetCategories?: BudgetCategory[];
  minPrice?: number;
  maxPrice?: number;
  minNights?: number;
  maxNights?: number;
  sort?: SortOption;
  page?: number;
  pageSize?: number;
}

export interface PackageListResponse {
  items: TravelPackage[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/** Facet counts so the sidebar can show "Manali (12)" and disable empty options. */
export interface FacetBucket<T extends string = string> {
  value: T;
  count: number;
}

export interface PackageFacets {
  destinations: FacetBucket[];
  themes: FacetBucket<Theme>[];
  budgetCategories: FacetBucket<BudgetCategory>[];
  priceRange: { min: number; max: number };
  nightsRange: { min: number; max: number };
}

export interface Destination {
  slug: string;
  name: string;
  state: string;
  imageUrl: string;
  packageCount: number;
  startingPrice: number;
  blurb: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  packageTitle: string;
  avatarUrl: string;
}

export interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  packageId?: string;
  travelDate?: string;
  travellers?: number;
  message?: string;
}

export interface EnquiryResponse {
  id: string;
  status: 'received';
  createdAt: string;
  message: string;
}

export interface ApiError {
  error: string;
  details?: Record<string, string>;
}
