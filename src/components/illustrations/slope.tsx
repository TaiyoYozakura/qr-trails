"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Play Trail, discovery 03 — the slope.
 * A gentle ramp beside a steep one, both reaching the same height, with a
 * walker doing the climbing.
 */
export function SlopeIllustration({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <svg
      viewBox="0 0 320 240"
      className={className}
      role="img"
      aria-label="A gentle ramp and a steep slope reaching the same height, with a child walking up the ramp"
    >
      {/* sky */}
      <rect x="0" y="0" width="320" height="196" fill="#dceef8" />
      <circle cx="46" cy="38" r="15" fill="#ffd166" />

      {/* grass */}
      <path d="M0 196 L 320 196 L 320 240 L 0 240 Z" fill="#a9ce8e" />

      {/* the same height, both routes */}
      <g stroke="#8f8e82" strokeWidth="2.5" strokeDasharray="7 6" opacity="0.85">
        <path d="M24 92 L 296 92" />
      </g>
      <text x="252" y="84" fontSize="12" fill="#5f5e54" fontWeight="600">
        same height
      </text>

      {/* steep slope */}
      <path
        d="M232 196 L 288 92 L 300 196 Z"
        fill="#e0d3b4"
        stroke="#8f8e82"
        strokeWidth="2.5"
      />
      {/* gentle ramp */}
      <path
        d="M24 196 L 158 92 L 236 92 L 236 196 Z"
        fill="#ece3cd"
        stroke="#8f8e82"
        strokeWidth="2.5"
      />

      {/* walker climbing the ramp */}
      <motion.g
        animate={reduce ? undefined : { x: [0, 118], y: [0, -92] }}
        transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
      >
        <g transform="translate(60 168)">
          <circle cx="0" cy="0" r="8" fill="#2c2b26" />
          <rect x="-7" y="8" width="14" height="17" rx="6" fill="#f2a05c" />
          <path d="M-7 13 L -14 22" stroke="#1e4b2e" strokeWidth="4" strokeLinecap="round" />
          <path d="M7 13 L 14 22" stroke="#1e4b2e" strokeWidth="4" strokeLinecap="round" />
        </g>
      </motion.g>

      {/* effort arrows: long and easy vs short and hard */}
      <g stroke="#4c8a3c" strokeWidth="3.5" strokeLinecap="round" opacity="0.8">
        <path d="M60 214 L 160 214" />
        <path d="M152 208 L 162 214 L 152 220" fill="none" />
      </g>
      <g stroke="#cf5f4e" strokeWidth="4" strokeLinecap="round" opacity="0.85">
        <path d="M232 236 L 264 236" />
        <path d="M256 230 L 266 236 L 256 242" fill="none" />
      </g>

      {/* grass tufts */}
      <g stroke="#4c8a3c" strokeWidth="3" strokeLinecap="round" opacity="0.75">
        <path d="M196 210 C 198 200 200 194 204 188" />
        <path d="M16 214 C 18 204 20 198 24 192" />
      </g>
    </svg>
  );
}
