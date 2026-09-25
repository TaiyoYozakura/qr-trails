"use client";

import { ArrowRight, Lock, PartyPopper } from "lucide-react";
import { getTopic, getTrail } from "@/data";
import { useProgress } from "@/lib/use-progress";
import {
  getTrailProgress,
  isTrailComplete,
  nextUnlockedTopic,
} from "@/lib/progress";
import { ButtonLink } from "./button";
import { ProgressBar } from "./progress-bar";
import { TransitionLink } from "./transition-link";

export function TrailProgress({ trailId }: { trailId: string }) {
  const { completedTopics, unlockedTopics } = useProgress();
  const trail = getTrail(trailId);
  if (!trail) return null;

  const progress = getTrailProgress(trail.topicIds);
  const complete = isTrailComplete(trail.topicIds);
  const nextId = nextUnlockedTopic(trail.topicIds);
  const nextTopic = nextId ? getTopic(nextId) : undefined;
  const lockedTopics = trail.topicIds.filter(
    (id) => !unlockedTopics.includes(id) && !completedTopics.includes(id),
  );
  const nextLocked = lockedTopics.length > 0 ? getTopic(lockedTopics[0]) : undefined;

  return (
    <div className="rounded-3xl border border-forest/10 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold text-charcoal">
          Your progress
        </h2>
        <span className="rounded-full bg-forest/10 px-3 py-1 text-sm font-semibold text-forest">
          {progress.completed} / {progress.total}
        </span>
      </div>

      <ProgressBar value={progress.percent} className="mt-4" />

      <p className="mt-3 text-xs text-stone">
        {progress.unlocked} of {progress.total} stops unlocked ·{" "}
        {progress.completed} completed
      </p>

      <div className="mt-6">
        {complete ? (
          <ButtonLink href={`/result/${trail.id}`} className="w-full">
            <PartyPopper className="size-5" aria-hidden />
            Trail complete — see your recap
          </ButtonLink>
        ) : nextId && nextTopic ? (
          <TransitionLink
            href={`/learn/${nextId}`}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 font-semibold text-cream transition-all duration-200 hover:-translate-y-px hover:bg-forest-deep active:scale-[0.98]"
          >
            {progress.completed === 0 ? "Start the trail" : "Continue"} —{" "}
            {nextTopic.title}
            <ArrowRight
              className="size-5 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </TransitionLink>
        ) : (
          <div className="flex items-center gap-3 rounded-2xl border border-dashed border-forest/25 bg-cream/60 p-4">
            <Lock className="size-4 shrink-0 text-ink-soft" aria-hidden />
            <p className="text-sm leading-relaxed text-ink-soft">
              {nextLocked
                ? `Scan the QR code at “${nextLocked.title}” to open the next stop.`
                : "Scan any stop's QR code in the garden to unlock it."}
            </p>
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-stone">
        Progress and unlocks are saved on this phone only.
      </p>
    </div>
  );
}
