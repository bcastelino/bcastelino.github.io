"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "../Section";
import { experience } from "../../lib/data";

const ACCENT = "var(--accent)";

export default function Experience() {
  return (
    <Section id="experience" eyebrow="03 / Experience" title="Where I've worked.">
      <ol className="relative border-l border-neutral-300 dark:border-neutral-800 ml-2 sm:ml-4 space-y-10">
        {experience.map((job, idx) => (
          <motion.li
            key={`${job.company}-${idx}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
            className="pl-6 sm:pl-8 relative"
          >
            <span
              className="absolute -left-[7px] top-2 w-3 h-3 rounded-full ring-4 ring-white dark:ring-black"
              style={{ backgroundColor: ACCENT }}
            />
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
              {job.period}
            </div>
            <h3
              className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white"
              style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}
            >
              {job.title}{" "}
              <span className="text-neutral-500 font-normal">@ {job.company}</span>
            </h3>
            <ul className="mt-3 space-y-1.5 text-neutral-700 dark:text-neutral-300">
              {job.description.map((d, i) => (
                <li key={i} className="flex gap-2">
                  <span style={{ color: ACCENT }} className="select-none">▸</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
