"use client";

import React from "react";
import { motion } from "framer-motion";
import { FlowSection } from "./FlowArt";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ACCENT = "var(--accent)";

export default function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: SectionProps) {
  return (
    <FlowSection
      id={id}
      className={className}
      innerClassName="bg-[hsl(var(--bg))] py-24 sm:py-32 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-screen-xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 sm:mb-16"
        >
          <div
            className="text-xs sm:text-sm uppercase tracking-[0.3em] mb-3 font-mono"
            style={{ color: ACCENT }}
          >
            {eyebrow}
          </div>
          <h2
            className="display-lg text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white"
            style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}
          >
            {title}
          </h2>
          <div
            className="mt-6 h-[2px] w-24 rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
        </motion.div>
        {children}
      </div>
    </FlowSection>
  );
}
