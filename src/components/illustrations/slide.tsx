"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Play Trail, discovery 01 — the slide.
 * A climber, a slope and a rider on the way down, with a sun marking height.
 */
export function SlideIllustration({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <svg
      viewBox="0 0 320 240"
      className={className}
      role="img"
      aria-label="A child sliding down a playground slide, with a ladder and a sun above"
    >
      {/* sky + sun */}
      <rect x="0" y="0" width="320" height="180" fill="#dceef8" />
      <circle cx="48" cy="40" r="18" fill="#ffd166" />

      {/* ground */}
      <path d="M0 182 Q 160 168 320 182 L 320 240 L 0 240 Z" fill="#a9ce8e" />

      {/* frame: ladder */}
      <g stroke="#1e4b2e" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M96 176 L 96 74" />
        <path d="M140 176 L 140 74" />
        <path d="M96 150 L 140 150" />
        <path d="M96 122 L 140 122" />
        <path d="M96 94 L 140 94" />
      </g>
      <rect x="92" y="66" width="52" height="10" rx="5" fill="#1e4b2e" />

      {/* the slide surface */}
      <path
        d="M118 76 C 170 84 214 132 250 176"
        stroke="#f2a05c"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M118 76 C 170 84 214 132 250 176"
        stroke="#f7d3b1"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      {/* side rails */}
      <path
        d="M112 66 C 168 74 214 124 252 168"
        stroke="#cf5f4e"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />

      {/* the rider, travelling down the slope */}
      <motion.g
        animate={reduce ? undefined : { x: [0, 118], y: [0, 82] }}
        transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.2, ease: "easeIn" }}
      >
        <g transform="translate(126 66)">
          <circle cx="0" cy="0" r="8" fill="#8f5b3a" />
          <rect x="-7" y="8" width="14" height="16" rx="6" fill="#cf5f4e" />
          <path d="M-7 14 L -14 20" stroke="#1e4b2e" strokeWidth="4" strokeLinecap="round" />
          <path d="M7 14 L 14 20" stroke="#1e4b2e" strokeWidth="4" strokeLinecap="round" />
        </g>
      </motion.g>

      {/* height marks */}
      <g stroke="#8f8e82" strokeWidth="2.5" strokeLinecap="round" opacity="0.7">
        <path d="M60 74 L 76 74" />
        <path d="M60 124 L 76 124" />
        <path d="M60 176 L 76 176" />
      </g>

      {/* a runner-up walking towards the ladder */}
      <motion.g
        animate={reduce ? undefined : { x: [0, 18, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <g transform="translate(56 156)">
          <circle cx="0" cy="0" r="7" fill="#2c2b26" />
          <rect x="-6" y="7" width="12" height="15" rx="5" fill="#8ecae6" />
        </g>
      </motion.g>

      {/* grass tufts */}
      <g stroke="#4c8a3c" strokeWidth="3" strokeLinecap="round" opacity="0.8">
        <path d="M268 196 C 270 186 272 182 276 176" />
        <path d="M282 198 C 284 190 288 186 292 182" />
        <path d="M24 200 C 26 190 28 186 32 180" />
      </g>
    </svg>
  );
}
