import type { CSSProperties, ReactNode } from "react";

/**
 * Marks an element with a view-transition-name so that, when the same name
 * exists on the previous and next page, the browser morphs one into the other
 * (Animation Guidelines §30 — shared element transitions).
 * Without View Transitions API support this is a plain span.
 */
export function ViewName({
  name,
  className,
  children,
}: {
  name: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={className}
      style={{ viewTransitionName: name } as CSSProperties}
    >
      {children}
    </span>
  );
}