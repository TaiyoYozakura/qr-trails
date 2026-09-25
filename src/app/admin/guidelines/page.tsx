"use client";

import { Plus, Trash2 } from "lucide-react";
import {
  Btn,
  ChipPicker,
  DeleteBtn,
  Field,
  Panel,
  TextInput,
} from "@/components/admin/ui";
import { useDraft } from "@/lib/draft-store";
import { slugify, uniqueId } from "@/lib/content-tools";
import { GUIDELINE_ICONS, type GuidelineGroup, type GuidelineItem } from "@/types";

export default function AdminGuidelinesPage() {
  const { draft, update } = useDraft();

  const setGroup = (id: string, patch: Partial<GuidelineGroup>) =>
    update((current) => ({
      ...current,
      guidelines: current.guidelines.map((group) =>
        group.id === id ? { ...group, ...patch } : group,
      ),
    }));

  const setItems = (
    groupId: string,
    key: "dos" | "donts",
    items: GuidelineItem[],
  ) => setGroup(groupId, { [key]: items });

  const addGroup = () =>
    update((current) => ({
      ...current,
      guidelines: [
        ...current.guidelines,
        {
          id: uniqueId("new-group", current.guidelines.map((g) => g.id)),
          title: "New group",
          summary: "",
          dos: [{ text: "", icon: "leaf" }],
          donts: [{ text: "", icon: "flower" }],
        } satisfies GuidelineGroup,
      ],
    }));

  return (
    <div className="space-y-6">
      <Panel
        title="Garden guidelines"
        description="The do's and don'ts shown on /guidelines, with the recap screen linking here. Each group appears as its own section."
        actions={
          <Btn variant="primary" onClick={addGroup}>
            <Plus className="size-3.5" aria-hidden />
            New group
          </Btn>
        }
      >
        <div className="space-y-5">
          {draft.guidelines.map((group) => (
            <div
              key={group.id}
              className="rounded-2xl border border-forest/10 bg-cream/30 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <span className="font-mono text-xs text-stone">{group.id}</span>
                <DeleteBtn
                  label="Delete group"
                  onDelete={() => {
                    if (window.confirm(`Delete "${group.title}"?`)) {
                      update((current) => ({
                        ...current,
                        guidelines: current.guidelines.filter(
                          (item) => item.id !== group.id,
                        ),
                      }));
                    }
                  }}
                />
              </div>

              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <Field label="Title">
                  <TextInput
                    value={group.title}
                    onChange={(value) => setGroup(group.id, { title: value })}
                  />
                </Field>
                <Field
                  label="Id"
                  hint="Anchor name only — safe to rename."
                >
                  <TextInput
                    mono
                    value={group.id}
                    onChange={(value) => {
                      const next = slugify(value);
                      if (!next) return;
                      update((current) => ({
                        ...current,
                        guidelines: current.guidelines.map((item) =>
                          item.id === group.id ? { ...item, id: next } : item,
                        ),
                      }));
                    }}
                  />
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Summary" hint="One line under the heading.">
                  <TextInput
                    value={group.summary}
                    onChange={(value) => setGroup(group.id, { summary: value })}
                  />
                </Field>
              </div>

              {(["dos", "donts"] as const).map((key) => (
                <div key={key} className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-stone">
                    {key === "dos" ? "Do" : "Don’t"}
                  </p>
                  <div className="mt-2 space-y-3">
                    {group[key].map((item, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-forest/10 bg-white p-3"
                      >
                        <div className="flex items-center gap-2">
                          <TextInput
                            value={item.text}
                            placeholder="Use the bins, or carry your waste out"
                            onChange={(value) =>
                              setItems(
                                group.id,
                                key,
                                group[key].map((entry, i) =>
                                  i === index ? { ...entry, text: value } : entry,
                                ),
                              )
                            }
                          />
                          <Btn
                            variant="ghost"
                            title="Remove rule"
                            onClick={() =>
                              setItems(
                                group.id,
                                key,
                                group[key].filter((_, i) => i !== index),
                              )
                            }
                          >
                            <Trash2 className="size-3.5" aria-hidden />
                          </Btn>
                        </div>
                        <div className="mt-2">
                          <ChipPicker
                            value={item.icon}
                            options={GUIDELINE_ICONS}
                            onChange={(value) =>
                              setItems(
                                group.id,
                                key,
                                group[key].map((entry, i) =>
                                  i === index ? { ...entry, icon: value } : entry,
                                ),
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                    <Btn
                      variant="secondary"
                      onClick={() =>
                        setItems(group.id, key, [
                          ...group[key],
                          { text: "", icon: key === "dos" ? "leaf" : "flower" },
                        ])
                      }
                    >
                      <Plus className="size-3.5" aria-hidden />
                      Add {key === "dos" ? "a do" : "a don’t"}
                    </Btn>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Where these appear">
        <ul className="space-y-2 text-sm leading-relaxed text-ink-soft">
          <li>· The public <span className="font-mono text-xs">/guidelines</span> page, one section per group.</li>
          <li>· The garden page, which links to them.</li>
          <li>· Every trail recap, under “Before you go”.</li>
        </ul>
        <p className="mt-4 rounded-2xl bg-sun-soft/60 px-4 py-3 text-xs leading-relaxed text-charcoal">
          These are still generic public-garden rules. Replace them with the
          garden&apos;s own posted signage once you have a photo of the board at
          the gate.
        </p>
      </Panel>
    </div>
  );
}
