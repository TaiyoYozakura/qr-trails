"use client";

import { useEffect, type ReactNode } from "react";
import { ArrowRight, Lock, QrCode, ScanLine } from "lucide-react";
import { getTopic, getTrail } from "@/data";
import { unlockTopic } from "@/lib/progress";
import { useTopicUnlocked } from "@/lib/use-progress";
import { ButtonLink } from "./button";
import { Entrance } from "./entrance";

/**
 * Stops casual URL guessing and crawling.
 *
 * A discovery URL from the garden's QR codes carries `?scan=1`, which is the
 * only thing that marks a discovery as unlocked on this device. Landing on
 * `/learn/trunk` (a typed or shared URL, or a search-engine crawler) renders the
 * scan prompt instead of the content.
 *
 * This is device-local, not cryptographic: clearing site data re-locks
 * everything, and a determined visitor can still force `?scan=1`. That is the
 * intended trade-off for a static, backend-free site — it stops guessing, not
 * attackers.
 */
export function UnlockGate({
  topicId,
  scanned,
  children,
}: {
  topicId: string;
  /** True when the URL carried `?scan=1`, i.e. this visit came from the QR code. */
  scanned: boolean;
  children: ReactNode;
}) {
  const unlocked = useTopicUnlocked(topicId);

  useEffect(() => {
    if (scanned) unlockTopic(topicId);
  }, [scanned, topicId]);

  if (scanned || unlocked) return <>{children}</>;

  return <LockedDiscovery topicId={topicId} />;
}

function LockedDiscovery({ topicId }: { topicId: string }) {
  const topic = getTopic(topicId);
  const trail = topic ? getTrail(topic.trailId) : undefined;
  const index = trail && topic ? trail.topicIds.indexOf(topic.id) : -1;

  return (
    <main className="mx-auto max-w-xl px-4 py-14 sm:px-6">
      <Entrance>
        <div className="rounded-[2.5rem] border border-forest/10 bg-white px-6 py-10 text-center shadow-card sm:px-10">
          <span className="mx-auto grid size-16 place-items-center rounded-3xl bg-forest/10 text-forest">
            <Lock className="size-8" aria-hidden />
          </span>

          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-stone">
            This discovery is locked
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-charcoal text-balance sm:text-4xl">
            Scan the QR code to open it.
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-ink-soft">
            Each stop opens only when you scan the code posted at it in the
            garden. Find the code, scan it with your camera, and the discovery
            appears right here.
          </p>

          {trail && topic && (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-forest/5 px-4 py-2 text-xs font-semibold text-forest">
              <ScanLine className="size-3.5" aria-hidden />
              {trail.title} · stop {String(index + 1).padStart(2, "0")} of{" "}
              {String(trail.topicIds.length).padStart(2, "0")}
            </p>
          )}

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            {trail && (
              <ButtonLink href={`/trail/${trail.id}`} size="lg">
                See the trail map
                <ArrowRight className="size-5" aria-hidden />
              </ButtonLink>
            )}
            <ButtonLink href="/explore" size="lg" variant="secondary">
              All trails
            </ButtonLink>
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-xs text-stone">
            <QrCode className="size-3.5" aria-hidden />
            Unlocks are saved on this phone only — nothing is stored online.
          </p>
        </div>
      </Entrance>
    </main>
  );
}
