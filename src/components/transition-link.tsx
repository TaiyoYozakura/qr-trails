"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "motion/react";
import type { MouseEvent, ReactNode } from "react";

type StartViewTransition = (callback: () => void | Promise<void>) => unknown;

/**
 * A Link that wraps navigation in `document.startViewTransition` when the
 * browser supports it and the user hasn't requested reduced motion.
 * Shared elements (see ViewName) then morph between pages.
 */
export function TransitionLink({
  href,
  className,
  children,
  onClick,
  ...rest
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
} & Omit<
  React.ComponentProps<typeof Link>,
  "href" | "className" | "children" | "onClick"
>) {
  const router = useRouter();
  const reduce = useReducedMotion();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const modified =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (modified || reduce || event.button !== 0) return;

    const start =
      typeof document !== "undefined"
        ? (document as Document & {
            startViewTransition?: StartViewTransition;
          }).startViewTransition
        : undefined;

    if (typeof start === "function") {
      event.preventDefault();
      start(() => router.push(href));
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}