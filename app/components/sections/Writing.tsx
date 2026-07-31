"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Section from "../Section";
import { featuredArticles, blogUrl } from "../../lib/data";

const ACCENT = "var(--accent)";

export default function Writing() {
  return (
    <Section id="writing" eyebrow="04 / Writing" title="Thinking out loud.">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="-mt-6 mb-10 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400"
      >
        Explaining a system is the fastest way to find out whether you actually
        understand it. I write at The Brian Journal about data engineering, AI
        and the things that surprised me.
      </motion.p>

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {featuredArticles.map((article, idx) => (
          <motion.li
            key={article.href}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
          >
            <a
              href={article.href}
              className="focus-ring group flex h-full flex-col rounded-[18px] border border-neutral-200 bg-white/40 p-6 transition-all hover:-translate-y-1 hover:border-[color:var(--accent)] dark:border-neutral-800 dark:bg-neutral-900/40"
            >
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
                <span style={{ color: ACCENT }}>{article.topic}</span>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-500">{article.readTime}</span>
              </div>
              <h3 className="display-md mt-4 text-base font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-[color:var(--accent)] dark:text-white">
                {article.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {article.excerpt}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--accent)]">
                Read
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          </motion.li>
        ))}
      </ul>

      <div className="mt-10">
        <a
          href={blogUrl}
          className="focus-ring inline-flex items-center gap-1 font-medium text-neutral-700 transition-colors hover:text-[color:var(--accent)] dark:text-neutral-300"
        >
          All articles on The Brian Journal
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </Section>
  );
}
