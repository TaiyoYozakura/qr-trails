"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Centralises reduced-motion handling: transform/layout animations are
 * skipped for users who prefer reduced motion, opacity transitions remain.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  );
}