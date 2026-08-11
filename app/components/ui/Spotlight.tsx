"use client";

import React, { useEffect, useRef } from "react";

export interface SpotlightProps {
  /** Diameter of the glow in px. */
  size?: number;
  /** Accent mix percentage for the glow strength. */
  strength?: number;
}

/**
 * A pointer-following radial glow that sits inside a `position: relative`,
 * `group` card. Drop it in as the first child; it tracks the pointer over
 * its parent and fades in on hover. On coarse pointers / reduced-motion the
 * overlay simply never becomes visible (it stays at opacity-0), so nothing
 * extra is ever perceived.
 */
export default function Spotlight({ size = 180, strength = 16 }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const overlay = ref.current;
    const parent = overlay?.parentElement;
    if (!overlay || !parent) return;

    const move = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      overlay.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
      overlay.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
    };
    parent.addEventListener("pointermove", move);
    return () => parent.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background: `radial-gradient(${size}px circle at var(--spot-x, 50%) var(--spot-y, 0px), color-mix(in srgb, var(--accent) ${strength}%, transparent), transparent 70%)`,
      }}
    />
  );
}
