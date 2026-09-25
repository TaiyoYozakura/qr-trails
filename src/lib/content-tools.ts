import type { ContentDraft } from "./draft-store";
import type { GuidelineGroup, Quiz, Topic, Trail } from "@/types";

/* ------------------------------------------------------------------ ids -- */

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

/** `slug`, or `slug-2`, `slug-3`… if that id is already taken. */
export function uniqueId(base: string, taken: string[]): string {
  const slug = slugify(base) || "item";
  if (!taken.includes(slug)) return slug;
  let n = 2;
  while (taken.includes(`${slug}-${n}`)) n += 1;
  return `${slug}-${n}`;
}

/* -------------------------------------------------------------- renames -- */

/** Renaming a trail carries its stop list and every discovery's trailId along. */
export function renameTrailId(
  draft: ContentDraft,
  from: string,
  to: string,
): ContentDraft {
  if (from === to || !to.trim()) return draft;
  return {
    ...draft,
    trails: draft.trails.map((trail) =>
      trail.id === from ? { ...trail, id: to } : trail,
    ),
    topics: draft.topics.map((topic) =>
      topic.trailId === from ? { ...topic, trailId: to } : topic,
    ),
  };
}

/** Renaming a discovery rewrites its place in the trail order. */
export function renameTopicId(
  draft: ContentDraft,
  from: string,
  to: string,
): ContentDraft {
  if (from === to || !to.trim()) return draft;
  return {
    ...draft,
    trails: draft.trails.map((trail) =>
      trail.topicIds.includes(from)
        ? {
            ...trail,
            topicIds: trail.topicIds.map((id) => (id === from ? to : id)),
          }
        : trail,
    ),
    topics: draft.topics.map((topic) =>
      topic.id === from ? { ...topic, id: to } : topic,
    ),
    quizzes: draft.quizzes.map((quiz) =>
      quiz.topicId === from ? { ...quiz, topicId: to } : quiz,
    ),
  };
}

/** Renaming a quiz rewrites the quizId every discovery points at. */
export function renameQuizId(
  draft: ContentDraft,
  from: string,
  to: string,
): ContentDraft {
  if (from === to || !to.trim()) return draft;
  return {
    ...draft,
    quizzes: draft.quizzes.map((quiz) =>
      quiz.id === from ? { ...quiz, id: to } : quiz,
    ),
    topics: draft.topics.map((topic) =>
      topic.quizId === from ? { ...topic, quizId: to } : topic,
    ),
  };
}

/* ----------------------------------------------------------- validation -- */

export interface ContentIssue {
  level: "error" | "warning";
  message: string;
}

function duplicates(ids: string[]): string[] {
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) dupes.add(id);
    seen.add(id);
  }
  return [...dupes];
}

/**
 * Structural checks the TypeScript compiler cannot make: ids that must line up
 * between the four collections. Surfaced on the admin overview so content cannot
 * be exported into a broken build.
 */
