import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { caseStudies } from "../lib/data";
import StatusBadge from "../components/ui/StatusBadge";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies on production ML, LLM and analytics systems: architecture, trade-offs and what actually broke along the way.",
  alternates: { canonical: "/work/" },
};

export default function WorkIndex() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-screen-lg px-6 py-20 sm:px-10 sm:py-28">
      <Link
        href="/"
        className="focus-ring inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-[color:var(--accent)]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back home
      </Link>

      <header className="mt-10">
        <div
          className="mb-3 font-mono text-xs uppercase tracking-[0.3em] sm:text-sm"
          style={{ color: "var(--accent)" }}
        >
          Case studies
        </div>
        <h1
          className="display-lg text-balance text-4xl font-bold text-neutral-900 dark:text-white sm:text-5xl"
          style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}
        >
          The work, with the reasoning left in.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          Each of these covers the problem, what I actually contributed, the
          architecture, and the parts that went wrong before they went right.
        </p>
        <div
          className="mt-6 h-[2px] w-24 rounded-full"
          style={{ backgroundColor: "var(--accent)" }}
        />
      </header>

      <ul className="mt-14 space-y-5">
        {caseStudies.map((study) => (
          <li key={study.slug}>
            <Link
              href={`/work/${study.slug}/`}
              className="focus-ring group block rounded-[18px] border border-neutral-200 bg-white/40 p-6 transition-all hover:-translate-y-0.5 hover:border-[color:var(--accent)] dark:border-neutral-800 dark:bg-neutral-900/40 sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={study.status} />
                <span className="font-mono text-xs text-neutral-500">
                  {study.org} · {study.period}
                </span>
              </div>
              <h2
                className="display-md mt-4 text-xl font-semibold text-neutral-900 transition-colors group-hover:text-[color:var(--accent)] dark:text-white sm:text-2xl"
                style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}
              >
                {study.title}
              </h2>
              <p className="mt-2 max-w-3xl leading-relaxed text-neutral-600 dark:text-neutral-400">
                {study.kicker}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--accent)]">
                Read the case study
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
