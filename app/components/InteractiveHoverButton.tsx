"use client";

/**
 * Interactive hover button — expanding dot fill + slide-in action label.
 * Optional `loadingText` / `successText` make the button stateful (idle →
 * loading → success), used for the contact form submit.
 *
 * Adapted from emerald-ui's InteractiveHoverButton, rewritten without
 * clsx / tailwind-merge so we don't add new dependencies, and themed
 * around our --accent design tokens.
 */

import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";

type ButtonStatus = "idle" | "loading" | "success";

type CommonProps = {
  text: string;
  loadingText?: string;
  successText?: string;
  className?: string;
  icon?: React.ReactNode;
};

type AsButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    as?: "button";
    /** External status override — when provided, the component is fully controlled. */
    status?: ButtonStatus;
  };

type AsAnchorProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
    as: "a";
    href: string;
  };

type Props = AsButtonProps | AsAnchorProps;

function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export default function InteractiveHoverButton(props: Props) {
  const {
    text,
    loadingText = "Sending…",
    successText = "Sent!",
    className,
    icon,
  } = props;

  // Internal status only used when rendered as a plain button without
  // an external `status` override.
  const [internal, setInternal] = useState<ButtonStatus>("idle");
  const status: ButtonStatus =
    "status" in props && props.status ? props.status : internal;
  const isIdle = status === "idle";

  const baseClass = cn(
    "group relative inline-flex min-w-[10rem] items-center justify-center overflow-hidden",
    "rounded-full border border-neutral-300 dark:border-neutral-700",
    "px-6 py-3 font-semibold text-neutral-900 dark:text-white",
    "bg-white/40 dark:bg-neutral-900/40 backdrop-blur-sm",
    "transition-colors duration-300 hover:border-[color:var(--accent)]",
    "disabled:opacity-60 disabled:cursor-not-allowed",
    !isIdle && "pointer-events-none",
    className
  );

  // The label that slides in on hover / state change.
  const Action = (
    <span
      className={cn(
        "absolute inset-0 z-10 flex items-center justify-center gap-2",
        "-translate-x-16 opacity-0 transition-all duration-500",
        "group-hover:translate-x-0 group-hover:opacity-100",
        !isIdle && "translate-x-0 opacity-100"
      )}
      style={{ color: "var(--accent-fg)" }}
    >
      {status === "loading" ? (
        <>
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden
          />
          <span>{loadingText}</span>
        </>
      ) : status === "success" ? (
        <>
          <Check className="h-4 w-4" />
          <span>{successText}</span>
        </>
      ) : (
        <>
          <span>{text}</span>
          {icon ?? <ArrowRight className="h-4 w-4" />}
        </>
      )}
    </span>
  );

  // The resting state: small dot + label.
  const Idle = (
    <span className="relative z-0 flex items-center gap-2">
      <span
        aria-hidden
        className={cn(
          "h-2 w-2 rounded-full transition-transform duration-500 ease-out",
          "group-hover:scale-[120]",
          !isIdle && "scale-[120]"
        )}
        style={{ backgroundColor: "var(--accent)" }}
      />
      <span
        className={cn(
          "inline-block transition-all duration-500",
          "group-hover:translate-x-20 group-hover:opacity-0",
          !isIdle && "translate-x-20 opacity-0"
        )}
      >
        {text}
      </span>
    </span>
  );

  if (props.as === "a") {
    const { as: _as, text: _t, loadingText: _l, successText: _s, className: _c, icon: _i, ...rest } = props;
    return (
      <motion.a
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={baseClass}
        {...(rest as any)}
      >
        {Idle}
        {Action}
      </motion.a>
    );
  }

  const {
    as: _as,
    text: _t,
    loadingText: _l,
    successText: _s,
    className: _c,
    icon: _i,
    status: _st,
    onClick,
    ...rest
  } = props as AsButtonProps;

  return (
    <motion.button
      layout
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={baseClass}
      onClick={(e) => {
        if (!isIdle) return;
        // If no external status is supplied and there's no onClick to
        // drive lifecycle, run a small demo cycle so the effect is
        // visible. Otherwise just forward the click.
        if (onClick) {
          onClick(e);
          return;
        }
        if (!("status" in props)) {
          setInternal("loading");
          setTimeout(() => {
            setInternal("success");
            setTimeout(() => setInternal("idle"), 2000);
          }, 1200);
        }
      }}
      {...(rest as any)}
    >
      {Idle}
      {Action}
    </motion.button>
  );
}
