"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { QuizEditor } from "@/components/admin/quiz-editor";
import { Btn, DeleteBtn, Panel, SelectField } from "@/components/admin/ui";
import { useDraft } from "@/lib/draft-store";

export default function AdminQuizzesPage() {
  const { draft, update } = useDraft();
  const [openId, setOpenId] = useState<string | null>(null);

  const missing = draft.topics.filter(
    (topic) => !draft.quizzes.some((quiz) => quiz.id === topic.quizId),
  );

  return (
    <div className="space-y-6">
      <Panel
        title="Quizzes"
        description="Every discovery ends in a 3-question quiz. Each question has options, one correct answer and an explanation that shows whatever the visitor picked."
      >
        {missing.length > 0 && (
          <div className="mb-5 rounded-2xl border border-sun/60 bg-sun-soft/50 p-4">
            <p className="text-sm font-semibold text-charcoal">
              {missing.length} discovery{missing.length === 1 ? "" : "ies"} without a
              quiz
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {missing.map((topic) => (
                <Btn
                  key={topic.id}
                  variant="secondary"
                  onClick={() =>
                    update((current) => ({
                      ...current,
                      quizzes: [
                        ...current.quizzes,
                        {
                          id: topic.quizId,
                          topicId: topic.id,
                          questions: [
                            {
                              question: "",
                              options: ["", "", ""],
                              correctIndex: 0,
                              explanation: "",
                            },
                          ],
                        },
                      ],
                    }))
                  }
                >
                  <Plus className="size-3.5" aria-hidden />
                  {topic.title}
                </Btn>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          {draft.quizzes.map((quiz) => {
            const topic = draft.topics.find((item) => item.id === quiz.topicId);
            const open = openId === quiz.id;
            return (
              <div
                key={quiz.id}
                className="rounded-2xl border border-forest/10 bg-cream/30"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : quiz.id)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span className="flex items-center gap-2">
                    {open ? (
                      <ChevronDown className="size-4 text-forest" aria-hidden />
                    ) : (
                      <ChevronRight className="size-4 text-forest" aria-hidden />
                    )}
                    <span className="font-display text-lg font-semibold text-charcoal">
                      {topic?.title ?? quiz.topicId}
                    </span>
                    <span className="rounded-full bg-forest/10 px-2.5 py-0.5 text-xs font-semibold text-forest">
                      {quiz.questions.length} questions
                    </span>
                  </span>
                  <span className="font-mono text-xs text-stone">{quiz.id}</span>
                </button>

                {open && (
                  <div className="space-y-4 border-t border-forest/10 p-4">
                    {topic ? (
                      <p className="text-xs text-ink-soft">
                        Attached to the discovery{" "}
                        <span className="font-mono">{topic.id}</span> in{" "}
                        <span className="font-mono">{topic.trailId}</span>.
                      </p>
                    ) : (
                      <div className="max-w-sm">
                        <SelectField
                          value={quiz.topicId}
                          options={["", ...draft.topics.map((item) => item.id)]}
                          onChange={(value) =>
                            update((current) => ({
                              ...current,
                              quizzes: current.quizzes.map((item) =>
                                item.id === quiz.id ? { ...item, topicId: value } : item,
                              ),
                            }))
                          }
                        />
                      </div>
                    )}

                    <QuizEditor
                      quiz={quiz}
                      onChange={(next) =>
                        update((current) => ({
                          ...current,
                          quizzes: current.quizzes.map((item) =>
                            item.id === next.id ? next : item,
                          ),
                        }))
                      }
                    />

                    <div className="flex justify-end">
                      <DeleteBtn
                        label="Delete quiz"
                        onDelete={() => {
                          if (
                            window.confirm(
                              `Delete the quiz for "${
                                topic?.title ?? quiz.topicId
                              }"? The discovery will show a missing-quiz warning.`,
                            )
                          ) {
                            update((current) => ({
                              ...current,
                              quizzes: current.quizzes.filter(
                                (item) => item.id !== quiz.id,
                              ),
                            }));
                            setOpenId(null);
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}
