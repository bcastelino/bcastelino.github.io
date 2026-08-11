"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface SkillBarProps {
  /** 0-100 fill level. */
  level: number;
  /** Accessible name for the bar, e.g. the skill group title. */
  label: string;
  className?: string;
}

/**
 * A thin proficiency bar that fills to `level`% the first time it scrolls
 * into view. Reduced-motion renders it filled immediately. Exposed as a
 * `progressbar` so assistive tech reads the value.
 */
export default function SkillBar({ level, label, className }: SkillBarProps) {
  const prefersReduced = useReducedMotion();
  const clamped = Math.max(0, Math.min(100, level));

  return (
    <div
      className={className}
      role="progressbar"
      aria-label={label}
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="mb-1.5 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
          Proficiency
        </span>
        <span className="font-mono text-[11px] tabular-nums text-neutral-500">
          {clamped}%
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: "var(--accent)" }}
          initial={{ width: prefersReduced ? `${clamped}%` : 0 }}
          whileInView={{ width: `${clamped}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 1, ease: [0.16, 1, 0.3, 1] }
          }
        />
      </div>
    </div>
  );
}
