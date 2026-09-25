"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, AlertTriangle, CheckCircle2, Download, Upload } from "lucide-react";
import { Btn, Field, Panel, TextArea } from "@/components/admin/ui";
import { buildSeedDraft, useDraft } from "@/lib/draft-store";
import {
  copyText,
  draftToFiles,
  downloadText,
  validateDraft,
} from "@/lib/content-tools";
import type { ContentDraft } from "@/lib/draft-store";

export default function AdminOverviewPage() {
  const { draft, dirty, reset, replace } = useDraft();
  const [copied, setCopied] = useState<string | null>(null);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const [importOk, setImportOk] = useState(false);

  const seed = buildSeedDraft();
  const issues = validateDraft(draft);
  const errors = issues.filter((issue) => issue.level === "error");
  const warnings = issues.filter((issue) => issue.level === "warning");
  const files = draftToFiles(draft);

  const changed = (key: keyof ContentDraft) =>
    JSON.stringify(seed[key]) !== JSON.stringify(draft[key]);

  const stats = [
    { label: "Trails", value: draft.trails.length, href: "/admin/trails" },
    {
      label: "Discoveries",
      value: draft.topics.length,
      href: "/admin/discoveries",
    },
    { label: "Quizzes", value: draft.quizzes.length, href: "/admin/quizzes" },
    {
      label: "Quiz questions",
      value: draft.quizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0),
      href: "/admin/quizzes",
    },
    {
      label: "Guideline groups",
      value: draft.guidelines.length,
      href: "/admin/guidelines",
    },
  ];

  const handleCopy = async (name: string, text: string) => {
    const ok = await copyText(text);
    setCopied(ok ? name : `${name}-failed`);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <Panel
        title="Content console"
        description="Edit trails, discoveries, quizzes and garden rules here, then export the result into the repository. The site itself stays static — visitors read the files in src/data, not this console."
        actions={
          <>
            <Btn
              variant="secondary"
              onClick={() => {
                if (
                  window.confirm(
                    "Discard this draft and go back to the published content?",
                  )
                ) {
                  reset();
                }
              }}
              disabled={!dirty}
            >
              Reset draft
            </Btn>
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 rounded-full border border-forest/20 bg-white px-4 py-2 text-sm font-semibold text-forest transition-colors hover:border-forest/40 hover:bg-forest/5"
            >
              Preview site
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </>
        }
      >
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="rounded-2xl border border-forest/10 bg-cream/40 p-4 transition-colors hover:border-forest/30 hover:bg-white"
            >
              <p className="font-display text-3xl font-semibold text-forest">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-stone">
                {stat.label}
              </p>
            </Link>
          ))}
        </div>

        <p className="mt-4 text-xs leading-relaxed text-ink-soft">
          Status:{" "}
          <span className="font-semibold text-charcoal">
            {dirty ? "draft saved on this device" : "matching published content"}
          </span>
          {dirty && (
            <>
              {" "}
              · changed:{" "}
              {(["trails", "topics", "quizzes", "guidelines"] as const)
                .filter(changed)
                .join(", ") || "nothing"}
            </>
          )}
        </p>
      </Panel>

      <Panel
        title="Checks"
        description="Cross-references the compiler cannot catch — a trail listing a stop that does not exist, a discovery without a quiz, a question with no correct option."
      >
        {issues.length === 0 ? (
          <p className="flex items-center gap-2 text-sm font-medium text-leaf-dark">
            <CheckCircle2 className="size-4" aria-hidden />
            Everything lines up. Safe to export.
          </p>
        ) : (
          <ul className="space-y-2">
            {[...errors, ...warnings].map((issue, index) => (
              <li
                key={index}
                className={`flex items-start gap-2 rounded-2xl px-4 py-3 text-sm ${
                  issue.level === "error"
                    ? "bg-berry/10 text-berry"
                    : "bg-sun-soft/60 text-charcoal"
                }`}
              >
                <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
                {issue.message}
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel
        title="Export"
        description="Copy each file over the matching one in src/data, then rebuild. The generated files are plain TypeScript — the same shape as the hand-written originals."
      >
        <div className="space-y-3">
          {Object.entries(files).map(([path, text]) => (
            <details
              key={path}
              className="rounded-2xl border border-forest/10 bg-cream/40 px-4 py-3"
            >
              <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs text-charcoal">
                  {path}{" "}
                  <span className="text-stone">
                    ({Math.max(1, Math.round(text.length / 1024))} kB)
                  </span>
                </span>
                <span className="flex gap-2">
                  <Btn variant="secondary" onClick={() => handleCopy(path, text)}>
                    {copied === path ? "Copied" : "Copy"}
                  </Btn>
                  <Btn
                    variant="secondary"
                    onClick={() =>
                      downloadText(path.split("/").pop() ?? "content.ts", text)
                    }
                  >
                    <Download className="size-3.5" aria-hidden />
                    .ts
                  </Btn>
                </span>
              </summary>
              <pre className="mt-3 max-h-72 overflow-auto rounded-xl bg-white p-3 font-mono text-[11px] leading-relaxed text-charcoal">
                {text}
              </pre>
            </details>
          ))}
          <div className="flex flex-wrap gap-2">
            <Btn
              variant="primary"
              onClick={() =>
                handleCopy("json", JSON.stringify(draft, null, 2))
              }
            >
              {copied === "json" ? "Copied JSON" : "Copy all as JSON"}
            </Btn>
            <Btn
              variant="secondary"
              onClick={() =>
                downloadText(
                  "qr-trails-content.json",
                  JSON.stringify(draft, null, 2),
                )
              }
            >
              <Download className="size-3.5" aria-hidden />
              Download JSON
            </Btn>
          </div>
        </div>
      </Panel>

      <Panel
        title="Import"
        description="Paste a JSON export (from another device, or a backup) to continue editing it here."
      >
        <Field label="Draft JSON">
          <TextArea
            rows={6}
            value={importText}
            onChange={(value) => {
              setImportText(value);
              setImportOk(false);
              setImportError(null);
            }}
            placeholder='{ "trails": [], "topics": [], "quizzes": [], "guidelines": [] }'
          />
        </Field>
        {importError && (
          <p className="mt-3 rounded-2xl bg-berry/10 px-4 py-2.5 text-sm font-medium text-berry">
            {importError}
          </p>
        )}
        {importOk && (
          <p className="mt-3 rounded-2xl bg-leaf/15 px-4 py-2.5 text-sm font-medium text-leaf-dark">
            Draft loaded.
          </p>
        )}
        <div className="mt-3">
          <Btn
            variant="primary"
            onClick={() => {
              try {
                const parsed = JSON.parse(importText) as Partial<ContentDraft>;
                if (!Array.isArray(parsed.trails)) {
                  throw new Error("This JSON has no trails array.");
                }
                replace({
                  trails: parsed.trails ?? [],
                  topics: parsed.topics ?? [],
                  quizzes: parsed.quizzes ?? [],
                  guidelines: parsed.guidelines ?? [],
                });
                setImportOk(true);
                setImportError(null);
              } catch (error) {
                setImportOk(false);
                setImportError(
                  error instanceof Error
                    ? error.message
                    : "That is not valid JSON.",
                );
              }
            }}
            disabled={!importText.trim()}
          >
            <Upload className="size-3.5" aria-hidden />
            Load draft
          </Btn>
        </div>
      </Panel>
    </div>
  );
}
