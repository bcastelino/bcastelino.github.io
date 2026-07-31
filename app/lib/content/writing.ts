export type Article = {
  title: string;
  /** Path on the blog, which is a separate Next.js app under /blogs/. */
  href: string;
  topic: string;
  readTime: string;
  excerpt: string;
};

export const blogUrl = "/blogs/";

/**
 * Featured articles. The blog lives in a separate repository
 * (bcastelino/blogs), so these are curated here by hand rather than read
 * from a shared content source. Verified against the live index.
 */
export const featuredArticles: Article[] = [
  {
    title:
      "Databricks Data + AI Summit 2026: The Lakehouse Becomes the Agentic Control Plane",
    href: "/blogs/blog/databricks-data-ai-summit-2026/",
    topic: "Databricks",
    readTime: "20 min read",
    excerpt:
      "A technical deep dive into Genie One, Unity AI Gateway, Lakeflow, LTAP, Lakebase and Lakewatch, and what each announcement actually changes for data and AI engineers.",
  },
  {
    title:
      "Principles and Patterns of Building AI Agents: An Honest Review of Mastra's Two-Book Series",
    href: "/blogs/blog/principles-and-patterns-of-building-ai-agents-review/",
    topic: "Book review",
    readTime: "13 min read",
    excerpt:
      "Principles teaches what to build; Patterns teaches how to keep it alive in production. A grounded look at where each one earns its place and where it doesn't.",
  },
  {
    title:
      "30 Agents Every AI Engineer Must Build: An Honest Review After Three Months",
    href: "/blogs/blog/30-agents-every-ai-engineer-must-build-review/",
    topic: "Book review",
    readTime: "10 min read",
    excerpt:
      "Why Imran Ahmad's book is really a pattern library for production agent engineering rather than a catalogue of thirty demos, and who should actually read it.",
  },
];
