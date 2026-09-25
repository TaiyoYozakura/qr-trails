"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf } from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  // The admin console is a separate view with its own chrome.
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="mt-16 border-t border-forest/10 bg-cream-dark/50 print:hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-forest text-cream">
            <Leaf className="size-4" aria-hidden />
          </span>
          <div>
            <p className="font-display font-semibold text-forest">QR Trails</p>
            <p className="text-xs text-ink-soft">
              There&apos;s more here than meets the eye.
            </p>
          </div>
        </div>

        <nav
          className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-soft"
          aria-label="Footer"
        >
          <Link
            className="rounded-lg py-1.5 transition-colors hover:text-forest"
            href="/explore"
          >
            Explore
          </Link>
          <Link
            className="rounded-lg py-1.5 transition-colors hover:text-forest"
            href="/garden"
          >
            Garden
          </Link>
          <Link
            className="rounded-lg py-1.5 transition-colors hover:text-forest"
            href="/flora"
          >
            Flora
          </Link>
          <Link
            className="rounded-lg py-1.5 transition-colors hover:text-forest"
            href="/guidelines"
          >
            Guidelines
          </Link>
          <Link
            className="rounded-lg py-1.5 transition-colors hover:text-forest"
            href="/about"
          >
            About
          </Link>
        </nav>

        <div className="text-xs text-stone">
          <p>A Community Engagement Project prototype.</p>
          {/* Discreet by design: staff only, and the console is passcode-gated. */}
          <Link
            href="/admin"
            className="mt-1 inline-block rounded-lg py-1 underline decoration-dotted transition-colors hover:text-forest"
          >
            Team sign-in
          </Link>
        </div>
      </div>
    </footer>
  );
}
