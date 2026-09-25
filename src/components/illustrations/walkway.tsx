"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Garden Life Trail, discovery 02 — the walking track.
 * A loop path curving around the trees, with walkers sharing it.
 */
export function WalkwayIllustration({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <svg
      viewBox="0 0 320 240"
      className={className}
      role="img"
      aria-label="A curving walking track looping around trees, with people walking on it"
    >
      {/* grass */}
      <rect x="0" y="70" width="320" height="170" fill="#a9ce8e" opacity="0.75" />

      {/* the loop track — a ring seen at an angle */}
      <ellipse cx="160" cy="176" rx="124" ry="46" fill="none" stroke="#e0d3b4" strokeWidth="26" />
      <ellipse cx="160" cy="176" rx="124" ry="46" fill="none" stroke="#f6f2e7" strokeWidth="3" opacity="0.7" />

      {/* trees inside the loop */}
      {[
        { x: 116, y: 152, s: 1 },
        { x: 178, y: 144, s: 0.8 },
        { x: 216, y: 160, s: 0.9 },
      ].map((t, i) => (
        <motion.g
          key={t.x}
          style={{ transformOrigin: `${t.x}px ${t.y + 26}px` }}
          animate={reduce ? undefined : { rotate: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x={t.x - 3} y={t.y} width="6" height={24 * t.s} rx="3" fill="#6f5233" />
          <circle cx={t.x - 10 * t.s} cy={t.y - 4} r={13 * t.s} fill="#4c8a3c" />
          <circle cx={t.x + 10 * t.s} cy={t.y - 4} r={13 * t.s} fill="#6fae5c" />
          <circle cx={t.x} cy={t.y - 14 * t.s} r={16 * t.s} fill="#5e9e4e" />
        </motion.g>
      ))}

      {/* walkers on the track */}
      <motion.g
        animate={reduce ? undefined : { x: [-96, 96, -96] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        <g transform="translate(160 132)">
          <circle cx="-52" cy="-34" r="7" fill="#f2a05c" />
          <path d="M-52 -26 L -52 -8" stroke="#1e4b2e" strokeWidth="6" strokeLinecap="round" />
          <path d="M-52 -8 L -57 6" stroke="#2c2b26" strokeWidth="5" strokeLinecap="round" />
          <path d="M-52 -8 L -47 6" stroke="#2c2b26" strokeWidth="5" strokeLinecap="round" />
          <path d="M-52 -22 L -60 -14" stroke="#1e4b2e" strokeWidth="5" strokeLinecap="round" />
          <path d="M-52 -22 L -44 -14" stroke="#1e4b2e" strokeWidth="5" strokeLinecap="round" />
        </g>
        <g transform="translate(160 132)">
          <circle cx="18" cy="-30" r="6" fill="#8f5b3a" />
          <path d="M18 -23 L 18 -7" stroke="#cf5f4e" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M18 -7 L 14 6" stroke="#2c2b26" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M18 -7 L 22 6" stroke="#2c2b26" strokeWidth="4.5" strokeLinecap="round" />
        </g>
      </motion.g>

      {/* bench beside the track */}
      <g>
        <rect x="36" y="200" width="40" height="5" rx="2.5" fill="#6f5233" />
        <rect x="36" y="192" width="40" height="5" rx="2.5" fill="#6f5233" />
        <rect x="40" y="205" width="4" height="10" rx="2" fill="#4c8a3c" />
        <rect x="68" y="205" width="4" height="10" rx="2" fill="#4c8a3c" />
      </g>

      {/* direction arrow painted on the track */}
      <g fill="#f6f2e7" opacity="0.9">
        <rect x="264" y="176" width="20" height="6" rx="3" />
        <path d="M284 168 L 296 179 L 284 190 Z" />
      </g>
    </svg>
  );
}
