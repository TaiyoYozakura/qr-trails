"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { Printer } from "lucide-react";
import { Entrance } from "@/components/entrance";
import { getTopicsForTrail, plants, trails } from "@/data";

interface QrTarget {
  label: string;
  placement: string;
  path: string;
}

/**
 * One code per thing a visitor can open on site. Placements come from the
 * discovery data (`Topic.placement`), where they are written next to the copy
 * that a person standing at that spot is meant to read.
 */
function buildTargets(): QrTarget[] {
  const targets: QrTarget[] = [
    {
      label: "Garden entry",
      placement: "Main gate",
      path: "/garden",
    },
    {
      label: "Guidelines",
      placement: "Near the gate / notice board",
      path: "/guidelines",
    },
  ];

  trails.forEach((trail) => {
    targets.push({
      label: `${trail.title} — overview`,
      placement: `Trail starting point (${trail.estimatedDuration})`,
      path: `/trail/${trail.id}`,
    });
    getTopicsForTrail(trail.id).forEach((topic) => {
      targets.push({
        label: `${String(topic.number).padStart(2, "0")} · ${topic.title}`,
        placement: `${topic.placement ?? "At the discovery stop"} · ${trail.title}`,
        // `?scan=1` is what unlocks that stop on the visitor's device.
        path: `/learn/${topic.id}?scan=1`,
      });
    });
    targets.push({
      label: `${trail.title} — recap`,
      placement: "End of the trail / exit",
      path: `/result/${trail.id}`,
    });
  });

  plants.forEach((plant) => {
    targets.push({
      label: `Flora — ${plant.name}`,
      placement: `Near the ${plant.name.toLowerCase()} plant`,
      path: `/flora/${plant.id}`,
    });
  });

  return targets;
}

export function QrPrintPage() {
  const targets = useMemo(() => buildTargets(), []);
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    targets.forEach((target) => {
      const url = `${window.location.origin}${target.path}`;
      QRCode.toDataURL(url, {
        width: 320,
        margin: 2,
        errorCorrectionLevel: "M",
        color: { dark: "#143420", light: "#ffffff" },
      }).then((src) => {
        if (!cancelled) {
          setImages((prev) => ({ ...prev, [target.path]: src }));
        }
      });
    });
    return () => {
      cancelled = true;
    };
  }, [targets]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
            Print QR codes
          </h1>
          <p className="mt-3 max-w-xl text-lg text-ink-soft">
            For the project team. Print these and place them at the matching
            locations in the garden — {targets.length} codes in all.
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="no-print inline-flex h-12 items-center gap-2 rounded-full bg-forest px-6 text-base font-semibold text-cream transition-all duration-200 hover:-translate-y-px hover:bg-forest-deep"
        >
          <Printer className="size-5" aria-hidden />
          Print
        </button>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {targets.map((target, i) => (
          <Entrance key={target.path} delay={0.04 * (i % 3)}>
            <div className="break-inside-avoid rounded-3xl border border-forest/10 bg-white p-6 text-center shadow-card">
              <div className="mx-auto w-40">
                {images[target.path] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={images[target.path]}
                    alt={`QR code for ${target.label} (${target.path})`}
                    className="w-full rounded-lg"
                  />
                ) : (
                  <div className="aspect-square w-full rounded-lg bg-forest/5" aria-hidden />
                )}
              </div>
              <h2 className="mt-4 font-display text-lg font-semibold text-charcoal">
                {target.label}
              </h2>
              <p className="mt-1 text-sm text-ink-soft">{target.placement}</p>
              <p className="mt-2 font-mono text-xs text-stone">{target.path}</p>
            </div>
          </Entrance>
        ))}
      </div>

      <p className="no-print mt-10 text-center text-xs text-stone">
        Tip: print at 100% scale. Test-scan each code before laminating. Each
        discovery code carries <span className="font-mono">?scan=1</span> — that
        is what unlocks the stop for the visitor, so a typed or shared URL
        without it will not open the discovery.
      </p>
    </main>
  );
}