"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Page transition (Animation Guidelines §29).
 * New page: opacity 0→1, translateY 8px→0, ~300ms.
 * Reduced motion is handled by the root MotionConfig (no slide, quick fade).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduce ? 0.15 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}