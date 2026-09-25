"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Ambedkar Heritage Trail, discovery 01 — the memorial at the centre.
 * An abstract, respectful silhouette on a plinth, holding the Constitution,
 * with a garland and morning sunlight behind it.
 */
export function StatueIllustration({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <svg
      viewBox="0 0 320 240"
      className={className}
      role="img"
      aria-label="A statue on a stone plinth, garlanded, with sunlight behind it"
    >
      {/* sun glow behind the memorial */}
      <motion.g
        animate={reduce ? undefined : { opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="160" cy="86" r="58" fill="#f9e6b8" opacity="0.55" />
      </motion.g>
      <circle cx="160" cy="86" r="34" fill="#ffd166" opacity="0.85" />

      {/* ground */}
      <path
        d="M0 196 Q 90 184 160 190 Q 240 197 320 188 L 320 240 L 0 240 Z"
        fill="#a9ce8e"
        opacity="0.5"
      />

      {/* plinth */}
      <rect x="118" y="168" width="84" height="18" rx="4" fill="#e0d3b4" />
      <rect x="128" y="150" width="64" height="20" rx="4" fill="#ece3cd" />
      <rect x="136" y="138" width="48" height="14" rx="4" fill="#e0d3b4" />

      {/* figure */}
      <g fill="#1e4b2e">
        <circle cx="160" cy="78" r="12" />
        <path d="M160 92 C 147 92 140 100 139 112 L 137 140 L 183 140 L 181 112 C 180 100 173 92 160 92 Z" />
        <rect x="139" y="98" width="42" height="10" rx="5" fill="#143420" />
      </g>

      {/* book held at the side */}
      <rect x="176" y="116" width="20" height="14" rx="2" fill="#f6f2e7" stroke="#143420" strokeWidth="2" />

      {/* garland — sways gently */}
      <motion.g
        style={{ transformOrigin: "160px 100px" }}
        animate={reduce ? undefined : { rotate: [-1.2, 1.2, -1.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M139 100 Q 160 118 181 100"
          stroke="#f2a05c"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <g fill="#cf5f4e">
          <circle cx="148" cy="108" r="4" />
          <circle cx="160" cy="112" r="4" />
          <circle cx="172" cy="108" r="4" />
        </g>
      </motion.g>

      {/* flowers laid at the base */}
      <g>
        {[
          { cx: 128, cy: 194, petal: "#ffd166" },
          { cx: 192, cy: 196, petal: "#cf5f4e" },
          { cx: 214, cy: 190, petal: "#f2a05c" },
        ].map((f) => (
          <g key={f.cx}>
            <g fill={f.petal}>
              <circle cx={f.cx} cy={f.cy - 5} r="4.5" />
              <circle cx={f.cx + 4.5} cy={f.cy} r="4.5" />
              <circle cx={f.cx} cy={f.cy + 5} r="4.5" />
              <circle cx={f.cx - 4.5} cy={f.cy} r="4.5" />
            </g>
            <circle cx={f.cx} cy={f.cy} r="2.4" fill="#f9e6b8" />
          </g>
        ))}
      </g>
    </svg>
  );
}
