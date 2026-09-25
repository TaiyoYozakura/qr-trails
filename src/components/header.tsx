"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Leaf, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/explore", label: "Explore" },
  { href: "/garden", label: "Garden" },
  { href: "/play", label: "Play & Fitness" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // The admin console is a separate view with its own chrome.
  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-cream/85 backdrop-blur-md print:hidden">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-full py-2 pr-3"
          onClick={() => setOpen(false)}
        >
          <span className="grid size-9 place-items-center rounded-xl bg-forest text-cream">
            <Leaf className="size-5" aria-hidden />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-forest">
            QR Trails
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "bg-forest/10 text-forest"
                  : "text-ink-soft hover:bg-forest/5 hover:text-forest",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/explore"
            className="ml-2 inline-flex h-10 items-center rounded-full bg-forest px-5 text-sm font-semibold text-cream transition-all duration-200 hover:-translate-y-px hover:bg-forest-deep"
          >
            Start a Trail
          </Link>
        </nav>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full text-forest transition-colors hover:bg-forest/5 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-forest/10 md:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-base font-medium transition-colors",
                    pathname === link.href
                      ? "bg-forest/10 text-forest"
                      : "text-ink-soft hover:bg-forest/5",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/explore"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-forest text-base font-semibold text-cream"
              >
                Start a Trail
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}