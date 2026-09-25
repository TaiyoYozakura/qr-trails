"use client";

import { motion, useReducedMotion } from "motion/react";

const confetti = [
  { x: -74, y: -52, c: "#ffd166" },
  { x: 68, y: -64, c: "#f2a05c" },
  { x: 84, y: 22, c: "#8ecae6" },
  { x: -64, y: 58, c: "#5e9e4e" },
  { x: 18, y: -86, c: "#cf5f4e" },
  { x: -90, y: 6, c: "#5e9e4e" },
  { x: 40, y: 80, c: "#ffd166" },
  { x: -24, y: 88, c: "#8ecae6" },
];

/**
 * Signature animation #05 — completion.
 * Ring draws, check mark draws, then a small one-shot burst.
 * Under reduced motion the badge appears without the burst.
 */
export function Celebration({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      role="img"
      aria-label="A green check mark inside a ring, with confetti"
    >
      <motion.circle
        cx="120"
        cy="120"
        r="66"
        fill="none"
        stroke="#1e4b2e"
        strokeWidth="8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduce ? 0.1 : 0.7, ease: "easeOut" }}
      />
      <motion.path
        d="M84 122 L 110 148 L 158 96"
        fill="none"
        stroke="#5e9e4e"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: reduce ? 0.1 : 0.5,
          delay: reduce ? 0 : 0.45,
          ease: "easeOut",
        }}
      />
      {confetti.map((piece, i) => (
        <motion.circle
          key={i}
          cx="120"
          cy="120"
          r={i % 2 === 0 ? 5 : 4}
          fill={piece.c}
          initial={{ opacity: 0 }}
          animate={
            reduce
              ? undefined
              : { opacity: [0, 1, 0], x: piece.x, y: piece.y }
          }
          transition={{ duration: 1.1, delay: 0.6, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}