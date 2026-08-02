/**
 * Unsplash photo IDs and the URL builder shared by the seed data files.
 * Kept separate so packages.ts and destinations.ts stay pure data.
 */

export const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PHOTO = {
  manali: 'photo-1626621341517-bbf3d9990a23',
  shimla: 'photo-1597074866923-dc0589150358',
  spiti: 'photo-1454496522488-7a8e488e8606',
  dharamshala: 'photo-1518002171953-a080ee817e1f',
  kasol: 'photo-1571536802807-30451e3955d8',
  dalhousie: 'photo-1544735716-392fe2489ffa',
  rohtang: 'photo-1506905925346-21bda4d32df4',
  valley: 'photo-1464822759023-fed622ff2c3b',
  camp: 'photo-1504280390367-361c6d9f38f4',
  lake: 'photo-1439066615861-d1af74d74000',
  temple: 'photo-1524492412937-b28074a5d7da',
  road: 'photo-1469854523086-cc02fe5d8800',
} as const;
