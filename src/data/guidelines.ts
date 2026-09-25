/**
 * Garden do's and don'ts.
 *
 * TODO: these are the generic, safe rules for a public garden. Replace each
 * group's items with what the garden's OWN posted signage says — a photo of the
 * board at the gate is enough. Nothing here is claimed to be this garden's
 * official rules, and no opening hours are stated anywhere in the app because
 * they are not confirmed yet (`src/data/garden.ts` → `hours`).
 */
import type { GuidelineGroup } from "@/types";

export const guidelines: GuidelineGroup[] = [
  {
    id: "respect-the-plants",
    title: "Respect the plants",
    summary: "The garden is alive. Look closely — and let everything keep growing.",
    dos: [
      { text: "Stay on the paths and the walking track", icon: "footprints" },
      { text: "Look closely without touching", icon: "eye" },
      { text: "Take as many photos as you like", icon: "camera" },
    ],
    donts: [
      { text: "Pluck flowers, leaves or fruit", icon: "flower" },
      { text: "Walk across the flower beds", icon: "leaf" },
      { text: "Break or bend branches", icon: "hand" },
    ],
  },
  {
    id: "keep-it-clean",
    title: "Keep it clean",
    summary: "A few seconds at the bin keeps the whole garden working.",
    dos: [
      { text: "Use the bins, or carry your waste out", icon: "trash" },
      { text: "Keep wrappers with you until you find a bin", icon: "hand" },
      { text: "Leave the grass and beds as you found them", icon: "leaf" },
    ],
    donts: [
      { text: "Drop wrappers, bottles or cups", icon: "trash" },
      { text: "Leave food behind for strays", icon: "droplets" },
      { text: "Spit, or stain the walls and paths", icon: "droplets" },
    ],
  },
  {
    id: "be-considerate",
    title: "Be considerate of others",
    summary: "This garden is shared — with walkers, children and people resting.",
    dos: [
      { text: "Keep music on headphones", icon: "volume" },
      { text: "Give way on the track", icon: "bike" },
      { text: "Keep an eye out for children and seniors", icon: "users" },
    ],
    donts: [
      { text: "Block the track with groups or vehicles", icon: "bike" },
      { text: "Let pets off the leash", icon: "paw" },
      { text: "Disturb people resting on the benches", icon: "users" },
    ],
  },
  {
    id: "use-qr-trails-well",
    title: "Use QR Trails well",
    summary: "The printed codes are part of the garden. Please help them last.",
    dos: [
      { text: "Scan from the side of the path", icon: "scan" },
      { text: "Take one discovery at a time", icon: "eye" },
      { text: "Walk a trail at your own pace", icon: "footprints" },
    ],
    donts: [
      { text: "Pull at or remove the printed codes", icon: "qr" },
      { text: "Scan while walking down the middle of the track", icon: "scan" },
      { text: "Write on, fold or tape over a code", icon: "qr" },
    ],
  },
];
