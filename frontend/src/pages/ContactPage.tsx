import { EnquiryForm } from '../components/EnquiryForm';
import { GmailIcon, InstagramIcon, PhoneIcon } from '../components/Icons';
import { CONTACT, openGmailOnDesktop } from '../lib/contact';
import { cx } from '../lib/format';

// Same brand-coloured icon circles as the footer's contact buttons.
const DETAILS = [
  {
    label: 'Phone',
    links: [
      { value: CONTACT.phone, href: CONTACT.phoneHref },
      { value: CONTACT.phoneAlt, href: CONTACT.phoneAltHref },
    ],
    icon: PhoneIcon,
    className: 'bg-blue-500',
  },
  {
    label: 'Email',
    links: [{ value: CONTACT.email, href: `mailto:${CONTACT.email}` }],
    icon: GmailIcon,
    className: 'bg-gmail',
    onClick: openGmailOnDesktop,
  },
  {
    label: 'Instagram',
    links: [{ value: CONTACT.instagram, href: CONTACT.instagramUrl }],
    icon: InstagramIcon,
    className: 'bg-instagram',
  },
];

export const ContactPage = () => (
  <section className="py-16">
    <div className="mx-auto grid max-w-5xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Talk to us</h1>
        <ul className="mt-6 space-y-4 text-sm">
          {DETAILS.map(({ label, links, icon: Icon, className, onClick }) => (
            <li key={label} className="flex items-center gap-3">
              <span className={cx('flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white', className)}>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-slate-900">{label}</p>
                {links.map(({ value, href }) => {
                  const external = href.startsWith('https:');
                  return (
                    <a
                      key={href}
                      href={href}
                      onClick={onClick}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      className="block text-brand-700 hover:underline"
                    >
                      {value}
                    </a>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <EnquiryForm />
      </div>
    </div>
  </section>
);
