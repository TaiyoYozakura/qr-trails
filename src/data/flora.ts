import type { Plant } from "@/types";

/**
 * Flora entries.
 *
 * NOTE (Content Bible Rule 8): the species list is still **unverified** —
 * these five are the plants a small, well-kept BMC neighbourhood garden in
 * Mumbai like Ambedkar Udyan (renovated 2024) is most likely to grow, and
 * each entry says where you would expect to find it in THIS garden. Confirm
 * the species actually growing there — and each fact — on site before field
 * testing. The photos are badged stand-ins from Wikimedia Commons until the
 * team's own shots exist.
 */
export const plants: Plant[] = [
  {
    id: "neem",
    name: "Neem",
    scientificName: "Azadirachta indica",
    intro:
      "A everyday hero of Mumbai's gardens — the kind of shade tree BMC gardeners plant for the long haul.",
    facts: [
      "Grows into a broad, umbrella-shaped crown of shade.",
      "Small, fragrant white flowers loved by bees.",
      "Produces small olive-like fruits that birds relish.",
      "Its leaves and bark have been used in home remedies for centuries.",
    ],
    importance:
      "One neem can cool the air around it for metres — free shade for walkers and a whole food chain for birds and insects.",
    lookFor:
      "If a tall, spreading tree shades the walking track, check its leaves: pointed, slightly curved, and arranged in pairs.",
    visual: "tree",
    accent: "#5e9e4e",
  },
  {
    id: "mango",
    name: "Mango",
    scientificName: "Mangifera indica",
    intro:
      "The summer favourite — a single mango tree turns a corner of a garden into the coolest seat in Mumbai.",
    facts: [
      "Young leaves start reddish before turning deep green.",
      "Its fruit is enjoyed by people — and by birds and bats.",
      "A single tree can live and fruit for decades.",
      "Its tiny flowers swarm with pollinators in spring.",
    ],
    importance:
      "Shade for hot afternoons, fruit for everyone, and a living connection between the garden and the neighbourhood's kitchens.",
    lookFor:
      "Find the long, pointed leaves — and in late summer, look up: can you spot any mangoes hanging under the canopy?",
    visual: "tree",
    accent: "#4c8a3c",
  },
  {
    id: "hibiscus",
    name: "Hibiscus",
    scientificName: "Hibiscus rosa-sinensis",
    intro:
      "The flower beds of BMC gardens almost always hide a hibiscus — big, bright blooms that seem to glow at eye level.",
    facts: [
      "Each flower usually opens for just a single day.",
      "Sunbirds and butterflies visit it for nectar.",
      "It loves the sun and warm coastal weather.",
      "The long central pistil sticks out like a little flag.",
    ],
    importance:
      "A day-long refuelling station for pollinators — and a burst of colour by the path.",
    lookFor:
      "Near the flower beds, spot the large open flower with the long pistil reaching out of the middle.",
    visual: "flower",
    accent: "#f2a05c",
  },
  {
    id: "tulsi",
    name: "Tulsi",
    scientificName: "Ocimum tenuiflorum",
    intro:
      "A small herb with a big place in Mumbai's heart — often grown in pots and planters near garden entrances.",
    facts: [
      "Its leaves have a strong, clove-like scent.",
      "Bees love its spikes of tiny purple flowers.",
      "Grown in Indian homes and gardens for generations.",
      "It grows happily in pots, beds and planters.",
    ],
    importance:
      "An easy-to-find plant that brings pollinators in close — and a herb many visitors know from home.",
    lookFor:
      "Check the planters near the gate. Rub a leaf gently between your fingers — what can you smell?",
    visual: "herb",
    accent: "#5e9e4e",
  },
  {
    id: "bougainvillea",
    name: "Bougainvillea",
    scientificName: "Bougainvillea glabra",
    intro:
      "The colour on Mumbai's fences — bougainvillea scrambles over gates and walls in bursts of pink and magenta.",
    facts: [
      "The bright 'petals' are actually modified leaves called bracts.",
      "Its real flowers are small and white, hidden in the centre.",
      "It thrives in full sun and shrugs off dry spells.",
      "Its tangled branches give small birds a safe hideout.",
    ],
    importance:
      "Living fencing: it dresses up the garden's edges while sheltering birds and insects among the thorns.",
    lookFor:
      "Look along the garden's fence line for the colour — then look closer: the petals are leaves, not petals.",
    visual: "flower",
    accent: "#cf5f4e",
  },
];