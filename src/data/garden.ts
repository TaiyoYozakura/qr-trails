/**
 * Garden-level information.
 *
 * Confirmed 2026-09 from the garden's public Google Maps listing (hours,
 * rating) and its visitor reviews (2024 renovation, central Ambedkar statue,
 * children's play area, walking/exercise use). Everything a visitor would read
 * as fact must still be checked against the garden's own boards before field
 * testing — unconfirmed fields stay `null` so the UI omits the row.
 *
 * Still needed on site:
 *  - entry rules as posted at the gate                → `entryNote`
 *  - the garden's own signage and do's/don'ts board   → `src/data/guidelines.ts`
 *  - the species actually growing here                → `src/data/flora.ts`
 *  - the exact play equipment installed               → `src/data/play-and-fitness.ts`
 *  - the garden's own photos                          → `src/data/images.ts`
 */
export const garden = {
  name: "Bharatratna Dr. Babasaheb Ambedkar Udyan",
  shortName: "Ambedkar Udyan",
  /** Marathi/Hindi: "udyan" = garden. */
  type: "Municipal neighbourhood garden",
  managedBy: "Brihanmumbai Municipal Corporation (BMC)",
  tagline: "Welcome to the classroom.",
  intro:
    "Look around. Your next lesson might be growing right beside you — in the shade of a neem tree, along the walking track, or in the flower beds by the gate.",
  location: {
    area: "Government Colony, Bandra East",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400051",
    plusCode: "3R6X+5PV",
  },
  /** Hours as listed on the garden's Google Maps listing (all seven days). */
  hours: "Open daily · 4–8 pm" as string | null,
  entryNote: null as string | null,
};

/** What a visitor will actually find in the garden (Maps-listing evidence). */
export interface GardenHighlight {
  title: string;
  text: string;
}

export const gardenHighlights: GardenHighlight[] = [
  {
    title: "Fresh from a 2024 makeover",
    text: "The garden was renovated in 2024 with new landscaping and play equipment.",
  },
  {
    title: "A statue at the centre",
    text: "A statue of Bharat Ratna Dr. Babasaheb Ambedkar stands at the heart of the garden.",
  },
  {
    title: "A play corner for children",
    text: "Slides, rides and a small climbing wall for young visitors.",
  },
  {
    title: "Room to move",
    text: "A walking track and open space — the neighbourhood's spot for walks, jogs, yoga and exercise.",
  },
];

/** Single-line address, e.g. for the garden page and metadata. */
export const gardenAddress = [
  garden.location.area,
  garden.location.city,
  garden.location.postalCode,
].join(", ");

/** A plain Google Maps search link — no API key, no tracking script. */
export const gardenMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${garden.name}, ${garden.location.area}, ${garden.location.city}`,
)}`;
