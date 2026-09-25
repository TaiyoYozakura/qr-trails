"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Play Trail, discovery 05 — the merry-go-round.
 * A spinning disc seen at an angle, with riders holding the bars and motion arcs.
 */
export function RoundaboutIllustration({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <svg
      viewBox="0 0 320 240"
      className={className}
      role="img"
      aria-label="A spinning merry-go-round with children holding the bars, and curved motion lines around it"
    >
      {/* sky + sun */}
      <rect x="0" y="0" width="320" height="172" fill="#dceef8" />
      <circle cx="52" cy="38" r="15" fill="#ffd166" />

      {/* ground */}
      <path d="M0 176 Q 160 164 320 176 L 320 240 L 0 240 Z" fill="#a9ce8e" />

      {/* motion arcs sweeping around the disc */}
      <g stroke="#8ecae6" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.85">
        <path d="M28 168 C 44 124 82 96 124 88" />
        <path d="M292 164 C 276 122 240 96 200 88" />
      </g>

      {/* the disc */}
      <ellipse cx="160" cy="166" rx="86" ry="26" fill="#e0d3b4" />
      <ellipse cx="160" cy="162" rx="86" ry="26" fill="#f2a05c" />
      <ellipse cx="160" cy="160" rx="60" ry="18" fill="#f7d3b1" />

      {/* the spinning hub and spokes */}
      <motion.g
        style={{ transformOrigin: "160px 160px" }}
        animate={reduce ? undefined : { x: [-46, 46, -46] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <g fill="#cf5f4e">
          <ellipse cx="118" cy="166" rx="8" ry="5" />
          <ellipse cx="160" cy="176" rx="8" ry="5" />
          <ellipse cx="202" cy="166" rx="8" ry="5" />
        </g>
        {/* centre hub */}
        <rect x="150" y="126" width="20" height="40" rx="8" fill="#1e4b2e" />
        {/* the handle bars riders hold */}
        <path d="M104 122 L 216 122" stroke="#1e4b2e" strokeWidth="6" strokeLinecap="round" />
        <path d="M104 122 L 104 156" stroke="#1e4b2e" strokeWidth="6" strokeLinecap="round" />
        <path d="M216 122 L 216 156" stroke="#1e4b2e" strokeWidth="6" strokeLinecap="round" />

        {/* two riders */}
        <g transform="translate(96 156)">
          <circle cx="0" cy="-34" r="8" fill="#8f5b3a" />
          <rect x="-7" y="-26" width="14" height="18" rx="6" fill="#8ecae6" />
          <path d="M-7 -14 L -10 -6" stroke="#1e4b2e" strokeWidth="4" strokeLinecap="round" />
          <path d="M7 -14 L 10 -6" stroke="#1e4b2e" strokeWidth="4" strokeLinecap="round" />
        </g>
        <g transform="translate(228 156)">
          <circle cx="0" cy="-34" r="8" fill="#2c2b26" />
          <rect x="-7" y="-26" width="14" height="18" rx="6" fill="#f2a05c" />
          <path d="M-7 -14 L -10 -6" stroke="#1e4b2e" strokeWidth="4" strokeLinecap="round" />
          <path d="M7 -14 L 10 -6" stroke="#1e4b2e" strokeWidth="4" strokeLinecap="round" />
        </g>
      </motion.g>

      {/* grass */}
      <g stroke="#4c8a3c" strokeWidth="3" strokeLinecap="round" opacity="0.75">
        <path d="M20 210 C 22 200 24 194 28 188" />
        <path d="M296 212 C 298 202 300 196 304 190" />
        <path d="M160 226 C 162 216 164 210 168 204" />
      </g>
    </svg>
  );
}
