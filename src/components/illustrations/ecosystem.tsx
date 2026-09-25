"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Discovery 05 — Ecosystem.
 * Life gradually appears around the tree: birds, insects, flowers, water.
 */
export function EcosystemIllustration({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <svg
      viewBox="0 0 320 320"
      className={className}
      role="img"
      aria-label="A tree surrounded by the birds, insects, flowers, water and soil that make up its ecosystem"
    >
      {/* sun */}
      <circle cx="264" cy="46" r="16" fill="#ffd166" />
      <g stroke="#d9a441" strokeWidth="3.5" strokeLinecap="round">
        <path d="M264 22 L264 14" />
        <path d="M264 70 L264 78" />
        <path d="M240 46 L232 46" />
        <path d="M288 46 L296 46" />
        <path d="M247 29 L241 23" />
        <path d="M281 63 L287 69" />
      </g>

      {/* tree */}
      <rect x="146" y="168" width="28" height="76" rx="9" fill="#6f5233" />
      <g>
        <circle cx="202" cy="166" r="40" fill="#6fae5c" />
        <circle cx="158" cy="112" r="36" fill="#6fae5c" />
        <circle cx="120" cy="168" r="38" fill="#4c8a3c" />
        <circle cx="160" cy="146" r="58" fill="#5e9e4e" />
      </g>

      {/* ground */}
      <ellipse cx="160" cy="252" rx="92" ry="16" fill="#8a6a45" />
      <ellipse cx="160" cy="248" rx="80" ry="10" fill="#5e9e4e" opacity="0.8" />

      {/* butterfly — the single continuous animation */}
      <motion.g
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Wings cx={272} cy={118} />
      </motion.g>

      {/* life around the tree */}
      <Reveal delay={0.45} reduce={reduce}>
        <g>
          {/* bird */}
          <ellipse cx="62" cy="66" rx="11" ry="8" fill="#8ecae6" />
          <circle cx="74" cy="58" r="6" fill="#8ecae6" />
          <circle cx="76" cy="57" r="1.6" fill="#1e4b2e" />
          <path d="M80 58 l 7 2 l -7 3 z" fill="#f2a05c" />
          <path d="M52 68 l -8 -5 l 1 7 z" fill="#5b9fc9" />
        </g>
      </Reveal>

      <Reveal delay={0.6} reduce={reduce}>
        <g>
          {/* flower */}
          <path
            d="M48 190 C 48 204 44 212 40 220"
            stroke="#4c8a3c"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M48 202 c 10 -2 14 4 12 10 c -8 -1 -12 -5 -12 -10 Z"
            fill="#5e9e4e"
          />
          <g fill="#f2a05c">
            <circle cx="48" cy="168" r="9" />
            <circle cx="58" cy="176" r="9" />
            <circle cx="55" cy="187" r="9" />
            <circle cx="41" cy="187" r="9" />
            <circle cx="38" cy="176" r="9" />
          </g>
          <circle cx="48" cy="178" r="5" fill="#ffd166" />
        </g>
      </Reveal>

      <Reveal delay={0.75} reduce={reduce}>
        <g>
          {/* insect */}
          <g stroke="#1e4b2e" strokeWidth="1.8" strokeLinecap="round">
            <path d="M222 194 L 214 188" />
            <path d="M222 199 L 213 198" />
            <path d="M222 204 L 214 209" />
            <path d="M236 194 L 244 188" />
            <path d="M236 199 L 245 198" />
            <path d="M236 204 L 244 209" />
            <path d="M222 190 L 217 184" />
            <path d="M222 190 L 226 184" />
          </g>
          <ellipse cx="228" cy="200" rx="10" ry="7" fill="#f2a05c" />
          <circle cx="220" cy="196" r="5" fill="#f2a05c" />
          <circle cx="224" cy="191" r="4" fill="#f9e6b8" opacity="0.8" />
          <circle cx="232" cy="192" r="4" fill="#f9e6b8" opacity="0.8" />
        </g>
      </Reveal>

      <Reveal delay={0.9} reduce={reduce}>
        <g>
          {/* water drop */}
          <path d="M96 128 c -6 8 -6 12 0 12 s 6 -4 0 -12 Z" fill="#8ecae6" />
        </g>
      </Reveal>

      <Reveal delay={1.05} reduce={reduce}>
        <g>
          {/* young plant */}
          <path
            d="M252 244 C 252 236 250 230 248 224"
            stroke="#4c8a3c"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M248 228 c -8 -3 -12 -9 -10 -15 c 7 2 10 8 10 15 Z"
            fill="#5e9e4e"
          />
          <path
            d="M250 232 c 8 -3 12 -9 10 -15 c -7 2 -10 8 -10 15 Z"
            fill="#6fae5c"
          />
        </g>
      </Reveal>
    </svg>
  );
}

function Wings({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <ellipse
        cx={cx - 9}
        cy={cy}
        rx="9"
        ry="13"
        fill="#ffd166"
        transform={`rotate(-20 ${cx - 9} ${cy})`}
      />
      <ellipse
        cx={cx + 9}
        cy={cy}
        rx="9"
        ry="13"
        fill="#f2a05c"
        transform={`rotate(20 ${cx + 9} ${cy})`}
      />
      <ellipse cx={cx} cy={cy} rx="2.5" ry="8" fill="#1e4b2e" />
    </g>
  );
}

function Reveal({
  delay,
  reduce,
  children,
}: {
  delay: number;
  reduce: boolean;
  children: ReactNode;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: reduce ? 0.2 : 0.45,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.g>
  );
}