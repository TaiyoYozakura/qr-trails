import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Eye, Heart } from "lucide-react";
import { Entrance } from "@/components/entrance";
import { PlantIllustration } from "@/components/illustrations/plant";
import { Photo } from "@/components/photo";
import { ViewName } from "@/components/view-name";
import { plantPhotos, plants } from "@/data";
import { getPlantByIndex, getPlantIndex } from "./helpers";

export function generateStaticParams() {
  return plants.map((plant) => ({ id: plant.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const plant = plants.find((p) => p.id === id);
  if (!plant) return { title: "Flora" };
  return {
    title: plant.name,
    description: plant.intro,
  };
}

export default async function FloraDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const index = getPlantIndex(id);
  const plant = getPlantByIndex(index);
  const next = getPlantByIndex(index + 1);

  if (!plant) notFound();

  const photo = plantPhotos[plant.id];

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Entrance>
        <Link
          href="/flora"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-forest transition-colors hover:bg-forest/5"
        >
          <ArrowLeft className="size-4" aria-hidden />
          All flora
        </Link>
      </Entrance>

      <div className="mt-6 grid gap-8 sm:grid-cols-[0.9fr_1.1fr] sm:items-center">
        <Entrance delay={0.1}>
          {photo ? (
            <Photo photo={photo} sizes="(min-width: 640px) 45vw, 100vw" />
          ) : (
            <div className="rounded-[2rem] border border-forest/10 bg-white p-6 shadow-card">
              <PlantIllustration
                kind={plant.visual}
                accent={plant.accent}
                className="w-full"
              />
            </div>
          )}
        </Entrance>

        <div>
          <Entrance delay={0.15}>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
              <ViewName name={`flora-${plant.id}`}>{plant.name}</ViewName>
            </h1>
          </Entrance>
          <Entrance delay={0.22}>
            <p className="mt-1 text-lg italic text-stone">
              {plant.scientificName}
            </p>
          </Entrance>
          <Entrance delay={0.3}>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              {plant.intro}
            </p>
          </Entrance>
        </div>
      </div>

      <section className="mt-12">
        <Entrance>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-charcoal">
            Quick facts
          </h2>
        </Entrance>
        <ul className="mt-5 space-y-3">
          {plant.facts.map((fact, i) => (
            <Entrance key={fact} delay={0.06 * (i + 1)}>
              <li className="flex gap-3 rounded-2xl border border-forest/10 bg-white px-5 py-4 shadow-card">
                <span
                  className="mt-1.5 size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: plant.accent }}
                  aria-hidden
                />
                <span className="text-sm leading-relaxed text-charcoal sm:text-base">
                  {fact}
                </span>
              </li>
            </Entrance>
          ))}
        </ul>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <Entrance>
          <div className="h-full rounded-3xl border border-forest/10 bg-white p-6 shadow-card">
            <div className="flex items-center gap-2 text-forest">
              <Heart className="size-5" aria-hidden />
              <h3 className="font-display text-lg font-semibold">Why it matters</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {plant.importance}
            </p>
          </div>
        </Entrance>
        <Entrance delay={0.08}>
          <div className="h-full rounded-3xl border border-forest/10 bg-sun-soft/50 p-6 shadow-card">
            <div className="flex items-center gap-2 text-forest">
              <Eye className="size-5" aria-hidden />
              <h3 className="font-display text-lg font-semibold">Look for</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {plant.lookFor}
            </p>
          </div>
        </Entrance>
      </section>

      {next && (
        <Entrance delay={0.1}>
          <Link
            href={`/flora/${next.id}`}
            className="group mt-10 flex items-center justify-between rounded-3xl border border-forest/10 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-stone">
                Next plant
              </p>
              <p className="mt-1 font-display text-xl font-semibold text-charcoal">
                {next.name}
              </p>
            </div>
            <ArrowRight
              className="size-5 text-forest transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </Entrance>
      )}
    </main>
  );
}