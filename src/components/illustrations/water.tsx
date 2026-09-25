"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Discovery 04 — Water.
 * Water droplets travel upward: soil → roots → trunk → leaves.
 */
export function WaterIllustration({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  const rails = [
    { base: 112, delay: 0 },
    { base: 160, delay: 1 },
    { base: 208, delay: 2 },
    { base: 250, delay: 3 },
  ];
  const from = 262;
  const to = 94;
  const step = (to - from) / 3;

  return (
    <svg
      viewBox="0 0 320 320"
      className={className}
      role="img"
      aria-label="Water travelling upward from the soil through a tree to its leaves"
    >
      {/* canopy */}
      <g>
        <circle cx="156" cy="62" r="30" fill="#6fae5c" />
        <circle cx="194" cy="102" r="34" fill="#6fae5c" />
        <circle cx="160" cy="84" r="46" fill="#5e9e4e" />
        <circle cx="128" cy="104" r="34" fill="#4c8a3c" />
      </g>

      {/* trunk */}
      <rect x="148" y="108" width="24" height="140" rx="10" fill="#6f5233" />

      {/* roots at the soil line */}
      <g fill="none" stroke="#6f5233" strokeLinecap="round">
        <path d="M160 244 C 158 258 146 266 134 272" strokeWidth="7" />
        <path d="M160 244 C 162 260 176 268 190 272" strokeWidth="7" />
      </g>

      {/* grass + soil */}
      <rect x="70" y="244" width="180" height="12" rx="6" fill="#4c8a3c" />
      <rect x="70" y="254" width="180" height="52" rx="16" fill="#8a6a45" />

      {/* droplets rising */}
      <g fill="#8ecae6">
        {rails.map((rail) => (
          <g key={rail.base}>
            <circle cx="160" cy={rail.base} r="6" opacity="0.45" />
            <motion.circle
              cx="160"
              cy={rail.base}
              r="6"
              initial={{ opacity: 0 }}
              animate={
                reduce
                  ? undefined
                  : {
                      y: [
                        from - rail.base,
                        from + step - rail.base,
                        from + step * 2 - rail.base,
                        to - rail.base,
                      ],
                      opacity: [0, 1, 1, 0],
                    }
              }
              transition={{
                duration: 4,
                times: [0, 0.25, 0.8, 1],
                repeat: Infinity,
                ease: "easeInOut",
                delay: rail.delay,
              }}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}