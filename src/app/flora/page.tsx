import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Entrance } from "@/components/entrance";
import { PlantIllustration } from "@/components/illustrations/plant";
import { TransitionLink } from "@/components/transition-link";
import { ViewName } from "@/components/view-name";
import { plants } from "@/data";

export const metadata: Metadata = {
  title: "Flora",
  description: "Meet the plants growing around you.",
};

export default function FloraPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Entrance>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
          Know your neighbours.
        </h1>
      </Entrance>
      <Entrance delay={0.1}>
        <p className="mt-3 max-w-xl text-lg text-ink-soft">
          Short introductions to the plants growing right beside you.
        </p>
      </Entrance>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {plants.map((plant, i) => (
          <Entrance key={plant.id} delay={0.07 * (i % 3)}>
            <TransitionLink
              href={`/flora/${plant.id}`}
              className="group flex h-full flex-col rounded-3xl border border-forest/10 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="mx-auto w-36">
                <PlantIllustration
                  kind={plant.visual}
                  accent={plant.accent}
                  className="w-full"
                />
              </div>
              <h2 className="mt-4 font-display text-2xl font-semibold text-charcoal">
                <ViewName name={`flora-${plant.id}`}>{plant.name}</ViewName>
              </h2>
              <p className="text-sm italic text-stone">{plant.scientificName}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                {plant.intro}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
                Identify
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </TransitionLink>
          </Entrance>
        ))}
      </div>
    </main>
  );
}