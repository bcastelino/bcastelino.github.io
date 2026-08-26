/**
 * Open-source contributions.
 *
 * TWO RULES, PERMANENTLY:
 *   1. Never write "merged" without checking the PR first. As of the last
 *      verification below, none of these are merged.
 *   2. Status lives in this file as a plain string per PR, so keeping it
 *      honest is a one-word edit rather than a rewrite.
 *
 * Last verified against the GitHub API: 26 August 2026.
 */

export type PullRequestState = "open" | "closed" | "merged";

export type PullRequest = {
  number: number;
  title: string;
  url: string;
  state: PullRequestState;
  /** Human-readable status shown on the card. Must match reality. */
  status: string;
  /** What the change actually did, in one or two sentences. */
  summary: string;
  /** Slug of a deeper case study, when one exists. */
  caseStudy?: string;
};

export const openSourceProject = {
  name: "databrickslabs/ontobricks",
  url: "https://github.com/databrickslabs/ontobricks",
  description:
    "A Databricks Labs project that turns Unity Catalog tables into a materialised knowledge graph, with ontology design and reasoning exposed as MCP tools.",
  /** Framed honestly: contributor, not maintainer. */
  role: "External contributor",
  blurb:
    "Four pull requests to a Databricks Labs repository I do not maintain. Working in someone else's production codebase, with their review standards, their CI and their release process, is the closest thing to a public integration test for how you actually engineer.",
  lastVerified: "26 August 2026",
};

export const pullRequests: PullRequest[] = [
  {
    number: 116,
    title: "Bound and offload graph reads so Graph Chat can't hang the app",
    url: "https://github.com/databrickslabs/ontobricks/pull/116",
    state: "merged",
    status: "Merged: shipped in milestone v0.7.0",
    summary:
      "A broad question in Graph Chat could freeze the entire app until redeploy: a slow graph read ran directly on the single uvicorn event loop, starving every other request, and was unbounded in both time and result size. This bounds every read server-side, moves the blocking work off the event loop, auto-sizes the worker pool to the instance, and degrades a slow query to a clean per-request cancellation instead of a global stall.",
    caseStudy: "ontobricks-graph-query-bounds",
  },
  {
    number: 122,
    title: "Prefer configured registry volume over legacy session defaults",
    url: "https://github.com/databrickslabs/ontobricks/pull/122",
    state: "merged",
    status: "Merged",
    summary:
      "Registry configuration resolved in the wrong precedence order, so a stale per-session value could shadow the configured environment and send binary archives and Delta views to the wrong Unity Catalog Volume. A single-file precedence fix with regression coverage.",
  },
  {
    number: 111,
    title: "Sync large literal objects via an object_hash primary key",
    url: "https://github.com/databrickslabs/ontobricks/pull/111",
    state: "closed",
    status: "Closed unmerged: taken over by a maintainer",
    summary:
      "Knowledge-graph sync aborted whenever a mapped literal exceeded Postgres' 2704-byte B-tree limit. Proposed re-keying the companion tables on a generated SHA-256 column and making the object-bearing indexes size-guarded partial indexes, with a best-effort migration for existing tables.",
  },
  {
    number: 110,
    title: "Regression test for KG /sync/filter on non-DRAFT versions",
    url: "https://github.com/databrickslabs/ontobricks/pull/110",
    state: "closed",
    status: "Closed unmerged: fix had already landed upstream",
    summary:
      "I hit a 403 filtering a locked graph version and traced it to an over-broad prefix match in the permission middleware. The fix was already in upstream, so I offered a middleware dispatch test to stop the regression returning rather than a duplicate source change.",
  },
];
