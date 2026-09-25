"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Garden Life Trail, discovery 01 — flower beds and pollinators.
 * A mixed bed of different flower shapes with a bee and a butterfly working it.
 */
export function FlowerBedIllustration({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  const flowers = [
    { x: 52, y: 150, petal: "#cf5f4e", size: 1 },
    { x: 96, y: 136, petal: "#ffd166", size: 0.85 },
    { x: 138, y: 148, petal: "#f2a05c", size: 1.1 },
    { x: 182, y: 132, petal: "#cf5f4e", size: 0.9 },
    { x: 224, y: 146, petal: "#ffd166", size: 1.05 },
    { x: 266, y: 138, petal: "#f2a05c", size: 0.85 },
  ];

  return (
    <svg
      viewBox="0 0 320 240"
      className={className}
      role="img"
      aria-label="A flower bed with different flowers, a bee and a butterfly moving between them"
    >
      {/* sky + sun */}
      <rect x="0" y="0" width="320" height="176" fill="#dceef8" />
      <circle cx="276" cy="38" r="16" fill="#ffd166" />

      {/* soil bed */}
      <path
        d="M0 176 Q 60 158 160 170 Q 250 180 320 164 L 320 210 L 0 210 Z"
        fill="#8f5b3a"
        opacity="0.5"
      />
      <path
        d="M0 196 Q 80 186 160 194 Q 240 202 320 190 L 320 240 L 0 240 Z"
        fill="#a9ce8e"
      />

      {/* flowers */}
      {flowers.map((f, i) => (
        <motion.g
          key={f.x}
          style={{ transformOrigin: `${f.x}px 200px` }}
          animate={reduce ? undefined : { rotate: [-2, 2, -2] }}
          transition={{
            duration: 5 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            d={`M${f.x} 200 C ${f.x} 186 ${f.x + 2} 176 ${f.x} ${168}`}
            stroke="#4c8a3c"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <g fill={f.petal}>
            {[0, 72, 144, 216, 288].map((angle) => (
              <ellipse
                key={angle}
                cx={f.x}
                cy={f.y - 12 * f.size}
                rx={7 * f.size}
                ry={11 * f.size}
                transform={`rotate(${angle} ${f.x} ${f.y})`}
              />
            ))}
          </g>
          <circle cx={f.x} cy={f.y} r={6 * f.size} fill="#f9e6b8" />
        </motion.g>
      ))}

      {/* bee, flying between the flowers */}
      <motion.g
        animate={
          reduce
            ? undefined
            : { x: [0, 46, 92, 46, 0], y: [0, -16, -4, 12, 0] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <g transform="translate(74 96)">
          <ellipse cx="0" cy="0" rx="10" ry="7" fill="#2c2b26" />
          <rect x="-3" y="-7" width="6" height="14" rx="3" fill="#ffd166" />
          <ellipse cx="-1" cy="-9" rx="8" ry="4" fill="#f6f2e7" opacity="0.85" />
        </g>
      </motion.g>

      {/* butterfly */}
      <motion.g
        animate={reduce ? undefined : { x: [0, -34, -68, -34, 0], y: [0, 14, -6, -14, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      >
        <g transform="translate(258 96)">
          <path d="M0 0 C -14 -14 -22 2 -2 4 Z" fill="#f2a05c" />
          <path d="M0 0 C 14 -14 22 2 2 4 Z" fill="#cf5f4e" />
          <rect x="-1" y="-6" width="2" height="12" rx="1" fill="#2c2b26" />
        </g>
      </motion.g>
    </svg>
  );
}
