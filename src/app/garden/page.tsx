import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Compass,
  Flower2,
  Leaf,
  MapPin,
  Trees,
} from "lucide-react";
import { ButtonLink } from "@/components/button";
import { Entrance } from "@/components/entrance";
import { HowItWorks } from "@/components/how-it-works";
import { Photo } from "@/components/photo";
import { TrailCard } from "@/components/trail-card";
import {
  featurePhotos,
  garden,
  gardenAddress,
  gardenMapUrl,
  heroPhoto,
  trails,
} from "@/data";

export const metadata: Metadata = {
  title: garden.shortName,
  description: `${garden.name} — ${garden.tagline} Four short QR trails through the garden.`,
};

export default function GardenPage() {
  const facts = [
    { label: "Type", value: garden.type },
    { label: "Managed by", value: garden.managedBy },
    { label: "Where", value: gardenAddress },
    ...(garden.hours ? [{ label: "Open", value: garden.hours }] : []),
    ...(garden.entryNote ? [{ label: "Entry", value: garden.entryNote }] : []),
  ];

  return (
    <main>
      {/* Entry experience */}
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pt-16">
          <div>
            <Entrance>
              <p className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-forest">
                <Compass className="size-3.5" aria-hidden />
                {garden.type}
              </p>
            </Entrance>
            <Entrance delay={0.08}>
              <h1 className="mt-5 font-display text-[clamp(1.9rem,7vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-charcoal text-balance">
                {garden.name}
              </h1>
            </Entrance>
            <Entrance delay={0.14}>
              <a
                href={gardenMapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-start gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-forest"
              >
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                {gardenAddress} · {garden.location.plusCode}
              </a>
            </Entrance>
            <Entrance delay={0.2}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
                <span className="font-display font-semibold text-forest">
                  {garden.tagline}
                </span>{" "}
                {garden.intro}
              </p>
            </Entrance>
            <Entrance delay={0.28}>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/explore" size="lg">
                  Start Exploring
                  <ArrowRight
                    className="size-5 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </ButtonLink>
                <ButtonLink href="/guidelines" size="lg" variant="secondary">
                  Garden Guidelines
                </ButtonLink>
              </div>
            </Entrance>
          </div>

          <Entrance delay={0.2}>
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[3rem] bg-leaf/15 blur-3xl"
              />
              <Photo
                photo={heroPhoto}
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="relative"
              />
            </div>
          </Entrance>
        </div>
      </section>

      {/* Visitor facts */}
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <Entrance>
          <dl className="grid gap-4 rounded-3xl border border-forest/10 bg-white p-6 shadow-card sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs font-semibold uppercase tracking-widest text-stone">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-charcoal">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </Entrance>
      </section>

      {/* Have a look around — stand-in photos until on-site shots exist */}
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <Entrance>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-charcoal text-balance sm:text-4xl">
            Have a look around
          </h2>
        </Entrance>
        <Entrance delay={0.08}>
          <p className="mt-2 max-w-xl text-base text-ink-soft">
            The trees, the shade, the play corner — the things these trails
            celebrate.
          </p>
        </Entrance>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featurePhotos.map((photo, i) => (
            <Entrance key={photo.src} delay={0.08 * (i + 1)}>
              <Photo
                photo={photo}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="h-full"
              />
            </Entrance>
          ))}
        </div>
      </section>

      {/* Trails in this garden */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Entrance>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-charcoal text-balance sm:text-4xl">
                Trails in this garden
              </h2>
            </Entrance>
            <Entrance delay={0.08}>
              <p className="mt-2 max-w-xl text-base text-ink-soft">
                Each trail is a short loop of discoveries. Scan any code to
                start — you can arrive anywhere along the way.
              </p>
            </Entrance>
          </div>
          <Entrance delay={0.12}>
            <Link
              href="/explore"
              className="group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-forest transition-colors hover:bg-forest/5"
            >
              All trails
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </Entrance>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {trails.map((trail, i) => (
            <Entrance key={trail.id} delay={0.08 * (i + 1)}>
              <TrailCard trail={trail} />
            </Entrance>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Entrance>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-charcoal text-balance sm:text-4xl">
            How it works
          </h2>
        </Entrance>
        <div className="mt-8">
          <HowItWorks />
        </div>
      </section>

      {/* Also in the garden */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <Entrance>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-charcoal text-balance sm:text-4xl">
            Also in the garden
          </h2>
        </Entrance>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              href: "/flora",
              icon: Leaf,
              title: "Flora",
              text: "Short introductions to the plants beside you.",
            },
            {
              href: "/guidelines",
              icon: Flower2,
              title: "Guidelines",
              text: "A few gentle rules that keep the garden thriving.",
            },
            {
              href: "/about",
              icon: Trees,
              title: "About",
              text: "What QR Trails is, and what it does not do.",
            },
          ].map((card, i) => (
            <Entrance key={card.title} delay={0.08 * (i + 1)}>
              <Link
                href={card.href}
                className="group flex h-full flex-col rounded-3xl border border-forest/10 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-forest/10 text-forest">
                  <card.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-charcoal">
                  {card.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft">
                  {card.text}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
                  Open
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </Entrance>
          ))}
        </div>
      </section>

      {/* Location footer band */}
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <Entrance>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[2.5rem] bg-forest px-6 py-8 text-cream sm:px-10">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-sun" aria-hidden />
              <div>
                <p className="font-display text-xl font-semibold">
                  {gardenAddress}
                </p>
                <p className="mt-1 text-sm text-cream/75">
                  Plus Code {garden.location.plusCode} ·{" "}
                  {garden.location.state}
                </p>
              </div>
            </div>
            <a
              href={gardenMapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-forest transition-all duration-200 hover:-translate-y-px hover:bg-white"
            >
              Open in Maps
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </Entrance>
      </section>

      {garden.hours ? null : (
        <p className="mx-auto flex max-w-6xl items-center gap-2 px-4 pb-10 text-xs text-stone sm:px-6">
          <Clock className="size-3.5" aria-hidden />
          Opening hours are posted at the garden gate.
        </p>
      )}
    </main>
  );
}
