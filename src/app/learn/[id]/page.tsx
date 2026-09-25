import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { Entrance } from "@/components/entrance";
import { TopicIllustration } from "@/components/illustrations/topic";
import { Photo } from "@/components/photo";
import { TopicNavCard } from "@/components/topic-step-link";
import { UnlockGate } from "@/components/unlock-gate";
import { ViewName } from "@/components/view-name";
import { getTopicPosition, topicPhotos } from "@/data";

// NOTE: this route reads `?scan=1`, so it is server-rendered on demand rather
// than prerendered — that is what lets the server decide locked vs unlocked
// without a flash of the wrong state. See `components/unlock-gate.tsx`.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const position = getTopicPosition(id);
  if (!position?.topic) return { title: "Discovery" };
  return {
    title: position.topic.title,
    description: position.topic.hook,
  };
}

export default async function LearnPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const query = await searchParams;
  // The garden's QR codes point at `/learn/<id>?scan=1`; that query is the only
  // thing that unlocks the stop on a visitor's device (see `UnlockGate`).
  const rawScan = query.scan;
  const scanned = (Array.isArray(rawScan) ? rawScan[0] : rawScan) === "1";

  const position = getTopicPosition(id);
  if (!position?.topic || !position.trail) notFound();

  const { topic, trail, index, count, previous, next } = position;
  const photo = topicPhotos[topic.id];

  return (
    <UnlockGate topicId={topic.id} scanned={scanned}>
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* trail context bar */}
        <Entrance>
          <div className="flex items-center justify-between gap-3">
            <Link
              href={`/trail/${trail.id}`}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-forest transition-colors hover:bg-forest/5"
            >
              <ArrowLeft className="size-4" aria-hidden />
              {trail.title}
            </Link>
            <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-forest">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(count).padStart(2, "0")}
            </span>
          </div>
        </Entrance>

        {/* label + title */}
        <Entrance delay={0.08}>
          <p className="mt-10 text-xs font-semibold uppercase tracking-widest text-stone">
            {trail.category} · {String(index + 1).padStart(2, "0")}
          </p>
        </Entrance>
        <Entrance delay={0.15}>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight text-charcoal sm:text-5xl">
            <ViewName name={`topic-${topic.id}`}>{topic.title}</ViewName>
          </h1>
        </Entrance>
        <Entrance delay={0.22}>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            {topic.hook}
          </p>
        </Entrance>

        {/* illustration */}
        <Entrance delay={0.3}>
          <div className="mt-8 overflow-hidden rounded-[2rem] border border-forest/10 bg-white p-6 shadow-card sm:p-8">
            <TopicIllustration
              kind={topic.visual}
              accent={topic.accent}
              className="mx-auto w-full max-w-sm"
            />
          </div>
        </Entrance>

        {/* real photo when we have one for this stop */}
        {photo && (
          <Entrance delay={0.36}>
            <Photo
              photo={photo}
              sizes="(min-width: 768px) 48rem, 100vw"
              className="mt-6"
            />
          </Entrance>
        )}

        {/* explanation */}
        <section className="mt-10 space-y-4">
          {topic.explanation.map((line, i) => (
            <Entrance key={line} delay={0.4 + i * 0.1}>
              <p className="text-base leading-relaxed text-charcoal sm:text-lg">
                {line}
              </p>
            </Entrance>
          ))}
        </section>

        {/* fun fact */}
        <Entrance delay={0.55}>
          <div className="mt-8 flex gap-4 rounded-3xl border border-sun/50 bg-sun-soft/60 p-6 shadow-card">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sun/60 text-forest">
              <Lightbulb className="size-5" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-forest">
                Did you know?
              </p>
              <p className="mt-1.5 text-base leading-relaxed text-charcoal">
                {topic.funFact}
              </p>
            </div>
          </div>
        </Entrance>

        {/* optional follow-up link (e.g. the clean-up stop → Guidelines) */}
        {topic.related && (
          <Entrance delay={0.62}>
            <Link
              href={topic.related.href}
              className="group mt-6 flex items-center justify-between gap-4 rounded-3xl border border-forest/10 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-stone">
                  {topic.related.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {topic.related.text}
                </p>
              </div>
              <ArrowRight
                className="size-5 shrink-0 text-forest transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </Entrance>
        )}

        {/* quiz CTA */}
        <Entrance delay={0.68}>
          <div className="mt-8 rounded-3xl border border-forest/10 bg-white p-6 text-center shadow-card sm:p-8">
            <p className="font-display text-2xl font-semibold text-charcoal">
              Think you got it?
            </p>
            <p className="mt-1.5 text-sm text-ink-soft">
              Three quick questions. You&apos;ve got this.
            </p>
            <div className="mt-6">
              <ButtonLink href={`/quiz/${topic.quizId}`} size="lg">
                Take the quick quiz
                <ArrowRight
                  className="size-5 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </ButtonLink>
            </div>
          </div>
        </Entrance>

        {/* prev / next — locked neighbours are shown but disabled */}
        <Entrance delay={0.75}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-stretch">
            {previous ? (
              <TopicNavCard topicId={previous.id} direction="previous" />
            ) : (
              <div className="hidden flex-1 sm:block" aria-hidden />
            )}

            {next ? (
              <TopicNavCard topicId={next.id} direction="next" />
            ) : (
              <Link
                href={`/result/${trail.id}`}
                className="group flex flex-1 items-center justify-between gap-3 rounded-3xl bg-forest p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:bg-forest-deep"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-cream/70">
                  Last stop
                </span>
                <span className="flex items-center gap-1.5 font-display text-lg font-semibold text-cream">
                  Complete Trail
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            )}
          </div>
        </Entrance>
      </main>
    </UnlockGate>
  );
}
