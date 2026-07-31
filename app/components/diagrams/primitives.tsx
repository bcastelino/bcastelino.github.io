import React from "react";

/**
 * Shared SVG primitives for the architecture diagrams.
 *
 * Everything is driven by CSS custom properties (`--accent`) and
 * `currentColor`, so a diagram tracks the active accent and the light/dark
 * theme without a second asset. No raster exports, no re-rendering when the
 * palette changes.
 */

export const FONT = "'Fira Code', ui-monospace, monospace";

export function Defs() {
  return (
    <defs>
      <marker
        id="arrowhead"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
      </marker>
      <marker
        id="arrowhead-muted"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" opacity="0.45" />
      </marker>
    </defs>
  );
}

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  /** Accent-filled box for the component I want the eye to land on. */
  emphasis?: boolean;
  /** Dashed outline for "external" or "not mine" components. */
  dashed?: boolean;
};

export function Box({ x, y, w, h, label, sub, emphasis, dashed }: BoxProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={
          emphasis
            ? "color-mix(in srgb, var(--accent) 14%, transparent)"
            : "transparent"
        }
        stroke={emphasis ? "var(--accent)" : "currentColor"}
        strokeOpacity={emphasis ? 1 : 0.35}
        strokeWidth={emphasis ? 1.75 : 1.25}
        strokeDasharray={dashed ? "5 4" : undefined}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 5}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={14}
        fontWeight={600}
        fill="currentColor"
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 13}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={11.5}
          fill="currentColor"
          opacity={0.65}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

type ArrowProps = {
  d: string;
  muted?: boolean;
  dashed?: boolean;
};

export function Arrow({ d, muted, dashed }: ArrowProps) {
  return (
    <path
      d={d}
      fill="none"
      stroke={muted ? "currentColor" : "var(--accent)"}
      strokeOpacity={muted ? 0.4 : 0.85}
      strokeWidth={1.5}
      strokeDasharray={dashed ? "5 4" : undefined}
      markerEnd={muted ? "url(#arrowhead-muted)" : "url(#arrowhead)"}
    />
  );
}

export function Label({
  x,
  y,
  children,
  anchor = "middle",
  size = 11.5,
  muted = true,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: "start" | "middle" | "end";
  size?: number;
  muted?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={FONT}
      fontSize={size}
      fill="currentColor"
      opacity={muted ? 0.62 : 1}
    >
      {children}
    </text>
  );
}

/** Section heading inside a diagram, e.g. a swimlane title. */
export function LaneTitle({ x, y, children }: { x: number; y: number; children: React.ReactNode }) {
  return (
    <text
      x={x}
      y={y}
      fontFamily={FONT}
      fontSize={11.5}
      fontWeight={700}
      letterSpacing="0.12em"
      fill="var(--accent)"
    >
      {children}
    </text>
  );
}
