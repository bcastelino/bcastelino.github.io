"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { isSectionHash, hashToId, goToSection } from "../lib/scroll";

gsap.registerPlugin(ScrollTrigger);

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
/* FlowSection — one slide in the story scroll                         */
/* ------------------------------------------------------------------ */

export interface FlowSectionProps {
  id?: string;
  className?: string;
  innerClassName?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  "aria-label"?: string;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  id,
  className,
  innerClassName,
  style = {},
  children,
  "aria-label": ariaLabel,
}) => (
  <section
    id={id}
    data-flow-section
    aria-label={ariaLabel}
    className={cx(
      "relative min-h-screen w-full overflow-hidden scroll-mt-24",
      className
    )}
  >
    <div
      data-flow-inner
      className={cx(
        "flow-art-container relative flex min-h-screen w-full flex-col",
        "will-change-transform",
        innerClassName
      )}
      style={{ transformOrigin: "bottom left", ...style }}
    >
      {children}
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* FlowArt — orchestrates pin + rotate-in for each FlowSection        */
/* ------------------------------------------------------------------ */

export interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

const FlowArt: React.FC<FlowArtProps> = ({
  children,
  className,
  "aria-label": ariaLabel = "Story scroll",
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Disable the rotate/pin choreography for users who request reduced
    // motion AND on small touch devices, where pinned scroll feels janky.
    const motionMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallMQ = window.matchMedia("(max-width: 767px)");
    const update = () => setReducedMotion(motionMQ.matches || smallMQ.matches);
    update();
    motionMQ.addEventListener("change", update);
    smallMQ.addEventListener("change", update);
    return () => {
      motionMQ.removeEventListener("change", update);
      smallMQ.removeEventListener("change", update);
    };
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || reducedMotion) return;

      const sections = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>("[data-flow-section]")
      );
      if (sections.length === 0) return;

      const triggers: ScrollTrigger[] = [];

      sections.forEach((section, i) => {
        gsap.set(section, { zIndex: i + 1 });

        const inner = section.querySelector<HTMLElement>(".flow-art-container");
        if (!inner) return;

        if (i > 0) {
          gsap.set(inner, { rotation: 30, transformOrigin: "bottom left" });
          const tween = gsap.to(inner, {
            rotation: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 25%",
              scrub: true,
            },
          });
          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
        }

        if (i < sections.length - 1) {
          triggers.push(
            ScrollTrigger.create({
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              pin: true,
              pinSpacing: false,
            })
          );
        }
      });

      ScrollTrigger.refresh();

      // Deep-link: once the pins are laid out, jump to the section named in the
      // URL hash (e.g. #contact). scrollToSection converges on the section's
      // real on-screen position, so it lands correctly despite the pinning;
      // deepLinkTo re-asserts for a beat to survive GSAP's async refreshes and
      // cancels if the user scrolls.
      let cancelDeepLink: (() => void) | undefined;
      if (typeof window !== "undefined" && isSectionHash(window.location.hash)) {
        cancelDeepLink = goToSection(hashToId(window.location.hash));
      }

      return () => {
        cancelDeepLink?.();
        triggers.forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [React.Children.count(children), reducedMotion] }
  );

  // Reduced-motion / small-screen path: GSAP pinning is disabled, so the
  // useGSAP block above returns early. Still honour a deep-link hash here.
  useEffect(() => {
    if (!reducedMotion || typeof window === "undefined") return;
    if (!isSectionHash(window.location.hash)) return;
    const cancel = goToSection(hashToId(window.location.hash));
    return cancel;
  }, [reducedMotion]);

  return (
    <main
      ref={containerRef}
      aria-label={ariaLabel}
      className={cx("w-full overflow-x-hidden", className)}
    >
      {children}
    </main>
  );
};

export default FlowArt;
