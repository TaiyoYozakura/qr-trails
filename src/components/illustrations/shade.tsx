"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Tree & Shade Trail, discovery 03 — why shade matters.
 * One big canopy, one dark patch of cool ground, and a bright hot world outside it.
 */
export function ShadeIllustration({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <svg
      viewBox="0 0 320 240"
      className={className}
      role="img"
      aria-label="A large tree casting a wide patch of shade over a bench, with bright sunlight beyond it"
    >
      {/* hot ground */}
      <rect x="0" y="150" width="320" height="90" fill="#f7d3b1" />

      {/* sun high and hard */}
      <motion.g
        animate={reduce ? undefined : { opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="272" cy="40" r="22" fill="#ffd166" />
        <g stroke="#d9a441" strokeWidth="3.5" strokeLinecap="round">
          <path d="M272 8 L272 0" />
          <path d="M272 72 L272 80" />
          <path d="M240 40 L232 40" />
          <path d="M304 40 L312 40" />
        </g>
      </motion.g>

      {/* shade patch */}
      <motion.ellipse
        cx="150"
        cy="196"
        rx="88"
        ry="26"
        fill="#1e4b2e"
        opacity="0.25"
        animate={reduce ? undefined : { opacity: [0.22, 0.3, 0.22] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* trunk + canopy */}
      <rect x="142" y="118" width="18" height="66" rx="7" fill="#6f5233" />
      <path d="M151 130 L 116 108" stroke="#6f5233" strokeWidth="7" strokeLinecap="round" />
      <path d="M151 132 L 188 110" stroke="#6f5233" strokeWidth="7" strokeLinecap="round" />

      <motion.g
        style={{ transformOrigin: "150px 118px" }}
        animate={reduce ? undefined : { rotate: [-1.4, 1.4, -1.4] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="150" cy="76" r="52" fill="#5e9e4e" />
        <circle cx="100" cy="92" r="34" fill="#4c8a3c" />
        <circle cx="202" cy="92" r="34" fill="#4c8a3c" />
        <circle cx="150" cy="62" r="34" fill="#6fae5c" />
        <circle cx="176" cy="58" r="16" fill="#a9ce8e" opacity="0.6" />
      </motion.g>

      {/* bench under the shade */}
      <g>
        <rect x="104" y="176" width="66" height="7" rx="3.5" fill="#6f5233" />
        <rect x="104" y="164" width="66" height="7" rx="3.5" fill="#6f5233" />
        <rect x="110" y="183" width="6" height="15" rx="3" fill="#4c8a3c" />
        <rect x="158" y="183" width="6" height="15" rx="3" fill="#4c8a3c" />
      </g>

      {/* a sapling outside the shade to show the difference */}
      <g opacity="0.9">
        <rect x="264" y="176" width="5" height="24" rx="2.5" fill="#6f5233" />
        <circle cx="266" cy="172" r="13" fill="#a9ce8e" />
        <path d="M254 200 Q 266 206 280 200" stroke="#e0d3b4" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
