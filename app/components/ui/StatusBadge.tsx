import React from "react";

/**
 * Status chip for work and project cards.
 *
 * The distinction matters: a recruiter should be able to tell at a glance
 * whether something ran in production for an employer, shipped as open
 * source, or is a personal build. Blurring those three is how portfolios
 * lose trust.
 */
export type Status = "Production" | "Open Source" | "Personal";

const STYLES: Record<Status, { dot: string; text: string }> = {
  Production: {
    dot: "var(--accent)",
    text: "text-neutral-800 dark:text-neutral-200",
  },
  "Open Source": {
    dot: "#22c55e",
    text: "text-neutral-800 dark:text-neutral-200",
  },
  Personal: {
    dot: "#a1a1aa",
    text: "text-neutral-600 dark:text-neutral-400",
  },
};

export default function StatusBadge({ status }: { status: Status }) {
  const style = STYLES[status] ?? STYLES.Personal;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-neutral-300 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider dark:border-neutral-700 ${style.text}`}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: style.dot }}
      />
      {status}
    </span>
  );
}
