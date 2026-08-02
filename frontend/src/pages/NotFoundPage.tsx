import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <div className="mx-auto max-w-2xl px-4 py-28 text-center">
    <p className="text-6xl font-bold text-brand-600">404</p>
    <h1 className="mt-4 text-2xl font-bold text-slate-900">This page took a wrong turn</h1>
    <p className="mt-3 text-slate-600">
      The page you are looking for does not exist. Let’s get you back to the mountains.
    </p>
    <div className="mt-8 flex justify-center gap-3">
      <Link to="/" className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
        Go home
      </Link>
      <Link to="/packages" className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
        Browse packages
      </Link>
    </div>
  </div>
);
