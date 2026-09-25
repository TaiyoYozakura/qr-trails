import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  Dumbbell,
  Footprints,
  HelpCircle,
  PersonStanding,
  Sparkles,
} from "lucide-react";
import { Entrance } from "@/components/entrance";
import {
  facilities,
  playFitnessIntro,
  type Facility,
} from "@/data/play-and-fitness";
import { garden, gardenPanoPhoto, gardenPlaygroundPhoto, gardenPlayEquipmentPhoto, outdoorGymPhoto } from "@/data";

export const metadata: Metadata = {
  title: "Play & Fitness",
  description: `${garden.shortName}'s play corner and open workout space — slides, the climbing wall, the walking track and room to move.`,
};

const zoneMeta: Record<
  Facility["zone"],
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  play: { label: "Play corner", icon: Baby },
  fitness: { label: "Fitness", icon: Dumbbell },
  movement: { label: "Move", icon: Footprints },
};

export default function PlayFitnessPage() {
  const zones: Facility["zone"][] = ["play", "fitness", "movement"];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Entrance>
        <p className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-forest">
          <Sparkles className="size-3.5" aria-hidden />
          Renovated 2024
        </p>
      </Entrance>
      <Entrance delay={0.08}>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-charcoal text-balance sm:text-5xl">
          Play, run, stretch — the garden moves with you.
        </h1>
      </Entrance>
      <Entrance delay={0.16}>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {playFitnessIntro}
        </p>
      </Entrance>

      <Entrance delay={0.22}>
        <div className="relative mt-8 overflow-hidden rounded-[2.5rem] shadow-card">
          <Image
            src={gardenPlaygroundPhoto.src}
            alt={gardenPlaygroundPhoto.alt}
            width={1200}
            height={1600}
            sizes="(min-width: 1152px) 72rem, 100vw"
            style={
              gardenPlaygroundPhoto.focus
                ? { objectPosition: gardenPlaygroundPhoto.focus }
                : undefined
            }
            className="aspect-[21/9] w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent"
          />
          <p className="absolute inset-x-0 bottom-0 p-5 text-sm font-medium text-cream sm:p-6">
            {gardenPlaygroundPhoto.caption}{" "}
            <a
              href={gardenPlaygroundPhoto.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-cream/70 underline decoration-cream/40 underline-offset-2"
            >
              {gardenPlaygroundPhoto.credit}
            </a>
          </p>
        </div>
      </Entrance>

      {/* The corner, up close — post-renovation shots from the listing */}
      <section className="mx-auto mt-10 max-w-4xl">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[gardenPlaygroundPhoto, gardenPlayEquipmentPhoto, outdoorGymPhoto].map(
            (photo) => (
              <figure
                key={photo.src}
                className="overflow-hidden rounded-3xl shadow-card"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={480}
                  height={640}
                  sizes="(min-width: 768px) 21rem, 50vw"
                  className="aspect-[3/4] w-full object-cover"
                />
                <figcaption className="bg-white px-4 py-3 text-xs leading-relaxed text-stone">
                  {photo.standIn && (
                    <span className="mb-1 inline-block rounded-full bg-sun-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-forest">
                      sample photo
                    </span>
                  )}
                  {" "}
                  {photo.caption}{" "}
                  <a
                    href={photo.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-stone/40 underline-offset-2 hover:text-forest"
                  >
                    {photo.credit}
                  </a>
                </figcaption>
              </figure>
            ),
          )}
        </div>
      </section>

      {zones.map((zone, zi) => {
        const items = facilities.filter((f) => f.zone === zone);
        if (items.length === 0) return null;
        const meta = zoneMeta[zone];
        return (
          <section key={zone} className="mt-12">
            <Entrance delay={0.05 * zi}>
              <h2 className="flex items-center gap-2.5 font-display text-2xl font-semibold tracking-tight text-charcoal">
                <span className="grid size-10 place-items-center rounded-2xl bg-forest/10 text-forest">
                  <meta.icon className="size-5" aria-hidden />
                </span>
                {meta.label}
              </h2>
            </Entrance>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {items.map((item, i) => (
                <Entrance key={item.id} delay={0.06 * (i + 1)}>
                  <div className="flex h-full flex-col rounded-3xl border border-forest/10 bg-white p-6 shadow-card">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl font-semibold text-charcoal">
                        {item.name}
                      </h3>
                      {item.evidence === "reported" ? (
                        <span className="mt-0.5 shrink-0 rounded-full bg-forest/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-forest">
                          seen in reviews
                        </span>
                      ) : (
                        <span className="mt-0.5 flex shrink-0 items-center gap-1 rounded-full bg-sun-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-forest">
                          <HelpCircle className="size-3" aria-hidden />
                          to confirm
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-stone">
                      For {item.who}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                      {item.text}
                    </p>
                  </div>
                </Entrance>
              ))}
            </div>
          </section>
        );
      })}

      <Entrance delay={0.1}>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <div className="rounded-3xl border border-sun/50 bg-sun-soft/50 p-6">
            <h2 className="font-display text-xl font-semibold text-charcoal">
              Know what&apos;s actually there?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              The &quot;to confirm&quot; items come from general reports — a quick
              visit settles them. Staff can note the real equipment in the
              admin console before printing QR codes.
            </p>
          </div>
          <div className="rounded-3xl border border-forest/10 bg-white p-6 shadow-card">
            <PersonStanding className="size-6 text-forest" aria-hidden />
            <h2 className="mt-3 font-display text-xl font-semibold text-charcoal">
              How this connects to the trails
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              The Play Trail turns this corner into a physics lesson — every
              swing and slide hides one.
            </p>
            <Link
              href="/trail/play-trail"
              className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest"
            >
              Walk the Play Trail
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </Entrance>

      <Entrance delay={0.15}>
        <div className="relative mt-12 overflow-hidden rounded-[2.5rem] bg-forest px-6 py-10 text-center text-cream sm:px-10">
          <Image
            src={gardenPanoPhoto.src}
            alt=""
            width={1600}
            height={720}
            sizes="100vw"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-15"
          />
          <div className="relative">
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Everything here is free to use — just share it kindly.
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-cream/80">
              {garden.hours}. Take turns, keep the corner tidy, and let the
              little ones have the slides.
            </p>
          </div>
        </div>
      </Entrance>
    </main>
  );
}
