import type { Plant } from "@/types";

/**
 * Flora entries.
 *
 * NOTE (Content Bible Rule 8): these are common warm-climate garden plants
 * used as candidates — Ambedkar Udyan is a small, well-kept BMC neighbourhood
 * garden (renovated 2024), so plants like these are plausible but **unverified**.
 * Confirm the species actually growing there — and each fact — on site before
 * field testing. The neem and mango pages carry photo stand-ins until then.
 */
export const plants: Plant[] = [
  {
    id: "neem",
    name: "Neem",
    scientificName: "Azadirachta indica",
    intro:
      "A familiar tree known for its distinctive leaves and many traditional uses.",
    facts: [
      "Can grow tall, with a wide, spreading crown.",
      "Small, fragrant white flowers.",
      "Produces small olive-like fruits.",
      "Common in warm climates.",
    ],
    importance:
      "Provides shade, cools the air and gives food and shelter to birds and insects.",
    lookFor:
      "Can you spot the shape of its leaves? They are pointed, slightly curved and arranged in pairs.",
    visual: "tree",
    accent: "#5e9e4e",
  },
  {
    id: "mango",
    name: "Mango",
    scientificName: "Mangifera indica",
    intro: "A beloved fruit tree that can grow very tall.",
    facts: [
      "Young leaves start reddish before turning green.",
      "Its fruit is enjoyed by people and animals alike.",
      "A single tree can live for decades.",
      "Its flowers are small but loved by pollinators.",
    ],
    importance:
      "Shade for hot days, fruit for people and animals, and a home for birds.",
    lookFor:
      "Can you find the long, pointed leaves — and maybe a young reddish one?",
    visual: "tree",
    accent: "#4c8a3c",
  },
  {
    id: "hibiscus",
    name: "Hibiscus",
    scientificName: "Hibiscus rosa-sinensis",
    intro: "Known for its big, bright flowers that seem to glow in the sun.",
    facts: [
      "Each flower usually opens for just a day.",
      "The flowers are a favourite stop for pollinators.",
      "It loves sunshine and warm weather.",
      "The long central pistil is easy to spot.",
    ],
    importance:
      "Its flowers feed bees and butterflies, and bring colour to the garden.",
    lookFor: "Spot the large open flower with the long central pistil.",
    visual: "flower",
    accent: "#f2a05c",
  },
  {
    id: "tulsi",
    name: "Tulsi",
    scientificName: "Ocimum tenuiflorum",
    intro: "A small, fragrant herb with rounded leaves.",
    facts: [
      "Its leaves have a strong, recognisable smell.",
      "Bees and other pollinators love its tiny flowers.",
      "Grown in gardens for generations.",
      "It grows happily in pots and garden beds.",
    ],
    importance:
      "An easy-to-find plant that attracts helpful pollinators to the garden.",
    lookFor: "Rub a leaf gently between your fingers — what can you smell?",
    visual: "herb",
    accent: "#5e9e4e",
  },
  {
    id: "bougainvillea",
    name: "Bougainvillea",
    scientificName: "Bougainvillea glabra",
    intro: "A climbing plant famous for its bursts of colour.",
    facts: [
      "The bright 'petals' are actually modified leaves called bracts.",
      "Its real flowers are small and white, hidden in the centre.",
      "It thrives in sunshine and warm climates.",
      "Its tangled branches make great shelter for small birds.",
    ],
    importance:
      "Provides shelter for small birds and insects among its branches.",
    lookFor:
      "Look closely at the colourful parts — they're leaves, not petals.",
    visual: "flower",
    accent: "#cf5f4e",
  },
];