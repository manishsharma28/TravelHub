import { useState } from 'react';
import type { EnquiryPayload } from '@travelhub/shared';
import { ApiError, api } from '../lib/api';
import { CheckIcon, ChevronIcon } from './Icons';

interface Props {
  packageId?: string;
  packageTitle?: string;
  compact?: boolean;
  /** Keep the submit button visible under the fields while the form scrolls. */
  pinnedSubmit?: boolean;
}

type Status = 'idle' | 'submitting' | 'success';

// Matches the API's validation (positive, at most 50).
const MIN_TRAVELLERS = 1;
const MAX_TRAVELLERS = 50;

const DESTINATION_GROUPS = [
  {
    label: 'Himachal & Spiti',
    places: ['Spiti Valley', 'Shimla', 'Manali', 'Dharamshala', 'Dalhousie', 'Jibhi', 'Shanghar', 'Barot Valley', 'Kasol', 'Bir Billing'],
  },
  {
    label: 'Beyond Himachal',
    places: ['Zanskar', 'Leh–Ladakh', 'Kashmir', 'Uttarakhand', 'Northeast India', 'Nepal', 'Bhutan'],
  },
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  destination: '',
  travelDate: '',
  travellers: '',
  message: '',
};

export const EnquiryForm = ({ packageId, packageTitle, compact = false, pinnedSubmit = false }: Props) => {
  const [form, setForm] = useState(initialForm);
  const [dateFocused, setDateFocused] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string>('');

  const update = (key: keyof typeof initialForm) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
    setFieldErrors((prev) => ({ ...prev, [key]: '' }));
  };

  // Empty counts as 0, so the first "up" lands on 1 and "down" starts disabled.
  const travellerCount = Number(form.travellers) || 0;

  const stepTravellers = (delta: number) => {
    const next = Math.min(MAX_TRAVELLERS, Math.max(MIN_TRAVELLERS, travellerCount + delta));
    setForm((prev) => ({ ...prev, travellers: String(next) }));
    setFieldErrors((prev) => ({ ...prev, travellers: '' }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('submitting');
    setFormError(null);
    setFieldErrors({});

    const payload: EnquiryPayload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      packageId,
      destination: form.destination || undefined,
      travelDate: form.travelDate || undefined,
      travellers: form.travellers ? Number(form.travellers) : undefined,
      message: form.message || undefined,
    };

    try {
      const result = await api.submitEnquiry(payload);
      setConfirmation(result.message);
      setStatus('success');
      setForm(initialForm);
    } catch (error) {
      setStatus('idle');
      if (error instanceof ApiError) {
        setFormError(error.message);
        if (error.details) setFieldErrors(error.details);
      } else {
        setFormError('Something went wrong. Please try again.');
      }
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-brand-200 bg-brand-50 p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white">
          <CheckIcon className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-slate-900">Enquiry received</h3>
        <p className="mt-2 text-sm text-slate-600">{confirmation}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm font-semibold text-brand-700 hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const inputClass = (field: string) =>
    `w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-brand-500/25 ${
      fieldErrors[field] ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-brand-500'
    }`;

  // Selects and date inputs have no ::placeholder, so style their empty state to match.
  const emptyClass = (value: string) => (value ? '' : 'italic font-normal text-placeholder');

  const Error = ({ field }: { field: string }) =>
    fieldErrors[field] ? <p className="mt-1 text-xs text-red-600">{fieldErrors[field]}</p> : null;

  const fields = (
    <>
      {packageTitle && (
        <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
          Enquiring about <span className="font-semibold text-slate-900">{packageTitle}</span>
        </p>
      )}

      <div>
        <label htmlFor="eq-name" className="mb-1 block text-xs font-medium text-slate-700">
          Full name
        </label>
        <input id="eq-name" value={form.name} onChange={update('name')} required placeholder="Rohan Sharma" className={inputClass('name')} />
        <Error field="name" />
      </div>

      <div className={compact ? '' : 'grid gap-3.5 sm:grid-cols-2'}>
        <div>
          <label htmlFor="eq-email" className="mb-1 block text-xs font-medium text-slate-700">
            Email
          </label>
          <input id="eq-email" type="email" value={form.email} onChange={update('email')} required placeholder="rohan@email.com" className={inputClass('email')} />
          <Error field="email" />
        </div>
        <div className={compact ? 'mt-3.5' : ''}>
          <label htmlFor="eq-phone" className="mb-1 block text-xs font-medium text-slate-700">
            Phone
          </label>
          <input id="eq-phone" type="tel" value={form.phone} onChange={update('phone')} required placeholder="98765 43210" className={inputClass('phone')} />
          <Error field="phone" />
        </div>
      </div>

      {/* A package enquiry already implies its destination. */}
      {!packageId && (
        <div>
          <label htmlFor="eq-destination" className="mb-1 block text-xs font-medium text-slate-700">
            Destination
          </label>
          <select
            id="eq-destination"
            value={form.destination}
            onChange={update('destination')}
            className={`${inputClass('destination')} bg-white ${emptyClass(form.destination)}`}
          >
            <option value="" disabled hidden>
              Where would you like to go?
            </option>
            <option value="Not sure yet" className="text-slate-800 not-italic">
              Not sure yet — help me choose
            </option>
            {DESTINATION_GROUPS.map((group) => (
              <optgroup key={group.label} label={group.label} className="text-slate-800 not-italic">
                {group.places.map((place) => (
                  <option key={place} value={place} className="text-slate-800 not-italic">
                    {place}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <Error field="destination" />
        </div>
      )}

      <div className={compact ? '' : 'grid gap-3.5 sm:grid-cols-2'}>
        <div>
          <label htmlFor="eq-date" className="mb-1 block text-xs font-medium text-slate-700">
            Travel date
          </label>
          <div className="relative">
            <input
              id="eq-date"
              type="date"
              value={form.travelDate}
              onChange={update('travelDate')}
              onFocus={() => setDateFocused(true)}
              onBlur={() => setDateFocused(false)}
              // The native empty date text can't share the placeholder font, so it's
              // hidden until the field is focused or filled and a matching stand-in is shown.
              className={`${inputClass('travelDate')} ${form.travelDate || dateFocused ? '' : 'date-empty'}`}
            />
            {!form.travelDate && !dateFocused && (
              <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm font-normal italic text-placeholder">
                dd-mm-yyyy
              </span>
            )}
          </div>
        </div>
        <div className={compact ? 'mt-3.5' : ''}>
          <label htmlFor="eq-travellers" className="mb-1 block text-xs font-medium text-slate-700">
            Travellers
          </label>
          <div className="relative">
            <input
              id="eq-travellers"
              type="number"
              inputMode="numeric"
              min={MIN_TRAVELLERS}
              max={MAX_TRAVELLERS}
              value={form.travellers}
              onChange={update('travellers')}
              placeholder="2"
              // Native spinners are tiny and hidden on touch, so they're replaced by the buttons below.
              className={`${inputClass('travellers')} pr-12 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
            />
            <div className="absolute inset-y-px right-px flex w-10 flex-col overflow-hidden rounded-r-lg border-l border-slate-200 bg-slate-50">
              <button
                type="button"
                onClick={() => stepTravellers(1)}
                disabled={travellerCount >= MAX_TRAVELLERS}
                aria-label="Add a traveller"
                className="flex flex-1 items-center justify-center text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronIcon className="h-3.5 w-3.5 -rotate-90" />
              </button>
              <button
                type="button"
                onClick={() => stepTravellers(-1)}
                disabled={travellerCount <= MIN_TRAVELLERS}
                aria-label="Remove a traveller"
                className="flex flex-1 items-center justify-center border-t border-slate-200 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronIcon className="h-3.5 w-3.5 rotate-90" />
              </button>
            </div>
          </div>
          <Error field="travellers" />
        </div>
      </div>

      <div>
        <label htmlFor="eq-message" className="mb-1 block text-xs font-medium text-slate-700">
          Message <span className="text-slate-400">(optional)</span>
        </label>
        <textarea id="eq-message" value={form.message} onChange={update('message')} rows={2} placeholder="6-day Spiti road trip in June, 2 adults" className={`${inputClass('message')} resize-none`} />
      </div>

    </>
  );

  return (
    <form onSubmit={handleSubmit} className={pinnedSubmit ? 'flex min-h-0 flex-1 flex-col' : 'space-y-3.5'} noValidate>
      {pinnedSubmit ? <div className="-mr-6 min-h-0 flex-1 space-y-3.5 overflow-y-auto pr-1">{fields}</div> : fields}
      {formError && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {formError}
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className={`w-full rounded-lg bg-accent-500 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60 ${pinnedSubmit ? 'mt-4 shrink-0' : ''}`}
      >
        {status === 'submitting' ? 'Sending…' : 'Get Free Quotes'}
      </button>
    </form>
  );
};
