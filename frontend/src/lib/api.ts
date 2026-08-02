import type {
  Destination,
  EnquiryPayload,
  EnquiryResponse,
  PackageFacets,
  PackageListResponse,
  PackageQuery,
  Testimonial,
  TravelPackage,
} from '@travelhub/shared';

/**
 * In production VITE_API_BASE_URL is left empty so requests go to the same
 * origin ("/api/..."), which the Amplify rewrite forwards to the Lambda.
 * Set it only when pointing the site at an API on a different domain.
 */
const BASE = import.meta.env.VITE_API_BASE_URL ?? '';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly details?: Record<string, string>,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...init,
    });
  } catch {
    throw new ApiError('Could not reach the server. Check your connection and try again.', 0);
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(
      body?.error ?? `Request failed with status ${response.status}`,
      response.status,
      body?.details,
    );
  }

  return response.json() as Promise<T>;
}

/** Serialises a PackageQuery, joining array filters into comma-separated values. */
export const buildQueryString = (query: PackageQuery): string => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === '') continue;
    if (Array.isArray(value)) {
      if (value.length > 0) params.set(key, value.join(','));
    } else {
      params.set(key, String(value));
    }
  }
  const qs = params.toString();
  return qs ? `?${qs}` : '';
};

export type PackageDetail = TravelPackage & { related: TravelPackage[] };

export const api = {
  listPackages: (query: PackageQuery) =>
    request<PackageListResponse>(`/api/packages${buildQueryString(query)}`),

  getFacets: (query: PackageQuery) =>
    request<PackageFacets>(`/api/packages/facets${buildQueryString(query)}`),

  getFeatured: () => request<TravelPackage[]>('/api/packages/featured'),

  getPackage: (idOrSlug: string) =>
    request<PackageDetail>(`/api/packages/${encodeURIComponent(idOrSlug)}`),

  getDestinations: () => request<Destination[]>('/api/destinations'),

  getTestimonials: () => request<Testimonial[]>('/api/testimonials'),

  submitEnquiry: (payload: EnquiryPayload) =>
    request<EnquiryResponse>('/api/enquiries', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
