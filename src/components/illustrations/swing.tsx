"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Play Trail, discovery 02 — the swing.
 * An A-frame with two swings, the nearer one keeping a steady pendulum beat.
 */
export function SwingIllustration({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <svg
      viewBox="0 0 320 240"
      className={className}
      role="img"
      aria-label="A playground swing set with a child swinging back and forth"
    >
      {/* sky + sun */}
      <rect x="0" y="0" width="320" height="178" fill="#dceef8" />
      <circle cx="272" cy="38" r="16" fill="#ffd166" />

      {/* ground */}
      <path d="M0 180 Q 160 168 320 180 L 320 240 L 0 240 Z" fill="#a9ce8e" />

      {/* A-frame */}
      <g stroke="#1e4b2e" strokeWidth="6" strokeLinecap="round" fill="none">
        <path d="M76 182 L 122 62" />
        <path d="M244 182 L 198 62" />
      </g>
      <rect x="116" y="56" width="88" height="9" rx="4.5" fill="#1e4b2e" />
      <rect x="60" y="176" width="150" height="8" rx="4" fill="#6f5233" />

      {/* still swing (far side) */}
      <g stroke="#8f8e82" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M150 62 L 150 150" />
        <path d="M178 62 L 178 150" />
      </g>
      <rect x="146" y="150" width="36" height="8" rx="4" fill="#cf5f4e" opacity="0.75" />

      {/* the swinging seat — a pendulum about the top bar */}
      <motion.g
        style={{ transformOrigin: "100px 60px" }}
        animate={reduce ? undefined : { rotate: [-26, 26, -26] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <g stroke="#4c8a3c" strokeWidth="3.5" strokeLinecap="round" fill="none">
          <path d="M100 62 L 100 152" />
          <path d="M124 62 L 124 152" />
        </g>
        <rect x="96" y="152" width="32" height="9" rx="4.5" fill="#f2a05c" />
        {/* the child on the seat */}
        <g transform="translate(112 150)">
          <circle cx="0" cy="-26" r="8" fill="#8f5b3a" />
          <rect x="-7" y="-18" width="14" height="18" rx="6" fill="#8ecae6" />
          <path d="M-7 -8 L -14 2" stroke="#1e4b2e" strokeWidth="4" strokeLinecap="round" />
          <path d="M7 -8 L 14 2" stroke="#1e4b2e" strokeWidth="4" strokeLinecap="round" />
        </g>
      </motion.g>

      {/* the beat: marks along the arc */}
      <g fill="#8f8e82" opacity="0.5">
        <circle cx="72" cy="150" r="3.5" />
        <circle cx="64" cy="120" r="3" />
        <circle cx="100" cy="46" r="3.5" />
        <circle cx="152" cy="150" r="3.5" />
        <circle cx="160" cy="120" r="3" />
      </g>

      {/* grass */}
      <g stroke="#4c8a3c" strokeWidth="3" strokeLinecap="round" opacity="0.8">
        <path d="M24 206 C 26 196 28 190 32 184" />
        <path d="M288 208 C 290 198 292 192 296 186" />
      </g>
    </svg>
  );
}
