"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Signature animation #01 — QR scan.
 * A scanning line moves slowly through a QR-style frame.
 * Under reduced motion only the static centre line is shown.
 */
export function QrScanner({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      role="img"
      aria-label="A QR code being scanned"
    >
      {/* frame */}
      <rect
        x="8"
        y="8"
        width="224"
        height="224"
        rx="26"
        fill="#ffffff"
        stroke="#1e4b2e"
        strokeWidth="4"
      />

      {/* corner finders */}
      <g fill="none" stroke="#1e4b2e" strokeWidth="10" strokeLinecap="round">
        <path d="M30 62 V30 H62" />
        <path d="M178 30 H210 V62" />
        <path d="M30 178 V210 H62" />
        <path d="M178 210 H210 V178" />
      </g>

      {/* little leaf glyph in the centre */}
      <path
        d="M120 102 C 136 102 148 112 146 128 C 144 142 128 152 114 150 C 104 148 98 136 102 122 C 106 110 114 102 120 102 Z"
        fill="#5e9e4e"
      />
      <path
        d="M120 106 L 116 146"
        stroke="#4c8a3c"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* faint static track (shown under reduced motion) */}
      <rect
        x="38"
        y="115"
        width="164"
        height="5"
        rx="2.5"
        fill="#5b9fc9"
        opacity="0.25"
      />

      {/* scanning line */}
      <motion.rect
        x="38"
        width="164"
        height="12"
        rx="6"
        fill="#8ecae6"
        initial={{ y: 36, opacity: 0.3 }}
        animate={
          reduce
            ? undefined
            : { y: [36, 192, 36], opacity: [0.3, 0.55, 0.3] }
        }
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.rect
        x="38"
        width="164"
        height="5"
        rx="2.5"
        fill="#5b9fc9"
        initial={{ y: 39, opacity: 0.9 }}
        animate={
          reduce ? undefined : { y: [39, 195, 39], opacity: [0.9, 1, 0.9] }
        }
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}