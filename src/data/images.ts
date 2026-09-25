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
};

export const gardenWidePhoto: GardenPhoto = {
  src: "/images/garden-wide.jpg",
  alt: "A bright open view across the garden, sky above the trees",
  caption: "Open sky over the lawns — the garden's calm centre.",
  credit: mapsCredit("Google Maps contributor"),
  sourceUrl: mapsListingUrl,
};

export const gardenPathPhoto: GardenPhoto = {
  src: "/images/garden-path.jpg",
  alt: "Inside Ambedkar Udyan — greenery and shade",
  caption: "Inside the garden, under the trees.",
  credit: mapsCredit("Google Maps contributor"),
  sourceUrl: mapsListingUrl,
};

export const gardenPlayPhoto: GardenPhoto = {
  src: "/images/garden-play.jpg",
  alt: "Inside Ambedkar Udyan — play equipment and colourful corner",
  caption: "The play corner of the garden.",
  credit: mapsCredit("Google Maps contributor"),
  sourceUrl: mapsListingUrl,
};

export const gardenPanoPhoto: GardenPhoto = {
  src: "/images/garden-pano.jpg",
  alt: "A wide view across Ambedkar Udyan",
  caption: "The whole garden in one sweep.",
  credit: mapsCredit("Google Maps contributor"),
  sourceUrl: mapsListingUrl,
};

/** Gallery on /garden — real photos of the real garden. */
export const featurePhotos: GardenPhoto[] = [
  gardenWidePhoto,
  gardenPathPhoto,
  gardenPlayPhoto,
  gardenPanoPhoto,
];

/** Discovery pages that show a real photo (by topic id). */
export const topicPhotos: Record<string, GardenPhoto> = {
  slide: gardenPlayPhoto,
};

/** Trail page banners (by trail id) — real garden photos, reused where needed. */
export const trailPhotos: Record<string, GardenPhoto> = {
  "heritage-trail": gardenWidePhoto,
  "shade-trail": gardenPathPhoto,
  "garden-life-trail": gardenPanoPhoto,
  "play-trail": gardenPlayPhoto,
  "tree-trail": gardenPathPhoto,
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
};

/** Flora detail pages that have a photo to show (by plant id) — CC stand-ins. */
export const plantPhotos: Record<string, GardenPhoto> = {
  neem: neemPhoto,
  mango: mangoPhoto,
};

/**
 * One-line disclosure for the *species* photos only. Garden photos are of the
 * actual place and say so; these are not of this garden.
 */
export const photoCreditNote =
  "sample photos of the species, not this garden — species list still unverified";
