"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import Section from "../Section";
import HorizontalCarousel from "../ui/HorizontalCarousel";
import { certifications } from "../../lib/data";

const ACCENT = "var(--accent)";

export default function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="05 / Certifications"
      title="Certifications I've earned."
    >
      <HorizontalCarousel ariaLabel="Certifications" gap={24}>
        {certifications.map((cert, idx) => {
          const href = cert.pdf
            ? encodeURI(cert.pdf)
            : cert.url && cert.url !== "#"
              ? cert.url
              : undefined;
          const isExternal = !cert.pdf && !!cert.url && cert.url !== "#";

          return (
            <motion.a
              key={cert.name}
              href={href}
              target={href ? "_blank" : undefined}
              rel={href ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.06, ease: "easeOut" }}
              className="elev-2 group relative flex w-[280px] sm:w-[300px] lg:w-[320px] flex-shrink-0 flex-col rounded-[20px] overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--accent)]"
            >
              <div className="relative flex items-center justify-center h-44 bg-gradient-to-b from-neutral-100/60 to-transparent dark:from-neutral-900/60 dark:to-transparent p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cert.badge}
                  alt={`${cert.name} badge`}
                  className="max-h-full max-w-[60%] object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
                  {cert.issuer} · {cert.date}
                </div>
                <h3
                  className="display-md text-base font-semibold text-neutral-900 dark:text-white flex items-start justify-between gap-2 leading-snug"
                  style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}
                >
                  <span>{cert.name}</span>
                  {href && (
                    isExternal ? (
                      <ExternalLink className="w-4 h-4 mt-0.5 flex-shrink-0 text-neutral-500 group-hover:text-[color:var(--accent)] transition-colors" />
                    ) : (
                      <FileText className="w-4 h-4 mt-0.5 flex-shrink-0 text-neutral-500 group-hover:text-[color:var(--accent)] transition-colors" />
                    )
                  )}
                </h3>
                <div
                  className="mt-4 h-[2px] w-10 rounded-full group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: ACCENT }}
                />
              </div>
            </motion.a>
          );
        })}
      </HorizontalCarousel>
    </Section>
  );
}
