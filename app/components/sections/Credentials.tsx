"use client";

import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, FileText, ShieldCheck } from "lucide-react";
import Section from "../Section";
import HorizontalCarousel from "../ui/HorizontalCarousel";
import { certifications, education } from "../../lib/data";

const ACCENT = "var(--accent)";

/**
 * Education and certifications in one section.
 *
 * Every certification carries an issuer-hosted verification link alongside
 * the PDF: a PDF proves nothing on its own, a credential URL is checkable
 * by a stranger.
 */
export default function Credentials() {
  return (
    <Section
      id="credentials"
      eyebrow="07 / Credentials"
      title="Verified, not just claimed."
    >
      {/* Education */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {education.map((edu, idx) => (
          <motion.div
            key={`${edu.school}-${idx}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
            className="elev-2 rounded-[20px] border border-neutral-200 bg-white/40 p-6 backdrop-blur-sm transition-colors dark:border-neutral-800 dark:bg-neutral-900/40"
          >
            <div className="mb-2 font-mono text-xs uppercase tracking-widest tabular-nums text-neutral-500">
              {edu.period}
            </div>
            <h3
              className="display-md text-lg font-semibold text-neutral-900 dark:text-white sm:text-xl"
              style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}
            >
              {edu.degree}
            </h3>
            {edu.concentration && (
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {edu.concentration}
              </p>
            )}
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {edu.school}
            </p>
            {edu.verifyUrl && (
              <a
                href={edu.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[color:var(--accent)] hover:underline"
              >
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Verify this degree
              </a>
            )}
            <p className="mt-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              {edu.summary}
            </p>
            <div className="mt-4">
              <div className="mb-2 text-[11px] uppercase tracking-wider text-neutral-500">
                Relevant coursework
              </div>
              <div className="flex flex-wrap gap-2">
                {edu.description.map((course) => (
                  <span
                    key={course}
                    translate="no"
                    className="rounded-full border border-neutral-300 px-2.5 py-1 text-xs text-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
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

      {/* Certifications */}
      <h3 className="mb-6 mt-14 font-mono text-sm uppercase tracking-[0.25em] text-neutral-500">
        {certifications.length} certifications, each independently verifiable
      </h3>

      <HorizontalCarousel ariaLabel="Certifications" gap={24}>
        {certifications.map((cert, idx) => (
          <motion.article
            key={cert.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: idx * 0.06, ease: "easeOut" }}
            className="elev-2 group relative flex w-[280px] flex-shrink-0 flex-col overflow-hidden rounded-[20px] border border-neutral-200 bg-white/40 backdrop-blur-sm transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[color:var(--accent)] dark:border-neutral-800 dark:bg-neutral-900/40 sm:w-[300px] lg:w-[320px]"
          >
            <div className="relative flex h-40 items-center justify-center bg-gradient-to-b from-neutral-100/60 to-transparent p-6 dark:from-neutral-900/60 dark:to-transparent">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cert.badge}
                alt={`${cert.name} badge`}
                width={200}
                height={200}
                loading="lazy"
                className="max-h-full max-w-[58%] object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="flex flex-1 flex-col p-5">
              <div className="mb-1 font-mono text-[11px] uppercase tracking-widest tabular-nums text-neutral-500">
                {cert.issuer} · {cert.date}
              </div>
              <h4
                className="display-md text-base font-semibold leading-snug text-neutral-900 dark:text-white"
                style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}
              >
                {cert.name}
              </h4>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {cert.covers.slice(0, 4).map((c) => (
                  <span
                    key={c}
                    translate="no"
                    className="rounded-full border border-neutral-300 px-2 py-0.5 text-[10px] text-neutral-600 dark:border-neutral-700 dark:text-neutral-400"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-4 pt-5">
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex items-center gap-1.5 text-xs font-semibold text-[color:var(--accent)] hover:underline"
                  >
                    <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                    Verify
                  </a>
                )}
                {cert.pdf && (
                  <a
                    href={cert.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex items-center gap-1.5 text-xs text-neutral-600 transition-colors hover:text-[color:var(--accent)] dark:text-neutral-400"
                  >
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    PDF
                  </a>
                )}
              </div>
            </div>

            <div
              className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
              style={{ backgroundColor: ACCENT }}
            />
          </motion.article>
        ))}
      </HorizontalCarousel>
    </Section>
  );
}
