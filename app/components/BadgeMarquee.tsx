"use client";

import React from "react";
import { BlurredInfiniteSlider } from "./ui/infinite-slider";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/interfaces-tooltip";
import { certifications } from "../lib/data";

/**
 * Infinite, hover-slowing marquee of certification badges for the Hero.
 * Sources its images from the shared `certifications` data so it stays in
 * sync with the Certifications section automatically.
 */
export default function BadgeMarquee() {
  return (
    <div className="w-full">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 md:flex-row">
        {/* Label */}
        <div className="flex-shrink-0 text-center md:max-w-44 md:border-r md:border-neutral-300 md:pr-6 md:text-right dark:md:border-neutral-700">
          <p className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">
            Certified in
          </p>
        </div>

        {/* Sliding badges */}
        <div className="w-full min-w-0 py-4 md:flex-1 md:pl-6">
          <BlurredInfiniteSlider
            speedOnHover={20}
            speed={40}
            gap={64}
            fadeWidth={48}
            className="py-2"
          >
            {certifications.map((cert) => (
              <Tooltip key={cert.name}>
                <TooltipTrigger asChild>
                  <a
                    href="#certifications"
                    aria-label={`View ${cert.name} in certifications`}
                    className="flex items-center"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="h-12 w-fit object-contain transition-transform duration-300 hover:scale-110 sm:h-14"
                      src={cert.badge}
                      alt={`${cert.name} badge`}
                      loading="lazy"
                    />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom">{cert.name}</TooltipContent>
              </Tooltip>
            ))}
          </BlurredInfiniteSlider>
        </div>
      </div>
    </div>
  );
}
