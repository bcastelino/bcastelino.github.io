"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, GitMerge, GitPullRequest, GitPullRequestClosed } from "lucide-react";
import Section from "../Section";
import { useStackScroll } from "../../lib/hooks/useStackScroll";
import { openSourceProject, pullRequests } from "../../lib/data";

const ACCENT = "var(--accent)";
const MERGED = "#8957e5";

export default function OpenSource() {
  const listRef = useRef<HTMLUListElement>(null);
  useStackScroll(listRef, { base: 96, peek: 18 });

  return (
    <Section id="open-source" eyebrow="02 / Open source" title="Other people's codebases.">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-2"
        >
          <a
            href={openSourceProject.url}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring display-md inline-flex items-center gap-1.5 text-xl font-semibold text-neutral-900 transition-colors hover:text-[color:var(--accent)] dark:text-white"
            style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}
          >
            {openSourceProject.name}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <p className="mt-1 font-mono text-xs uppercase tracking-wider" style={{ color: ACCENT }}>
            {openSourceProject.role}
          </p>
          <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
            {openSourceProject.description}
          </p>
          <p className="mt-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
            {openSourceProject.blurb}
          </p>
          <p className="mt-6 font-mono text-[11px] text-neutral-500">
            PR status last verified {openSourceProject.lastVerified}
          </p>
        </motion.div>

        <motion.ul
          ref={listRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="space-y-4 lg:col-span-3"
        >
          {pullRequests.map((pr) => {
            const isOpen = pr.state === "open";
            const isMerged = pr.state === "merged";
            const Icon = isMerged ? GitMerge : isOpen ? GitPullRequest : GitPullRequestClosed;
            const statusColor = isMerged ? MERGED : isOpen ? ACCENT : undefined;
            const highlight = isMerged || isOpen;
            return (
              <li
                key={pr.number}
                className="elev-2 rounded-[16px] border border-neutral-200 bg-white/95 p-5 backdrop-blur-sm transition-colors hover:border-[color:var(--accent)] dark:border-neutral-800 dark:bg-neutral-900/95"
              >
                <div className="flex items-start gap-3">
                  <Icon
                    className="mt-0.5 h-4 w-4 flex-shrink-0"
                    style={{ color: statusColor ?? "currentColor" }}
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <a
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring font-medium text-neutral-900 hover:text-[color:var(--accent)] dark:text-white"
                      >
                        #{pr.number} {pr.title}
                      </a>
                    </div>
                    <p
                      className="mt-1 font-mono text-[11px] uppercase tracking-wider"
                      style={{ color: statusColor }}
                    >
                      <span className={highlight ? "" : "text-neutral-500"}>{pr.status}</span>
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {pr.summary}
                    </p>
                    {pr.caseStudy && (
                      <Link
                        href={`/work/${pr.caseStudy}/`}
                        className="focus-ring mt-3 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--accent)] hover:underline"
                      >
                        Read how I debugged it
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </Section>
  );
}
