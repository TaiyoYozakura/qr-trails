"use client";

import { useSyncExternalStore } from "react";
import {
  getProgressSnapshot,
  getServerProgressSnapshot,
  isUnlockedIn,
  subscribeProgress,
  type ProgressSnapshot,
} from "./progress";

/**
 * Stored progress (completed + unlocked discoveries, quiz scores).
 *
 * `useSyncExternalStore` is deliberate: the server snapshot is always empty, so
 * server and first client render agree, and React re-renders as soon as the real
 * localStorage values arrive. Reading localStorage during render instead would
 * desync hydration and briefly render the wrong lock state.
 */
export function useProgress(): ProgressSnapshot {
  return useSyncExternalStore(
    subscribeProgress,
    getProgressSnapshot,
    getServerProgressSnapshot,
  );
}

/** Is this discovery's QR code already scanned on this device? */
export function useTopicUnlocked(topicId: string): boolean {
  const { completedTopics, unlockedTopics } = useProgress();
  return isUnlockedIn(topicId, completedTopics, unlockedTopics);
}

/** How many of these discoveries this device can open right now. */
export function useUnlockedCount(topicIds: string[]): number {
  const { completedTopics, unlockedTopics } = useProgress();
  return topicIds.filter((id) =>
    isUnlockedIn(id, completedTopics, unlockedTopics),
  ).length;
}
