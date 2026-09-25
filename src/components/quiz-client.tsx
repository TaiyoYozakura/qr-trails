"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import type { Quiz, Topic, Trail } from "@/types";
import { completeTopic, recordQuizScore } from "@/lib/progress";
import { Button, ButtonLink } from "./button";
import { cn } from "@/lib/utils";

export function QuizClient({
  quiz,
  topic,
  trail,
}: {
  quiz: Quiz;
  topic: Topic;
  trail: Trail;
}) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = quiz.questions.length;
  const question = quiz.questions[index];
  const isLast = index >= total - 1;
  // Defensive: never dereference the question before the finished/empty guard
  // below — a stray re-render with an out-of-range index used to crash the page.
  const correct =
    question !== undefined &&
    selected !== null &&
    selected === question.correctIndex;

  const handleSelect = (optionIndex: number) => {
    if (answered) return;
    setSelected(optionIndex);
    setAnswered(true);
    if (optionIndex === question.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleContinue = () => {
    if (isLast) {
      recordQuizScore(quiz.id, score, total);
      completeTopic(topic.id);
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setAnswered(false);
  };

  if (finished) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-stone">
            Quick quiz complete
          </p>
          <p className="mt-3 font-display text-5xl font-semibold text-charcoal">
            {score} / {total}
          </p>
          <p className="mt-3 text-lg text-ink-soft">
            {score === total
              ? "Perfect! You really know your stuff."
              : score >= Math.ceil(total / 2)
                ? "Great job! You've got the main idea."
                : "Good start — the discovery page has the answers."}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={`/result/${topic.id}`} size="lg">
              See your result
              <ArrowRight
                className="size-5 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </ButtonLink>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => router.push(`/learn/${topic.id}`)}
            >
              Back to discovery
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!question) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <p className="font-display text-2xl font-semibold text-charcoal">
          This quiz has no questions yet.
        </p>
        <div className="mt-6 flex justify-center">
          <ButtonLink href={`/learn/${topic.id}`} size="lg">
            Back to the discovery
          </ButtonLink>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <Link
          href={`/learn/${topic.id}`}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-forest transition-colors hover:bg-forest/5"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Discovery
        </Link>
        <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-forest">
          Quick quiz
        </span>
      </div>

      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-stone">
          {trail.category} · {topic.title}
        </p>

        {/* question progress dots */}
        <div className="mt-3 flex gap-1.5" aria-label="Question progress">
          {quiz.questions.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors duration-300",
                i < index
                  ? "bg-forest"
                  : i === index
                    ? "bg-leaf"
                    : "bg-forest/10",
              )}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mt-6 text-sm font-semibold text-ink-soft">
              Question {index + 1} / {total}
            </p>
            <h1 className="mt-2 font-display text-2xl font-semibold leading-snug tracking-tight text-charcoal sm:text-3xl">
              {question.question}
            </h1>

            <div className="mt-7 space-y-3">
              {question.options.map((option, optionIndex) => {
                const isSelected = selected === optionIndex;
                const isCorrectOption = optionIndex === question.correctIndex;
                let state: "idle" | "correct" | "wrong" = "idle";
                if (answered) {
                  if (isCorrectOption) state = "correct";
                  else if (isSelected) state = "wrong";
                }
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelect(optionIndex)}
                    disabled={answered}
                    className={cn(
                      "group flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all duration-200",
                      state === "idle" &&
                        "border-forest/15 bg-white hover:-translate-y-0.5 hover:border-forest/40 hover:shadow-card",
                      state === "correct" && "border-leaf bg-leaf/10",
                      state === "wrong" && "border-berry bg-berry/5",
                      answered && state === "idle" && "opacity-50",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold transition-colors",
                        state === "idle" &&
                          "bg-forest/10 text-forest group-hover:bg-forest/15",
                        state === "correct" && "bg-leaf text-white",
                        state === "wrong" && "bg-berry text-white",
                      )}
                    >
                      {state === "correct" ? (
                        <Check className="size-4" aria-hidden />
                      ) : state === "wrong" ? (
                        <X className="size-4" aria-hidden />
                      ) : (
                        String.fromCharCode(65 + optionIndex)
                      )}
                    </span>
                    <span
                      className={cn(
                        "text-base font-medium",
                        state === "correct"
                          ? "text-forest-deep"
                          : state === "wrong"
                            ? "text-berry"
                            : "text-charcoal",
                      )}
                    >
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* feedback */}
            <AnimatePresence>
              {answered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={cn(
                    "mt-6 rounded-2xl border p-5",
                    correct
                      ? "border-leaf/30 bg-leaf/10"
                      : "border-berry/30 bg-berry/5",
                  )}
                >
                  <p
                    className={cn(
                      "font-display text-lg font-semibold",
                      correct ? "text-forest-deep" : "text-berry",
                    )}
                  >
                    {correct ? "Correct!" : "Not quite."}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {question.explanation}
                  </p>
                  {!correct && (
                    <p className="mt-2 text-sm font-medium text-forest">
                      The answer: {question.options[question.correctIndex]}
                    </p>
                  )}
                  <div className="mt-4">
                    <Button onClick={handleContinue}>
                      {isLast ? "Finish" : "Continue"}
                      <ArrowRight
                        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}