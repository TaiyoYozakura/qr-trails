/**
 * Photography for the site.
 *
 * TWO kinds of photos live here, and they must stay clearly separated:
 *
 * 1. GARDEN PHOTOS — the actual Bharatratna Dr. Babasaheb Ambedkar Udyan,
 *    sourced from the garden's Google Maps listing (community-contributed,
 *    © their respective photographers, used here as an educational,
 *    non-commercial civic project with credit). Swap in the team's own
 *    photos when they exist and remove these entries.
 *
 * 2. SPECIES / DETAIL PHOTOS — freely-licensed Wikimedia Commons pictures of
 *    the plants and equipment the garden is *expected* to contain. They are
 *    stand-ins (the species list itself is still unverified — see flora.ts).
 *
 * Every photo must carry its `credit` line; the UI renders it next to the
 * image. Garden photos additionally link back to the Maps listing.
 */

export interface GardenPhoto {
  /** Path under `public/`, e.g. "/images/garden-hero.jpg". */
  src: string;
  alt: string;
  caption: string;
  /** Attribution line rendered beside the photo. */
  credit: string;
  /** Where the photo came from (Maps listing, Commons page…). */
  sourceUrl: string;
  /** True when the photo is NOT of this garden (CC species stand-ins). */
  standIn?: boolean;
  /** CSS object-position used when the photo is cropped, so wide banners
   *  keep the garden in frame instead of drifting into sky/gates. */
  focus?: string;
}

/* ------------------------------------------------------------------ */
/* 1. The actual garden — photos from its Google Maps listing          */
/* ------------------------------------------------------------------ */

const mapsListingUrl =
  "https://www.google.com/maps/place/Dr+Babasaheb+Ambedkar+Garden/@19.0604916,72.8493048,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c91f99fbe927:0xe85e5f2facbb237d!8m2!3d19.0604916!4d72.8493048!16s%2Fg%2F11f0vsnywp";

const mapsCredit = (photographer: string) =>
  `Photo: ${photographer} · via Google Maps (© the photographer)`;

/** /garden hero — the garden itself, from its Maps listing. */
export const heroPhoto: GardenPhoto = {
  src: "/images/garden-hero.jpg",
  alt: "Bharatratna Dr. Babasaheb Ambedkar Udyan — lawns, beds and the walking track",
  caption:
    "The real thing: Ambedkar Udyan (May 2023 — the garden got a makeover in 2024).",
  credit: mapsCredit("Saurav Yadav, Jun 2023"),
  sourceUrl: mapsListingUrl,
  focus: "50% 72%",
};

export const gardenWidePhoto: GardenPhoto = {
  src: "/images/garden-wide.jpg",
  alt: "Lawns and tree shade in Ambedkar Udyan on a bright day",
  caption: "Tree shade over the lawns — the garden's calm centre.",
  credit: mapsCredit("Suputra Koli, Apr 2023"),
  sourceUrl: mapsListingUrl,
  focus: "50% 68%",
};

/** The garden's namesake: the Dr. Babasaheb Ambedkar statue at its heart. */
export const gardenStatuePhoto: GardenPhoto = {
  src: "/images/garden-statue.jpg",
  alt: "The statue of Dr. Babasaheb Ambedkar at the centre of Ambedkar Udyan",
  caption: "The garden's namesake — Dr. Babasaheb Ambedkar, at the heart of the udyan.",
  credit: mapsCredit("Suputra Koli, May 2023"),
  sourceUrl: mapsListingUrl,
  focus: "50% 58%",
};

/** Post-renovation (Dec 2024) shot of the play corner's equipment. */
export const gardenPlaygroundPhoto: GardenPhoto = {
  src: "/images/garden-playground.jpg",
  alt: "Colourful play equipment in Ambedkar Udyan's play corner",
  caption: "The play corner after the 2024 makeover — bright, new equipment.",
  credit: mapsCredit("Google Maps contributor, Dec 2024"),
  sourceUrl: mapsListingUrl,
  focus: "50% 55%",
};

/** Post-renovation (Jan 2025) close-up of the play equipment. */
export const gardenPlayEquipmentPhoto: GardenPhoto = {
  src: "/images/garden-play-equipment.jpg",
  alt: "Close-up of red and orange play equipment at Ambedkar Udyan",
  caption: "Up close in the play corner — the equipment the Play Trail explores.",
  credit: mapsCredit("Google Maps contributor, Jan 2025"),
  sourceUrl: mapsListingUrl,
  focus: "50% 55%",
};

export const gardenPlayPhoto: GardenPhoto = {
  src: "/images/garden-play.jpg",
  alt: "The play corner under the trees in Ambedkar Udyan",
  caption: "The play corner of the garden.",
  credit: mapsCredit("Rambler_Vinay, Jan 2025"),
  sourceUrl: mapsListingUrl,
  focus: "50% 52%",
};

