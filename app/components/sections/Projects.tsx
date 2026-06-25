"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Section from "../Section";
import { projects, githubRepoUrl, githubSocialImage, type Project } from "../../lib/data";

const FALLBACK_IMAGE = "/projects/project-placeholder.png";

function ProjectPreview({ project }: { project: Project }) {
  // Prefer an explicit local image if provided; otherwise pull the GitHub
  // social preview; otherwise fall back to the placeholder.
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
      onError={() => {
        if (src !== FALLBACK_IMAGE) setSrc(FALLBACK_IMAGE);
      }}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}

const ACCENT = "var(--accent)";

export default function Projects() {
  return (
    <Section id="projects" eyebrow="02 / Projects" title="Selected work.">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((project, idx) => {
          const repoUrl = project.repo ? githubRepoUrl(project.repo) : undefined;
          const linkHref = repoUrl || project.demo;
          return (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="elev-2 group relative rounded-[20px] overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
            >
              <a
                href={linkHref || "#"}
                target={linkHref ? "_blank" : undefined}
                rel={linkHref ? "noopener noreferrer" : undefined}
                className="relative block h-48 sm:h-52 overflow-hidden bg-neutral-100 dark:bg-neutral-900"
                aria-label={`${project.title} preview`}
              >
                <ProjectPreview project={project} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </a>
              <div className="p-6">
                <h3
                  className="display-md text-xl font-semibold mb-2 text-neutral-900 dark:text-white transition-colors"
                  style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}
                >
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {repoUrl && (
                    <a
                      href={repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-neutral-700 dark:text-neutral-300 hover:text-[color:var(--accent)] transition-colors"
                    >
                      <Github className="w-4 h-4" /> Code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-neutral-700 dark:text-neutral-300 hover:text-[color:var(--accent)] transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" /> Demo
                    </a>
                  )}
                </div>
              </div>
              <div
                className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ backgroundColor: ACCENT }}
              />
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
