import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Info } from "lucide-react";
import { caseStudies, caseStudyBySlug, personal } from "../../lib/data";
import Diagram from "../../components/diagrams";
import StatusBadge from "../../components/ui/StatusBadge";

const SITE_URL = "https://bcastelino.com";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const study = caseStudyBySlug(params.slug);
  if (!study) return {};
  return {
    title: study.metaTitle,
    description: study.metaDescription,
    alternates: { canonical: `/work/${study.slug}/` },
    openGraph: {
      type: "article",
      title: study.metaTitle,
      description: study.metaDescription,
      url: `${SITE_URL}/work/${study.slug}/`,
    },
    twitter: {
      card: "summary_large_image",
      title: study.metaTitle,
      description: study.metaDescription,
    },
  };
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="display-md mt-14 text-2xl font-semibold text-neutral-900 dark:text-white"
      style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}
    >
      {children}
    </h2>
  );
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const study = caseStudyBySlug(params.slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/work/` },
          {
            "@type": "ListItem",
            position: 3,
            name: study.title,
            item: `${SITE_URL}/work/${study.slug}/`,
          },
        ],
      },
      {
        "@type": study.status === "Open Source" ? "SoftwareSourceCode" : "Article",
        headline: study.title,
        description: study.metaDescription,
        author: { "@type": "Person", name: personal.fullName, url: SITE_URL },
        ...(study.status === "Open Source" && study.links?.length
          ? { codeRepository: study.links[0].href }
          : {}),
        ...(study.tech.length ? { keywords: study.tech.join(", ") } : {}),
      },
    ],
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-screen-lg px-6 py-20 sm:px-10 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/work/"
        className="focus-ring inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-[color:var(--accent)]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All case studies
      </Link>

      <header className="mt-10">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={study.status} />
          <span className="font-mono text-xs text-neutral-500">
            {study.org} · {study.period}
          </span>
        </div>
        <h1
          className="display-lg mt-5 text-balance text-3xl font-bold leading-tight text-neutral-900 dark:text-white sm:text-4xl"
          style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}
        >
          {study.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          {study.kicker}
        </p>
        <p className="mt-4 font-mono text-sm text-neutral-500">{study.role}</p>
        <div
          className="mt-6 h-[2px] w-24 rounded-full"
          style={{ backgroundColor: "var(--accent)" }}
        />
      </header>

      {study.confidentiality && (
        <aside
          className="mt-10 flex gap-3 rounded-[14px] border p-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
          style={{
            borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
            background: "color-mix(in srgb, var(--accent) 5%, transparent)",
          }}
        >
          <Info
            className="mt-0.5 h-4 w-4 flex-shrink-0"
            style={{ color: "var(--accent)" }}
            aria-hidden="true"
          />
          <p>{study.confidentiality}</p>
        </aside>
      )}

      <SectionHeading>The problem</SectionHeading>
      <p className="mt-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
        {study.problem}
      </p>

      <SectionHeading>What I did</SectionHeading>
      <ul className="mt-4 space-y-3">
        {study.contribution.map((item) => (
          <li
            key={item}
            className="flex gap-3 leading-relaxed text-neutral-700 dark:text-neutral-300"
          >
            <span aria-hidden="true" style={{ color: "var(--accent)" }}>
              ▸
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <SectionHeading>Architecture</SectionHeading>
      <Diagram name={study.diagram} bleed />
      <ul className="mt-2 space-y-3">
        {study.approach.map((item) => (
          <li
            key={item}
            className="flex gap-3 leading-relaxed text-neutral-700 dark:text-neutral-300"
          >
            <span aria-hidden="true" style={{ color: "var(--accent)" }}>
              ▸
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <SectionHeading>What went wrong first</SectionHeading>
      <div className="mt-4 space-y-6">
        {study.challenges.map((c) => (
          <div
            key={c.title}
            className="rounded-[14px] border border-neutral-200 p-5 dark:border-neutral-800"
          >
            <h3 className="font-semibold text-neutral-900 dark:text-white">
              {c.title}
            </h3>
            <p className="mt-2 leading-relaxed text-neutral-600 dark:text-neutral-400">
              {c.body}
            </p>
          </div>
        ))}
      </div>

      <SectionHeading>Results</SectionHeading>
      <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
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
                  color: "var(--accent)",
                  fontFamily: "'Fira Code', ui-monospace, monospace",
                }}
              >
                {r.value}
              </span>
              <span className="mt-1 block text-xs leading-snug text-neutral-600 dark:text-neutral-400">
                {r.label}
              </span>
              {r.note && (
                <span className="mt-1 block text-[11px] leading-snug text-neutral-500">
                  {r.note}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 leading-relaxed text-neutral-700 dark:text-neutral-300">
        {study.businessRelevance}
      </p>

      <SectionHeading>Stack</SectionHeading>
      <div className="mt-4 flex flex-wrap gap-2">
        {study.tech.map((t) => (
          <span
            key={t}
            translate="no"
            className="rounded-full border border-neutral-300 px-2.5 py-1 font-mono text-xs text-neutral-600 dark:border-neutral-700 dark:text-neutral-400"
          >
            {t}
          </span>
        ))}
      </div>

      {study.links && study.links.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-4">
          {study.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-1 text-sm font-medium text-[color:var(--accent)] hover:underline"
            >
              {link.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      )}

      <nav
        aria-label="More case studies"
        className="mt-20 border-t border-neutral-200 pt-8 dark:border-neutral-800"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
          Next
        </span>
        <Link
          href={`/work/${next.slug}/`}
          className="focus-ring group mt-3 block"
        >
          <span
            className="display-md text-xl font-semibold text-neutral-900 transition-colors group-hover:text-[color:var(--accent)] dark:text-white"
            style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}
          >
            {next.title}
          </span>
          <span className="mt-1 block text-sm text-neutral-600 dark:text-neutral-400">
            {next.kicker}
          </span>
        </Link>
      </nav>
    </main>
  );
}
