/**
 * Client-side progress, stored in localStorage.
 * No accounts, no personal data — per the project rules.
 */

const COMPLETED_KEY = "qr-trails:completed-topics";
const SCORES_KEY = "qr-trails:quiz-scores";
/**
 * Discoveries whose QR code this device has actually scanned.
 * A discovery is locked until its own code is scanned — see `unlockTopic`.
 */
const UNLOCKED_KEY = "qr-trails:unlocked-topics";

export interface QuizScore {
  score: number;
  total: number;
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable (private mode etc.) — progress just won't persist
  }
}

/** Tiny pub/sub so components stay in sync after progress changes. */
const listeners = new Set<() => void>();

export function subscribeProgress(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notify() {
  for (const listener of listeners) listener();
}

export function getCompletedTopics(): string[] {
  return read<string[]>(COMPLETED_KEY, []);
}

export function isTopicComplete(topicId: string): boolean {
  return getCompletedTopics().includes(topicId);
}

export function completeTopic(topicId: string) {
  const set = new Set(getCompletedTopics());
  if (!set.has(topicId)) {
    set.add(topicId);
    write(COMPLETED_KEY, [...set]);
    notify();
  }
}

export function getUnlockedTopics(): string[] {
  return read<string[]>(UNLOCKED_KEY, []);
}

/**
 * A discovery is reachable if its QR code was scanned on this device, or if it
 * was already completed (progress from before locking existed counts too).
 */
export function isUnlockedIn(
  topicId: string,
  completed: string[],
  unlocked: string[],
): boolean {
  return completed.includes(topicId) || unlocked.includes(topicId);
}

export function isTopicUnlocked(topicId: string): boolean {
  return isUnlockedIn(topicId, getCompletedTopics(), getUnlockedTopics());
}

export function unlockTopic(topicId: string) {
  const set = new Set(getUnlockedTopics());
  if (set.has(topicId)) return;
  set.add(topicId);
  write(UNLOCKED_KEY, [...set]);
  notify();
}

export function getQuizScores(): Record<string, QuizScore> {
  return read<Record<string, QuizScore>>(SCORES_KEY, {});
}

export function recordQuizScore(quizId: string, score: number, total: number) {
  const scores = getQuizScores();
  scores[quizId] = { score, total };
  write(SCORES_KEY, scores);
  notify();
}

export function getTrailProgress(topicIds: string[]) {
  const done = getCompletedTopics();
  const open = getUnlockedTopics();
  const completed = topicIds.filter((id) => done.includes(id)).length;
  return {
    completed,
    unlocked: topicIds.filter((id) => isUnlockedIn(id, done, open)).length,
    total: topicIds.length,
    percent: Math.round((completed / topicIds.length) * 100),
  };
}

export function isTrailComplete(topicIds: string[]): boolean {
  return getTrailProgress(topicIds).completed === topicIds.length;
}

/**
 * Progress snapshot for `useSyncExternalStore`.
 *
 * `getSnapshot` must return a referentially stable value between changes, so the
 * parsed arrays are cached and only rebuilt when the stored data actually differs.
 * The server snapshot is always empty — nothing is unlocked or completed until
 * the browser is read — which keeps server and first client render identical.
 */
export interface ProgressSnapshot {
  completedTopics: string[];
  unlockedTopics: string[];
  quizScores: Record<string, QuizScore>;
}

const emptySnapshot: ProgressSnapshot = {
  completedTopics: [],
  unlockedTopics: [],
  quizScores: {},
};

let cachedSnapshot: ProgressSnapshot = emptySnapshot;
let cachedKey = "";

export function getServerProgressSnapshot(): ProgressSnapshot {
  return emptySnapshot;
}

export function getProgressSnapshot(): ProgressSnapshot {
  const completedTopics = getCompletedTopics();
  const unlockedTopics = getUnlockedTopics();
  const quizScores = getQuizScores();
  const key = JSON.stringify([completedTopics, unlockedTopics, quizScores]);
  if (key !== cachedKey) {
    cachedKey = key;
    cachedSnapshot = { completedTopics, unlockedTopics, quizScores };
  }
  return cachedSnapshot;
}

/**
 * The next stop to offer as "Continue": the first unlocked stop that isn't
 * finished yet. Returns null when nothing unlocked is left to do (the visitor
 * has to scan the next QR in the garden).
 */
export function nextUnlockedTopic(topicIds: string[]): string | null {
  const snapshot = getProgressSnapshot();
  return (
    topicIds.find(
      (id) =>
        isUnlockedIn(id, snapshot.completedTopics, snapshot.unlockedTopics) &&
        !snapshot.completedTopics.includes(id),
    ) ?? null
  );
}

/** The first stop this device still has to scan, or null if none are locked. */
export function firstLockedTopic(topicIds: string[]): string | null {
  const snapshot = getProgressSnapshot();
  return (
    topicIds.find(
      (id) => !isUnlockedIn(id, snapshot.completedTopics, snapshot.unlockedTopics),
    ) ?? null
  );
}