"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Ambedkar Heritage Trail, discovery 02 — the garden's name board.
 * A painted wooden board on two posts, with a carved name and a leaf motif.
 */
export function PlaqueIllustration({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <svg
      viewBox="0 0 320 240"
      className={className}
      role="img"
      aria-label="A garden name board on two wooden posts, with a leaf carved on it"
    >
      {/* hedge behind */}
      <path
        d="M0 176 Q 60 160 128 172 Q 200 184 320 166 L 320 240 L 0 240 Z"
        fill="#a9ce8e"
        opacity="0.45"
      />

      {/* posts */}
      <rect x="86" y="92" width="14" height="104" rx="5" fill="#6f5233" />
      <rect x="220" y="92" width="14" height="104" rx="5" fill="#6f5233" />

      {/* board */}
      <rect
        x="58"
        y="66"
        width="204"
        height="62"
        rx="10"
        fill="#f6f2e7"
        stroke="#1e4b2e"
        strokeWidth="5"
      />
      <rect x="70" y="78" width="180" height="38" rx="6" fill="#1e4b2e" opacity="0.06" />

      {/* carved name — two abstract lines of lettering */}
      <g fill="#1e4b2e">
        <rect x="84" y="86" width="132" height="9" rx="4.5" />
        <rect x="84" y="103" width="86" height="7" rx="3.5" opacity="0.7" />
      </g>

      {/* leaf motif on the right of the board */}
      <g>
        <path
          d="M232 84 C 244 88 250 100 246 112 C 234 108 228 96 232 84 Z"
          fill="#5e9e4e"
        />
        <path
          d="M233 86 L 244 110"
          stroke="#4c8a3c"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* a leaf drifts down past the board */}
      <motion.g
        animate={reduce ? undefined : { y: [0, 14, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "284px 150px" }}
      >
        <path d="M284 142 C 292 148 292 158 284 164 C 276 158 276 148 284 142 Z" fill="#6fae5c" />
      </motion.g>

      {/* ground line */}
      <rect x="0" y="194" width="320" height="6" fill="#e0d3b4" />
    </svg>
  );
}
