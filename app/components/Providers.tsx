"use client";

import React from "react";
import { MotionConfig } from "framer-motion";

/**
 * App-wide client providers. `MotionConfig reducedMotion="user"` makes every
 * Framer Motion animation (section reveals, hover buttons, carousel) respect
 * the user's `prefers-reduced-motion` setting automatically.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
