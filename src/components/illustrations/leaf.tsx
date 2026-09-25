"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Discovery 01 — Leaves.
 * A large leaf, sunlight, water droplets and subtle gas exchange.
 */
export function LeafIllustration({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <svg
      viewBox="0 0 320 320"
      className={className}
      role="img"
      aria-label="A leaf soaking up sunlight, with water droplets nearby"
    >
      {/* sun */}
      <g>
        <motion.g
          animate={reduce ? undefined : { opacity: [1, 0.6, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <SunRays />
        </motion.g>
        <circle cx="76" cy="70" r="24" fill="#ffd166" />
        <circle cx="70" cy="62" r="7" fill="#f9e6b8" opacity="0.7" />
      </g>

      {/* leaf */}
      <motion.g
        style={{ transformOrigin: "160px 230px" }}
        animate={reduce ? undefined : { rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M160 52 C 214 86 240 148 226 210 C 212 268 108 268 94 210 C 80 148 106 86 160 52 Z"
          fill="#5e9e4e"
        />
        <path
          d="M160 74 C 198 102 218 150 208 200 C 198 246 122 246 112 200 C 102 150 122 102 160 74 Z"
          fill="#6fae5c"
          opacity="0.65"
        />
        <path
          d="M160 60 L 150 240"
          stroke="#4c8a3c"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <g stroke="#4c8a3c" strokeWidth="3" strokeLinecap="round" opacity="0.8">
          <path d="M158 100 L 112 118" />
          <path d="M162 100 L 208 118" />
          <path d="M156 148 L 106 162" />
          <path d="M164 148 L 214 162" />
          <path d="M154 196 L 116 206" />
          <path d="M166 196 L 204 206" />
        </g>
        <path
          d="M150 240 C 152 258 156 268 148 278"
          stroke="#4c8a3c"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </motion.g>

      {/* water droplet */}
      <motion.g
        fill="#8ecae6"
        animate={reduce ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M252 142 c -7 9 -7 15 0 15 s 7 -6 0 -15 Z" />
      </motion.g>

      {/* gas bubbles */}
      {[
        { cx: 230, cy: 86, r: 5, delay: 0 },
        { cx: 212, cy: 70, r: 4, delay: 1.3 },
        { cx: 244, cy: 106, r: 3.5, delay: 2.4 },
      ].map((b) => (
        <motion.circle
          key={`${b.cx}-${b.cy}`}
          cx={b.cx}
          cy={b.cy}
          r={b.r}
          fill="#a9ce8e"
          animate={
            reduce
              ? undefined
              : {
                  cy: [b.cy, b.cy - 8, b.cy],
                  opacity: [0.5, 1, 0.5],
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: b.delay,
          }}
        />
      ))}
    </svg>
  );
}

function SunRays() {
  const rays = [
    "M110 70 L120 70",
    "M100.6 96.6 L107.7 103.7",
    "M76 106 L76 116",
    "M47.4 96.6 L40.3 103.7",
    "M38 70 L28 70",
    "M47.4 43.4 L40.3 36.3",
    "M76 34 L76 24",
    "M100.6 43.4 L107.7 36.3",
  ];
  return (
    <g stroke="#d9a441" strokeWidth="4" strokeLinecap="round">
      {rays.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  );
}