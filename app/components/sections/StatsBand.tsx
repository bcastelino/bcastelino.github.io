"use client";

import React from "react";
import { motion } from "framer-motion";
import CountUp from "../ui/CountUp";
import { getStats } from "../../lib/stats";

const ACCENT = "var(--accent)";

/**
 * A compact row of count-up metrics, all derived from the content layer
 * (see `lib/stats.ts`) so nothing here can be fabricated. Designed to sit at
 * the top of the About section.
 */
export default function StatsBand() {
  const stats = getStats();

  return (
    <motion.dl
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-neutral-200 bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-800 sm:mb-14 md:grid-cols-4"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-start bg-[hsl(var(--bg))] p-5 sm:p-6"
        >
          <dd
            className="display-md text-4xl font-semibold tabular-nums text-neutral-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}
          >
            <CountUp
              to={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
            />
          </dd>
          <dt className="mt-2 text-sm leading-snug text-neutral-600 dark:text-neutral-400">
            {stat.label}
          </dt>
          <div
            className="mt-3 h-[2px] w-8 rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
        </div>
      ))}
    </motion.dl>
  );
}
