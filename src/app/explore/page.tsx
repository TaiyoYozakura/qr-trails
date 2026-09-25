import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flower2, Leaf, Sprout } from "lucide-react";
import { Entrance } from "@/components/entrance";
import { TrailCard } from "@/components/trail-card";
import { trails } from "@/data";

export const metadata: Metadata = {
  title: "Explore",
  description: "Pick a trail, start walking, follow the discoveries.",
};

export default function ExplorePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Entrance>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
          Where should we explore?
        </h1>
      </Entrance>
      <Entrance delay={0.1}>
        <p className="mt-3 max-w-xl text-lg text-ink-soft">
          Pick a trail. Start walking. Follow the discoveries.
        </p>
      </Entrance>

      <div className="mt-10 space-y-6">
        {trails.map((trail, i) => (
          <Entrance key={trail.id} delay={0.08 * (i + 1)}>
            <TrailCard trail={trail} />
          </Entrance>
        ))}

        <Entrance delay={0.3}>
          <div className="rounded-3xl border border-dashed border-forest/25 bg-white/50 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-forest/5 text-forest">
                  <Sprout className="size-6" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-charcoal">
                    More trails are growing…
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    New stops get added as more codes go up in the garden.
                    Everything listed above is ready to walk now.
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-forest/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-forest">
                Coming soon
              </span>
            </div>
          </div>
        </Entrance>
      </div>

      {/* Also in the garden */}
      <section className="mt-16">
        <Entrance>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-charcoal">
            Also in the garden
          </h2>
        </Entrance>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Entrance delay={0.08}>
            <Link
              href="/flora"
              className="group flex h-full items-center gap-4 rounded-3xl border border-forest/10 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-leaf/15 text-leaf-dark">
                <Leaf className="size-6" aria-hidden />
              </span>
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold text-charcoal">
                  Flora
                </h3>
                <p className="mt-0.5 text-sm text-ink-soft">
                  Meet the plants growing around you.
                </p>
              </div>
              <ArrowRight
                className="size-5 text-stone transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </Entrance>
          <Entrance delay={0.16}>
            <Link
              href="/guidelines"
              className="group flex h-full items-center gap-4 rounded-3xl border border-forest/10 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sun/30 text-forest">
                <Flower2 className="size-6" aria-hidden />
              </span>
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold text-charcoal">
                  Guidelines
                </h3>
                <p className="mt-0.5 text-sm text-ink-soft">
                  Keep the classroom happy.
                </p>
              </div>
              <ArrowRight
                className="size-5 text-stone transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </Entrance>
        </div>
      </section>
    </main>
  );
}