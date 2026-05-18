"use client";

import React from "react";
import { Linkedin, Github, Twitter, Mail } from "lucide-react";
import { personal } from "../lib/data";

const ACCENT = "var(--accent)";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-900 px-6 sm:px-10 py-10">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-sm text-neutral-500 font-mono">
          © {new Date().getFullYear()} {personal.fullName}. Built with Next.js + Tailwind.
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${personal.email}`}
            aria-label="Email"
            className="text-neutral-500 hover:text-[color:var(--accent)] transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href={personal.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-neutral-500 hover:text-[color:var(--accent)] transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-neutral-500 hover:text-[color:var(--accent)] transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={personal.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X / Twitter"
            className="text-neutral-500 hover:text-[color:var(--accent)] transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
