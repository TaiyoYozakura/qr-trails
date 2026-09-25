"use client";

import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { getTopic, getTrail } from "@/data";
import { useTopicUnlocked } from "@/lib/use-progress";
import { cn } from "@/lib/utils";
import { TransitionLink } from "./transition-link";

/**
 * Lock-aware navigation between discoveries. A neighbouring stop that hasn't
 * been scanned renders as a disabled card telling the visitor to scan it,
 * instead of a link they could follow.
 */

function useStop(topicId: string) {
  const topic = getTopic(topicId);
  const trail = topic ? getTrail(topic.trailId) : undefined;
  const index = trail && topic ? trail.topicIds.indexOf(topic.id) : -1;
  return {
    topic,
    trail,
    label:
      trail && index >= 0
        ? `stop ${String(index + 1).padStart(2, "0")} of ${String(trail.topicIds.length).padStart(2, "0")}`
        : "this stop",
  };
}

/** Previous / next card at the bottom of a discovery page. */
export function TopicNavCard({
  topicId,
  direction,
}: {
  topicId: string;
  direction: "previous" | "next";
}) {
  const unlocked = useTopicUnlocked(topicId);
  const { topic, label } = useStop(topicId);
  if (!topic) return null;

  const isNext = direction === "next";
  const caption = isNext ? "Next" : "Previous";

  if (!unlocked) {
    return (
      <div
        aria-disabled="true"
        className="flex flex-1 items-center justify-between gap-3 rounded-3xl border border-dashed border-forest/20 bg-white/60 p-5"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-stone">
          {caption} · locked
        </span>
        <span className="flex items-center gap-1.5 font-display text-lg font-semibold text-stone">
          <Lock className="size-4" aria-hidden />
          Scan the QR at {label}
        </span>
      </div>
    );
  }

  return (
    <TransitionLink
      href={`/learn/${topic.id}`}
      className="group flex flex-1 items-center justify-between gap-3 rounded-3xl border border-forest/10 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-stone">
        {caption}
      </span>
      <span className="flex items-center gap-1.5 font-display text-lg font-semibold text-charcoal">
        {!isNext && (
          <ArrowLeft
            className="size-4 text-forest transition-transform duration-200 group-hover:-translate-x-0.5"
            aria-hidden
          />
        )}
        {topic.title}
        {isNext && (
          <ArrowRight
            className="size-4 text-forest transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden
          />
        )}
      </span>
    </TransitionLink>
  );
}

/** The "go to the next discovery" button on a result screen. */
export function NextTopicButton({ topicId }: { topicId: string }) {
  const unlocked = useTopicUnlocked(topicId);
  const { topic, label } = useStop(topicId);
  if (!topic) return null;

  if (!unlocked) {
    return (
      <span
        aria-disabled="true"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-dashed border-forest/30 bg-white/70 px-8 py-4 text-base font-semibold text-ink-soft"
      >
        <Lock className="size-5" aria-hidden />
        Next: scan the QR at {label}
      </span>
    );
  }

  return (
    <TransitionLink
      href={`/learn/${topic.id}`}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full bg-forest px-8 py-4 text-lg font-semibold text-cream",
        "shadow-[0_10px_24px_-14px_rgb(30_75_46_/_0.6)] transition-all duration-200 hover:-translate-y-px hover:bg-forest-deep active:scale-[0.98]",
      )}
    >
      Next — {topic.title}
      <ArrowRight
        className="size-5 transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden
      />
    </TransitionLink>
  );
}
