/**
 * Photo URLs shared by the seed data files.
 *
 * These are Wikimedia Commons images of the actual Himachal locations. The
 * generic stock photos previously used here were not checked against their
 * subjects and included a sneaker studio shot on the Dharamshala page, the Taj
 * Mahal, Varanasi ghats and a Utah desert road — none of them in Himachal.
 *
 * Each URL is a specific pre-rendered Commons thumbnail. Commons only serves
 * widths that have already been rendered for a given file (a request for an
 * arbitrary width returns HTTP 400), and the available set differs per file,
 * so the width is fixed per photo here rather than passed in by callers.
 */

export const PHOTO = {
  /** Kullu valley and the snow line just outside Manali. */
  manali:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Kullu_Valley_near_Manali%2C_Himachal_Pradesh%2C_India.jpg/1280px-Kullu_Valley_near_Manali%2C_Himachal_Pradesh%2C_India.jpg',

  /** Shimla stacked along the ridge, Christ Church on the skyline. */
  shimla:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Cityscape_of_Shimla.jpg/1280px-Cityscape_of_Shimla.jpg',

  /** Key Monastery above the Spiti valley. */
  spiti:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Kee_monastery_Spiti_Valley_%28edited%29.jpg/1280px-Kee_monastery_Spiti_Valley_%28edited%29.jpg',

  /** Namgyal Monastery, McLeodganj — the Dalai Lama's temple. */
  dharamshala:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Statue_of_the_Buddha_in_Namgyal_Monastery.jpg/1280px-Statue_of_the_Buddha_in_Namgyal_Monastery.jpg',

  /** The Parvati river running through Kasol. */
  kasol:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Water_stream_in_Kasol_Parvati_Valley.jpg/1280px-Water_stream_in_Kasol_Parvati_Valley.jpg',

  /** Dhauladhar range seen from Dalhousie. */
  dalhousie: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Dalhousie_Himachal_Pradesh_India.jpg',

  /** Snow on the Rohtang range above Manali. */
  rohtang:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Snow_Rohtang_Range_Manali_May24_A7CR_00128.jpg/1280px-Snow_Rohtang_Range_Manali_May24_A7CR_00128.jpg',

  /** Paragliding at Solang Valley, Manali. */
  valley:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Paragliders_at_Solang_Valley%2C_Manali.jpg/960px-Paragliders_at_Solang_Valley%2C_Manali.jpg',

  /** Tented camp beside Chandratal. */
  camp: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Chandra_Taal_%28Lake%29_Campsite%2C_HP%2C_India%2CD35_7502_nx01_01.jpg/1280px-Chandra_Taal_%28Lake%29_Campsite%2C_HP%2C_India%2CD35_7502_nx01_01.jpg',

  /** Chandratal lake, Lahaul-Spiti. */
  lake: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Chandra_Taal_%28Lake%29%2C_HP%2C_India%2C_D35_7265nx-01.jpg/960px-Chandra_Taal_%28Lake%29%2C_HP%2C_India%2C_D35_7265nx-01.jpg',

  /** Key Monastery — used where a temple/monastery image is wanted. */
  temple:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Kee_monastery_Spiti_Valley_%28edited%29.jpg/1280px-Kee_monastery_Spiti_Valley_%28edited%29.jpg',

  /** Mountain highway climbing towards Lahaul. */
  road: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Mountain_Road_towards_Lahaul_Valley%2C_Himachal_Pradesh.jpg/960px-Mountain_Road_towards_Lahaul_Valley%2C_Himachal_Pradesh.jpg',
} as const;

/**
 * Returns a photo URL.
 *
 * The width argument is accepted and ignored: callers pass a hint (e.g. 800 for
 * destination cards) but Commons cannot resize on demand, so every caller gets
 * the same pre-rendered file. Kept in the signature so call sites read the same
 * as before and can express intent if these ever move to a resizing CDN.
 */
export const img = (url: string, _w = 1200): string => url;
