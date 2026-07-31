import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page does not exist. Here is where to go instead.",
  robots: { index: false, follow: true },
};

const destinations = [
  { href: "/", label: "Home", note: "What I build and why" },
  { href: "/work/", label: "Case studies", note: "The work, with the reasoning left in" },
  { href: "/blogs/", label: "The Brian Journal", note: "Writing on data, AI and engineering" },
];

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col justify-center px-6 py-20 sm:px-10">
      <p
        className="display-xxl text-[clamp(4rem,14vw,9rem)] font-bold leading-none"
        style={{
          color: "var(--accent)",
          fontFamily: "'Fira Code', ui-monospace, monospace",
        }}
      >
        404
      </p>
      <h1
        className="display-lg mt-6 text-3xl font-bold text-neutral-900 dark:text-white sm:text-4xl"
        style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}
      >
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
        Either the link is wrong or I moved something. Here is where you probably
        wanted to go.
      </p>

      <ul className="mt-10 space-y-3">
        {destinations.map((d) => (
          <li key={d.href}>
            <Link
              href={d.href}
              className="focus-ring group flex items-center justify-between gap-4 rounded-[14px] border border-neutral-200 p-5 transition-colors hover:border-[color:var(--accent)] dark:border-neutral-800"
            >
              <span>
                <span className="block font-semibold text-neutral-900 transition-colors group-hover:text-[color:var(--accent)] dark:text-white">
                  {d.label}
                </span>
                <span className="mt-0.5 block text-sm text-neutral-600 dark:text-neutral-400">
                  {d.note}
                </span>
              </span>
              <ArrowUpRight
                className="h-5 w-5 flex-shrink-0 text-neutral-400 transition-colors group-hover:text-[color:var(--accent)]"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
