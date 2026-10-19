import rohitPhoto from '../assets/team/rohit.jpg';
import surajPhoto from '../assets/team/suraj.jpg';
import swatiPhoto from '../assets/team/swati.jpg';
import { BikeIcon, CompassIcon, PhoneIcon, PinIcon, RoadIcon, SnowIcon } from '../components/Icons';
import { CONTACT, openGmailOnDesktop } from '../lib/contact';

const TRIP_STYLES = [
  { title: 'Road trips', detail: 'Scenic drives through Shimla and Manali', icon: RoadIcon },
  { title: 'Winter Spiti', detail: 'Adventurous 4×4 journeys in the snow', icon: SnowIcon },
  { title: 'Spiti bike tours', detail: 'The cold desert on two wheels', icon: BikeIcon },
  { title: 'Offbeat escapes', detail: 'Barot, Shanghar, Jibhi and Bir Billing', icon: CompassIcon },
];

const DESTINATIONS = [
  'Spiti Valley',
  'Shimla & Manali',
  'Dharamshala & Dalhousie',
  'Jibhi, Shanghar & Barot Valley',
  'Kasol & Bir Billing',
  'Beyond Himachal',
];

const TEAM = [
  {
    name: 'Rohit Thakur',
    role: 'Founder',
    title: 'Travel expert · Spiti Valley specialist',
    photo: rohitPhoto,
    lines: [
      'More than 5 years planning trips across Spiti Valley and offbeat Himachal — remote villages, monasteries, and high mountain passes.',
      'He also runs Tabo Mud Retreat in Tabo, and is opening routes through Zanskar, Ladakh, Kashmir, Uttarakhand, Northeast India, Bhutan, and Nepal.',
    ],
  },
  {
    name: 'Swati Thakur',
    role: 'Travel professional',
    title: 'Tourism expert · 7+ years',
    photo: swatiPhoto,
    lines: [
      'Seven years planning journeys with a careful eye for what travellers actually need.',
      'Family holidays and personal trips, shaped so the details stay smooth and the experience stays memorable.',
    ],
  },
  {
    name: 'Suraj Thakur',
    role: 'Travel professional',
    title: '4 years of experience',
    photo: surajPhoto,
    lines: [
      'Four years helping travellers plan trips that feel personal, not packaged.',
      'He focuses on thoughtful planning so each journey stays memorable — the place, the culture, and the time on the road.',
    ],
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
      <div className="mx-auto mt-12 grid max-w-5xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {TRIP_STYLES.map(({ title, detail, icon: Icon }) => (
          <div key={title} className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-800 text-accent-400">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-[15px] font-bold text-slate-900">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{detail}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">Our destinations</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((name) => (
            <li key={name} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
              <p className="font-semibold text-slate-900">{name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">Our Team</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
          The people who plan the journeys and know the mountains first-hand.
        </p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {TEAM.map((person) => (
            <li
              key={person.name}
              className="flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 px-5 pb-6 pt-6 text-center shadow-sm"
            >
              <img
                src={person.photo}
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover object-[center_18%] ring-1 ring-slate-200"
              />
              <h3 className="mt-4 text-lg font-bold text-slate-900">{person.name}</h3>
              <p className="mt-1 text-sm font-semibold text-brand-700">{person.role}</p>
              <p className="mt-0.5 text-xs font-medium text-slate-500">{person.title}</p>
              {person.lines.map((line) => (
                <p key={line} className="mt-3 text-sm leading-relaxed text-slate-600">
                  {line}
                </p>
              ))}
              {person.name === 'Rohit Thakur' && (
                <div className="mt-4 flex flex-col items-center gap-1.5 text-sm">
                  <a href={CONTACT.phoneHref} className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:underline">
                    <PhoneIcon className="h-4 w-4" />
                    {CONTACT.phone}
                  </a>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    onClick={openGmailOnDesktop}
                    className="font-medium text-slate-600 hover:text-brand-700 hover:underline"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  </div>
);
