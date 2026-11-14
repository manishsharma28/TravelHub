import type { Destination } from '@travelhub/shared';
import { img, PHOTO } from './images.js';
import { packages } from './packages.js';

/** Packages a destination tile leads to — the same match the ?destination=
 *  filter applies, so a tile's count always equals the results it opens. */
const packagesFor = (name: string) => {
  const target = name.toLowerCase();
  return packages.filter(
    (p) =>
      p.destination.toLowerCase() === target ||
      p.itinerary.some((stop) => stop.city.toLowerCase() === target),
  );
};

const destination = (
  slug: string,
  name: string,
  state: string,
  photo: string,
  blurb: string,
): Destination => {
  const matches = packagesFor(name);
  return {
    slug,
    name,
    state,
    imageUrl: img(photo, 800),
    packageCount: matches.length,
    startingPrice: Math.min(...matches.map((p) => p.price)),
    blurb,
  };
};

/** Seed destinations shown on the home page and destination filters. */
export const destinations: Destination[] = [
  destination('spiti-valley', 'Spiti Valley', 'Himachal Pradesh', PHOTO.spiti,
    'Snowbound monasteries and high villages — Spiti in winter, by 4×4 or Tempo Traveller.'),
  destination('shimla-manali', 'Shimla & Manali', 'Himachal Pradesh', PHOTO.solang,
    'Himachal’s classic pair — the Ridge and Kufri, then Solang Valley and Old Manali.'),
  destination('kashmir', 'Kashmir', 'Jammu & Kashmir', PHOTO.kashmir,
    'Shikaras on Dal Lake, the Gulmarg meadows and the Lidder valley at Pahalgam.'),
  destination('zanskar', 'Zanskar', 'Ladakh', PHOTO.gonboRangjon,
    'Ladakh’s remotest valley, reached over Pensi La and left by Shinku La.'),
  destination('bhutan', 'Bhutan', 'Bhutan', PHOTO.bhutan,
    'Dzongs, prayer flags and the climb to Tiger’s Nest.'),
  destination('nepal', 'Nepal', 'Nepal', PHOTO.kathmandu,
    'Kathmandu’s temple squares, and the walled city of Lo Manthang in Mustang.'),
];
