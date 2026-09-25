"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Play Trail, discovery 04 — the see-saw.
 * A plank on a pivot, a lighter child further out balancing a heavier one nearer
 * the middle.
 */
export function SeeSawIllustration({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <svg
      viewBox="0 0 320 240"
      className={className}
      role="img"
      aria-label="Two children of different sizes balancing on a see-saw, one sitting further from the middle"
    >
      {/* sky + sun */}
      <rect x="0" y="0" width="320" height="176" fill="#dceef8" />
      <circle cx="270" cy="40" r="15" fill="#ffd166" />

      {/* ground */}
      <path d="M0 180 Q 160 168 320 180 L 320 240 L 0 240 Z" fill="#a9ce8e" />

      {/* pivot */}
      <path d="M136 196 L 160 150 L 184 196 Z" fill="#6f5233" />
      <rect x="126" y="194" width="68" height="10" rx="5" fill="#4c8a3c" />

      {/* the plank, tipping about the pivot */}
      <motion.g
        style={{ transformOrigin: "160px 150px" }}
        animate={reduce ? undefined : { rotate: [-9, 9, -9] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="40" y="144" width="240" height="12" rx="6" fill="#f2a05c" />
        <rect x="40" y="144" width="240" height="5" rx="2.5" fill="#f7d3b1" />
        {/* handle bars */}
        <path d="M64 144 L 64 130" stroke="#1e4b2e" strokeWidth="4" strokeLinecap="round" />
        <path d="M256 144 L 256 130" stroke="#1e4b2e" strokeWidth="4" strokeLinecap="round" />

        {/* the lighter child sits furthest from the pivot */}
        <g transform="translate(64 144)">
          <circle cx="0" cy="-32" r="7.5" fill="#8f5b3a" />
          <rect x="-6.5" y="-24" width="13" height="17" rx="6" fill="#cf5f4e" />
          <path d="M-6.5 -7 L -2 0" stroke="#1e4b2e" strokeWidth="4" strokeLinecap="round" />
          <path d="M6.5 -7 L 2 0" stroke="#1e4b2e" strokeWidth="4" strokeLinecap="round" />
        </g>
        {/* the heavier child sits closer in */}
        <g transform="translate(222 144)">
          <circle cx="0" cy="-33" r="9.5" fill="#2c2b26" />
          <rect x="-9" y="-24" width="18" height="21" rx="8" fill="#8ecae6" />
          <path d="M-9 -4 L -4 0" stroke="#1e4b2e" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M9 -4 L 4 0" stroke="#1e4b2e" strokeWidth="4.5" strokeLinecap="round" />
        </g>
      </motion.g>

      {/* distance markers from the pivot */}
      <g stroke="#8f8e82" strokeWidth="2" strokeDasharray="5 5" opacity="0.8">
        <path d="M160 210 L 160 174" />
        <path d="M64 216 L 64 176" />
        <path d="M222 212 L 222 176" />
      </g>
      <text x="150" y="232" fontSize="11" fill="#5f5e54" fontWeight="600">
        weight × distance
      </text>

      {/* grass */}
      <g stroke="#4c8a3c" strokeWidth="3" strokeLinecap="round" opacity="0.75">
        <path d="M22 206 C 24 196 26 190 30 184" />
        <path d="M294 208 C 296 198 298 192 302 186" />
      </g>
    </svg>
  );
}
