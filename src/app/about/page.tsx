import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { QrScanner } from "@/components/qr-scanner";
import { Entrance } from "@/components/entrance";
import {
  garden,
  gardenAddress,
  gardenMapUrl,
  gardenPanoPhoto,
  plants,
  topics,
  trails,
} from "@/data";

export const metadata: Metadata = {
  title: "About",
  description: `QR Trails adds a digital learning layer to ${garden.name} in ${garden.location.area} — a Community Engagement Project prototype.`,
};

const points = [
  {
    title: "The idea",
    text: "A garden is full of things to discover — memorials, trees, flowers, the people who walk here daily. QR Trails adds a short, playful digital layer to that experience.",
  },
  {
    title: "No app. No account.",
    text: "Visitors scan a QR code with their phone camera. Every experience is short, visual and self-contained — it works even if you only ever scan one code.",
  },
  {
    title: "Connected stories",
    text: "Discoveries are connected into trails. Each one answers a question and sets up the next — a memorial leads to the garden's name, a tree leads to the shade it gives.",
  },
  {
    title: "Progress on your phone",
    text: "Completed discoveries and quiz scores are saved locally in your own browser. No personal data is collected, stored or shared.",
  },
];

export default function AboutPage() {
  const stats = [
    { value: trails.length, label: "Trails" },
    { value: topics.length, label: "Discoveries" },
    { value: plants.length, label: "Flora entries" },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Entrance>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
              Turn a garden visit into a learning adventure.
            </h1>
          </Entrance>
          <Entrance delay={0.1}>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
              QR Trails connects physical places to concise, interactive digital
              experiences — the garden is the classroom, and the QR codes are
              the chapters.
            </p>
          </Entrance>
          <Entrance delay={0.16}>
            <a
              href={gardenMapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-start gap-2 rounded-3xl border border-forest/10 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <MapPin className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden />
              <span>
                <span className="block font-display text-lg font-semibold text-charcoal">
                  {garden.name}
                </span>
                <span className="mt-0.5 block text-sm text-ink-soft">
                  {gardenAddress} · {garden.location.plusCode}
                </span>
              </span>
            </a>
          </Entrance>
        </div>
        <Entrance delay={0.15}>
          <div className="relative mx-auto w-full max-w-xs">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-full bg-leaf/20 blur-3xl"
            />
            <div className="relative rounded-[2rem] border border-forest/10 bg-white p-5 shadow-card">
              <QrScanner className="w-full" />
            </div>
          </div>
        </Entrance>
      </div>

      <section className="mt-16 grid gap-5 sm:grid-cols-2">
        {points.map((point, i) => (
          <Entrance key={point.title} delay={0.06 * (i + 1)}>
            <div className="h-full rounded-3xl border border-forest/10 bg-white p-6 shadow-card">
              <h2 className="font-display text-xl font-semibold text-charcoal">
                {point.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {point.text}
              </p>
            </div>
          </Entrance>
        ))}
      </section>

      <Entrance delay={0.12}>
        <dl className="mt-12 grid gap-4 rounded-3xl border border-forest/10 bg-white p-6 text-center shadow-card sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dd className="font-display text-4xl font-semibold text-forest">
                {stat.value}
              </dd>
              <dt className="mt-1 text-xs font-semibold uppercase tracking-widest text-stone">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </Entrance>

      <Entrance delay={0.15}>
        <div className="mt-12 rounded-[2.5rem] border border-forest/10 bg-white px-6 py-10 text-center shadow-card">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-charcoal">
            A Community Engagement Project
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
            QR Trails is a prototype built for a community engagement project in{" "}
            {garden.location.area}. It is deliberately simple: static content, no
            backend, no accounts — so it stays fast, reliable and easy to
            maintain on any phone.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-semibold">
            <Link
              href="/garden"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-forest transition-colors hover:bg-forest/5"
            >
              About the garden
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-forest transition-colors hover:bg-forest/5"
            >
              Browse the trails
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Entrance>
      {/* The developer */}
      <section className="py-10">
        <Entrance delay={0.1}>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-forest px-6 py-14 text-center text-cream sm:px-12">
            <Image
              src={gardenPanoPhoto.src}
              alt=""
              width={1600}
              height={720}
              sizes="100vw"
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-10"
            />
            <div className="relative">
              <div
                aria-hidden
                className="mx-auto grid size-16 place-items-center rounded-full border border-cream/25 bg-cream/10 font-display text-xl font-semibold tracking-wide"
              >
                LA
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">
                Built by
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Lorde Aizen
              </h2>
              <p className="mx-auto mt-7 max-w-xl font-display text-xl leading-relaxed text-cream/90 sm:text-2xl">
                &ldquo;Most things are decided long before they&rsquo;re
                revealed.&rdquo;
              </p>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream/75 sm:text-base">
                I build with that in mind — understanding the system beneath
                the surface, thinking several steps ahead, and turning ideas
                into deliberate, working experiences.
              </p>
              <p className="mt-9 font-display text-sm font-semibold uppercase tracking-[0.3em] text-sun">
                Observe. Understand. Create.
              </p>
            </div>
          </div>
        </Entrance>
      </section>
    </main>
  );
}
