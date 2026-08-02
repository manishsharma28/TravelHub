import { EnquiryForm } from '../components/EnquiryForm';
import { HeadsetIcon, ShieldIcon, WalletIcon } from '../components/Icons';

const STATS = [
  { value: '1M+', label: 'Travellers served' },
  { value: '500+', label: 'Verified operators' },
  { value: '15+', label: 'Years of trust' },
  { value: '4.6★', label: 'Average rating' },
];

const VALUES = [
  {
    icon: ShieldIcon,
    title: 'Operators we would travel with',
    body: 'Every partner is checked for licences, insurance cover and on-ground support staff. Operators who slip below a 4.0 rating are delisted until they fix it.',
  },
  {
    icon: WalletIcon,
    title: 'Pricing you can actually compare',
    body: 'Inclusions and exclusions are published in full on every listing, so a cheaper package is cheaper for a reason you can see.',
  },
  {
    icon: HeadsetIcon,
    title: 'Advice from people who have been there',
    body: 'Our team has driven the Spiti circuit and walked up to Triund. Ask us what the road is like in March and you will get a real answer.',
  },
];

export const AboutPage = () => (
  <div>
    <section className="bg-brand-800 py-16 text-white">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold sm:text-4xl">About TravelHub</h1>
        <p className="mt-5 text-lg leading-relaxed text-brand-100">
          We are a marketplace for Himalayan holidays — connecting travellers with vetted local tour
          operators instead of faceless call centres.
        </p>
      </div>
    </section>

    <section className="border-b border-slate-200 bg-white py-10">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold text-brand-700">{stat.value}</p>
            <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">How we work</h2>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {VALUES.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
          </div>
        ))}
      </div>
    </section>

    <section id="contact" className="bg-slate-50 py-16 scroll-mt-20">
      <div className="mx-auto grid max-w-5xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Talk to us</h2>
          <p className="mt-4 text-slate-600">
            Planning something specific, or want a package built from scratch? Send us the details
            and a travel expert will get back to you within 24 hours.
          </p>
          <dl className="mt-6 space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-slate-900">Phone</dt>
              <dd>
                <a href="tel:+919876543210" className="text-brand-700 hover:underline">
                  +91 98765 43210
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Email</dt>
              <dd>
                <a href="mailto:hello@travelhub.example" className="text-brand-700 hover:underline">
                  hello@travelhub.example
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Office</dt>
              <dd className="text-slate-600">The Mall Road, Shimla, Himachal Pradesh 171001</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <EnquiryForm />
        </div>
      </div>
    </section>
  </div>
);
