/**
 * Every illustration a discovery can use. Kept as a runtime list so the admin
 * editor can offer a picker, while the union type keeps `TopicIllustration`'s
 * lookup record exhaustive — adding a kind here without wiring the illustration
 * is a compile error.
 */
export const VISUAL_KINDS = [
  "leaf",
  "trunk",
  "roots",
  "water",
  "ecosystem",
  "garden",
  "tree",
  "flower",
  "herb",
  "statue",
  "plaque",
  "neighborhood",
  "shade",
  "flowerbed",
  "walkway",
  "tidy",
  "slide",
  "swing",
  "slope",
  "seesaw",
  "roundabout",
] as const;

export type VisualKind = (typeof VISUAL_KINDS)[number];

export interface Trail {
  id: string;
  title: string;
  altTitle?: string;
  category: string;
  description: string;
  estimatedDuration: string;
  topicIds: string[];
}

export interface Topic {
  id: string;
  trailId: string;
  /** 1-based position within the trail */
  number: number;
  title: string;
  hook: string;
  explanation: string[];
  funFact: string;
  visual: VisualKind;
  quizId: string;
  /** Optional accent colour for the plant-style visuals. */
  accent?: string;
  /** Where the printed QR code for this discovery belongs in the garden. */
  placement?: string;
  /** Optional follow-up card shown after the discovery content. */
  related?: { href: string; label: string; text: string };
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  topicId: string;
  questions: QuizQuestion[];
}

/**
 * Icons a garden rule can use. A runtime list so the admin editor can offer a
 * picker; `app/guidelines/page.tsx` maps every key to a Lucide component and is
 * typed `Record<GuidelineIcon, LucideIcon>`, so an unmapped key fails to compile.
 */
export const GUIDELINE_ICONS = [
  "leaf",
  "flower",
  "eye",
  "camera",
  "footprints",
  "trash",
  "droplets",
  "paw",
  "qr",
  "scan",
  "volume",
  "users",
  "bike",
  "hand",
  "clock",
] as const;

export type GuidelineIcon = (typeof GUIDELINE_ICONS)[number];

export interface GuidelineItem {
  text: string;
  icon: GuidelineIcon;
}

export interface GuidelineGroup {
  id: string;
  title: string;
  summary: string;
  dos: GuidelineItem[];
  donts: GuidelineItem[];
}

export type PlantVisual = "tree" | "flower" | "herb";

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  intro: string;
  facts: string[];
  importance: string;
  lookFor: string;
  visual: PlantVisual;
  accent: string;
}