export const gardenPanoPhoto: GardenPhoto = {
  src: "/images/garden-pano.jpg",
  alt: "A wide view across Ambedkar Udyan",
  caption: "The whole garden in one sweep.",
  credit: mapsCredit("Balraju Anna, Feb 2022"),
  sourceUrl: mapsListingUrl,
  focus: "50% 78%",
};

/** Gallery on /garden — real photos of the real garden. */
export const featurePhotos: GardenPhoto[] = [
  gardenStatuePhoto,
  gardenWidePhoto,
  gardenPlaygroundPhoto,
  gardenPanoPhoto,
];

/** Discovery pages that show a real photo (by topic id). Garden photos are
 * defined above; species stand-ins are appended after their declarations. */
export const topicPhotos: Record<string, GardenPhoto> = {
  slide: gardenPlayEquipmentPhoto,
  statue: gardenStatuePhoto,
};

/** Trail page banners (by trail id) — real garden photos, cropped to the
 *  garden (not the sky) via each photo's `focus` point. */
export const trailPhotos: Record<string, GardenPhoto> = {
  "heritage-trail": gardenStatuePhoto,
  "shade-trail": gardenWidePhoto,
  "garden-life-trail": gardenPanoPhoto,
  "play-trail": gardenPlaygroundPhoto,
  "tree-trail": gardenPlayPhoto,
};

/* ------------------------------------------------------------------ */
/* 2. Species / detail stand-ins — Wikimedia Commons, CC BY / BY-SA    */
/* ------------------------------------------------------------------ */

export const neemPhoto: GardenPhoto = {
  src: "/images/neem-tree.jpg",
  alt: "A mature neem tree with a wide, spreading crown",
  caption: "A neem like the one on the Shade Trail.",
  credit: "Photo: Challiyan · CC BY-SA 2.5 · Wikimedia Commons",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:%E0%B4%86%E0%B4%B0%E0%B5%8D%E0%B4%AF%E0%B4%B5%E0%B5%87%E0%B4%AA%E0%B5%8D%E0%B4%AA%E0%B5%8D.jpg",
  standIn: true,
};

export const mangoPhoto: GardenPhoto = {
  src: "/images/mango-tree.jpg",
  alt: "A mango tree with a thick trunk and leafy crown in a park",
  caption: "A mango tree in full leaf.",
  credit: "Photo: Atamari · CC BY-SA 3.0 · Wikimedia Commons",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:Mangifera_indica_0005.jpg",
  standIn: true,
  focus: "50% 55%",
};

export const hibiscusPhoto: GardenPhoto = {
  src: "/images/hibiscus.jpg",
  alt: "A bright red hibiscus flower in full bloom",
  caption: "A hibiscus in bloom — spot the long central pistil.",
  credit: "Photo: Vengolis · CC BY-SA 4.0 · Wikimedia Commons",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Hibiscus_rosa-sinensis_9068.jpg",
  standIn: true,
  focus: "50% 50%",
};

export const tulsiPhoto: GardenPhoto = {
  src: "/images/tulsi.jpg",
  alt: "A tulsi plant with dense green leaves and flower spikes",
  caption: "Tulsi, the fragrant herb, in leaf.",
  credit: "Photo: Joydeep (JDP90) · CC BY-SA 3.0 · Wikimedia Commons",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Ocimum_tenuiflorum_24_08_2012.JPG",
  standIn: true,
  focus: "50% 50%",
};

export const bougainvilleaPhoto: GardenPhoto = {
  src: "/images/bougainvillea.jpg",
  alt: "Pink bougainvillea bracts in full colour",
  caption: "Bougainvillea bracts — the 'petals' are actually leaves.",
  credit: "Photo: Bim24 · CC0 · Wikimedia Commons",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Bougainvillea_or_Bombil_(_in_Cebuano)_10.jpg",
  standIn: true,
  focus: "50% 50%",
};

/** Flora detail pages that have a photo to show (by plant id) — CC stand-ins. */
export const plantPhotos: Record<string, GardenPhoto> = {
  neem: neemPhoto,
  mango: mangoPhoto,
  hibiscus: hibiscusPhoto,
  tulsi: tulsiPhoto,
  bougainvillea: bougainvilleaPhoto,
};

/** Discovery pages that reference a species stand-in (by topic id). */
topicPhotos["neem-tree"] = neemPhoto;

/**
 * One-line disclosure for the *species* photos only. Garden photos are of the
 * actual place and say so; these are not of this garden.
 */
export const photoCreditNote =
  "sample photos of the species, not this garden — species list still unverified";

/** CC stand-in for the not-yet-confirmed outdoor gym equipment. */
export const outdoorGymPhoto: GardenPhoto = {
  src: "/images/outdoor-gym.jpg",
  alt: "Outdoor gym equipment in a public park",
  caption:
    "What BMC outdoor gyms usually look like — the garden's own equipment is still to be confirmed on site.",
  credit: "Photo: Rodhullandemu · CC BY-SA 4.0 · Wikimedia Commons",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:Outdoor_gym_at_Copy_Farm_Park.jpg",
  standIn: true,
};
