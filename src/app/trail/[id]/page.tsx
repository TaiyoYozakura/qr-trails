import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import { Entrance } from "@/components/entrance";
import { TrailPath } from "@/components/trail-path";
import { TrailProgress } from "@/components/trail-progress";
import { ViewName } from "@/components/view-name";
import { trailPhotos, trails } from "@/data";

export function generateStaticParams() {
  return trails.map((trail) => ({ id: trail.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const trail = trails.find((t) => t.id === id);
  if (!trail) return { title: "Trail" };
  return {
    title: trail.title,
    description: trail.description,
  };
}

export default async function TrailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trail = trails.find((t) => t.id === id);
  if (!trail) notFound();

  const photo = trailPhotos[trail.id];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Entrance>
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-forest transition-colors hover:bg-forest/5"
        >
          <ArrowLeft className="size-4" aria-hidden />
          All trails
        </Link>
      </Entrance>

      {photo && (
        <Entrance delay={0.05}>
          <div className="relative mt-6 overflow-hidden rounded-[2.5rem] shadow-card">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={1600}
              height={900}
              priority
              sizes="(min-width: 1152px) 72rem, 100vw"
              style={photo.focus ? { objectPosition: photo.focus } : undefined}
              className="aspect-[21/9] w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5 sm:p-7">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-forest">
                    {trail.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-cream/90">
                    <Clock className="size-3.5" aria-hidden />
                    {trail.estimatedDuration}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-cream/90">
                    <MapPin className="size-3.5" aria-hidden />
                    {trail.topicIds.length} discoveries
                  </span>
                </div>
                <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-cream drop-shadow-sm sm:text-5xl">
                  <ViewName name={`trail-${trail.id}`}>{trail.title}</ViewName>
                </h1>
              </div>
              <p className="hidden max-w-[16rem] text-right text-[10px] leading-snug text-cream/70 sm:block">
                {photo.credit} ·{" "}
                <a
                  href={photo.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-cream/40 underline-offset-2"
                >
                  source
                </a>
              </p>
            </div>
          </div>
        </Entrance>
      )}

      <Entrance delay={0.18}>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
          {trail.description}
        </p>
      </Entrance>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Entrance delay={0.1}>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-charcoal">
              The path
            </h2>
          </Entrance>
          <Entrance delay={0.18} className="mt-6">
            <div className="rounded-3xl border border-forest/10 bg-white p-6 shadow-card sm:p-8">
              <TrailPath trailId={trail.id} currentTopicId={undefined} />
            </div>
          </Entrance>
        </div>

        <div>
          <Entrance delay={0.2}>
            <TrailProgress trailId={trail.id} />
          </Entrance>
          <Entrance delay={0.28}>
            <div className="mt-6 rounded-3xl border border-forest/10 bg-white p-6 shadow-card">
              <h2 className="font-display text-xl font-semibold text-charcoal">
                How the trail works
              </h2>
              <ol className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
                <li className="flex gap-3">
                  <span className="font-display font-semibold text-forest">1</span>
                  Scan the QR code posted at a stop to unlock it.
                </li>
                <li className="flex gap-3">
                  <span className="font-display font-semibold text-forest">2</span>
                  Read the discovery, then take its quick quiz.
                </li>
                <li className="flex gap-3">
                  <span className="font-display font-semibold text-forest">3</span>
                  Finish all {trail.topicIds.length} to complete the trail.
                </li>
              </ol>
              <p className="mt-4 rounded-2xl bg-forest/5 p-4 text-xs leading-relaxed text-ink-soft">
                Every stop is locked until its own QR code is scanned, so you
                can walk the trail in any order — the codes you scan decide what
                opens.
              </p>
            </div>
          </Entrance>
        </div>
      </div>
    </main>
  );
}