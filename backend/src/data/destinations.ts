import type { Destination } from '@travelhub/shared';
import { img, PHOTO } from './images.js';
import { packages } from './packages.js';

/** Seed destinations shown on the home page and destination filters. */
export const destinations: Destination[] = [
  {
    slug: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    imageUrl: img(PHOTO.manali, 800),
    packageCount: packages.filter((p) => p.destination === 'Manali').length,
    startingPrice: 13875,
    blurb: 'Snow points, the Solang valley and a cafe culture that runs late into the night.',
  },
  {
    slug: 'shimla',
    name: 'Shimla',
    state: 'Himachal Pradesh',
    imageUrl: img(PHOTO.shimla, 800),
    packageCount: packages.filter((p) => p.destination === 'Shimla').length,
    startingPrice: 7600,
    blurb: 'Colonial architecture along the Ridge, with Kufri an easy day trip away.',
  },
  {
    slug: 'spiti-valley',
    name: 'Spiti Valley',
    state: 'Himachal Pradesh',
    imageUrl: img(PHOTO.spiti, 800),
    packageCount: packages.filter((p) => p.destination === 'Spiti Valley').length,
    startingPrice: 30400,
    blurb: 'A cold desert of monasteries, fossil villages and 4,500 m passes.',
  },
  {
    slug: 'dharamshala',
    name: 'Dharamshala',
    state: 'Himachal Pradesh',
    imageUrl: img(PHOTO.dharamshala, 800),
    packageCount: packages.filter((p) => p.destination === 'Dharamshala').length,
    startingPrice: 12800,
    blurb: 'Tibetan monasteries under the Dhauladhars, and the Triund ridge trek.',
  },
  {
    slug: 'kasol',
    name: 'Kasol',
    state: 'Himachal Pradesh',
    imageUrl: img(PHOTO.kasol, 800),
    packageCount: packages.filter((p) => p.destination === 'Kasol').length,
    startingPrice: 6375,
    blurb: 'Parvati valley riverside camps and the overnight Kheerganga trek.',
  },
  {
    slug: 'dalhousie',
    name: 'Dalhousie',
    state: 'Himachal Pradesh',
    imageUrl: img(PHOTO.dalhousie, 800),
    packageCount: packages.filter((p) => p.destination === 'Dalhousie').length,
    startingPrice: 17850,
    blurb: 'Quiet colonial hill station beside the Khajjiar meadow.',
  },
];

