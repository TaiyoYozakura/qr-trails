"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Compass, RotateCcw } from "lucide-react";
import { Celebration } from "@/components/illustrations/celebration";
import { ButtonLink } from "@/components/button";
import { ProgressBar } from "@/components/progress-bar";
import { NextTopicButton } from "@/components/topic-step-link";
import { completeTopic, getTrailProgress, getQuizScores } from "@/lib/progress";
import type { Topic, Trail } from "@/types";

export function ResultClient({
  kind,
  quizId,
  topic,
  trail,
  nextTopic,
}: {
  kind: "quiz" | "trail";
  quizId?: string;
  topic?: Topic;
  trail?: Trail;
  nextTopic?: Topic;
}) {
  // Idempotent: mark the discovery complete even if the user landed here directly.
  useEffect(() => {
    if (kind === "quiz" && topic) {
      completeTopic(topic.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (kind === "quiz" && quizId && topic && trail) {
    return <QuizResult quizId={quizId} topic={topic} trail={trail} nextTopic={nextTopic} />;
  }

  if (kind === "trail" && trail) {
    return <TrailRecap trail={trail} />;
  }

  return null;
}

function QuizResult({
  quizId,
  topic,
  trail,
  nextTopic,
}: {
  quizId: string;
  topic: Topic;
  trail: Trail;
  nextTopic?: Topic;
}) {
  const score = getQuizScores()[quizId];
  const percent = score ? Math.round((score.score / score.total) * 100) : 0;
  const trailProgress = getTrailProgress(trail.topicIds);
  const trailDone = trailProgress.completed === trailProgress.total;

  return (
    <main className="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6">
      <Celebration className="mx-auto w-40" />

      <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-stone">
        Discovery complete
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
        {topic.title}
      </h1>

      {score && (
        <div className="mx-auto mt-8 max-w-sm rounded-3xl border border-forest/10 bg-white p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone">
            Quiz score
          </p>
          <p className="mt-1 font-display text-5xl font-semibold text-forest">
            {score.score}
            <span className="text-2xl text-stone"> / {score.total}</span>
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            {percent === 100
              ? "Perfect score — brilliant!"
              : percent >= 60
                ? "Nice work — you got it."
                : "Every visit teaches something new."}
          </p>
        </div>
      )}

      <div className="mt-8 rounded-3xl border border-forest/10 bg-white p-6 text-left shadow-card">
        <div className="flex items-center justify-between text-sm font-semibold">
          <span className="text-charcoal">{trail.title}</span>
          <span className="text-forest">
            {trailProgress.completed} / {trailProgress.total} discoveries
          </span>
        </div>
        <ProgressBar value={trailProgress.percent} className="mt-3" />
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        {trailDone ? (
          <ButtonLink href={`/result/${trail.id}`} size="lg">
            Trail complete — see your recap
            <ArrowRight
              className="size-5 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </ButtonLink>
        ) : nextTopic ? (
          // A locked neighbour stays disabled until its QR code is scanned.
          <NextTopicButton topicId={nextTopic.id} />
        ) : null}
        <ButtonLink href={`/trail/${trail.id}`} size="lg" variant="secondary">
          Back to trail
        </ButtonLink>
      </div>
    </main>
  );
}

function TrailRecap({ trail }: { trail: Trail }) {
  const progress = getTrailProgress(trail.topicIds);
  const scores = getQuizScores();
  const quizResults = trail.topicIds
    .map((topicId) => scores[topicId])
    .filter((s): s is { score: number; total: number } => Boolean(s));
  const avg =
    quizResults.length > 0
      ? Math.round(
          (quizResults.reduce((sum, s) => sum + s.score, 0) /
            quizResults.reduce((sum, s) => sum + s.total, 0)) *
            100,
        )
      : 0;

  return (
    <main className="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6">
      <Celebration className="mx-auto w-44" />

      <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-stone">
        {trail.category} complete
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
        Trail complete.
      </h1>
      <p className="mx-auto mt-3 max-w-md text-lg text-ink-soft">
        {trail.description}
      </p>

      <div className="mx-auto mt-10 max-w-md rounded-3xl border border-forest/10 bg-white p-6 text-left shadow-card">
        <div className="flex items-center justify-between text-sm font-semibold">
          <span className="text-charcoal">{trail.title}</span>
          <span className="text-forest">
            {progress.completed} / {progress.total}
          </span>
        </div>
        <ProgressBar value={progress.percent} className="mt-3" />

        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-forest/10 pt-5 text-center">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-widest text-stone">
              Discoveries
            </dt>
            <dd className="mt-1 font-display text-3xl font-semibold text-forest">
              {progress.completed} / {progress.total}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-widest text-stone">
              Quiz average
            </dt>
            <dd className="mt-1 font-display text-3xl font-semibold text-forest">
              {quizResults.length > 0 ? `${avg}%` : "—"}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mx-auto mt-8 max-w-md rounded-[2rem] bg-forest px-6 py-8 text-cream">
        <p className="font-display text-2xl font-semibold leading-snug">
          You didn&apos;t just take a walk.
        </p>
        <p className="mt-1 font-display text-2xl font-semibold leading-snug text-sun">
          You discovered how a garden works.
        </p>
      </div>

      <Link
        href="/guidelines"
        className="group mx-auto mt-8 flex max-w-md items-center justify-between gap-4 rounded-3xl border border-forest/10 bg-white p-5 text-left shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
      >
        <span>
          <span className="text-xs font-semibold uppercase tracking-widest text-stone">
            Before you go
          </span>
          <span className="mt-1 block text-sm leading-relaxed text-ink-soft">
            A quick reminder of the garden&apos;s do&apos;s and don&apos;ts.
          </span>
        </span>
        <ArrowRight
          className="size-5 shrink-0 text-forest transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden
        />
      </Link>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href="/explore" size="lg">
          Explore another trail
          <ArrowRight
            className="size-5 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden
          />
        </ButtonLink>
        <ButtonLink href="/garden" size="lg" variant="secondary">
          <Compass className="size-5" aria-hidden />
          Explore the garden
        </ButtonLink>
      </div>

      <Link
        href={`/trail/${trail.id}`}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-forest"
      >
        <RotateCcw className="size-4" aria-hidden />
        Walk the trail again
      </Link>
    </main>
  );
}