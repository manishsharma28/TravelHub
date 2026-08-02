import { useState } from 'react';
import type { EnquiryPayload } from '@travelhub/shared';
import { ApiError, api } from '../lib/api';
import { CheckIcon } from './Icons';

interface Props {
  packageId?: string;
  packageTitle?: string;
  compact?: boolean;
}

type Status = 'idle' | 'submitting' | 'success';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  travelDate: '',
  travellers: '2',
  message: '',
};

export const EnquiryForm = ({ packageId, packageTitle, compact = false }: Props) => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string>('');

  const update = (key: keyof typeof initialForm) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
    setFieldErrors((prev) => ({ ...prev, [key]: '' }));
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

  const Error = ({ field }: { field: string }) =>
    fieldErrors[field] ? <p className="mt-1 text-xs text-red-600">{fieldErrors[field]}</p> : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
      {packageTitle && (
        <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
          Enquiring about <span className="font-semibold text-slate-900">{packageTitle}</span>
        </p>
      )}

      <div>
        <label htmlFor="eq-name" className="mb-1 block text-xs font-medium text-slate-700">
          Full name
        </label>
        <input id="eq-name" value={form.name} onChange={update('name')} required placeholder="Your name" className={inputClass('name')} />
        <Error field="name" />
      </div>

      <div className={compact ? '' : 'grid gap-3.5 sm:grid-cols-2'}>
        <div>
          <label htmlFor="eq-email" className="mb-1 block text-xs font-medium text-slate-700">
            Email
          </label>
          <input id="eq-email" type="email" value={form.email} onChange={update('email')} required placeholder="you@example.com" className={inputClass('email')} />
          <Error field="email" />
        </div>
        <div className={compact ? 'mt-3.5' : ''}>
          <label htmlFor="eq-phone" className="mb-1 block text-xs font-medium text-slate-700">
            Phone
          </label>
          <input id="eq-phone" type="tel" value={form.phone} onChange={update('phone')} required placeholder="+91 98765 43210" className={inputClass('phone')} />
          <Error field="phone" />
        </div>
      </div>

      <div className={compact ? '' : 'grid gap-3.5 sm:grid-cols-2'}>
        <div>
          <label htmlFor="eq-date" className="mb-1 block text-xs font-medium text-slate-700">
            Travel date
          </label>
          <input id="eq-date" type="date" value={form.travelDate} onChange={update('travelDate')} className={inputClass('travelDate')} />
        </div>
        <div className={compact ? 'mt-3.5' : ''}>
          <label htmlFor="eq-travellers" className="mb-1 block text-xs font-medium text-slate-700">
            Travellers
          </label>
          <input id="eq-travellers" type="number" min={1} max={50} value={form.travellers} onChange={update('travellers')} className={inputClass('travellers')} />
          <Error field="travellers" />
        </div>
      </div>

      <div>
        <label htmlFor="eq-message" className="mb-1 block text-xs font-medium text-slate-700">
          Message <span className="text-slate-400">(optional)</span>
        </label>
        <textarea id="eq-message" value={form.message} onChange={update('message')} rows={3} placeholder="Tell us what you're looking for…" className={inputClass('message')} />
      </div>

      {formError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-lg bg-accent-500 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Get Free Quotes'}
      </button>
      <p className="text-center text-[11px] text-slate-400">
        No spam. We share your enquiry only with matching verified operators.
      </p>
    </form>
  );
};
