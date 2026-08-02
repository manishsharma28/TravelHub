const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/** ₹13,875 — Indian digit grouping, no decimals. */
export const formatPrice = (value: number): string => inr.format(value);

/** "4N / 5D" — the duration shorthand used across Indian travel listings. */
export const formatDuration = (nights: number, days: number): string => `${nights}N / ${days}D`;

/** "Manali 3N · Solang 1N" */
export const formatItinerary = (stops: Array<{ city: string; nights: number }>): string =>
  stops.map((s) => `${s.city} ${s.nights}N`).join(' · ');

export const cx = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ');
