"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Discovery 03 — Roots.
 * The underground half reveals itself; water rises through the soil.
 */
export function RootsIllustration({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  const rails = [
    { cx: 150, base: 240, delay: 0.5 },
    { cx: 172, base: 268, delay: 1.3 },
  ];

  return (
    <svg
      viewBox="0 0 320 320"
      className={className}
      role="img"
      aria-label="A tree with its root system revealed underground"
    >
      {/* canopy */}
      <g>
        <circle cx="198" cy="104" r="44" fill="#4c8a3c" />
        <circle cx="170" cy="68" r="36" fill="#6fae5c" />
        <circle cx="140" cy="92" r="54" fill="#5e9e4e" />
        <circle cx="118" cy="124" r="38" fill="#6fae5c" />
      </g>

      {/* trunk */}
      <rect x="150" y="96" width="20" height="96" rx="8" fill="#6f5233" />

      {/* underground world (revealed with a gentle rise) */}
      <motion.g
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduce ? 0.2 : 0.65,
          delay: reduce ? 0 : 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* soil */}
        <rect x="0" y="196" width="320" height="124" fill="#8a6a45" />
        <g fill="#a3845f">
          <circle cx="58" cy="258" r="8" />
          <circle cx="240" cy="250" r="6" />
          <circle cx="282" cy="282" r="5" />
          <circle cx="120" cy="286" r="6" />
          <circle cx="204" cy="292" r="4" />
        </g>

        {/* roots */}
        <g fill="none" stroke="#6f5233" strokeLinecap="round">
          <path d="M160 192 C 158 216 136 232 108 244" strokeWidth="8" />
          <path d="M160 192 C 162 224 190 244 224 254" strokeWidth="8" />
          <path d="M160 192 C 158 208 176 220 196 226" strokeWidth="6" />
          <path d="M108 244 C 96 252 84 256 76 262" strokeWidth="4" />
          <path d="M224 254 C 236 262 244 266 252 272" strokeWidth="4" />
          <path d="M196 226 C 206 234 210 238 216 244" strokeWidth="3" />
        </g>

        {/* water in the soil */}
        <g fill="#8ecae6">
          {rails.map((rail) => (
            <g key={`${rail.cx}-${rail.base}`}>
              <circle cx={rail.cx} cy={rail.base} r="6" opacity="0.5" />
              <motion.circle
                cx={rail.cx}
                cy={rail.base}
                r="6"
                initial={{ opacity: 0 }}
                animate={
                  reduce
                    ? undefined
                    : {
                        y: [
                          300 - rail.base,
                          254 - rail.base,
                          214 - rail.base,
                          198 - rail.base,
                        ],
                        opacity: [0, 1, 1, 0],
                      }
                }
                transition={{
                  duration: 3.8,
                  times: [0, 0.3, 0.85, 1],
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: rail.delay,
                }}
              />
            </g>
          ))}
        </g>
      </motion.g>
    </svg>
  );
}