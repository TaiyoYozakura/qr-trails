"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, LockKeyhole, LogOut, ShieldAlert } from "lucide-react";
import { signIn, signOut, useAdminSession } from "@/lib/admin";
import { useDraft } from "@/lib/draft-store";
import { cn } from "@/lib/utils";
import { Btn, Field, TextInput } from "./ui";

const tabs = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/trails", label: "Trails" },
  { href: "/admin/discoveries", label: "Discoveries" },
  { href: "/admin/quizzes", label: "Quizzes" },
  { href: "/admin/guidelines", label: "Guidelines" },
  { href: "/admin/qr", label: "QR codes" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const session = useAdminSession();
  const pathname = usePathname();
  const { dirty } = useDraft();

  if (!session) return <AdminSignIn />;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-forest px-5 py-4 text-cream sm:px-6">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sun">
            QR Trails · Staff
          </p>
          <p className="mt-1 font-display text-xl font-semibold">
            Content console
          </p>
          <p className="mt-0.5 text-xs text-cream/70">
            Signed in as {session.email}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-cream/30 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
          >
            <ExternalLink className="size-3.5" aria-hidden />
            View site
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-1.5 rounded-full bg-cream/10 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-cream/20"
          >
            <LogOut className="size-3.5" aria-hidden />
            Sign out
          </button>
        </div>
      </header>

      <nav
        aria-label="Admin sections"
        className="mt-4 flex flex-wrap gap-1.5 rounded-full border border-forest/10 bg-white p-1.5 shadow-card"
      >
        {tabs.map((tab) => {
          const active =
            tab.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                active
                  ? "bg-forest text-cream"
                  : "text-ink-soft hover:bg-forest/5 hover:text-forest",
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {dirty && (
        <p className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border border-sun/60 bg-sun-soft/50 px-4 py-3 text-sm text-charcoal">
          <ShieldAlert className="size-4 shrink-0 text-forest" aria-hidden />
          A draft is saved in this browser only. Visitors still see the published
          content — export the draft on the{" "}
          <Link href="/admin" className="font-semibold text-forest underline">
            Overview
          </Link>{" "}
          tab and paste it into <span className="font-mono text-xs">src/data</span>.
        </p>
      )}

      <div className="mt-6">{children}</div>
    </main>
  );
}

function AdminSignIn() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const attempt = () => {
    const result = signIn(passcode);
    setError(result.ok ? null : (result.error ?? "Sign-in failed."));
  };

  return (
    <main className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <div className="rounded-[2.5rem] border border-forest/10 bg-white px-6 py-10 shadow-card sm:px-10">
        <span className="mx-auto grid size-14 place-items-center rounded-3xl bg-forest/10 text-forest">
          <LockKeyhole className="size-7" aria-hidden />
        </span>
        <h1 className="mt-5 text-center font-display text-3xl font-semibold tracking-tight text-charcoal">
          Staff sign-in
        </h1>
        <p className="mt-2 text-center text-sm leading-relaxed text-ink-soft">
          The content console and the printable QR sheet are for the project
          team. Visitors do not need an account for anything else.
        </p>

        <form
          className="mt-7 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            attempt();
          }}
          // Explicit Enter handling on top of implicit form submission, so the
          // passcode field always submits from the keyboard.
          onKeyDown={(event) => {
            if (event.key === "Enter") attempt();
          }}
        >
          <Field label="Passcode">
            <TextInput
              value={passcode}
              onChange={setPasscode}
              placeholder="Team passcode"
            />
          </Field>
          {error && (
            <p className="rounded-2xl bg-berry/10 px-4 py-2.5 text-sm font-medium text-berry">
              {error}
            </p>
          )}
          <Btn type="submit" variant="primary" className="w-full justify-center">
            Sign in
          </Btn>
        </form>

        <p className="mt-6 rounded-2xl bg-forest/5 p-4 text-xs leading-relaxed text-ink-soft">
          This is a device-local gate, not real security: the site is static, so
          the passcode ships in the page bundle. Set{" "}
          <span className="font-mono">
            NEXT_PUBLIC_ADMIN_PASSCODE
          </span>{" "}
          before deploying, and keep anything genuinely private off this site.
        </p>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm font-semibold text-forest hover:underline"
          >
            ← Back to the garden
          </Link>
        </div>
      </div>
    </main>
  );
}
