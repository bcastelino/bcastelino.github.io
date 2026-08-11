"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

export interface CountUpProps {
  /** Final value to count to. */
  to: number;
  /** Value to start from (default 0). */
  from?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Decimal places to render. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * Counts from `from` to `to` the first time it scrolls into view. Under
 * reduced-motion it renders the final value immediately, and the final value
 * is always present in the DOM as text for screen readers.
 */
export default function CountUp({
  to,
  from = 0,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReduced = useReducedMotion();
  const motionValue = useMotionValue(from);
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    if (!inView) return;

    if (prefersReduced) {
      setDisplay(to);
      return;
    }

    const controls = animate(motionValue, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, prefersReduced, to, duration, motionValue]);

  const formatted = `${prefix}${display.toFixed(decimals)}${suffix}`;

  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  );
}
