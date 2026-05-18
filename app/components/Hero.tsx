"use client";

import React, { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import BlurText from "./BlurText";
import { FlowSection } from "./FlowArt";
import { personal } from "../lib/data";

const ACCENT = "var(--accent)";
// Fluid sizing: scales with viewport width so "CASTELINO" never overflows
// on small phones (~320px) and still feels huge on large desktops.
const NAME_SIZE_CLASSES =
  "font-bold text-[clamp(3rem,13.5vw,12rem)] leading-[0.9] tracking-tighter uppercase justify-center whitespace-nowrap";

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Subtle mouse-driven parallax on the hero name. Skip on touch devices
  // and when the user has requested reduced motion.
  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;

    const isCoarse =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isCoarse || prefersReduced) return;

    let raf = 0;
    const handleMove = (e: MouseEvent) => {
      // Offset from viewport center, normalised to ±1.
      const nx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const ny = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      // Max shift in percent of the element's own size. Negative sign so
      // the text moves *away* from the cursor (cursor left → text right).
      const max = 4; // percent
      const x = -nx * max;
      const y = -ny * max;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${x}%, ${y}%, 0)`;
      });
    };
    const reset = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "translate3d(0, 0, 0)";
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", reset);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <FlowSection
      id="home"
      innerClassName="bg-[hsl(var(--bg))]"
    >
      {/* Centered name + profile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
        <div className="relative text-center">
          <div
            ref={parallaxRef}
            className="will-change-transform transition-transform duration-200 ease-out"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            <BlurText
              as="div"
              text={personal.firstName}
              delay={90}
              animateBy="letters"
              direction="top"
              className={NAME_SIZE_CLASSES}
              style={{ color: ACCENT, fontFamily: "'Fira Code', ui-monospace, monospace" }}
            />
            <BlurText
              as="div"
              text={personal.lastName}
              delay={70}
              animateBy="letters"
              direction="top"
              className={`${NAME_SIZE_CLASSES} mt-2`}
              style={{ color: ACCENT, fontFamily: "'Fira Code', ui-monospace, monospace" }}
            />
          </div>

          {/* Profile picture overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto">
            <div className="w-[50px] h-[85px] sm:w-[90px] sm:h-[150px] md:w-[120px] md:h-[200px] lg:w-[140px] lg:h-[230px] rounded-full overflow-hidden shadow-2xl ring-2 ring-black/40 dark:ring-white/20 transition-transform duration-300 hover:scale-110 cursor-pointer bg-neutral-200 dark:bg-neutral-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={personal.profileImage}
                alt={`${personal.fullName} profile`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="absolute bottom-16 sm:bottom-24 md:bottom-28 lg:bottom-32 left-1/2 -translate-x-1/2 w-full px-6">
        <div className="flex justify-center">
          <BlurText
            text={personal.tagline}
            delay={120}
            animateBy="words"
            direction="bottom"
            className="text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center transition-colors duration-300 text-neutral-500 hover:text-black dark:hover:text-white"
            style={{ fontFamily: "'Antic', 'Inter', sans-serif" }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 transition-colors duration-300 animate-bounce-slow"
        aria-label="Scroll to about"
      >
        <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-neutral-500 hover:text-black dark:hover:text-white transition-colors duration-300" />
      </a>
    </FlowSection>
  );
}
