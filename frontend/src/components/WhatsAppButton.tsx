import { CONTACT } from '../lib/contact';
import { WhatsAppIcon } from './Icons';

/**
 * Floating chat shortcut pinned bottom-right on every page. Sits at z-30:
 * above page content, below the header (z-40) and the mobile filter drawer (z-50).
 */
export const WhatsAppButton = () => (
  <a
    href={CONTACT.whatsappUrl}
    target="_blank"
    rel="noreferrer"
    aria-label="Chat with us on WhatsApp"
    title="Chat with us on WhatsApp"
    className="fixed bottom-5 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/40"
  >
    <WhatsAppIcon className="h-7 w-7" />
  </a>
);
