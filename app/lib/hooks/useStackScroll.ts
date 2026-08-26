"use client";

import { useEffect, type RefObject } from "react";

export interface StackScrollOptions {
  /** Viewport top (px) the first card pins to; clears the fixed header. */
  base?: number;
  /** Extra px offset per card, so pinned cards fan into a visible deck. */
  peek?: number;
  /** Min viewport width to enable the effect (desktop only). */
  minWidth?: number;
}

/**
 * Emulates Villo-style "sticky stacking cards" with transforms instead of
 * `position: sticky`. This site pins sections with GSAP, which leaves a
 * `transform` on ancestor elements; a transformed ancestor makes native
 * sticky reference a scrolling box, so it never holds. Translating each card
 * ourselves sidesteps that entirely.
 *
 * Each direct child of `ref` pins at `base + index * peek` from the top as it
 * scrolls up, piling into a fanned deck, then releases as the container
 * scrolls past. No-ops below `minWidth` and under reduced-motion.
 */
export function useStackScroll<T extends HTMLElement>(
  ref: RefObject<T>,
  { base = 96, peek = 18, minWidth = 1024 }: StackScrollOptions = {}
): void {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const wideMQ = window.matchMedia(`(min-width: ${minWidth}px)`);
    const reducedMQ = window.matchMedia("(prefers-reduced-motion: reduce)");

    // offsetTop must be measured relative to the container.
    const prevPosition = container.style.position;
    if (getComputedStyle(container).position === "static") {
      container.style.position = "relative";
    }

    const items = () => Array.from(container.children) as HTMLElement[];

    const clear = () => {
      items().forEach((el) => {
        el.style.transform = "";
        el.style.zIndex = "";
        el.style.willChange = "";
        el.style.position = "";
      });
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      if (!wideMQ.matches || reducedMQ.matches) {
        clear();
        return;
      }
      const cRect = container.getBoundingClientRect();
      const cHeight = container.offsetHeight;
      items().forEach((el, i) => {
        el.style.position = "relative";
        el.style.zIndex = String(i + 1);
        el.style.willChange = "transform";
        const target = base + i * peek;
        const naturalTop = cRect.top + el.offsetTop;
        let dy = target - naturalTop;
        if (dy < 0) dy = 0;
        // Don't let a card travel past the container's bottom edge.
        const maxDy = cHeight - el.offsetTop - el.offsetHeight;
        if (dy > maxDy) dy = Math.max(0, maxDy);
        el.style.transform = `translate3d(0, ${dy}px, 0)`;
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    wideMQ.addEventListener("change", onScroll);
    reducedMQ.addEventListener("change", onScroll);
    // GSAP/ScrollTrigger settles layout after mount; recompute once it has.
    const settle = window.setTimeout(update, 400);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      wideMQ.removeEventListener("change", onScroll);
      reducedMQ.removeEventListener("change", onScroll);
      window.clearTimeout(settle);
      if (raf) cancelAnimationFrame(raf);
      clear();
      container.style.position = prevPosition;
    };
  }, [ref, base, peek, minWidth]);
}

export default useStackScroll;
