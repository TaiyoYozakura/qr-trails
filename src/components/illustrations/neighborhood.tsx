"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Ambedkar Heritage Trail, discovery 03 — the neighbourhood.
 * A dense cluster of mid-rise buildings with the garden sitting inside it.
 */
export function NeighborhoodIllustration({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  const buildings = [
    { x: 14, y: 96, w: 44, h: 96 },
    { x: 64, y: 120, w: 34, h: 72 },
    { x: 104, y: 82, w: 40, h: 110 },
    { x: 150, y: 128, w: 30, h: 64 },
    { x: 228, y: 104, w: 38, h: 88 },
    { x: 272, y: 134, w: 34, h: 58 },
  ];

  const windows = [
    { cx: 30, cy: 116, delay: 0 },
    { cx: 46, cy: 132, delay: 0.8 },
    { cx: 120, cy: 104, delay: 1.6 },
    { cx: 136, cy: 140, delay: 2.4 },
    { cx: 244, cy: 128, delay: 1.1 },
    { cx: 258, cy: 160, delay: 2 },
    { cx: 78, cy: 148, delay: 0.4 },
    { cx: 286, cy: 154, delay: 2.8 },
  ];

  return (
    <svg
      viewBox="0 0 320 240"
      className={className}
      role="img"
      aria-label="A dense neighbourhood of mid-rise buildings with a small garden between them"
    >
      {/* sky */}
      <rect x="0" y="0" width="320" height="200" fill="#dceef8" />
      <circle cx="42" cy="40" r="17" fill="#ffd166" opacity="0.9" />

      {/* buildings */}
      <g fill="#e0d3b4">
        {buildings.map((b) => (
          <rect
            key={b.x}
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx="4"
            fill={b.x % 3 === 0 ? "#e0d3b4" : "#ece3cd"}
            stroke="#8f8e82"
            strokeWidth="2"
          />
        ))}
      </g>

      {/* lit windows */}
      {windows.map((w) => (
        <motion.rect
          key={`${w.cx}-${w.cy}`}
          x={w.cx}
          y={w.cy}
          width="8"
          height="10"
          rx="1.5"
          fill="#ffd166"
          animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: w.delay,
          }}
        />
      ))}

      {/* the garden pocket in the middle */}
      <ellipse cx="196" cy="192" rx="58" ry="16" fill="#a9ce8e" opacity="0.7" />
      <g>
        <rect x="193" y="166" width="6" height="20" rx="3" fill="#6f5233" />
        <motion.g
          style={{ transformOrigin: "196px 170px" }}
          animate={reduce ? undefined : { rotate: [-2, 2, -2] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="186" cy="160" r="11" fill="#4c8a3c" />
          <circle cx="206" cy="160" r="11" fill="#6fae5c" />
          <circle cx="196" cy="154" r="14" fill="#5e9e4e" />
        </motion.g>
      </g>

      {/* ground + road */}
      <rect x="0" y="200" width="320" height="40" fill="#e0d3b4" />
      <rect x="0" y="216" width="320" height="3" fill="#f6f2e7" opacity="0.8" />
      <rect x="0" y="200" width="320" height="4" fill="#8f8e82" opacity="0.25" />
    </svg>
  );
}
