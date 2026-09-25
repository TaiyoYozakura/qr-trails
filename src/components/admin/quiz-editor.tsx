"use client";

import { Check, Plus, Trash2 } from "lucide-react";
import type { Quiz, QuizQuestion } from "@/types";
import { cn } from "@/lib/utils";
import { Btn, Field, TextArea, TextInput } from "./ui";

/**
 * Question editor shared by the Discoveries and Quizzes tabs.
 * Validation lives in `lib/content-tools.ts` — this only edits.
 */
export function QuizEditor({
  quiz,
  onChange,
  compact,
}: {
  quiz: Quiz;
  onChange: (quiz: Quiz) => void;
  compact?: boolean;
}) {
  const setQuestion = (index: number, patch: Partial<QuizQuestion>) =>
    onChange({
      ...quiz,
      questions: quiz.questions.map((question, i) =>
        i === index ? { ...question, ...patch } : question,
      ),
    });

  const addQuestion = () =>
    onChange({
      ...quiz,
      questions: [
        ...quiz.questions,
        {
          question: "",
          options: ["", "", "", ""],
          correctIndex: 0,
          explanation: "",
        },
      ],
    });

  return (
    <div className={cn("space-y-4", compact && "space-y-3")}>
      {quiz.questions.map((question, index) => (
        <div
          key={index}
          className="rounded-2xl border border-forest/10 bg-cream/30 p-4"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-stone">
              Question {index + 1} of {quiz.questions.length}
            </p>
            <Btn
              variant="ghost"
              title="Remove question"
              onClick={() =>
                onChange({
                  ...quiz,
                  questions: quiz.questions.filter((_, i) => i !== index),
                })
              }
            >
              <Trash2 className="size-3.5" aria-hidden />
            </Btn>
          </div>

          <div className="mt-3 space-y-3">
            <Field label="Question">
              <TextInput
                value={question.question}
                onChange={(value) => setQuestion(index, { question: value })}
                placeholder="What does a leaf use to help make food?"
              />
            </Field>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-stone">
                Options · tap the circle to mark the correct one
              </p>
              <div className="mt-2 space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={`Mark option ${optionIndex + 1} correct`}
                      onClick={() =>
                        setQuestion(index, { correctIndex: optionIndex })
                      }
                      className={cn(
                        "grid size-7 shrink-0 place-items-center rounded-full border-2 transition-colors",
                        question.correctIndex === optionIndex
                          ? "border-leaf bg-leaf text-white"
                          : "border-forest/20 bg-white text-transparent hover:border-forest/40",
                      )}
                    >
                      <Check className="size-3.5" aria-hidden />
                    </button>
                    <TextInput
                      value={option}
                      placeholder={`Option ${optionIndex + 1}`}
                      onChange={(value) =>
                        setQuestion(index, {
                          options: question.options.map((o, i) =>
                            i === optionIndex ? value : o,
                          ),
                        })
                      }
                    />
                    <Btn
                      variant="ghost"
                      title="Remove option"
                      onClick={() =>
                        setQuestion(index, {
                          options: question.options.filter(
                            (_, i) => i !== optionIndex,
                          ),
                          correctIndex:
                            question.correctIndex > optionIndex
                              ? question.correctIndex - 1
                              : question.correctIndex,
                        })
                      }
                    >
                      <Trash2 className="size-3.5" aria-hidden />
                    </Btn>
                  </div>
                ))}
                <Btn
                  variant="secondary"
                  onClick={() =>
                    setQuestion(index, { options: [...question.options, ""] })
                  }
                >
                  <Plus className="size-3.5" aria-hidden />
                  Add option
                </Btn>
              </div>
            </div>

            <Field
              label="Explanation"
              hint="Shown after answering, whether right or wrong."
            >
              <TextArea
                rows={2}
                value={question.explanation}
                onChange={(value) => setQuestion(index, { explanation: value })}
                placeholder="Leaves capture sunlight and use it to help the plant make food."
              />
            </Field>
          </div>
        </div>
      ))}

      <Btn variant="secondary" onClick={addQuestion}>
        <Plus className="size-3.5" aria-hidden />
        Add question
      </Btn>
    </div>
  );
}
