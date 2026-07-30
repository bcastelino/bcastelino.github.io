"use client";

import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

function cn(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(" ");
}

type HorizontalCarouselProps = {
  children: React.ReactNode;
  /** Gap between cards, in pixels. */
  gap?: number;
  /** Width of the edge fade mask, in pixels. */
  fadeWidth?: number;
  /** Accessible label for the scroll region. */
  ariaLabel?: string;
  className?: string;
};

/**
 * Self-contained horizontal carousel: drag/swipe on the track plus prev/next
 * arrow buttons. Uses a Framer Motion `x` motion value with drag constraints
 * derived from the measured track vs. viewport width, so it never hijacks
 * vertical page scroll (important inside the GSAP-pinned FlowArt sections).
 */
export default function HorizontalCarousel({
  children,
  gap = 24,
  fadeWidth = 40,
  ariaLabel = "Horizontal carousel",
  className,
}: HorizontalCarouselProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const draggedRef = useRef(false);
  const x = useMotionValue(0);

  const [maxScroll, setMaxScroll] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const overflow = Math.max(0, track.scrollWidth - viewport.clientWidth);
    setMaxScroll(overflow);
    // Clamp current position if the layout shrank.
    if (-x.get() > overflow) x.set(-overflow);
  }, [x]);

  useLayoutEffect(() => {
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [measure]);

  // Track position to toggle arrow availability.
  useEffect(() => {
    const update = (value: number) => {
      setCanPrev(value < -1);
      setCanNext(value > -maxScroll + 1);
    };
    update(x.get());
    const unsub = x.on("change", update);
    return () => unsub();
  }, [x, maxScroll]);

  const page = useCallback(
    (direction: 1 | -1) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const step = viewport.clientWidth * 0.8;
      const next = Math.min(
        0,
        Math.max(-maxScroll, x.get() - direction * step)
      );
      animate(x, next, { type: "spring", stiffness: 300, damping: 40 });
    },
    [x, maxScroll]
  );

  const gradient =
    maxScroll > 0
      ? `linear-gradient(to right, ${
          canPrev ? `transparent, black ${fadeWidth}px` : "black, black"
        }, ${
          canNext ? `black calc(100% - ${fadeWidth}px), transparent` : "black, black"
        })`
      : undefined;

  const maskStyle: CSSProperties = gradient
    ? { maskImage: gradient, WebkitMaskImage: gradient }
    : {};

  return (
    <div className={cn("relative", className)}>
      <div
        ref={viewportRef}
        className="overflow-hidden"
        style={maskStyle}
        onClickCapture={(e) => {
          // Suppress the click that fires at the end of a drag so we don't
          // accidentally follow a card's link when the user was scrolling.
          if (draggedRef.current) {
            e.preventDefault();
            e.stopPropagation();
            draggedRef.current = false;
          }
        }}
      >
        <motion.div
          ref={trackRef}
          role="group"
          aria-label={ariaLabel}
          className="flex w-max cursor-grab active:cursor-grabbing"
          style={{ x, gap: `${gap}px`, touchAction: "pan-y" }}
          drag={maxScroll > 0 ? "x" : false}
          dragConstraints={{ left: -maxScroll, right: 0 }}
          dragElastic={0.08}
          dragMomentum
          onPointerDown={() => {
            draggedRef.current = false;
          }}
          onDrag={(_, info) => {
            if (Math.abs(info.offset.x) > 5) draggedRef.current = true;
          }}
        >
          {children}
        </motion.div>
      </div>

      {maxScroll > 0 && (
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => page(-1)}
            disabled={!canPrev}
            aria-label="Previous"
            className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 transition-[color,border-color,transform] duration-150 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] active:scale-90 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            disabled={!canNext}
            aria-label="Next"
            className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 transition-[color,border-color,transform] duration-150 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] active:scale-90 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
