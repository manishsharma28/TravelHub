import type { Testimonial } from '@travelhub/shared';

/** Seed customer testimonials rendered on the home page. */
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Ananya Sharma',
    location: 'Bengaluru',
    rating: 5,
    comment:
      'The Spiti circuit was handled really well — permits sorted before we arrived and the driver knew every stretch of that road. Chandratal camping was the highlight.',
    packageTitle: 'Spiti Valley Complete Circuit',
    avatarUrl: 'https://i.pravatar.cc/120?img=47',
  },
  {
    id: 't2',
    name: 'Rohit Menon',
    location: 'Pune',
    rating: 5,
    comment:
      'Booked the honeymoon package and the decorated room plus candlelight dinner were exactly as promised. Zero haggling over inclusions at any point.',
    packageTitle: 'Shimla Manali Honeymoon Special',
    avatarUrl: 'https://i.pravatar.cc/120?img=12',
  },
  {
    id: 't3',
    name: 'Fatima Qureshi',
    location: 'Hyderabad',
    rating: 4,
    comment:
      'Great value for a short trek. The guide on the Kheerganga route was patient with beginners in our group. Only wish dinner had more variety.',
    packageTitle: 'Kasol & Kheerganga Trek',
    avatarUrl: 'https://i.pravatar.cc/120?img=32',
  },
  {
    id: 't4',
    name: 'Vikram Iyer',
    location: 'Chennai',
    rating: 5,
    comment:
      'Ten days Manali to Leh with full backup support. Bike was serviced properly and the mechanic saved our trip on day six. Would ride with them again.',
    packageTitle: 'Manali to Leh Motorcycle Expedition',
    avatarUrl: 'https://i.pravatar.cc/120?img=68',
  },
];
