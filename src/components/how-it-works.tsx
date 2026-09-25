import { Play, QrCode, Sparkles } from "lucide-react";
import { Entrance } from "./entrance";

const steps = [
  {
    n: "01",
    icon: QrCode,
    title: "Scan",
    text: "Find a QR Trail code somewhere in the garden.",
  },
  {
    n: "02",
    icon: Sparkles,
    title: "Discover",
    text: "Scan it and unlock a short learning experience.",
  },
  {
    n: "03",
    icon: Play,
    title: "Play",
    text: "Answer a question and continue your trail.",
  },
];

export function HowItWorks() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {steps.map((step, i) => (
        <Entrance key={step.n} delay={i * 0.08}>
          <div className="h-full rounded-3xl border border-forest/10 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
            <div className="flex items-center justify-between">
              <span className="grid size-11 place-items-center rounded-2xl bg-forest/10 text-forest">
                <step.icon className="size-5" aria-hidden />
              </span>
              <span className="font-display text-sm font-semibold text-stone">
                {step.n}
              </span>
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-charcoal">
              {step.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              {step.text}
            </p>
          </div>
        </Entrance>
      ))}
    </div>
  );
}