export function validateDraft(draft: ContentDraft): ContentIssue[] {
  const issues: ContentIssue[] = [];
  const trailIds = draft.trails.map((t) => t.id);
  const topicIds = draft.topics.map((t) => t.id);
  const quizIds = draft.quizzes.map((q) => q.id);

  for (const id of duplicates(trailIds)) {
    issues.push({ level: "error", message: `Two trails share the id "${id}".` });
  }
  for (const id of duplicates(topicIds)) {
    issues.push({ level: "error", message: `Two discoveries share the id "${id}".` });
  }
  for (const id of duplicates(quizIds)) {
    issues.push({ level: "error", message: `Two quizzes share the id "${id}".` });
  }
  for (const id of duplicates(draft.guidelines.map((g) => g.id))) {
    issues.push({ level: "error", message: `Two guideline groups share the id "${id}".` });
  }

  for (const trail of draft.trails) {
    if (trail.topicIds.length === 0) {
      issues.push({
        level: "warning",
        message: `Trail "${trail.title}" has no stops.`,
      });
    }
    for (const topicId of trail.topicIds) {
      const topic = draft.topics.find((t) => t.id === topicId);
      if (!topic) {
        issues.push({
          level: "error",
          message: `Trail "${trail.title}" lists a stop "${topicId}" that does not exist.`,
        });
      } else if (topic.trailId !== trail.id) {
        issues.push({
          level: "error",
          message: `"${topic.title}" belongs to "${topic.trailId}" but is listed under "${trail.title}".`,
        });
      }
    }
  }

  for (const topic of draft.topics) {
    if (!trailIds.includes(topic.trailId)) {
      issues.push({
        level: "error",
        message: `"${topic.title}" points at a trail "${topic.trailId}" that does not exist.`,
      });
    } else {
      const trail = draft.trails.find((t) => t.id === topic.trailId);
      if (trail && !trail.topicIds.includes(topic.id)) {
        issues.push({
          level: "error",
          message: `"${topic.title}" is not listed in its trail's stop order.`,
        });
      }
    }
    const quiz = draft.quizzes.find((q) => q.id === topic.quizId);
    if (!quiz) {
      issues.push({
        level: "error",
        message: `"${topic.title}" needs a quiz — no quiz with id "${topic.quizId}".`,
      });
    }
    if (!topic.title.trim() || !topic.hook.trim()) {
      issues.push({
        level: "warning",
        message: `A discovery is missing a title or hook (id "${topic.id}").`,
      });
    }
  }

  for (const quiz of draft.quizzes) {
    const topic = draft.topics.find((t) => t.id === quiz.topicId);
    if (!topic) {
      issues.push({
        level: "warning",
        message: `Quiz "${quiz.id}" is not attached to any discovery.`,
      });
    }
    if (quiz.questions.length === 0) {
      issues.push({ level: "error", message: `Quiz "${quiz.id}" has no questions.` });
    }
    quiz.questions.forEach((question, i) => {
      const where = `Quiz "${quiz.id}", question ${i + 1}`;
      if (question.options.length < 2) {
        issues.push({ level: "error", message: `${where} needs at least two options.` });
      }
      if (question.correctIndex < 0 || question.correctIndex >= question.options.length) {
        issues.push({
          level: "error",
          message: `${where} has no correct option selected.`,
        });
      }
      if (question.options.some((o) => !o.trim())) {
        issues.push({ level: "warning", message: `${where} has an empty option.` });
      }
      if (!question.question.trim()) {
        issues.push({ level: "warning", message: `${where} is missing its question text.` });
      }
    });
  }

  for (const group of draft.guidelines) {
    if (group.dos.length === 0 && group.donts.length === 0) {
      issues.push({
        level: "warning",
        message: `Guideline group "${group.title}" has no items.`,
      });
    }
  }

  return issues;
}

/* --------------------------------------------------------------- export -- */

function isIdentifier(key: string): boolean {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);
}

/** Serialize a plain JSON-shaped value as readable TypeScript. */
export function toTs(value: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  const padInner = "  ".repeat(indent + 1);

  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const scalars = value.every(
      (v) => typeof v === "string" || typeof v === "number" || typeof v === "boolean",
    );
    if (scalars) {
      const single = `[${value.map((v) => toTs(v)).join(", ")}]`;
      if (single.length <= 66) return single;
    }
    return `[\n${value
      .map((v) => `${padInner}${toTs(v, indent + 1)}`)
      .join(",\n")}\n${pad}]`;
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).filter(
      ([, v]) => v !== undefined,
    );
    if (entries.length === 0) return "{}";
    return `{\n${entries
      .map(
        ([key, v]) =>
          `${padInner}${isIdentifier(key) ? key : JSON.stringify(key)}: ${toTs(v, indent + 1)}`,
      )
      .join(",\n")}\n${pad}}`;
  }

  return "undefined";
}

const GENERATED_NOTE =
  "// Generated from the QR Trails admin console. Paste over the existing file.";

export function trailsToTs(trails: Trail[]): string {
  return [
    'import type { Trail } from "@/types";',
    "",
    GENERATED_NOTE,
    `export const trails: Trail[] = ${toTs(trails)};`,
    "",
  ].join("\n");
}

export function topicsToTs(topics: Topic[]): string {
  return [
    'import type { Topic } from "@/types";',
    "",
    GENERATED_NOTE,
    `export const topics: Topic[] = ${toTs(topics)};`,
    "",
  ].join("\n");
}

export function quizzesToTs(quizzes: Quiz[]): string {
  return [
    'import type { Quiz } from "@/types";',
    "",
    GENERATED_NOTE,
    `export const quizzes: Quiz[] = ${toTs(quizzes)};`,
    "",
  ].join("\n");
}

export function guidelinesToTs(guidelines: GuidelineGroup[]): string {
  return [
    'import type { GuidelineGroup } from "@/types";',
    "",
    GENERATED_NOTE,
    `export const guidelines: GuidelineGroup[] = ${toTs(guidelines)};`,
    "",
  ].join("\n");
}

/** Every generated file, keyed by its path in the repo. */
export function draftToFiles(draft: ContentDraft): Record<string, string> {
  return {
    "src/data/trails.ts": trailsToTs(draft.trails),
    "src/data/topics.ts": topicsToTs(draft.topics),
    "src/data/quizzes.ts": quizzesToTs(draft.quizzes),
    "src/data/guidelines.ts": guidelinesToTs(draft.guidelines),
  };
}

export function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
