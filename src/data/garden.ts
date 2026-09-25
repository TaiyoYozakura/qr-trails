/**
 * Garden-level information.
 *
 * Confirmed 2026-09: name, type, location. Everything a visitor would read as
 * fact must be verified before field testing — fields that are still unconfirmed
 * stay `null` so the UI simply omits that row instead of printing a guess.
 *
 * Still needed on site:
 *  - hours / entry rules as posted at the gate        → `hours`, `entryNote`
 *  - the garden's own signage and do's/don'ts board   → `src/data/guidelines.ts`
 *  - the species actually growing here                → `src/data/flora.ts`
 *  - whether a statue / memorial exists, and its year → "statue" discovery
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
  /** Unconfirmed — hide until read off the board at the gate. */
  hours: null as string | null,
  entryNote: null as string | null,
};

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
