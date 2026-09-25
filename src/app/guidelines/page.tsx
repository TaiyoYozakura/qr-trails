import type { Metadata } from "next";
import {
  Bike,
  Camera,
  Clock,
  Droplets,
  Eye,
  Flower2,
  Footprints,
  Hand,
  Leaf,
  type LucideIcon,
  PawPrint,
  QrCode,
  ScanLine,
  Sprout,
  Trash2,
  Users,
  VolumeX,
} from "lucide-react";
import { ButtonLink } from "@/components/button";
import { Entrance } from "@/components/entrance";
import { garden, guidelines } from "@/data";
import type { GuidelineIcon } from "@/types";

export const metadata: Metadata = {
  title: "Guidelines",
  description:
    "A few gentle rules keep the garden — and its visitors — thriving.",
};

const icons: Record<GuidelineIcon, LucideIcon> = {
  leaf: Leaf,
  flower: Flower2,
  eye: Eye,
  camera: Camera,
  footprints: Footprints,
  trash: Trash2,
  droplets: Droplets,
  paw: PawPrint,
  qr: QrCode,
  scan: ScanLine,
  volume: VolumeX,
  users: Users,
  bike: Bike,
  hand: Hand,
  clock: Clock,
};

export default function GuidelinesPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Entrance>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
          Keep the classroom happy.
        </h1>
      </Entrance>
      <Entrance delay={0.1}>
        <p className="mt-3 max-w-xl text-lg text-ink-soft">
          A few gentle rules keep {garden.shortName} — and its visitors —
          thriving. Scan, look, learn, and leave things better than you found
          them.
        </p>
      </Entrance>

      {guidelines.map((group, groupIndex) => (
        <section key={group.id} className="mt-12 first:mt-10">
          <Entrance>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl">
              {group.title}
            </h2>
          </Entrance>
          <Entrance delay={0.06}>
            <p className="mt-1.5 max-w-xl text-sm text-ink-soft">
              {group.summary}
            </p>
          </Entrance>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <RuleList
              kind="do"
              label="Do"
              items={group.dos}
              baseDelay={0.1 + groupIndex * 0.04}
            />
            <RuleList
              kind="dont"
              label="Don’t"
              items={group.donts}
              baseDelay={0.16 + groupIndex * 0.04}
            />
          </div>
        </section>
      ))}

      <Entrance delay={0.15}>
        <div className="mt-14 rounded-[2.5rem] bg-forest px-6 py-12 text-center text-cream">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            Leave the garden better than you found it.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-cream/80">
            Thank you for helping it stay beautiful for the next visitor.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink
              href="/explore"
              size="lg"
              className="bg-cream text-forest hover:bg-white"
            >
              Start a Trail
            </ButtonLink>
            <ButtonLink
              href="/garden"
              size="lg"
              className="border border-cream/30 bg-transparent text-cream hover:bg-cream/10"
            >
              About the garden
            </ButtonLink>
          </div>
        </div>
      </Entrance>
    </main>
  );
}

function RuleList({
  kind,
  label,
  items,
  baseDelay,
}: {
  kind: "do" | "dont";
  label: string;
  items: { text: string; icon: GuidelineIcon }[];
  baseDelay: number;
}) {
  const isDo = kind === "do";
  const palette = isDo
    ? {
        border: "border-leaf/20",
        chip: "bg-leaf/15 text-leaf-dark",
        text: "text-leaf-dark",
      }
    : {
        border: "border-berry/20",
        chip: "bg-berry/10 text-berry",
        text: "text-berry",
      };

  return (
    <div className={`rounded-3xl border ${palette.border} bg-white p-5 shadow-card`}>
      <p
        className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-widest ${palette.text}`}
      >
        <Sprout className="size-4" aria-hidden />
        {label}
      </p>
      <div className="mt-4 space-y-3">
        {items.map((item, i) => {
          const Icon = icons[item.icon];
          return (
            <Entrance key={item.text} delay={baseDelay + i * 0.05}>
              <div className="flex items-start gap-3">
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-xl ${palette.chip}`}
                >
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="pt-1.5 text-sm leading-relaxed text-charcoal">
                  {item.text}
                </span>
              </div>
            </Entrance>
          );
        })}
      </div>
    </div>
  );
}
