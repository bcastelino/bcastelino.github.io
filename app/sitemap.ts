import type { MetadataRoute } from "next";

const SITE_URL = "https://bcastelino.github.io";

/**
 * sitemap.xml — the single-page portfolio plus the blog index. Section
 * anchors (#about, #projects, …) live on the home page, so they are covered
 * by the `/` entry. Generated statically at build time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blogs/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
