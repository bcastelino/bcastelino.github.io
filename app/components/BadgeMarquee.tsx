"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { BlurredInfiniteSlider } from "./ui/infinite-slider";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/interfaces-tooltip";
import { certifications } from "../lib/data";
import { goToSection, setHash } from "../lib/scroll";

/**
 * Infinite, hover-slowing marquee of certification badges for the Hero.
 * Sources its images from the shared `certifications` data so it stays in
 * sync with the Certifications section automatically.
 */
export default function BadgeMarquee() {
  const prefersReduced = useReducedMotion();
  // Only swap to the static row AFTER mount so the server-rendered HTML and
  // the first client render match (avoids a hydration mismatch — the slider
  // is the SSR default).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const useStatic = mounted && prefersReduced;

  const badges = certifications.map((cert) => (
    <Tooltip key={cert.name}>
      <TooltipTrigger asChild>
        <a
          href="#certifications"
          onClick={(e) => {
            e.preventDefault();
            setHash("#certifications");
            goToSection("certifications");
          }}
          aria-label={`View ${cert.name} in certifications`}
          className="focus-ring flex items-center active:scale-90 transition-transform"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-12 w-fit object-contain transition-transform duration-300 hover:scale-110 sm:h-14"
            src={cert.badge}
            alt={`${cert.name} badge`}
            width={56}
            height={56}
            loading="lazy"
          />
        </a>
      </TooltipTrigger>
      <TooltipContent side="bottom">{cert.name}</TooltipContent>
    </Tooltip>
  ));

  return (
    <div className="w-full">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 md:flex-row">
        {/* Label */}
        <div className="flex-shrink-0 text-center md:max-w-44 md:border-r md:border-neutral-300 md:pr-6 md:text-right dark:md:border-neutral-700">
          <p className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">
            Certified in
          </p>
        </div>

        {/* Sliding badges (static wrapped row when reduced motion is preferred) */}
        <div className="w-full min-w-0 py-4 md:flex-1 md:pl-6">
          {useStatic ? (
            <div className="flex flex-wrap items-center justify-center gap-8 py-2">
              {badges}
            </div>
          ) : (
            <BlurredInfiniteSlider
              speedOnHover={20}
              speed={40}
              gap={64}
              fadeWidth={48}
              className="py-2"
            >
              {badges}
            </BlurredInfiniteSlider>
          )}
        </div>
      </div>
    </div>
  );
}
