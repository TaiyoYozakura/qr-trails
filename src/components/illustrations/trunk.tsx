"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Discovery 02 — Trunk.
 * A cross-section with growth rings and water flowing upward.
 */
export function TrunkIllustration({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  // Static resting positions for the droplets; animated ones rise past them.
  const rails = [
    { base: 112, delay: 0 },
    { base: 172, delay: 1.1 },
    { base: 232, delay: 2.2 },
  ];
  const from = 250;
  const to = 64;
  const step = (to - from) / 3;

  return (
    <svg
      viewBox="0 0 320 320"
      className={className}
      role="img"
      aria-label="A cross-section of a tree trunk showing growth rings and water moving upward"
    >
      {/* bark ring */}
      <circle cx="160" cy="160" r="118" fill="none" stroke="#6f5233" strokeWidth="18" />
      {/* wood */}
      <circle cx="160" cy="160" r="106" fill="#efe3c8" />
      {/* growth rings */}
      <g fill="none" stroke="#d3b184" strokeWidth="4">
        <circle cx="160" cy="160" r="88" />
        <circle cx="160" cy="160" r="68" />
        <circle cx="160" cy="160" r="48" />
        <circle cx="160" cy="160" r="28" />
      </g>
      <circle cx="160" cy="160" r="14" fill="#d3b184" />

      {/* water moving upward through the trunk */}
      <g fill="#8ecae6">
        {rails.map((rail) => (
          <g key={rail.base}>
            <circle cx="160" cy={rail.base} r="7" opacity="0.5" />
            <motion.circle
              cx="160"
              cy={rail.base}
              r="7"
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
                duration: 3.4,
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