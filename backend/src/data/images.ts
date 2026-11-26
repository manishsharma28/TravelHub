/**
 * Photo URLs shared by the seed data files.
 *
 * Every photo is of a place the trip actually visits, viewed and checked
 * against its subject before it was added. Where Wikimedia Commons has rated
 * photos of a place, the pick is one of them — Featured (FP), Quality (QI) or
 * Valued (VI) — noted per entry. Photos with watermarks are left out.
 *
 * Each URL is a specific pre-rendered Commons thumbnail. Commons only serves
 * widths that have already been rendered for a given file (a request for an
 * arbitrary width returns HTTP 400), so the width is fixed per photo here
 * rather than passed in by callers.
 */

const commons = (path: string) => `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}`;

export const PHOTO = {
  // Shimla & Manali
  /** Solang Valley under snow, above Manali. QI */
  solang: commons('2/2c/Solang_valley_under_snow%2C_2015.jpg/1280px-Solang_valley_under_snow%2C_2015.jpg'),
  /** The Ridge and Christ Church, Shimla. */
  shimlaRidge: commons('d/df/The_Ridge%2C_shimla_01.JPG/1280px-The_Ridge%2C_shimla_01.JPG'),
  /** The Kullu valley and the snow line just outside Manali. */
  manali: commons(
    '8/80/Kullu_Valley_near_Manali%2C_Himachal_Pradesh%2C_India.jpg/1280px-Kullu_Valley_near_Manali%2C_Himachal_Pradesh%2C_India.jpg',
  ),

  // Amritsar, Dalhousie & Dharamshala
  /** Harmandir Sahib (the Golden Temple) across the sarovar, Amritsar. FP QI VI */
  amritsar: commons('4/4d/Hamandir_Sahib_%28Golden_Temple%29.jpg/1280px-Hamandir_Sahib_%28Golden_Temple%29.jpg'),
  /** The Khajjiar meadow and lake, near Dalhousie. */
  khajjiar: commons('3/36/Khajjiar_lake.jpg/1280px-Khajjiar_lake.jpg'),
  /** Alpenglow on the Dhauladhar range above Dharamshala. */
  dharamshala: commons(
    '5/5f/Dhauladhar_alpenglow_above_Dharamshala%2C_India.jpg/1280px-Dhauladhar_alpenglow_above_Dharamshala%2C_India.jpg',
  ),

  // Winter Spiti (via Kinnaur)
  /** Key Monastery in winter snow, Spiti. FP QI */
  spiti: commons('f/f5/Kee_monastery_Spiti_Valley_%28edited%29.jpg/1280px-Kee_monastery_Spiti_Valley_%28edited%29.jpg'),
  /** Dhankar Gompa on its cliff above the Spiti river. QI */
  dhankar: commons('b/b2/Dhankar_Gompa%2C_Spiti.jpg/1280px-Dhankar_Gompa%2C_Spiti.jpg'),
  /** The Buddha statue above Langza village, Spiti. */
  langzaBuddha: commons(
    'b/b3/Buddha_Statue_at_Langza_village_Spiti_valley.jpg/1280px-Buddha_Statue_at_Langza_village_Spiti_valley.jpg',
  ),
  /** Chau Chau Kang Nilda under snow, seen from Langza. */
  langzaPeak: commons(
    '8/83/Chau_Chau_Kang_Nilda_Peak_from_Langza%2C_Spiti_Valley.jpg/1280px-Chau_Chau_Kang_Nilda_Peak_from_Langza%2C_Spiti_Valley.jpg',
  ),
  /** The Kinner Kailash range at dawn, from Kalpa. QI */
  kinnerKailash: commons(
    'd/db/Kinner_Kailash_Mountain_Range_%28edited%29.jpg/1280px-Kinner_Kailash_Mountain_Range_%28edited%29.jpg',
  ),

  // Kashmir
  /** Houseboats on Dal Lake, Srinagar. */
  kashmir: commons(
    '1/17/Dal_Lake%2C_Srinagar%2C_Jammu_and_Kashmir.jpg/1280px-Dal_Lake%2C_Srinagar%2C_Jammu_and_Kashmir.jpg',
  ),
  /** The Gulmarg gondola over the snowfields. QI */
  gulmarg: commons('9/96/Gulmarg_Gondola%2C_Cable_Car.JPG/1280px-Gulmarg_Gondola%2C_Cable_Car.JPG'),
  /** The Lidder valley at Pahalgam. FP QI */
  pahalgam: commons('f/f6/Pahalgam_Valley.jpg/1280px-Pahalgam_Valley.jpg'),

  // Bhutan
  /** Paro Taktsang (Tiger's Nest) on its cliff. FP */
  bhutan: commons('a/a6/Paro_Taktsang%2C_Bhutan_%28edited%29.jpg/1280px-Paro_Taktsang%2C_Bhutan_%28edited%29.jpg'),
  /** Punakha Dzong beside the river. QI */
  punakha: commons('d/dc/Punakha_Dzong%2C_Bhutan_01.jpg/1280px-Punakha_Dzong%2C_Bhutan_01.jpg'),
  /** The 108 Druk Wangyal chortens on the Dochula pass. QI */
  dochula: commons('6/67/Druk_Wangyal_Chortens%2C_Bhutan_02.jpg/1280px-Druk_Wangyal_Chortens%2C_Bhutan_02.jpg'),

  // Nepal
  /** Boudhanath stupa, Kathmandu. QI */
  kathmandu: commons('e/e0/Boudhanath_stupa%2C_Kathmandu_01.jpg/1280px-Boudhanath_stupa%2C_Kathmandu_01.jpg'),
  /** Swayambhunath stupa above Kathmandu. FP QI */
  swayambhu: commons(
    '4/41/Swayambhunath_temple_-_an_ancient_religious_architecture_of_Nepal.jpg/1280px-Swayambhunath_temple_-_an_ancient_religious_architecture_of_Nepal.jpg',
  ),
  /** Patan Durbar Square. QI */
  patan: commons('1/15/Panoramic_view_of_Patan_Durbar_Square.jpg/1280px-Panoramic_view_of_Patan_Durbar_Square.jpg'),
  /** Lo Manthang, the walled city of Upper Mustang, from above. */
  mustang: commons('1/1a/The_Walled_City_of_Lo_Manthang.jpg/1280px-The_Walled_City_of_Lo_Manthang.jpg'),
  /** Jharkot village below Muktinath, Mustang. FP QI */
  jharkot: commons('1/17/Jharkot_Village-Upper_Mustang_Trek-1281.jpg/1280px-Jharkot_Village-Upper_Mustang_Trek-1281.jpg'),
  /** Kagbeni on the Kali Gandaki, Mustang. FP QI */
  kagbeni: commons('6/6f/Kagbeni_Mustang-WLV-0741.jpg/1280px-Kagbeni_Mustang-WLV-0741.jpg'),

  // Goa
  /** Mandrem beach and river, North Goa. FP QI */
  goa: commons(
    '7/7a/Mandrem_Beach_and_Mandrem_River%2C_Mandrem%2C_Goa%2C_India_%28edit%29.jpg/1280px-Mandrem_Beach_and_Mandrem_River%2C_Mandrem%2C_Goa%2C_India_%28edit%29.jpg',
  ),
  /** The sea walls of Fort Aguada (Sinquerim) on the shore. QI */
  aguada: commons('e/e5/Sinquerim_Fort_Sunset_point.jpg/1280px-Sinquerim_Fort_Sunset_point.jpg'),
  /** Front of the Basilica of Bom Jesus, Old Goa. QI VI */
  basilica: commons(
    '9/9e/Front_Elevation_of_Basilica_of_Bom_Jesus.jpg/1280px-Front_Elevation_of_Basilica_of_Bom_Jesus.jpg',
  ),

  // Zanskar
  /** Gonbo Rangjon on the Shinku La road into Zanskar. FP QI */
  gonboRangjon: commons(
    '3/39/Gonbo_Rangjon_Shinko_La_Zanskar_Jun24_A7CR_00332.jpg/1280px-Gonbo_Rangjon_Shinko_La_Zanskar_Jun24_A7CR_00332.jpg',
  ),
  /** Barley fields along the Zanskar river at Zangla. FP QI VI */
  zangla: commons(
    'f/fb/Fields_Zangla_Zanskar_River_Ladakh_Jun24_A7CR_00981.jpg/1280px-Fields_Zangla_Zanskar_River_Ladakh_Jun24_A7CR_00981.jpg',
  ),
  /** Padum and the Zanskar valley seen from Karsha. FP QI */
  zanskar: commons(
    '7/7d/Padum_Zanskar_View_From_Karsha_Oct22_A7C_03984.jpg/1280px-Padum_Zanskar_View_From_Karsha_Oct22_A7C_03984.jpg',
  ),

  // Jibhi, Kasol & Shangarh
  /** Jibhi waterfall in the village, Tirthan valley. */
  jibhiWaterfall: commons('2/25/Jibhi_Waterfall%2C_Jibhi%2C_Himachal_Pradesh.jpg/1280px-Jibhi_Waterfall%2C_Jibhi%2C_Himachal_Pradesh.jpg'),
  /** Sarosar lake and its temple above Jibhi. */
  jibhiSarosar: commons('c/cf/Jibhi_Sarosar_lake_and_temple_01.jpg/1280px-Jibhi_Sarosar_lake_and_temple_01.jpg'),
  /** Traditional houses on Jibhi hill. */
  jibhiHouses: commons('1/1e/Traditional_Houses_on_Jibhi_Hill.jpg/1280px-Traditional_Houses_on_Jibhi_Hill.jpg'),
  /** The gate to the Jibhi waterfall. */
  jibhiWaterfallGate: commons('6/68/Jibhi_Waterfall_Gate.jpg/1280px-Jibhi_Waterfall_Gate.jpg'),
  /** The bridge at Jibhi. */
  jibhiBridge: commons('5/55/Jibhi_Bridge.jpg/1280px-Jibhi_Bridge.jpg'),
  /** The Parvati valley above Kasol. */
  kasolParvati: commons('1/19/Kasol-parvati_valley%2C_himachal_pradesh.jpg/1280px-Kasol-parvati_valley%2C_himachal_pradesh.jpg'),
  /** Kasol valley. */
  kasolValley: commons('c/c5/Kasol_Valley.jpg/1280px-Kasol_Valley.jpg'),
  /** The holy meadow of Shangarh, Sainj valley. */
  shangarhMeadow: commons('7/7c/The_Holy_Meadow_of_Shangarh%2C_Sainj_Valley.jpg/1280px-The_Holy_Meadow_of_Shangarh%2C_Sainj_Valley.jpg'),
  /** Shanghchul Mahadev temple, Shangarh. */
  shanghchulMahadev: commons(
    'b/bf/0042223_Shanghchul_Mahadev_temple%2C_Shangarh_Himachal_Pradesh_010.jpg/1280px-0042223_Shanghchul_Mahadev_temple%2C_Shangarh_Himachal_Pradesh_010.jpg',
  ),

  // Bir Billing & Barot
  /** Paraglider over the takeoff at Bir-Billing. */
  paraglidingBir: commons(
    '3/3a/Paragliding_in_Bir-Billing_%2815274%29.jpg/1280px-Paragliding_in_Bir-Billing_%2815274%29.jpg',
  ),
  /** The Barot valley. */
  barotValley: commons('a/aa/View_of_Barot_valley_01.jpg/1280px-View_of_Barot_valley_01.jpg'),
  /** The Uhl river, downstream from Barot. */
  uhlDownstream: commons(
    '3/3e/Downstream_Uhl_Barot_Himachal_Oct20_D72_18713.jpg/1280px-Downstream_Uhl_Barot_Himachal_Oct20_D72_18713.jpg',
  ),
  /** The Uhl river at Barot. */
  uhlRiver: commons('8/88/Uhl_River_at_Barot_Oct_2017_D72_2280.jpg/1280px-Uhl_River_at_Barot_Oct_2017_D72_2280.jpg'),
  /** Green meadows in the Barot valley. */
  greenValley: commons('6/61/Green_valley_04.jpg/1280px-Green_valley_04.jpg'),
  /** The Barot and Uhl rivulet. */
  barotRivulet: commons('8/8f/Barot_and_%C3%9Chl_Rivulet.jpg/1280px-Barot_and_%C3%9Chl_Rivulet.jpg'),

  // Summer & premium Spiti
  /** Chandratal, the moon lake in Spiti. */
  chanderTal: commons('b/b3/Chander_Tal%2C_Spiti%2C_Himachal_Pradesh.jpg/1280px-Chander_Tal%2C_Spiti%2C_Himachal_Pradesh.jpg'),
  /** Kibber village, Spiti valley. */
  kibberVillage: commons(
    '1/1a/Kibber_village%2C_Spiti_valley%2C_Himachal_Pradesh.JPG/1280px-Kibber_village%2C_Spiti_valley%2C_Himachal_Pradesh.JPG',
  ),
  /** The Spiti river and valley. */
  spitiRiverValley: commons('d/dc/View_of_Spiti_river_and_valley.jpg/1280px-View_of_Spiti_river_and_valley.jpg'),
  /** The climb to Kunzum La, Lahaul & Spiti. */
  kunzumLa: commons(
    '2/27/Kunzum_La-18-ascending_from_Spiti-buddhist_shrine-gje.jpg/1280px-Kunzum_La-18-ascending_from_Spiti-buddhist_shrine-gje.jpg',
  ),
  /** The Losar–Kunzum road in Spiti. */
  losarKunzumRoad: commons('2/29/Losar-Kunzum_Road_Jun18_D72_7836.jpg/1280px-Losar-Kunzum_Road_Jun18_D72_7836.jpg'),
  /** Kunzum Pass between Lahaul and Spiti. */
  kunzumPass: commons(
    '4/46/Kunzum_Pass_between_Lahaul_%26_Spiti_28-6-04.jpg/1280px-Kunzum_Pass_between_Lahaul_%26_Spiti_28-6-04.jpg',
  ),

  // Spiti bike tour
  /** Road through the Spiti valley. */
  roadTripSpiti: commons('8/84/Road_Trip_To_Spiti.jpg/1280px-Road_Trip_To_Spiti.jpg'),
  /** Kibber, a village in Spiti. */
  kibberHamlet: commons('f/f5/Kibber_-_a_villege_in_spiti.jpg/1280px-Kibber_-_a_villege_in_spiti.jpg'),
  /** Women hoeing barley in Chicham, Spiti. */
  barleyChicham: commons(
    'a/af/Women_Hoeing_Barley_Chicham_Spiti_Jun18_D72_7456.jpg/1280px-Women_Hoeing_Barley_Chicham_Spiti_Jun18_D72_7456.jpg',
  ),

  // Kinnaur
  /** The Baspa valley at Sangla. */
  baspaSangla: commons(
    'a/ad/Baspa_Valley_at_Sangla%2C_Himachal_Pradesh%2C_India.jpg/1280px-Baspa_Valley_at_Sangla%2C_Himachal_Pradesh%2C_India.jpg',
  ),
  /** A traditional Kinnauri house in Sangla. */
  kinnauriHouse: commons(
    'd/d2/Traditional_Kinnauri_house%2C_Sangla%2C_Himachal_Pradesh%2C_India.jpg/1280px-Traditional_Kinnauri_house%2C_Sangla%2C_Himachal_Pradesh%2C_India.jpg',
  ),
  /** Snow-covered morning in Sangla. */
  snowyMorningSangla: commons(
    'c/c3/Snowy_morning_in_Sangla%2C_Himachal_Pradesh%2C_India.jpg/1280px-Snowy_morning_in_Sangla%2C_Himachal_Pradesh%2C_India.jpg',
  ),

  // Shimla & Manali (3N4D)
  /** The Mall Road, Shimla. */
  mallRoad: commons('4/42/Mall_Road%2C_Shimla_2.jpg/1280px-Mall_Road%2C_Shimla_2.jpg'),
  /** Shimla from above the town. */
  cityscapeShimla: commons('d/d3/Cityscape_of_Shimla.jpg/1280px-Cityscape_of_Shimla.jpg'),
  /** Dorje Drak monastery, Panthaghati, Shimla. */
  dorjeDrak: commons(
    '0/0a/Dorje_Drak_Monastery%2C_Panthaghati%2C_Shimla%2C_Himachal_Pradesh.jpg/1280px-Dorje_Drak_Monastery%2C_Panthaghati%2C_Shimla%2C_Himachal_Pradesh.jpg',
  ),
  /** Hadimba temple, Manali. */
  hadimbaTemple: commons('8/82/Hadimba_Temple_in_Manali.jpg/1280px-Hadimba_Temple_in_Manali.jpg'),
  /** Hidimba Devi temple, Dhungri, Manali. */
  hidimbaDhungri: commons('3/37/Hidimba_Devi_Temple%2C_Dhungri_Manali.jpg/1280px-Hidimba_Devi_Temple%2C_Dhungri_Manali.jpg'),
  /** Rohtang Pass seen from Manali. */
  rohtangFromManali: commons(
    '2/2f/Rohtang_Pass_from_Manali_vrtmrgmpksk_%281237%29.jpg/1280px-Rohtang_Pass_from_Manali_vrtmrgmpksk_%281237%29.jpg',
  ),
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
