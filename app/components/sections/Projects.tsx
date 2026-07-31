"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Section from "../Section";
import HorizontalCarousel from "../ui/HorizontalCarousel";
import StatusBadge from "../ui/StatusBadge";
import {
  projects,
  githubRepoUrl,
  githubSocialImage,
  type Project,
} from "../../lib/data";

const FALLBACK_IMAGE = "/projects/project-placeholder.png";
const ACCENT = "var(--accent)";

function ProjectPreview({ project }: { project: Project }) {
  const primary =
    project.image ||
    (project.repo ? githubSocialImage(project.repo) : FALLBACK_IMAGE);
  const [src, setSrc] = useState(primary);
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={`${project.title} preview`}
      loading="lazy"
      width={1280}
      height={640}
      onError={() => {
        if (src !== FALLBACK_IMAGE) setSrc(FALLBACK_IMAGE);
      }}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}

export default function Projects() {
  return (
    <Section id="projects" eyebrow="03 / Projects" title="Things I built.">
      <HorizontalCarousel ariaLabel="Selected projects" gap={24}>
        {projects.map((project, idx) => {
          const repoUrl = project.repo ? githubRepoUrl(project.repo) : undefined;
          // Prefer the case study, then the live demo, then the repo.
          const primaryHref = project.caseStudy
            ? `/work/${project.caseStudy}/`
            : project.demo || repoUrl;
          const primaryLabel = project.caseStudy
            ? "Read the case study"
            : project.demo
              ? "Try the live demo"
              : "View the code";

          return (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="elev-2 group relative flex w-[300px] flex-shrink-0 flex-col overflow-hidden rounded-[20px] border border-neutral-200 bg-white/40 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 active:scale-[0.98] dark:border-neutral-800 dark:bg-neutral-900/40 sm:w-[340px] lg:w-[380px]"
            >
              <div className="relative block aspect-[16/9] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <ProjectPreview project={project} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute left-3 top-3">
                  <StatusBadge status={project.status} />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3
                  className="display-md mb-2 text-xl font-semibold text-neutral-900 transition-colors dark:text-white"
                  style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}
                >
                  {project.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-400">
                  {project.description}
                </p>
                <div className="mb-5 flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      translate="no"
                      className="rounded-full border border-neutral-300 px-2 py-0.5 font-mono text-[11px] text-neutral-600 dark:border-neutral-700 dark:text-neutral-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto space-y-3">
                  {primaryHref &&
                    (project.caseStudy ? (
                      <Link
                        href={primaryHref}
                        className="focus-ring inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--accent)] hover:underline"
                      >
                        {primaryLabel}
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    ) : (
                      <a
                        href={primaryHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--accent)] hover:underline"
                      >
                        {primaryLabel}
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ))}

                  <div className="flex gap-4">
                    {repoUrl && (
                      <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring inline-flex items-center gap-1 text-sm text-neutral-600 transition-colors hover:text-[color:var(--accent)] dark:text-neutral-400"
                      >
                        <Github className="h-4 w-4" aria-hidden="true" /> Code
                      </a>
                    )}
                    {project.demo && project.caseStudy && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring inline-flex items-center gap-1 text-sm text-neutral-600 transition-colors hover:text-[color:var(--accent)] dark:text-neutral-400"
                      >
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div
                className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ backgroundColor: ACCENT }}
              />
            </motion.article>
          );
        })}
      </HorizontalCarousel>
    </Section>
  );
}
