import taboExterior from '../assets/hotels/tabo/exterior.jpg';
import taboRoom from '../assets/hotels/tabo/room.jpg';
import taboWindow from '../assets/hotels/tabo/window.jpg';
import taboLounge from '../assets/hotels/tabo/lounge.jpg';
import kamnaExterior from '../assets/hotels/kamna/exterior.jpg';
import kamnaRoom from '../assets/hotels/kamna/room.jpg';
import kamnaRoomView from '../assets/hotels/kamna/room-view.jpg';
import kamnaBalcony from '../assets/hotels/kamna/balcony.jpg';
import nibaanaExterior from '../assets/hotels/nibaana/exterior.jpg';
import nibaanaSuite from '../assets/hotels/nibaana/suite.jpg';
import nibaanaRoom from '../assets/hotels/nibaana/room.jpg';
import nibaanaDining from '../assets/hotels/nibaana/dining.jpg';
import nibaanaLawn from '../assets/hotels/nibaana/lawn.jpg';
import grandSpitiRoomView from '../assets/hotels/grand-spiti/room-view.jpg';
import grandSpitiRoom from '../assets/hotels/grand-spiti/room.jpg';
import grandSpitiRoomEntry from '../assets/hotels/grand-spiti/room-entry.jpg';

export interface Hotel {
  slug: string;
  name: string;
  place: string;
  /** Must match a destination name from the API so the destination tiles can count it. */
  destination: string;
  /** First entry is the cover photo on cards and the detail page. */
  gallery: string[];
  tagline?: string;
  about: string[];
  highlightsTitle?: string;
  highlights?: string[];
  contact?: { address: string; phone: string; phoneHref: string; email: string };
}

/** Stays shown on the home page, each with its own detail page at /hotels/:slug. */
export const HOTELS: Hotel[] = [
  {
    slug: 'tabo-mud-retreat',
    name: 'Tabo Mud Retreat',
    place: 'Tabo, Spiti Valley',
    destination: 'Spiti Valley',
    gallery: [taboExterior, taboRoom, taboWindow, taboLounge],
    tagline: 'Your Home in the Himalayas',
    about: [
      'Nestled in the peaceful village of Tabo in the beautiful Spiti Valley, Himachal Pradesh, Tabo Mud Retreat offers a unique opportunity to experience the authentic charm, culture, and tranquility of the Himalayas.',
      'Surrounded by majestic mountains, breathtaking landscapes, and the timeless beauty of the cold desert, our retreat is a perfect escape for travellers seeking peace, comfort, and a deeper connection with nature.',
      'Experience the warmth of traditional Himalayan hospitality, explore the ancient heritage of Tabo, visit the famous Tabo Monastery, and discover the simple beauty of life in the mountains. Whether you are travelling through Spiti in summer or experiencing its magical winter landscapes, Tabo Mud Retreat welcomes you with warmth and care.',
      'More than just a place to stay, we offer an experience that brings you closer to the soul of Spiti — its people, traditions, peaceful surroundings, and unforgettable mountain views.',
      'Come for the mountains, stay for the peace, and leave with memories of a lifetime.',
    ],
    highlightsTitle: 'Why stay at Tabo Mud Retreat',
    highlights: [
      'Traditional Spitian charm and Himalayan hospitality',
      'A peaceful stay in the heart of Tabo village',
      'An ideal base for exploring Tabo and the wider Spiti Valley',
      'A memorable experience in both summer and winter',
      'A welcoming retreat for families, couples, solo travellers, and mountain lovers',
    ],
    contact: {
      address: 'Near Post Office, Tabo, Spiti Valley, Himachal Pradesh',
      phone: '+91 78071 87351',
      phoneHref: 'tel:+917807187351',
      email: 'tabomudretreat07@gmail.com',
    },
  },
  {
    slug: 'kamna-hill-resort',
    name: 'Kamna Hill Resort',
    place: 'Shimla',
    destination: 'Shimla',
    gallery: [kamnaExterior, kamnaRoom, kamnaRoomView, kamnaBalcony],
    tagline: 'Experience the hills, embrace the peace, and make every stay memorable',
    about: [
      'Kamna Hill Resort, Shimla, offers a peaceful mountain getaway surrounded by the natural beauty of the Himalayas. Located in the beautiful hill city of Shimla, the resort is an ideal choice for travellers looking to relax, enjoy scenic surroundings, and experience the charm of Himachal Pradesh.',
      'Whether you’re planning a family vacation, a romantic escape, a holiday with friends, or a refreshing weekend trip, Kamna Hill Resort provides an opportunity to unwind amidst the hills and enjoy a memorable stay.',
      'From the refreshing mountain air to the serene atmosphere, it’s a place to slow down, reconnect with nature, and make beautiful memories in Shimla.',
    ],
  },
  {
    slug: 'nibaana-inn',
    name: 'Nibaana Inn',
    place: 'Shimla',
    destination: 'Shimla',
    gallery: [nibaanaExterior, nibaanaSuite, nibaanaRoom, nibaanaDining, nibaanaLawn],
    about: [
      'Nibaana Inn, Shimla is a hospitality destination for travellers looking to experience the charm, scenic beauty, and refreshing mountain atmosphere of Shimla. Whether you are visiting with family, travelling as a couple, or planning a holiday with friends, Nibaana Inn offers a place to relax and enjoy your time in the hills.',
      'Surrounded by the beauty of Himachal Pradesh, Shimla welcomes visitors with its pleasant mountain views, colonial heritage, pine forests, and vibrant local culture. A stay at Nibaana Inn can be part of a memorable getaway, with opportunities to explore popular attractions, enjoy local cuisine, and experience the warmth of Himachali hospitality.',
    ],
  },
  {
    slug: 'grand-spiti-manor',
    name: 'Grand Spiti Manor',
    place: 'Spiti Valley',
    destination: 'Spiti Valley',
    gallery: [grandSpitiRoomView, grandSpitiRoom, grandSpitiRoomEntry],
    about: [
      'At Grand Spiti Manor, we don’t just host you—we invite you to fall in love with Spiti, the way we have. Wake up to crisp mountain air, endless silence, and landscapes that feel almost unreal, and let us be your gateway to the soul of this high-altitude desert.',
      'From the serene heights of Kii Monastery to the breathtaking span of Chicham Bridge, every journey from our doorstep feels like a story waiting to be told. Discover the timeless charm of Langza and Komic, where ancient life continues beneath vast Himalayan skies, and send a postcard from the world’s highest Hikkim Post Office. Immerse yourself in centuries of wisdom at Tabo Monastery and the dramatic cliff-hung Dhankar Monastery, then venture into the untouched wilderness of Pin Valley.',
      'Be spellbound by the turquoise magic of Chandratal, pause in awe at the mystical Gue Monastery, and take in sweeping, soul-stirring views from Lepcha Pass. Each destination is a chapter—and when the day ends, we welcome you back to warmth, comfort, and heartfelt hospitality at Grand Spiti Manor, where your Spiti memories truly come alive.',
    ],
    highlightsTitle: 'Places to explore from the manor',
    highlights: [
      'Kii Monastery',
      'Chicham Bridge',
      'Langza and Komic villages',
      'Hikkim, the world’s highest post office',
      'Tabo Monastery',
      'Dhankar Monastery',
      'Pin Valley',
      'Chandratal',
      'Gue Monastery',
      'Lepcha Pass',
    ],
  },
];

export const countHotels = (destination: string) => HOTELS.filter((hotel) => hotel.destination === destination).length;

export const findHotel = (slug: string) => HOTELS.find((hotel) => hotel.slug === slug);
