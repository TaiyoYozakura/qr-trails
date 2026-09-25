"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, X } from "lucide-react";
import { QuizEditor } from "@/components/admin/quiz-editor";
import {
  Btn,
  ChipPicker,
  DeleteBtn,
  Field,
  Panel,
  SelectField,
  StringListEditor,
  TextArea,
  TextInput,
} from "@/components/admin/ui";
import { useDraft } from "@/lib/draft-store";
import { renameQuizId, renameTopicId, slugify, uniqueId } from "@/lib/content-tools";
import { VISUAL_KINDS, type Topic } from "@/types";

export default function AdminDiscoveriesPage() {
  const { draft, update } = useDraft();
  const [trailFilter, setTrailFilter] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const trailIds = draft.trails.map((trail) => trail.id);
  const visible =
    trailFilter === "all"
      ? draft.topics
      : draft.topics.filter((topic) => topic.trailId === trailFilter);

  const setTopic = (id: string, patch: Partial<Topic>) =>
    update((current) => ({
      ...current,
      topics: current.topics.map((topic) =>
        topic.id === id ? { ...topic, ...patch } : topic,
      ),
    }));

  const moveToTrail = (topic: Topic, nextTrailId: string) =>
    update((current) => ({
      ...current,
      trails: current.trails.map((trail) => {
        if (trail.id === topic.trailId) {
          return {
            ...trail,
            topicIds: trail.topicIds.filter((id) => id !== topic.id),
          };
        }
        if (trail.id === nextTrailId) {
          return { ...trail, topicIds: [...trail.topicIds, topic.id] };
        }
        return trail;
      }),
      topics: current.topics.map((item) =>
        item.id === topic.id ? { ...item, trailId: nextTrailId } : item,
      ),
    }));

  const addDiscovery = () => {
    const trailId = trailFilter === "all" ? trailIds[0] : trailFilter;
    if (!trailId) return;
    const id = uniqueId("new-discovery", draft.topics.map((t) => t.id));
    const quizId = uniqueId(id, draft.quizzes.map((q) => q.id));
    const trail = draft.trails.find((t) => t.id === trailId);
    update((current) => ({
      ...current,
      trails: current.trails.map((item) =>
        item.id === trailId
          ? { ...item, topicIds: [...item.topicIds, id] }
          : item,
      ),
      topics: [
        ...current.topics,
        {
          id,
          trailId,
          number: (trail?.topicIds.length ?? 0) + 1,
          title: "New discovery",
          hook: "",
          explanation: [""],
          funFact: "",
          visual: "leaf",
          placement: "",
          quizId,
        } satisfies Topic,
      ],
      quizzes: [
        ...current.quizzes,
        {
          id: quizId,
          topicId: id,
          questions: [
            { question: "", options: ["", "", ""], correctIndex: 0, explanation: "" },
          ],
        },
      ],
    }));
    setOpenId(id);
  };

  const removeDiscovery = (topic: Topic) => {
    if (
      !window.confirm(
        `Delete "${topic.title}" and its quiz? The stop is removed from the trail order too.`,
      )
    ) {
      return;
    }
    update((current) => ({
      ...current,
      trails: current.trails.map((trail) => ({
        ...trail,
        topicIds: trail.topicIds.filter((id) => id !== topic.id),
      })),
      topics: current.topics.filter((item) => item.id !== topic.id),
      quizzes: current.quizzes.filter((quiz) => quiz.id !== topic.quizId),
    }));
    setOpenId(null);
  };

  return (
    <div className="space-y-6">
      <Panel
        title="Discoveries"
        description="Each discovery is one QR stop: a hook, a short explanation, a fun fact, an illustration and a 3-question quiz. Its id becomes the URL, and its placement is the note printed on the QR sheet."
        actions={
          <Btn variant="primary" onClick={addDiscovery} disabled={trailIds.length === 0}>
            <Plus className="size-3.5" aria-hidden />
            New discovery
          </Btn>
        }
      >
        <ChipPicker
          value={trailFilter}
          onChange={setTrailFilter}
          options={["all", ...trailIds]}
        />

        {visible.length === 0 ? (
          <p className="mt-4 text-sm text-ink-soft">
            No discoveries in this trail yet.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {visible.map((topic) => {
              const open = openId === topic.id;
              const quiz = draft.quizzes.find((item) => item.id === topic.quizId);
              return (
                <div
                  key={topic.id}
                  className="rounded-2xl border border-forest/10 bg-cream/30"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : topic.id)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                  >
                    <span className="flex items-center gap-2">
                      {open ? (
                        <ChevronDown className="size-4 text-forest" aria-hidden />
                      ) : (
                        <ChevronRight className="size-4 text-forest" aria-hidden />
                      )}
                      <span className="font-display text-lg font-semibold text-charcoal">
                        {topic.title}
                      </span>
                      <span className="rounded-full bg-forest/10 px-2.5 py-0.5 text-xs font-semibold text-forest">
                        {topic.trailId}
                      </span>
                      {!quiz && (
                        <span className="rounded-full bg-berry/10 px-2.5 py-0.5 text-xs font-semibold text-berry">
                          no quiz
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-xs text-stone">{topic.id}</span>
                  </button>

                  {open && (
                    <div className="space-y-4 border-t border-forest/10 p-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Title">
                          <TextInput
                            value={topic.title}
                            onChange={(value) => setTopic(topic.id, { title: value })}
                          />
                        </Field>
                        <Field label="Trail">
                          <SelectField
                            value={topic.trailId}
                            options={trailIds}
                            onChange={(value) => moveToTrail(topic, value)}
                          />
                        </Field>
                      </div>

                      <Field label="Hook" hint="One line, shown under the title.">
                        <TextArea
                          rows={2}
                          value={topic.hook}
                          onChange={(value) => setTopic(topic.id, { hook: value })}
                        />
                      </Field>

                      <Field
                        label="Explanation"
                        hint="Short lines. Keep it to two or three — this is the discovery itself."
                      >
                        <StringListEditor
                          multiline
                          values={topic.explanation}
                          placeholder="A sentence a visitor reads standing at the stop."
                          addLabel="Add line"
                          onChange={(values) =>
                            setTopic(topic.id, { explanation: values })
                          }
                        />
                      </Field>

                      <Field label="Did you know?">
                        <TextArea
                          rows={2}
                          value={topic.funFact}
                          onChange={(value) => setTopic(topic.id, { funFact: value })}
                        />
                      </Field>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                          label="Illustration"
                          hint="Drawn by the app — no uploads, no image files."
                        >
                          <ChipPicker
                            value={topic.visual}
                            options={VISUAL_KINDS}
                            onChange={(value) => setTopic(topic.id, { visual: value })}
                          />
                        </Field>
                        <Field
                          label="Accent colour"
                          hint="Only used by the tree / flower / herb illustrations."
                        >
                          <div className="flex items-center gap-2">
                            <span
                              aria-hidden
                              className="size-8 shrink-0 rounded-full border border-forest/15"
                              style={{ background: topic.accent ?? "#5e9e4e" }}
                            />
                            <TextInput
                              mono
                              value={topic.accent ?? ""}
                              placeholder="#5e9e4e"
                              onChange={(value) =>
                                setTopic(topic.id, { accent: value || undefined })
                              }
                            />
                          </div>
                        </Field>
                      </div>

                      <Field
                        label="QR placement"
                        hint="Where this code is posted in the garden — printed on the QR sheet."
                      >
                        <TextInput
                          value={topic.placement ?? ""}
                          placeholder="At the slide"
                          onChange={(value) =>
                            setTopic(topic.id, { placement: value || undefined })
                          }
                        />
                      </Field>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                          label="Id"
                          hint="Becomes /learn/id and /quiz/id. Renaming rewrites the trail order."
                        >
                          <TextInput
                            mono
                            value={topic.id}
                            onChange={(value) =>
                              update((current) =>
                                renameTopicId(current, topic.id, slugify(value)),
                              )
                            }
                          />
                        </Field>
                        <Field label="Quiz id">
                          <TextInput
                            mono
                            value={topic.quizId}
                            onChange={(value) =>
                              update((current) =>
                                renameQuizId(current, topic.quizId, slugify(value)),
                              )
                            }
                          />
                        </Field>
                      </div>

                      <div className="rounded-2xl border border-forest/10 bg-white p-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xs font-semibold uppercase tracking-widest text-stone">
                            Follow-up link (optional)
                          </p>
                          {topic.related ? (
                            <Btn
                              variant="ghost"
                              onClick={() => setTopic(topic.id, { related: undefined })}
                            >
                              <X className="size-3.5" aria-hidden />
                              Remove
                            </Btn>
                          ) : (
                            <Btn
                              variant="secondary"
                              onClick={() =>
                                setTopic(topic.id, {
                                  related: { href: "/guidelines", label: "Garden guidelines", text: "" },
                                })
                              }
                            >
                              <Plus className="size-3.5" aria-hidden />
                              Add link
                            </Btn>
                          )}
                        </div>
                        {topic.related && (
                          <div className="mt-3 grid gap-4 sm:grid-cols-3">
                            <Field label="Link to">
                              <TextInput
                                mono
                                value={topic.related.href}
                                onChange={(value) =>
                                  setTopic(topic.id, {
                                    related: { ...topic.related!, href: value },
                                  })
                                }
                              />
                            </Field>
                            <Field label="Label">
                              <TextInput
                                value={topic.related.label}
                                onChange={(value) =>
                                  setTopic(topic.id, {
                                    related: { ...topic.related!, label: value },
                                  })
                                }
                              />
                            </Field>
                            <Field label="Text">
                              <TextInput
                                value={topic.related.text}
                                onChange={(value) =>
                                  setTopic(topic.id, {
                                    related: { ...topic.related!, text: value },
                                  })
                                }
                              />
                            </Field>
                          </div>
                        )}
                      </div>

                      <div className="rounded-2xl border border-forest/10 bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-widest text-stone">
                          Quiz
                        </p>
                        <div className="mt-3">
                          {quiz ? (
                            <QuizEditor
                              compact
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
                          ) : (
                            <div className="flex flex-wrap items-center gap-3">
                              <p className="text-sm text-ink-soft">
                                This stop has no quiz yet.
                              </p>
                              <Btn
                                variant="primary"
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
                                Create quiz
                              </Btn>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <DeleteBtn
                          label="Delete discovery"
                          onDelete={() => removeDiscovery(topic)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Panel>
    </div>
  );
}
