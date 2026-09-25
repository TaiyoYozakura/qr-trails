"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Garden scene — hills, a winding path, trees, flowers and a QR sign.
 */
export function GardenIllustration({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <svg
      viewBox="0 0 320 240"
      className={className}
      role="img"
      aria-label="A garden with rolling hills, a winding path, trees, flowers and a QR sign"
    >
      {/* hills */}
      <path
        d="M0 150 Q 90 96 190 140 Q 260 172 320 148 L 320 240 L 0 240 Z"
        fill="#a9ce8e"
        opacity="0.45"
      />
      <path
        d="M0 180 Q 120 140 240 176 Q 280 190 320 182 L 320 240 L 0 240 Z"
        fill="#a9ce8e"
        opacity="0.3"
      />

      {/* sun */}
      <circle cx="258" cy="44" r="15" fill="#ffd166" />
      <g stroke="#d9a441" strokeWidth="3" strokeLinecap="round">
        <path d="M258 21 L258 15" />
        <path d="M258 67 L258 73" />
        <path d="M235 44 L229 44" />
        <path d="M281 44 L287 44" />
      </g>

      {/* path */}
      <path
        d="M40 240 C 90 200 140 192 180 196 C 230 200 260 216 300 240"
        stroke="#e0d3b4"
        strokeWidth="20"
        strokeLinecap="round"
        fill="none"
      />

      {/* left tree (subtle sway) */}
      <rect x="96" y="110" width="12" height="46" rx="5" fill="#6f5233" />
      <motion.g
        style={{ transformOrigin: "102px 156px" }}
        animate={reduce ? undefined : { rotate: [-1, 1, -1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="82" cy="100" r="18" fill="#4c8a3c" />
        <circle cx="122" cy="100" r="18" fill="#6fae5c" />
        <circle cx="102" cy="92" r="26" fill="#5e9e4e" />
      </motion.g>

      {/* right tree */}
      <rect x="230" y="130" width="9" height="34" rx="4" fill="#6f5233" />
      <circle cx="234" cy="118" r="18" fill="#5e9e4e" />
      <circle cx="222" cy="124" r="12" fill="#4c8a3c" />

      {/* QR sign */}
      <rect x="167" y="158" width="5" height="34" fill="#6f5233" />
      <rect
        x="150"
        y="132"
        width="40"
        height="30"
        rx="5"
        fill="#ffffff"
        stroke="#1e4b2e"
        strokeWidth="3"
      />
      <g fill="#1e4b2e">
        <rect x="156" y="138" width="6" height="6" />
        <rect x="178" y="138" width="6" height="6" />
        <rect x="156" y="156" width="6" height="6" />
        <rect x="170" y="148" width="4" height="4" />
      </g>

      {/* flowers along the path */}
      <Flower cx={70} cy={206} petal="#f2a05c" />
      <Flower cx={122} cy={212} petal="#cf5f4e" />
      <Flower cx={216} cy={224} petal="#ffd166" />
    </svg>
  );
}

function Flower({
  cx,
  cy,
  petal,
}: {
  cx: number;
  cy: number;
  petal: string;
}) {
  return (
    <g>
      <path
        d={`M${cx} ${cy} C ${cx} ${cy + 10} ${cx - 2} ${cy + 16} ${cx - 4} ${cy + 22}`}
        stroke="#4c8a3c"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <g fill={petal}>
        <circle cx={cx} cy={cy - 8} r="6" />
        <circle cx={cx + 6} cy={cy - 2} r="6" />
        <circle cx={cx + 2} cy={cy + 5} r="6" />
        <circle cx={cx - 6} cy={cy - 1} r="6" />
        <circle cx={cx - 5} cy={cy + 6} r="6" />
      </g>
      <circle cx={cx} cy={cy} r="4" fill="#f9e6b8" />
    </g>
  );
}