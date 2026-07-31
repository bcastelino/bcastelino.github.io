import React from "react";

/**
 * Shell for every architecture diagram.
 *
 * The SVG carries `role="img"` plus an accessible description, and the caption
 * is a real `<figcaption>`, so the diagram is both indexable and legible to a
 * screen reader rather than being decorative dead weight.
 */
export default function DiagramFrame({
  title,
  caption,
  viewBox,
  bleed = false,
  children,
}: {
  title: string;
  caption: string;
  viewBox: string;
  /**
   * Extend past the prose column on wide screens. Only safe where the
   * diagram owns the full content width; inside a grid column it clips.
   */
  bleed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <figure className={`my-10 ${bleed ? "lg:-mx-24 xl:-mx-32" : ""}`}>
      <div
        className="overflow-x-auto rounded-[18px] border p-4 sm:p-6"
        style={{
          borderColor: "color-mix(in srgb, var(--accent) 22%, transparent)",
          background: "color-mix(in srgb, var(--accent) 4%, transparent)",
        }}
      >
        <svg
          viewBox={viewBox}
          role="img"
          aria-label={title}
          className="h-auto w-full min-w-[640px] text-neutral-800 dark:text-neutral-200"
        >
          <title>{title}</title>
          {children}
        </svg>
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-500">
        {caption}
      </figcaption>
    </figure>
  );
}
