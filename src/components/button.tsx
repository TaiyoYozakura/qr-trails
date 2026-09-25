import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "outlineDark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest text-cream shadow-[0_10px_24px_-14px_rgb(30_75_46_/_0.6)] hover:bg-forest-deep",
  secondary:
    "bg-white/70 text-forest ring-1 ring-inset ring-forest/20 hover:bg-white hover:ring-forest/30",
  ghost: "text-forest hover:bg-forest/5",
  /** Solid light button for dark-green bands — same shape as `primary`. */
  onDark:
    "bg-cream text-forest shadow-[0_10px_24px_-14px_rgb(30_75_46_/_0.6)] hover:bg-white",
  /** Outline button for dark-green bands — same shape as `secondary`. */
  outlineDark: "text-cream ring-1 ring-inset ring-cream/40 hover:bg-cream/10",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: BaseProps & { href: string } & Omit<
    React.ComponentProps<typeof Link>,
    "href" | "className"
  >) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 hover:-translate-y-px active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 hover:-translate-y-px active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}