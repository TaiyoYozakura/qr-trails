import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ScanLine } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { Entrance } from "@/components/entrance";
import { HowItWorks } from "@/components/how-it-works";
import { QrScanner } from "@/components/qr-scanner";
import { TrailCard } from "@/components/trail-card";
import { garden, trails } from "@/data";

export const metadata: Metadata = {
  title: "There's more here than meets the eye",
  description:
    "QR Trails turns a garden visit into a learning adventure. Scan a QR code, discover something new, and follow the trail.",
};

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24 lg:pt-20">
          <div>
            <Entrance>
              <p className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-forest">
                <ScanLine className="size-3.5" aria-hidden />
                Scan to explore
              </p>
            </Entrance>
            <Entrance delay={0.08}>
              <h1 className="mt-5 font-display text-[clamp(2.3rem,9vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-charcoal text-balance">
                There&apos;s more here than meets the eye.
              </h1>
            </Entrance>
            <Entrance delay={0.16}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
                Turn a walk through {garden.shortName} into a learning
                adventure. Scan a QR code anywhere in the garden and unlock a
                short, playful discovery — no app, no account.
              </p>
            </Entrance>
            <Entrance delay={0.26}>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/explore" size="lg">
                  Start Exploring
                  <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                </ButtonLink>
                <ButtonLink href="/garden" size="lg" variant="secondary">
                  Explore the Garden
                </ButtonLink>
              </div>
            </Entrance>
          </div>

          <Entrance delay={0.2}>
            <div className="relative mx-auto w-full max-w-sm">
              <div
                aria-hidden
                className="absolute -inset-8 rounded-full bg-leaf/20 blur-3xl"
              />
              <div className="relative rounded-[2rem] border border-forest/10 bg-white p-6 shadow-card">
                <QrScanner className="w-full" />
                <p className="mt-4 text-center text-sm font-medium text-ink-soft">
                  Scan. Discover. Learn. Play.
                </p>
              </div>
            </div>
          </Entrance>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <Entrance>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-charcoal text-balance sm:text-4xl">
            How it works
          </h2>
        </Entrance>
        <Entrance delay={0.1}>
          <p className="mt-2 text-base text-ink-soft">
            No instructions needed. Just your phone and the garden.
          </p>
        </Entrance>
        <div className="mt-8">
          <HowItWorks />
        </div>
      </section>

      {/* Trails */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Entrance>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-charcoal text-balance sm:text-4xl">
                {trails.length} trails. One garden.
              </h2>
            </Entrance>
            <Entrance delay={0.1}>
              <p className="mt-2 max-w-xl text-base text-ink-soft">
                Short trails, each with its own story — a memorial, the trees
                that shade you, the people who keep this place alive.
              </p>
            </Entrance>
          </div>
          <Entrance delay={0.15}>
            <Link
              href="/explore"
              className="group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-forest transition-colors hover:bg-forest/5"
            >
              All trails
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
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

      {/* Garden band */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Entrance>
          <div className="rounded-[2.5rem] bg-forest px-6 py-12 text-center text-cream sm:px-12 sm:py-16">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              The garden is the classroom.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-cream/80">
              The QR codes are the chapters. Come see what&apos;s growing right
              beside you in {garden.shortName}.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink
                href="/garden"
                size="lg"
                className="bg-cream text-forest hover:bg-white"
              >
                Explore the Garden
              </ButtonLink>
              <ButtonLink
                href="/guidelines"
                size="lg"
                className="border border-cream/30 bg-transparent text-cream hover:bg-cream/10"
              >
                Garden Guidelines
              </ButtonLink>
            </div>
          </div>
        </Entrance>
      </section>
    </main>
  );
}