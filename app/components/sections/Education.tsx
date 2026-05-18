"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "../Section";
import { education } from "../../lib/data";

const ACCENT = "var(--accent)";

export default function Education() {
  return (
    <Section id="education" eyebrow="04 / Education" title="Where I studied.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {education.map((edu, idx) => (
          <motion.div
            key={`${edu.school}-${idx}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
            className="rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-sm transition-colors"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              {edu.period}
            </div>
            <h3
              className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white"
              style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}
            >
              {edu.degree}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              {edu.school}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              {edu.summary}
            </p>
            <div className="mt-4">
              <div className="text-[11px] uppercase tracking-wider text-neutral-500 mb-2">
                Relevant Coursework
              </div>
              <div className="flex flex-wrap gap-2">
                {edu.description.map((course) => (
                  <span
                    key={course}
                    className="text-xs px-2.5 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
            <div
              className="mt-5 h-[2px] w-12 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
