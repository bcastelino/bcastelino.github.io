"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Section from "../Section";
import StatusBadge from "../ui/StatusBadge";
import Diagram from "../diagrams";
import { featuredCaseStudy, caseStudies } from "../../lib/data";

const ACCENT = "var(--accent)";

/**
 * The single case study that leads the page. A visitor who reads only this
 * section should already know what I build and how I think about it.
 */
export default function FeaturedWork() {
  const study = featuredCaseStudy;

  return (
    <Section id="work" eyebrow="01 / Work" title="Featured case study.">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={study.status} />
          <span className="font-mono text-xs text-neutral-500">
            {study.org} · {study.period}
          </span>
        </div>

        <h3
          className="display-md mt-5 max-w-3xl text-2xl font-semibold text-neutral-900 dark:text-white sm:text-3xl"
          style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}
        >
          {study.title}
        </h3>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          {study.kicker}
        </p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Diagram name={study.diagram} />
          </div>

          <div className="lg:col-span-2 lg:pt-10">
            <dl className="grid grid-cols-2 gap-4">
              {study.results.map((r) => (
                <div
                  key={r.label}
                  className="rounded-[14px] border border-neutral-200 p-4 dark:border-neutral-800"
                >
                  <dt className="sr-only">{r.label}</dt>
                  <dd>
                    <span
                      className="display-md block text-2xl font-bold"
                      style={{
                        color: ACCENT,
                        fontFamily: "'Fira Code', ui-monospace, monospace",
                      }}
                    >
                      {r.value}
                    </span>
                    <span className="mt-1 block text-xs leading-snug text-neutral-600 dark:text-neutral-400">
                      {r.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href={`/work/${study.slug}/`}
                className="focus-ring inline-flex items-center gap-1 font-medium text-[color:var(--accent)] hover:underline"
              >
                Read the full case study
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/work/"
                className="focus-ring inline-flex items-center gap-1 text-sm text-neutral-600 transition-colors hover:text-[color:var(--accent)] dark:text-neutral-400"
              >
                See all {caseStudies.length} case studies
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
