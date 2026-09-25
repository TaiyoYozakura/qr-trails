"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Standard entrance animation (Animation Guidelines §7):
 * opacity 0→1, translateY 20→0, scale 0.98→1.
 *
 * Reduced motion is handled by the root MotionConfig (transform animations
 * are skipped, opacity fades remain). `initial` stays identical on server and
 * client to avoid hydration mismatches.
 */
export function Entrance({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: reduce ? 0.2 : 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}