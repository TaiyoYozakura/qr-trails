import type { Trail } from "@/types";

/**
 * Trails, sized for a small municipal garden: short, walkable, 3-5 stops each.
 *
 * Every trail is data-only — nav, the home and explore pages, the admin QR sheet,
 * trail paths and progress bars all derive from this list, so adding a 4th trail
 * means editing this file plus `topics.ts` and `quizzes.ts` and nothing else.
 *
 * `tree-trail` is the original Content Bible flagship trail and keeps its id, so
 * any progress a visitor already saved against `leaves`/`trunk`/… still counts.
 */
export const trails: Trail[] = [
  {
    id: "heritage-trail",
    title: "Ambedkar Heritage Trail",
    category: "Heritage Trail",
    description:
      "Why this garden stands where it does, who it is named after, and the neighbourhood that grew up around it.",
    estimatedDuration: "~8 min",
    topicIds: ["statue", "namesake", "colony"],
  },
  {
    id: "shade-trail",
    title: "Tree & Shade Trail",
    category: "Nature Trail",
    description:
      "Meet two of the trees that shade this garden — and find out why shade is a public service in a crowded city.",
    estimatedDuration: "~8 min",
    topicIds: ["neem-tree", "mango-tree", "shade"],
  },
  {
    id: "garden-life-trail",
    title: "Garden Life Trail",
    category: "Garden Trail",
    description:
      "Flower beds, the walking track and the everyday habits that keep a shared garden alive.",
    estimatedDuration: "~8 min",
    topicIds: ["flower-beds", "walking-track", "keep-it-clean"],
  },
  {
    id: "play-trail",
    title: "Play Trail",
    category: "Play Trail",
    description:
      "The play area is a physics lab in disguise — slides, swings, slopes and spinning things, explained as you play.",
    estimatedDuration: "~10 min",
    topicIds: ["slide", "swing", "slope", "seesaw", "roundabout"],
  },
  {
    id: "tree-trail",
    title: "Inside a Tree Trail",
    altTitle: "The Tree Trail",
    category: "Nature Trail",
    description:
      "Find one big tree and walk from its leaves down to its roots and back out to everything living around it.",
    estimatedDuration: "~10 min",
    topicIds: ["leaves", "trunk", "roots", "water", "ecosystem"],
  },
];
