"use client";

import { motion, useReducedMotion } from "motion/react";
import type { PlantVisual } from "@/types";

/**
 * Simple, consistent plant illustrations for flora entries.
 * Parts appear sequentially (Animation Guidelines §27).
 */
export function PlantIllustration({
  kind,
  accent,
  className,
}: {
  kind: PlantVisual;
  accent: string;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const sway = reduce ? undefined : { rotate: [-1, 1, -1] };
  const swayTransition = {
    duration: 6.5,
    repeat: Infinity,
    ease: "easeInOut" as const,
  };

  if (kind === "tree") {
    return (
      <svg
        viewBox="0 0 240 240"
        className={className}
        role="img"
        aria-label="Illustration of a tree"
      >
        <motion.g
          style={{ transformOrigin: "120px 210px" }}
          animate={sway}
          transition={swayTransition}
        >
          <Reveal delay={0.1} reduce={reduce}>
            <rect x="108" y="150" width="24" height="62" rx="8" fill="#6f5233" />
          </Reveal>
          <Reveal delay={0.3} reduce={reduce}>
            <g>
              <circle cx="150" cy="128" r="34" fill={accent} opacity="0.75" />
              <circle cx="94" cy="134" r="28" fill={accent} />
              <circle cx="120" cy="112" r="38" fill={accent} />
            </g>
          </Reveal>
          <Reveal delay={0.45} reduce={reduce}>
            <circle cx="122" cy="116" r="14" fill="#f9e6b8" opacity="0.5" />
          </Reveal>
        </motion.g>
      </svg>
    );
  }

  if (kind === "herb") {
    return (
      <svg
        viewBox="0 0 240 240"
        className={className}
        role="img"
        aria-label="Illustration of a small herb"
      >
        <motion.g
          style={{ transformOrigin: "120px 210px" }}
          animate={sway}
          transition={swayTransition}
        >
          {[100, 120, 140].map((cx, i) => (
            <Reveal key={cx} delay={0.1 + i * 0.12} reduce={reduce}>
              <g>
                <path
                  d={`M${cx} 205 C ${cx} 180 ${cx + (i - 1) * 6} 160 ${cx + (i - 1) * 8} 138`}
                  stroke="#4c8a3c"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
                <ellipse
                  cx={cx + 4}
                  cy={cx === 140 ? 150 : 158}
                  rx="13"
                  ry="9"
                  fill={accent}
                  transform={`rotate(-18 ${cx + 4} 156)`}
                />
                <ellipse
                  cx={cx - 6}
                  cy={cx === 140 ? 168 : 176}
                  rx="13"
                  ry="9"
                  fill={accent}
                  opacity="0.8"
                  transform={`rotate(14 ${cx - 6} 172)`}
                />
                {i === 1 && (
                  <circle cx={cx + 8} cy={130} r="5" fill="#ffd166" />
                )}
              </g>
            </Reveal>
          ))}
        </motion.g>
      </svg>
    );
  }

  // flower
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      role="img"
      aria-label="Illustration of a flowering plant"
    >
      <motion.g
        style={{ transformOrigin: "120px 210px" }}
        animate={sway}
        transition={swayTransition}
      >
        <Reveal delay={0.1} reduce={reduce}>
          <path
            d="M120 208 C 120 180 118 160 122 132"
            stroke="#4c8a3c"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </Reveal>
        <Reveal delay={0.25} reduce={reduce}>
          <g>
            <path
              d="M120 178 c -16 -4 -22 -12 -20 -20 c 13 3 20 10 20 20 Z"
              fill={accent}
            />
            <path
              d="M120 186 c 16 -4 22 -12 20 -20 c -13 3 -20 10 -20 20 Z"
              fill={accent}
              opacity="0.8"
            />
          </g>
        </Reveal>
        <Reveal delay={0.4} reduce={reduce}>
          <g>
            <g fill={accent}>
              <ellipse
                cx="120"
                cy="106"
                rx="13"
                ry="20"
                transform="rotate(0 120 120)"
              />
              <ellipse
                cx="120"
                cy="106"
                rx="13"
                ry="20"
                transform="rotate(72 120 120)"
              />
              <ellipse
                cx="120"
                cy="106"
                rx="13"
                ry="20"
                transform="rotate(144 120 120)"
              />
              <ellipse
                cx="120"
                cy="106"
                rx="13"
                ry="20"
                transform="rotate(216 120 120)"
              />
              <ellipse
                cx="120"
                cy="106"
                rx="13"
                ry="20"
                transform="rotate(288 120 120)"
              />
            </g>
            <circle cx="120" cy="120" r="12" fill="#ffd166" />
            <circle cx="120" cy="120" r="5" fill="#d9a441" />
          </g>
        </Reveal>
      </motion.g>
    </svg>
  );
}

function Reveal({
  delay,
  reduce,
  children,
}: {
  delay: number;
  reduce: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reduce ? 0.15 : 0.5,
        delay: reduce ? 0 : delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.g>
  );
}