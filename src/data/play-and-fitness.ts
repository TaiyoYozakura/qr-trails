/**
 * Play & fitness facilities at Ambedkar Udyan.
 *
 * Evidence levels matter here: items marked "reported" come from the garden's
 * public Google Maps reviews (2024 renovation, slides, the small climbing
 * wall, walking/jogging/yoga use). Items marked "to-confirm" were reported
 * generically ("many new rides") or are inherited from the Play Trail's own
 * TODO list — confirm them on site before printing anything.
 */

export type FacilityEvidence =
  /** Seen in the garden's public Maps reviews — still verify on site. */
  | "reported"
  /** Guessed or generic — must be confirmed on site before display/print. */
  | "to-confirm";

export interface Facility {
  id: string;
  name: string;
  zone: "play" | "fitness" | "movement";
  who: string;
  text: string;
  evidence: FacilityEvidence;
}

export const facilities: Facility[] = [
  {
    id: "slides",
    name: "Slides",
    zone: "play",
    who: "Young children",
    text: "The play corner's centrepiece — reviewers call them out by name, and the Play Trail starts here.",
    evidence: "reported",
  },
  {
    id: "climbing-wall",
    name: "Small climbing wall",
    zone: "play",
    who: "Children under 5",
    text: "A low bouldering-style wall added in the 2024 renovation, sized for little climbers.",
    evidence: "reported",
  },
  {
    id: "swings",
    name: "Swings & rides",
    zone: "play",
    who: "Young children",
    text: "Reviews mention \"many new rides\" after the renovation — count and types need on-site confirmation.",
    evidence: "to-confirm",
  },
  {
    id: "seesaw-roundabout",
    name: "See-saw & merry-go-round",
    zone: "play",
    who: "Young children",
    text: "Classic playground equipment the Play Trail explains — confirm what is actually installed.",
    evidence: "to-confirm",
  },
  {
    id: "walking-track",
    name: "Walking track",
    zone: "movement",
    who: "Everyone",
    text: "The garden's everyday lifeline — morning walkers and evening joggers loop it while the kids play.",
    evidence: "reported",
  },
  {
    id: "open-workout-space",
    name: "Open exercise space",
    zone: "fitness",
    who: "Adults & seniors",
    text: "Reviewers come for yoga and group exercise — a flat open area used freely.",
    evidence: "reported",
  },
  {
    id: "outdoor-gym",
    name: "Outdoor gym equipment",
    zone: "fitness",
    who: "Adults",
    text: "Common in renovated BMC gardens but not mentioned in this one's reviews — confirm on site.",
    evidence: "to-confirm",
  },
];

export const playFitnessIntro =
  "After the 2024 renovation the garden splits its energy two ways: a play corner for the youngest visitors and open space for everyone else to walk, jog and stretch. Here is what to look for — and what we still need to confirm on site.";
