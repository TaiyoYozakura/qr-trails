"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, ChevronUp, Plus, X } from "lucide-react";
import { Btn, DeleteBtn, Field, Panel, SelectField, TextArea, TextInput } from "@/components/admin/ui";
import { useDraft } from "@/lib/draft-store";
import { renameTrailId, slugify, uniqueId } from "@/lib/content-tools";
import type { Trail } from "@/types";

export default function AdminTrailsPage() {
  const { draft, update } = useDraft();
  const [openId, setOpenId] = useState<string | null>(draft.trails[0]?.id ?? null);

  const setTrail = (id: string, patch: Partial<Trail>) =>
    update((current) => ({
      ...current,
      trails: current.trails.map((trail) =>
        trail.id === id ? { ...trail, ...patch } : trail,
      ),
    }));

  const addTrail = () => {
    const id = uniqueId("new-trail", draft.trails.map((t) => t.id));
    update((current) => ({
      ...current,
      trails: [
        ...current.trails,
        {
          id,
          title: "New trail",
          altTitle: "",
          category: "Nature Trail",
          description: "",
          estimatedDuration: "~8 min",
          topicIds: [],
        } satisfies Trail,
      ],
    }));
    setOpenId(id);
  };

  const removeTrail = (id: string) => {
    const trail = draft.trails.find((t) => t.id === id);
    if (!trail) return;
    if (
      !window.confirm(
        `Delete "${trail.title}"? Its ${trail.topicIds.length} discoveries stay in the draft but will be flagged as unattached.`,
      )
    ) {
      return;
    }
    update((current) => ({
      ...current,
      trails: current.trails.filter((t) => t.id !== id),
    }));
    setOpenId(null);
  };

  const moveStop = (trailId: string, index: number, direction: -1 | 1) => {
    const trail = draft.trails.find((t) => t.id === trailId);
    if (!trail) return;
    const next = [...trail.topicIds];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setTrail(trailId, { topicIds: next });
  };

  const unusedTopics = (trail: Trail) =>
    draft.topics.filter((topic) => !trail.topicIds.includes(topic.id));

  return (
    <div className="space-y-6">
      <Panel
        title="Trails"
        description="A trail is an ordered list of discoveries. Everything else — navigation, the home page, the QR sheet, progress — derives from this list, so reordering stops here reorders the trail everywhere."
        actions={
          <Btn variant="primary" onClick={addTrail}>
            <Plus className="size-3.5" aria-hidden />
            New trail
          </Btn>
        }
      >
        <div className="space-y-4">
          {draft.trails.map((trail) => {
            const open = openId === trail.id;
            const stops = trail.topicIds
              .map((topicId) => draft.topics.find((topic) => topic.id === topicId))
              .filter((topic) => topic !== undefined);

            return (
              <div
                key={trail.id}
                className="rounded-2xl border border-forest/10 bg-cream/30"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : trail.id)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span className="flex items-center gap-2">
                    {open ? (
                      <ChevronDown className="size-4 text-forest" aria-hidden />
                    ) : (
                      <ChevronRight className="size-4 text-forest" aria-hidden />
                    )}
                    <span className="font-display text-lg font-semibold text-charcoal">
                      {trail.title}
                    </span>
                    <span className="rounded-full bg-forest/10 px-2.5 py-0.5 text-xs font-semibold text-forest">
                      {stops.length} stops
                    </span>
                  </span>
                  <span className="font-mono text-xs text-stone">{trail.id}</span>
                </button>

                {open && (
                  <div className="space-y-4 border-t border-forest/10 p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Title">
                        <TextInput
                          value={trail.title}
                          onChange={(value) => setTrail(trail.id, { title: value })}
                        />
                      </Field>
                      <Field label="Alt title" hint="Optional second name.">
                        <TextInput
                          value={trail.altTitle ?? ""}
                          onChange={(value) => setTrail(trail.id, { altTitle: value })}
                        />
                      </Field>
                      <Field label="Category" hint="Shown as the trail's pill.">
                        <TextInput
                          value={trail.category}
                          onChange={(value) => setTrail(trail.id, { category: value })}
                        />
                      </Field>
                      <Field label="Time on the ground">
                        <TextInput
                          value={trail.estimatedDuration}
                          onChange={(value) =>
                            setTrail(trail.id, { estimatedDuration: value })
                          }
                        />
                      </Field>
                    </div>

                    <Field label="Description">
                      <TextArea
                        rows={2}
                        value={trail.description}
                        onChange={(value) =>
                          setTrail(trail.id, { description: value })
                        }
                      />
                    </Field>

                    <Field
                      label="Id"
                      hint="Used in URLs (/trail/id, /result/id). Renaming updates every discovery that belongs to it."
                    >
                      <TextInput
                        mono
                        value={trail.id}
                        onChange={(value) =>
                          update((current) =>
                            renameTrailId(current, trail.id, slugify(value)),
                          )
                        }
                      />
                    </Field>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-stone">
                        Stop order
                      </p>
                      <div className="mt-2 space-y-2">
                        {trail.topicIds.map((topicId, index) => {
                          const topic = draft.topics.find((t) => t.id === topicId);
                          return (
                            <div
                              key={topicId}
                              className="flex items-center gap-2 rounded-2xl border border-forest/10 bg-white px-3 py-2"
                            >
                              <span className="w-6 text-xs font-semibold text-stone">
                                {index + 1}
                              </span>
                              <span className="flex-1 truncate text-sm font-medium text-charcoal">
                                {topic?.title ?? `${topicId} (missing)`}
                              </span>
                              <Btn
                                variant="ghost"
                                title="Move up"
                                onClick={() => moveStop(trail.id, index, -1)}
                                disabled={index === 0}
                              >
                                <ChevronUp className="size-4" aria-hidden />
                              </Btn>
                              <Btn
                                variant="ghost"
                                title="Move down"
                                onClick={() => moveStop(trail.id, index, 1)}
                                disabled={index === trail.topicIds.length - 1}
                              >
                                <ChevronDown className="size-4" aria-hidden />
                              </Btn>
                              <Btn
                                variant="ghost"
                                title="Remove from trail"
                                onClick={() =>
                                  setTrail(trail.id, {
                                    topicIds: trail.topicIds.filter(
                                      (id) => id !== topicId,
                                    ),
                                  })
                                }
                              >
                                <X className="size-4" aria-hidden />
                              </Btn>
                            </div>
                          );
                        })}
                      </div>

                      {unusedTopics(trail).length > 0 && (
                        <div className="mt-3 max-w-sm">
                          <Field label="Add a discovery">
                            <SelectField
                              value=""
                              options={["", ...unusedTopics(trail).map((t) => t.id)]}
                              onChange={(value) => {
                                if (!value) return;
                                setTrail(trail.id, {
                                  topicIds: [...trail.topicIds, value],
                                });
                              }}
                            />
                          </Field>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <DeleteBtn
                        label="Delete trail"
                        onDelete={() => removeTrail(trail.id)}
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
