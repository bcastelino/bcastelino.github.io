import type { MetadataRoute } from "next";

const SITE_URL = "https://bcastelino.com";

/**
 * robots.txt: allow all standard crawlers AND the AI answer-engine bots
 * (so ChatGPT, Perplexity, Claude, Gemini and Copilot can cite the site).
 * Generated statically at build time (compatible with `output: 'export'`).
 */
export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "PerplexityBot",
    "ClaudeBot",
    "anthropic-ai",
    "Google-Extended",
    "Applebot-Extended",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiBots.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
