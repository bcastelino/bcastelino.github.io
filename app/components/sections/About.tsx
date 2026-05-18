"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "../Section";
import { aboutIntro, interests, skillGroups } from "../../lib/data";

const ACCENT = "var(--accent)";

export default function About() {
  return (
    <Section id="about" eyebrow="01 / About" title="Who I am.">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-3"
        >
          <p className="text-lg sm:text-xl leading-relaxed text-neutral-700 dark:text-neutral-300">
            {aboutIntro}
          </p>

          <div className="mt-10">
            <h3 className="text-sm uppercase tracking-[0.25em] mb-4 font-mono text-neutral-500">
              Beyond the screen
            </h3>
            <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
              {interests.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: ACCENT }}>▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-2 space-y-6"
        >
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-lg p-5 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-sm transition-colors hover:border-[color:var(--accent)]"
              style={{
                border: "1px solid color-mix(in srgb, var(--accent) 28%, transparent)",
                boxShadow:
                  "0 0 0 1px color-mix(in srgb, var(--accent) 10%, transparent) inset",
              }}
            >
              <h4
                className="text-base font-semibold mb-3 text-neutral-900 dark:text-white"
                style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}
              >
                {group.title}
              </h4>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
