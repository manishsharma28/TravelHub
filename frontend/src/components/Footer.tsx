import { Link } from 'react-router-dom';
import { CONTACT, openGmailOnDesktop } from '../lib/contact';
import { cx } from '../lib/format';
import { GmailIcon, InstagramIcon, PhoneIcon, WhatsAppIcon } from './Icons';

const CONTACT_LINKS = [
  { label: `Call us on ${CONTACT.callPhone}`, href: CONTACT.callPhoneHref, icon: PhoneIcon, className: 'bg-blue-500' },
  { label: 'Chat with us on WhatsApp', href: CONTACT.whatsappUrl, icon: WhatsAppIcon, className: 'bg-whatsapp' },
  { label: `Email us at ${CONTACT.email}`, href: `mailto:${CONTACT.email}`, icon: GmailIcon, className: 'bg-gmail', onClick: openGmailOnDesktop },
  { label: 'Follow us on Instagram', href: CONTACT.instagramUrl, icon: InstagramIcon, className: 'bg-instagram' },
];

const COMPANY_LINKS = [
  { label: 'About us', to: '/about' },
  { label: 'All packages', to: '/packages' },
  { label: 'Contact', to: '/about#contact' },
];

export const Footer = () => (
  <footer className="mt-20 bg-brand-900 text-slate-300">
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <ul className="flex max-w-sm justify-between md:w-full">
          {CONTACT_LINKS.map(({ label, href, icon: Icon, className, onClick }) => {
            const external = href.startsWith('https:');
            return (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  title={label}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  onClick={onClick}
                  className={cx(
                    'flex h-12 w-12 items-center justify-center rounded-full text-white shadow-sm transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
                    className,
                  )}
                >
                  <Icon className="h-6 w-6" />
                </a>
              </li>
            );
          })}
        </ul>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
          <ul className="mt-4 space-y-2.5">
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-sm text-slate-400 transition hover:text-accent-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-slate-800 pt-6 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Unmapped Trips. Demo project — packages shown are sample data.</p>
      </div>
    </div>
  </footer>
);
