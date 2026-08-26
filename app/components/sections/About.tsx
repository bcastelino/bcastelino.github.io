"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Section from "../Section";
import StatsBand from "./StatsBand";
import SkillBar from "../ui/SkillBar";
import { useStackScroll } from "../../lib/hooks/useStackScroll";
import { aboutParagraphs, interests, skillGroups } from "../../lib/data";

const ACCENT = "var(--accent)";

export default function About() {
  const skillsRef = useRef<HTMLDivElement>(null);
  useStackScroll(skillsRef, { base: 96, peek: 18 });

  return (
    <Section id="about" eyebrow="06 / About" title="Who I am.">
      <StatsBand />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-3"
        >
          <div className="space-y-5">
            {aboutParagraphs.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-lg leading-relaxed text-neutral-800 dark:text-neutral-200 sm:text-xl"
                    : "leading-relaxed text-neutral-600 dark:text-neutral-400"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="mb-4 font-mono text-sm uppercase tracking-[0.25em] text-neutral-500">
              Beyond the screen
            </h3>
            <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
              {interests.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: ACCENT }} aria-hidden="true">
                    ▸
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          ref={skillsRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="space-y-5 lg:col-span-2"
        >
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-[15px] bg-white/95 p-5 backdrop-blur-sm transition-colors hover:border-[color:var(--accent)] dark:bg-neutral-900/95"
              style={{
                border:
                  "1px solid color-mix(in srgb, var(--accent) 28%, transparent)",
                boxShadow:
                  "0 0 0 1px color-mix(in srgb, var(--accent) 10%, transparent) inset, inset 0 0.5px 0 0 var(--edge-hairline), 0 10px 30px -8px var(--edge-drop)",
              }}
            >
              <h4
                className="display-md text-base font-semibold text-neutral-900 dark:text-white"
                style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}
              >
                {group.title}
              </h4>
              {/* Depth marker: a flat logo wall says nothing about whether
                  something has actually run in production. */}
              <p className="mb-3 mt-1 font-mono text-[11px] text-neutral-500">
                {group.depth}
              </p>
              <SkillBar
                level={group.level}
                label={`${group.title} proficiency`}
                className="mb-4"
              />
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    translate="no"
                    className="rounded-full border border-neutral-300 px-2.5 py-1 text-xs text-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
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
