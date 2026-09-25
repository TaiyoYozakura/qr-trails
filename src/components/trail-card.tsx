import { ArrowRight, Clock } from "lucide-react";
import type { Trail } from "@/types";
import { TransitionLink } from "./transition-link";
import { ViewName } from "./view-name";

export function TrailCard({ trail }: { trail: Trail }) {
  return (
    <TransitionLink
      href={`/trail/${trail.id}`}
      className="group block rounded-3xl border border-forest/10 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-forest">
          {trail.category}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-medium text-ink-soft">
          <Clock className="size-3.5" aria-hidden />
          {trail.estimatedDuration}
        </span>
      </div>

      <h3 className="mt-4 font-display text-2xl font-semibold text-charcoal sm:text-3xl">
        <ViewName name={`trail-${trail.id}`}>{trail.title}</ViewName>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">
        {trail.description}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-medium text-forest">
          {trail.topicIds.length} discoveries
        </p>
        <span className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-cream transition-transform duration-200 group-hover:translate-x-0.5">
          Start Trail
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </TransitionLink>
  );
}