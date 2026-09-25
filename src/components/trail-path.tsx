"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check, Lock } from "lucide-react";
import { getTopic, getTrail } from "@/data";
import { isUnlockedIn } from "@/lib/progress";
import { useProgress } from "@/lib/use-progress";
import { cn } from "@/lib/utils";
import { TransitionLink } from "./transition-link";
import { ViewName } from "./view-name";

type NodeState = "done" | "current" | "open" | "locked";

const NODE = "size-11";

function NodeDot({ state }: { state: NodeState }) {
  const reduce = useReducedMotion();

  if (state === "done") {
    return (
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          NODE,
          "grid shrink-0 place-items-center rounded-full bg-forest text-cream",
        )}
      >
        <Check className="size-5" aria-hidden />
      </motion.span>
    );
  }

  if (state === "current") {
    return (
      <motion.span
        className={cn(
          NODE,
          "grid shrink-0 place-items-center rounded-full bg-leaf text-white ring-4 ring-leaf/25",
        )}
        animate={reduce ? undefined : { scale: [1, 1.07, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="size-3.5 rounded-full bg-cream" />
      </motion.span>
    );
  }

  if (state === "locked") {
    return (
      <span
        className={cn(
          NODE,
          "grid shrink-0 place-items-center rounded-full border-2 border-dashed border-stone/50 bg-white/70 text-stone",
        )}
      >
        <Lock className="size-4" aria-hidden />
      </span>
    );
  }

  return (
    <span
      className={cn(
        NODE,
        "grid shrink-0 place-items-center rounded-full border-2 border-forest/25 bg-white",
      )}
    >
      <span className="size-3.5 rounded-full bg-forest/25" />
    </span>
  );
}

/**
 * Signature animation #02 — trail draw.
 * Vertical trail of nodes: completed ✓, current ●, scanned ○, unscanned 🔒.
 *
 * A stop is only a link once its QR code has been scanned on this device;
 * unscanned stops stay visible but disabled, so visitors can see what the trail
 * holds and are pointed at the code they need to find.
 */
export function TrailPath({
  trailId,
  currentTopicId,
}: {
  trailId: string;
  currentTopicId?: string;
}) {
  const { completedTopics, unlockedTopics } = useProgress();
  const trail = getTrail(trailId);
  if (!trail) return null;

  const lockedCount = trail.topicIds.filter(
    (id) => !isUnlockedIn(id, completedTopics, unlockedTopics),
  ).length;

  return (
    <div>
      <ol className="relative" aria-label={`${trail.title} trail path`}>
        {trail.topicIds.map((topicId, i) => {
          const topic = getTopic(topicId);
          if (!topic) return null;
          const done = completedTopics.includes(topicId);
          const open = isUnlockedIn(topicId, completedTopics, unlockedTopics);
          const current = topicId === currentTopicId;
          const last = i === trail.topicIds.length - 1;
          const state: NodeState = done
            ? "done"
            : current
              ? "current"
              : open
                ? "open"
                : "locked";

          const label = (
            <div className="flex min-w-0 flex-col justify-center">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-stone">
                {String(i + 1).padStart(2, "0")}
              </p>
              {open ? (
                <TransitionLink
                  href={`/learn/${topic.id}`}
                  className={cn(
                    "font-display text-lg font-semibold transition-colors hover:text-forest",
                    done ? "text-charcoal" : current ? "text-forest" : "text-ink-soft",
                  )}
                >
                  <ViewName name={`topic-${topicId}`}>{topic.title}</ViewName>
                </TransitionLink>
              ) : (
                <span className="font-display text-lg font-semibold text-stone">
                  {topic.title}
                </span>
              )}
              {current && (
                <span className="mt-1 inline-block w-fit rounded-full bg-sun/60 px-2.5 py-0.5 text-[11px] font-semibold text-charcoal">
                  YOU ARE HERE
                </span>
              )}
              {done && !current && (
                <span className="mt-1 block text-xs text-stone">Completed</span>
              )}
              {!open && (
                <span className="mt-1 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-ink-soft">
                  <Lock className="size-3.5" aria-hidden />
                  Scan the QR code at this stop to unlock
                </span>
              )}
            </div>
          );

          return (
            <li key={topicId} className="relative flex gap-3 pb-9 last:pb-0">
              {!last && (
                <motion.span
                  aria-hidden
                  className="absolute left-[21px] top-12 h-[calc(100%-3rem)] w-0.5 origin-top rounded-full bg-forest/15"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              )}

              {open ? (
                <TransitionLink
                  href={`/learn/${topic.id}`}
                  aria-label={`Open discovery: ${topic.title}`}
                  className="relative z-10 shrink-0 rounded-full"
                >
                  <NodeDot state={state} />
                </TransitionLink>
              ) : (
                <span
                  aria-disabled="true"
                  className="relative z-10 shrink-0 rounded-full"
                  title="Scan this stop's QR code to unlock it"
                >
                  <NodeDot state={state} />
                </span>
              )}

              {label}
            </li>
          );
        })}
      </ol>

      {lockedCount > 0 && (
        <p className="mt-6 flex items-start gap-2 rounded-2xl bg-forest/5 p-4 text-xs leading-relaxed text-ink-soft">
          <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          {lockedCount === 1 ? "One stop is" : `${lockedCount} stops are`} still
          locked. Each one opens when you scan the code posted at it in the
          garden — you can walk the trail in any order.
        </p>
      )}
    </div>
  );
}
