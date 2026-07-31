"use client";

import React, { useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import BlurText from "./BlurText";
import { FlowSection } from "./FlowArt";
import BadgeMarquee from "./BadgeMarquee";
import { personal, hero } from "../lib/data";
import { goToSection, setHash } from "../lib/scroll";

const ACCENT = "var(--accent)";
// Fluid sizing: scales with viewport width so "CASTELINO" never overflows
// on small phones (~320px) and still feels huge on large desktops.
// justify-center matters: BlurText lays letters out in a flex row, so
// text-center on the parent would be ignored and lines would left-align.
const NAME_SIZE_CLASSES =
  "display-xxl justify-center font-semibold text-[clamp(3rem,13.5vw,12rem)] uppercase whitespace-nowrap";

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Subtle mouse-driven parallax on the hero name. Skipped on touch devices
  // and for reduced-motion users.
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
      const nx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const ny = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      const max = 4;
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
    <FlowSection id="home" innerClassName="bg-[hsl(var(--bg))]">
      {/*
        Marquee, name and tagline all live in normal flow (flex column), so
        on a short viewport they stack and scroll instead of overlapping.
        Only the profile photo is absolute, inside the relative name block,
        where it overlays the seam between the two name lines.
      */}
      <div className="flex min-h-screen w-full flex-col">
        {/* Certification badge marquee */}
        <div className="mt-20 w-full sm:mt-24 md:mt-28">
          <BadgeMarquee />
        </div>

        {/* Centered name + profile photo */}
        <div className="flex w-full flex-1 items-center justify-center px-4 py-10">
          <div className="relative text-center">
            {/* The visible name is decorative; the sr-only h1 carries the identity */}
            <h1 className="sr-only">
              {personal.fullName}, AI Data Engineer
            </h1>
            <div
              ref={parallaxRef}
              aria-hidden="true"
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
                style={{
                  color: ACCENT,
                  fontFamily: "'Fira Code', ui-monospace, monospace",
                }}
              />
              <BlurText
                as="div"
                text={personal.lastName}
                delay={70}
                animateBy="letters"
                direction="top"
                className={NAME_SIZE_CLASSES}
                style={{
                  color: ACCENT,
                  fontFamily: "'Fira Code', ui-monospace, monospace",
                }}
              />
            </div>

            {/* Profile photo overlay: tall oval over the seam of the name */}
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <div className="h-[85px] w-[50px] cursor-pointer overflow-hidden rounded-full bg-neutral-200 shadow-2xl ring-2 ring-black/40 transition-transform duration-300 hover:scale-110 dark:bg-neutral-900 dark:ring-white/20 sm:h-[150px] sm:w-[90px] md:h-[200px] md:w-[120px] lg:h-[230px] lg:w-[140px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={personal.profileImage}
                  alt={`${personal.fullName} profile photo`}
                  width={280}
                  height={460}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="w-full px-6 pb-2">
          <div className="mx-auto flex max-w-3xl justify-center">
            <BlurText
              text={hero.supporting}
              delay={120}
              animateBy="words"
              direction="bottom"
              className="justify-center text-center text-[15px] leading-relaxed text-neutral-500 transition-colors duration-300 hover:text-black dark:hover:text-white sm:text-[18px] md:text-[20px]"
              style={{ fontFamily: "'Antic', 'Inter', sans-serif" }}
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            setHash("#work");
            goToSection("work");
          }}
          className="animate-bounce-slow mx-auto mb-6 mt-4 w-fit transition-colors duration-300"
          aria-label="Scroll to featured work"
        >
          <ChevronDown className="h-6 w-6 text-neutral-500 transition-colors duration-300 hover:text-black dark:hover:text-white md:h-8 md:w-8" />
        </a>
      </div>
    </FlowSection>
  );
}
