"use client";

import { useCallback, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Springy "magnetic" pull toward the pointer while hovering an element.
 * Returns a callback ref: attach it to the element and the hook drives the
 * element's `transform` directly (via inline styles + CSS transitions) rather
 * than through framer motion-values. This is deliberate — the target here is
 * a framer `motion` element whose `layout` prop can remount/re-measure the
 * node; a callback ref re-binds on every node change, and writing transform
 * on the DOM node avoids any ref-forwarding / motion-value coupling.
 * No-ops on coarse pointers and reduced-motion.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(
  strength = 18
): (node: T | null) => void {
  const prefersReduced = useReducedMotion();
  const cleanupRef = useRef<(() => void) | null>(null);

  return useCallback(
    (node: T | null) => {
      // Detach from the previous node first (covers remount / layout reflow).
      cleanupRef.current?.();
      cleanupRef.current = null;
      if (!node) return;
      if (prefersReduced || !window.matchMedia("(pointer: fine)").matches) {
        return;
      }

      node.style.willChange = "transform";

      const handleMove = (e: PointerEvent) => {
        const r = node.getBoundingClientRect();
        const dx = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * strength;
        const dy = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * strength;
        node.style.transition = "transform 0.12s ease-out";
        node.style.transform = `translate(${dx}px, ${dy}px)`;
      };
      const reset = () => {
        // Springy ease-back when the pointer leaves.
        node.style.transition = "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)";
        node.style.transform = "translate(0px, 0px)";
      };

      node.addEventListener("pointermove", handleMove);
      node.addEventListener("pointerleave", reset);
      cleanupRef.current = () => {
        node.removeEventListener("pointermove", handleMove);
        node.removeEventListener("pointerleave", reset);
        node.style.transform = "";
        node.style.transition = "";
        node.style.willChange = "";
      };
    },
    [prefersReduced, strength]
  );
}

export default useMagnetic;
