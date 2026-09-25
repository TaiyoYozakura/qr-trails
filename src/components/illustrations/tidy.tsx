"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Garden Life Trail, discovery 03 — keep it clean.
 * A bin on a tidy path with a wrapper on its way in, not on the ground.
 */
export function TidyIllustration({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <svg
      viewBox="0 0 320 240"
      className={className}
      role="img"
      aria-label="A bin beside a clean path with a wrapper dropping into it, and flowers growing nearby"
    >
      {/* ground */}
      <rect x="0" y="140" width="320" height="100" fill="#a9ce8e" opacity="0.7" />
      {/* path */}
      <path
        d="M0 196 C 90 178 210 178 320 196 L 320 240 L 0 240 Z"
        fill="#e0d3b4"
      />

      {/* flowers either side — untouched */}
      {[
        { x: 44, petal: "#cf5f4e" },
        { x: 74, petal: "#ffd166" },
        { x: 258, petal: "#f2a05c" },
        { x: 288, petal: "#cf5f4e" },
      ].map((f, i) => (
        <motion.g
          key={f.x}
          style={{ transformOrigin: `${f.x}px 208px` }}
          animate={reduce ? undefined : { rotate: [-2, 2, -2] }}
          transition={{ duration: 5.5 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d={`M${f.x} 208 C ${f.x} 196 ${f.x + 2} 188 ${f.x} 180`}
            stroke="#4c8a3c"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <g fill={f.petal}>
            <circle cx={f.x} cy={172} r="5.5" />
            <circle cx={f.x + 5.5} cy={177} r="5.5" />
            <circle cx={f.x} cy={182} r="5.5" />
            <circle cx={f.x - 5.5} cy={177} r="5.5" />
          </g>
          <circle cx={f.x} cy={177} r="3" fill="#f9e6b8" />
        </motion.g>
      ))}

      {/* bin */}
      <g>
        <rect x="134" y="112" width="7" height="26" rx="3" fill="#6f5233" />
        <rect
          x="118"
          y="136"
          width="56"
          height="62"
          rx="8"
          fill="#1e4b2e"
          stroke="#143420"
          strokeWidth="3"
        />
        <rect x="130" y="150" width="32" height="10" rx="5" fill="#a9ce8e" />
        <rect x="130" y="166" width="20" height="8" rx="4" fill="#5e9e4e" opacity="0.8" />
        <rect x="126" y="130" width="40" height="9" rx="4.5" fill="#4c8a3c" />
        <path
          d="M146 108 C 152 114 152 122 146 128 C 140 122 140 114 146 108 Z"
          fill="#5e9e4e"
        />
      </g>

      {/* wrapper dropping in */}
      <motion.g
        animate={
          reduce
            ? undefined
            : { x: [0, -18, -40, -62], y: [0, -14, -30, -44], opacity: [1, 1, 1, 0] }
        }
        transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 1.6, ease: "easeIn" }}
      >
        <g transform="translate(230 150)">
          <rect x="-10" y="-7" width="20" height="14" rx="3" fill="#f2a05c" />
          <rect x="-10" y="-7" width="20" height="5" rx="2.5" fill="#f7d3b1" />
        </g>
      </motion.g>

      {/* clean ground marker */}
      <g stroke="#4c8a3c" strokeWidth="3" strokeLinecap="round" opacity="0.75">
        <path d="M196 214 L 202 220 L 214 206" />
      </g>
    </svg>
  );
}
