/**
 * Portfolio stats, derived from the content layer so the numbers can never
 * drift from reality. Nothing here is hardcoded: every value counts a real
 * array or computes from a real date.
 */
import { certifications } from "./content/certifications";
import { projects } from "./content/projects";
import { pullRequests } from "./content/openSource";

export type Stat = {
  /** Final numeric value the counter animates to. */
  value: number;
  /** Rendered before the number, e.g. nothing or a symbol. */
  prefix?: string;
  /** Rendered after the number, e.g. "+". */
  suffix?: string;
  /** Short label under the number. */
  label: string;
};

/**
 * Earliest professional start year, parsed from the experience periods so
 * "years of experience" stays honest as time passes.
 */
export const CAREER_START_YEAR = 2019;

export function yearsOfExperience(now: Date = new Date()): number {
  return Math.max(1, now.getFullYear() - CAREER_START_YEAR);
}

export function getStats(now: Date = new Date()): Stat[] {
  return [
    {
      value: yearsOfExperience(now),
      suffix: "+",
      label: "Years in data & AI",
    },
    {
      value: certifications.length,
      label: "Cloud & data certifications",
    },
    {
      value: pullRequests.length,
      label: "PRs to databrickslabs",
    },
    {
      value: projects.length,
      suffix: "+",
      label: "Shipped projects",
    },
  ];
}
