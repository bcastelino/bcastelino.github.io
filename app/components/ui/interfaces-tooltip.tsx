"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  cloneElement,
  isValidElement,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

type Side = "top" | "bottom" | "left" | "right";

interface TooltipContextValue {
  open: boolean;
  show: () => void;
  hide: () => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

function useTooltipContext() {
  const ctx = useContext(TooltipContext);
  if (!ctx) {
    throw new Error("Tooltip components must be used within <Tooltip>.");
  }
  return ctx;
}

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

interface TooltipProps {
  children: React.ReactNode;
  /** Delay in ms before the tooltip appears on hover/focus. */
  delayDuration?: number;
}

export function Tooltip({ children, delayDuration = 150 }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), delayDuration);
  }, [delayDuration]);

  const hide = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(false);
  }, []);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return (
    <TooltipContext.Provider value={{ open, show, hide, triggerRef }}>
      {children}
    </TooltipContext.Provider>
  );
}

interface TooltipTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export function TooltipTrigger({ children, asChild }: TooltipTriggerProps) {
  const { show, hide, triggerRef } = useTooltipContext();

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      triggerRef.current = node;
    },
    [triggerRef]
  );

  const handlers = {
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
  };

  if (asChild && isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    const childRef = (child as any).ref;
    return cloneElement(child, {
      ...handlers,
      ref: (node: HTMLElement | null) => {
        setRef(node);
        if (typeof childRef === "function") childRef(node);
        else if (childRef) (childRef as React.MutableRefObject<any>).current = node;
      },
    });
  }

  return (
    <span ref={setRef} {...handlers}>
      {children}
    </span>
  );
}

interface TooltipContentProps {
  children: React.ReactNode;
  side?: Side;
  sideOffset?: number;
  className?: string;
}

function positionFor(rect: DOMRect, side: Side, offset: number) {
  switch (side) {
    case "bottom":
      return {
        left: rect.left + rect.width / 2,
        top: rect.bottom + offset,
        tx: "-50%",
        ty: "0%",
        origin: "top center",
      };
    case "left":
      return {
        left: rect.left - offset,
        top: rect.top + rect.height / 2,
        tx: "-100%",
        ty: "-50%",
        origin: "center right",
      };
    case "right":
      return {
        left: rect.right + offset,
        top: rect.top + rect.height / 2,
        tx: "0%",
        ty: "-50%",
        origin: "center left",
      };
    case "top":
    default:
      return {
        left: rect.left + rect.width / 2,
        top: rect.top - offset,
        tx: "-50%",
        ty: "-100%",
        origin: "bottom center",
      };
  }
}

export function TooltipContent({
  children,
  side = "top",
  sideOffset = 8,
  className,
}: TooltipContentProps) {
  const { open, triggerRef } = useTooltipContext();
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState<{
    left: number;
    top: number;
    tx: string;
    ty: string;
    origin: string;
  } | null>(null);

  useEffect(() => setMounted(true), []);

  // Track the trigger position every frame while open so the tooltip
  // stays anchored even when the trigger is animating (e.g. a marquee).
  useEffect(() => {
    if (!open) return;
    let raf = 0;
    const update = () => {
      const el = triggerRef.current;
      if (el) {
        setCoords(positionFor(el.getBoundingClientRect(), side, sideOffset));
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [open, side, sideOffset, triggerRef]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && coords && (
        <motion.div
          role="tooltip"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          style={{
            position: "fixed",
            left: coords.left,
            top: coords.top,
            // Centering offset lives in Framer Motion's own x/y so it
            // doesn't get overwritten by the animated transform.
            x: coords.tx,
            y: coords.ty,
            transformOrigin: coords.origin,
            zIndex: 9999,
            pointerEvents: "none",
          }}
          className={
            "whitespace-nowrap rounded-md bg-neutral-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-md dark:bg-white dark:text-neutral-900 " +
            (className ?? "")
          }
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
