import type { BudgetCategory, PackageFacets, PackageQuery, Theme } from '@travelhub/shared';
import { formatPrice } from '../lib/format';

/** Price brackets mirroring the tiers used on Indian package-listing sites. */
const PRICE_TIERS: Array<{ label: string; min?: number; max?: number }> = [
  { label: 'Under ₹10,000', max: 10000 },
  { label: '₹10,000 – ₹20,000', min: 10000, max: 20000 },
  { label: '₹20,000 – ₹35,000', min: 20000, max: 35000 },
  { label: '₹35,000 – ₹50,000', min: 35000, max: 50000 },
  { label: 'Above ₹50,000', min: 50000 },
];

const NIGHT_TIERS: Array<{ label: string; min?: number; max?: number }> = [
  { label: '1 – 3 Nights', min: 1, max: 3 },
  { label: '4 – 5 Nights', min: 4, max: 5 },
  { label: '6 – 7 Nights', min: 6, max: 7 },
  { label: '8 – 9 Nights', min: 8, max: 9 },
  { label: '10+ Nights', min: 10 },
];

interface Props {
  facets: PackageFacets | null;
  query: PackageQuery;
  onChange: (patch: Partial<PackageQuery>) => void;
  onReset: () => void;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border-b border-slate-200 py-5 last:border-b-0">
    <h3 className="mb-3 text-sm font-semibold text-slate-900">{title}</h3>
    {children}
  </div>
);

const Checkbox = ({
  label,
  count,
  checked,
  onToggle,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onToggle: () => void;
}) => (
  <label className="flex cursor-pointer items-center gap-2.5 py-1 text-sm text-slate-700 hover:text-slate-900">
    <input
      type="checkbox"
      checked={checked}
      onChange={onToggle}
      className="h-4 w-4 shrink-0 rounded border-slate-300 text-brand-600 focus:ring-2 focus:ring-brand-500/40"
    />
    <span className="flex-1">{label}</span>
    {count !== undefined && <span className="text-xs text-slate-400">({count})</span>}
  </label>
);

export const FilterSidebar = ({ facets, query, onChange, onReset }: Props) => {
  const toggleInList = <T extends string>(list: T[] | undefined, value: T): T[] | undefined => {
    const current = list ?? [];
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    return next.length > 0 ? next : undefined;
  };

  const isRangeActive = (min?: number, max?: number, key: 'price' | 'nights' = 'price') =>
    key === 'price'
      ? query.minPrice === min && query.maxPrice === max
      : query.minNights === min && query.maxNights === max;

  const activeCount =
    (query.destination ? 1 : 0) +
    (query.themes?.length ?? 0) +
    (query.budgetCategories?.length ?? 0) +
    (query.minPrice !== undefined || query.maxPrice !== undefined ? 1 : 0) +
    (query.minNights !== undefined || query.maxNights !== undefined ? 1 : 0);

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">
          Filters {activeCount > 0 && <span className="text-brand-600">({activeCount})</span>}
        </h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-semibold text-brand-600 hover:text-brand-800 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <Section title="Price (per person)">
        <div className="space-y-0.5">
          {PRICE_TIERS.map((tier) => (
            <Checkbox
              key={tier.label}
              label={tier.label}
              checked={isRangeActive(tier.min, tier.max, 'price')}
              onToggle={() =>
                onChange(
                  isRangeActive(tier.min, tier.max, 'price')
                    ? { minPrice: undefined, maxPrice: undefined }
                    : { minPrice: tier.min, maxPrice: tier.max },
                )
              }
            />
          ))}
        </div>
      </Section>

      <Section title="Themes">
        <div className="space-y-0.5">
          {facets?.themes.map((bucket) => (
            <Checkbox
              key={bucket.value}
              label={bucket.value}
              count={bucket.count}
              checked={query.themes?.includes(bucket.value) ?? false}
              onToggle={() => onChange({ themes: toggleInList<Theme>(query.themes, bucket.value) })}
            />
          ))}
        </div>
      </Section>

      <Section title="Duration">
        <div className="space-y-0.5">
          {NIGHT_TIERS.map((tier) => (
            <Checkbox
              key={tier.label}
              label={tier.label}
              checked={isRangeActive(tier.min, tier.max, 'nights')}
              onToggle={() =>
                onChange(
                  isRangeActive(tier.min, tier.max, 'nights')
                    ? { minNights: undefined, maxNights: undefined }
                    : { minNights: tier.min, maxNights: tier.max },
                )
              }
            />
          ))}
        </div>
      </Section>

      <Section title="Destinations">
        <div className="space-y-0.5">
          {facets?.destinations.map((bucket) => (
            <Checkbox
              key={bucket.value}
              label={bucket.value}
              count={bucket.count}
              checked={query.destination === bucket.value}
              onToggle={() =>
                onChange({
                  destination: query.destination === bucket.value ? undefined : bucket.value,
                })
              }
            />
          ))}
        </div>
      </Section>

      <Section title="Stay Category">
        <div className="space-y-0.5">
          {facets?.budgetCategories.map((bucket) => (
            <Checkbox
              key={bucket.value}
              label={bucket.value}
              count={bucket.count}
              checked={query.budgetCategories?.includes(bucket.value) ?? false}
              onToggle={() =>
                onChange({
                  budgetCategories: toggleInList<BudgetCategory>(
                    query.budgetCategories,
                    bucket.value,
                  ),
                })
              }
            />
          ))}
        </div>
      </Section>

      {facets && (
        <p className="pt-4 text-xs text-slate-400">
          Catalogue range: {formatPrice(facets.priceRange.min)} – {formatPrice(facets.priceRange.max)}
        </p>
      )}
    </aside>
  );
};
