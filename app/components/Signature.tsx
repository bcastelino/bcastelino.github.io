"use client";

import React, { useState } from "react";
import { personal } from "../lib/data";

/**
 * Signature wordmark: renders `personal.signature` ("Br") in the Great Vibes
 * script font and "writes" it on with a left-to-right reveal (a CSS clip-path
 * wipe, `.signature-write` in globals.css). A font glyph is a filled shape
 * rather than a single stroke, so a true pen-stroke draw isn't possible; the
 * wipe is the faithful stand-in and reads like handwriting appearing.
 *
 * It plays once on mount and re-writes on hover (remounting the inner span
 * restarts the CSS animation). The resting state is fully visible, so the
 * mark can never get stuck hidden. The text uses `currentColor`, so the
 * parent link's theme-ink / accent-on-hover / glow styling flows straight
 * through. Decorative: the wrapping link carries the accessible name, so
 * this is aria-hidden; reduced-motion shows it with no animation.
 */
export default function Signature({ className }: { className?: string }) {
  // Bumping the cycle remounts the text so the reveal replays from scratch.
  const [cycle, setCycle] = useState(0);

  return (
    <span
      aria-hidden="true"
      className={className}
      onMouseEnter={() => setCycle((c) => c + 1)}
      style={{
        display: "inline-block",
        fontFamily: "var(--font-signature), 'Brush Script MT', cursive",
        fontWeight: 400,
        lineHeight: 1,
        // A little right padding keeps the closing swash from clipping.
        paddingRight: "0.08em",
      }}
    >
      <span key={cycle} className="signature-write" style={{ display: "inline-block" }}>
        {personal.signature}
      </span>
    </span>
  );
}
