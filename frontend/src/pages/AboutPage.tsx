import { EnquiryForm } from '../components/EnquiryForm';
import { PinIcon } from '../components/Icons';
import { CONTACT, openGmailOnDesktop } from '../lib/contact';

const TRIP_STYLES = [
  { title: 'Road trips', detail: 'Scenic drives through Shimla and Manali' },
  { title: 'Winter Spiti', detail: 'Adventurous 4×4 journeys in the snow' },
  { title: 'Spiti bike tours', detail: 'The cold desert on two wheels' },
  { title: 'Offbeat escapes', detail: 'Barot, Shanghar, Jibhi and Bir Billing' },
];

const DESTINATIONS = [
  { name: 'Spiti Valley', note: 'Summer adventures & winter expeditions' },
  { name: 'Shimla & Manali' },
  { name: 'Dharamshala & Dalhousie' },
  { name: 'Jibhi, Shanghar & Barot Valley' },
  { name: 'Kasol & Bir Billing' },
  {
    name: 'Beyond Himachal',
    note: 'Zanskar, Leh–Ladakh, Kashmir, Uttarakhand, Northeast India, Nepal & Bhutan',
  },
];

export const AboutPage = () => (
  <div>
    <section className="bg-brand-800 py-16 text-white">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-400">
          Explore beyond the map
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">About Unmapped Trips</h1>
        <p className="mt-5 text-lg leading-relaxed text-brand-100">
          We believe travelling is not just about visiting places; it’s about discovering stories,
          experiencing local culture, meeting new people, and creating memories that last a
          lifetime.
        </p>
      </div>
    </section>

    <section className="border-b border-slate-200 bg-white py-14">
      <div className="mx-auto max-w-3xl space-y-5 px-4 text-center leading-relaxed text-slate-600 sm:px-6 lg:px-8">
        <p>
          From the breathtaking landscapes of Spiti Valley to the peaceful villages of Himachal
          Pradesh, we take you beyond the usual tourist destinations to explore the hidden gems of
          the Himalayas.
        </p>
        <p>
          Whether you dream of a scenic road trip through Shimla and Manali, an adventurous 4×4
          journey through Winter Spiti, a thrilling Spiti bike tour, or an offbeat escape to places
          like Barot, Shanghar, Jibhi and Bir Billing, we help you experience every destination in
          its true spirit.
        </p>
        <p className="font-semibold text-brand-800">
          We don’t just plan holidays; we help you discover places that stay in your heart long
          after the journey ends.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {TRIP_STYLES.map((style) => (
          <div key={style.title} className="text-center">
            <p className="text-lg font-bold text-brand-700">{style.title}</p>
            <p className="mt-1 text-sm text-slate-600">{style.detail}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">Our destinations</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map(({ name, note }) => (
            <li key={name} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
              <div>
                <p className="font-semibold text-slate-900">{name}</p>
                {note && <p className="mt-1 text-sm text-slate-600">{note}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section id="contact" className="py-16 scroll-mt-20">
      <div className="mx-auto grid max-w-5xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Talk to us</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-slate-900">Phone</dt>
              <dd>
                <a href={CONTACT.phoneHref} className="text-brand-700 hover:underline">
                  {CONTACT.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Email</dt>
              <dd>
                <a href={`mailto:${CONTACT.email}`} onClick={openGmailOnDesktop} className="text-brand-700 hover:underline">
                  {CONTACT.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Instagram</dt>
              <dd>
                <a href={CONTACT.instagramUrl} target="_blank" rel="noreferrer" className="text-brand-700 hover:underline">
                  {CONTACT.instagram}
                </a>
              </dd>
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
