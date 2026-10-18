/** Business contact details, shown in the header, footer and About page. */
export const CONTACT = {
  phone: '+91 78071 87351',
  phoneHref: 'tel:+917807187351',
  /** Dedicated call line, used by the footer's call button. */
  callPhone: '+91 82192 96031',
  callPhoneHref: 'tel:+918219296031',
  email: 'info@unmappedtrips.com',
  gmailComposeUrl: `https://mail.google.com/mail/?view=cm&fs=1&to=info@unmappedtrips.com&su=${encodeURIComponent('Trip enquiry')}`,
  whatsappUrl: `https://wa.me/917807187351?text=${encodeURIComponent("Hi Unmapped Trips! I'd like to plan a trip.")}`,
  instagram: '@unmapped__trips',
  instagramUrl: 'https://www.instagram.com/unmapped__trips/',
};

/**
 * onClick for `mailto:` links. Desktops often have no mail app behind mailto:,
 * so clicking does nothing there — open Gmail's composer instead. Phones keep
 * the mailto: link, which opens their mail app.
 */
export const openGmailOnDesktop = (event: React.MouseEvent<HTMLAnchorElement>) => {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  event.preventDefault();
  window.open(CONTACT.gmailComposeUrl, '_blank', 'noopener,noreferrer');
};
