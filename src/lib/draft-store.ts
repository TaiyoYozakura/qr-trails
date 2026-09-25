"use client";

import { useSyncExternalStore } from "react";
import {
  guidelines as seedGuidelines,
  quizzes as seedQuizzes,
  topics as seedTopics,
  trails as seedTrails,
} from "@/data";
import type { GuidelineGroup, Quiz, Topic, Trail } from "@/types";

/**
 * The admin's working copy of the content.
 *
 * The visitor-facing site always reads `src/data/*` — it is static, prerendered
 * and fast, and no visitor waits on a database. The admin console edits a draft
 * of those same four collections, stored in this browser, and exports it back
 * into `src/data/*.ts` (see `lib/content-tools.ts`).
 *
 * So: edits are local to the admin's device until exported. That is the cost of
 * having no backend, and the reason the admin UI shows a permanent "draft"
 * banner rather than pretending to be a live CMS.
 */
export interface ContentDraft {
  trails: Trail[];
  topics: Topic[];
  quizzes: Quiz[];
  guidelines: GuidelineGroup[];
}

const DRAFT_KEY = "qr-trails:content-draft";

/** What the site currently ships — the baseline every draft starts from. */
export const seedDraft: ContentDraft = {
  trails: seedTrails,
  topics: seedTopics,
  quizzes: seedQuizzes,
  guidelines: seedGuidelines,
};

function readDraft(): ContentDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ContentDraft>;
    if (!parsed || !Array.isArray(parsed.trails)) return null;
    return {
      trails: parsed.trails ?? [],
      topics: parsed.topics ?? [],
      quizzes: parsed.quizzes ?? [],
      guidelines: parsed.guidelines ?? [],
    };
  } catch {
    return null;
  }
}

function writeDraft(draft: ContentDraft | null) {
  try {
    if (draft === null) {
      window.localStorage.removeItem(DRAFT_KEY);
    } else {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    }
  } catch {
    // storage unavailable — the draft simply won't persist
  }
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notify() {
  for (const listener of listeners) listener();
}

let cachedSnapshot: ContentDraft = seedDraft;
let cachedDirty = false;
let cachedKey: string | null = null;

function refresh() {
  const stored = readDraft();
  const key = stored ? JSON.stringify(stored) : null;
  if (key !== cachedKey) {
    cachedKey = key;
    cachedSnapshot = stored ?? seedDraft;
    cachedDirty = stored !== null;
  }
  return cachedSnapshot;
}

function getServerSnapshot(): ContentDraft {
  return seedDraft;
}

export function getDraft(): ContentDraft {
  return refresh();
}

function commit(draft: ContentDraft) {
  writeDraft(draft);
  refresh();
  notify();
}

/** Apply a structural change. Return a new draft — do not mutate in place. */
export function updateDraft(mutate: (draft: ContentDraft) => ContentDraft) {
  commit(mutate(getDraft()));
}

/** Throw the draft away and go back to what the site ships. */
export function resetDraft() {
  writeDraft(null);
  refresh();
  notify();
}

export function importDraft(draft: ContentDraft) {
  commit(draft);
}

export function buildSeedDraft(): ContentDraft {
  return structuredClone(seedDraft);
}

export interface DraftState {
  draft: ContentDraft;
  /** True when a draft exists on this device (i.e. it differs from the site). */
  dirty: boolean;
  update: typeof updateDraft;
  reset: typeof resetDraft;
  replace: typeof importDraft;
}

export function useDraft(): DraftState {
  const draft = useSyncExternalStore(subscribe, refresh, getServerSnapshot);
  // `refresh` also updates `cachedDirty`; reading it here keeps both in step.
  return {
    draft,
    dirty: cachedDirty,
    update: updateDraft,
    reset: resetDraft,
    replace: importDraft,
  };
}
