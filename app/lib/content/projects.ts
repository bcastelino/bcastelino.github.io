export type ProjectStatus = "Production" | "Open Source" | "Personal";

export type Project = {
  title: string;
  /** Under 35 words. A card is a trailer, not the film. */
  description: string;
  technologies: string[];
  status: ProjectStatus;
  /** GitHub repo as `owner/repo`; drives the social preview image and Code link. */
  repo?: string;
  /** Optional override image (used when `repo` is not provided). */
  image?: string;
  /** Live, publicly reachable demo. */
  demo?: string;
  /** Slug of the matching `/work/<slug>` case study, when one exists. */
  caseStudy?: string;
};

/**
 * GitHub serves a 1280x640 social-preview PNG at
 *   https://opengraph.githubassets.com/<cache-key>/<owner>/<repo>
 * The cache-key segment can be any string; bumping it forces a refresh.
 */
export const githubSocialImage = (repo: string, cacheKey: string = "1") =>
  `https://opengraph.githubassets.com/${cacheKey}/${repo}`;

export const githubRepoUrl = (repo: string) => `https://github.com/${repo}`;

export const projects: Project[] = [
  {
    title: "Power BI Dashboard Generator",
    description:
      "Nine composable Agent Skills that turn a plain-English request into a valid, branded Power BI Desktop Project: semantic model, visuals and theme included.",
    technologies: ["Python", "Agent Skills", "TMDL", "PBIP / PBIR", "DAX", "Claude Code"],
    status: "Open Source",
    repo: "bcastelino/powerbi-dashboard-generator",
    image: "/projects/powerbi-dashboard-generator.png",
    caseStudy: "powerbi-dashboard-generator",
  },
  {
    title: "SEC Financial Chatbot",
    description:
      "Ask questions about US public-company filings and get answers with citations back to sec.gov. Pulls live XBRL facts and filing sections, with no backend and no database.",
    technologies: ["React", "TypeScript", "SEC EDGAR XBRL", "OpenRouter", "BYOK LLM"],
    status: "Personal",
    repo: "bcastelino/sec-financial-chatbot",
    demo: "https://bcastelino.github.io/sec-financial-chatbot/",
  },
  {
    title: "Stock Market ETL Pipeline",
    description:
      "End-to-end medallion pipeline on Databricks taking raw market data through Bronze, Silver and Gold into a dashboard-ready analytics layer.",
    technologies: ["Python", "Databricks", "Delta Lake", "PySpark", "Medallion"],
    status: "Personal",
    repo: "bcastelino/stock-dash-e2e",
    caseStudy: "medallion-etl-databricks",
  },
  {
    title: "OCR Text Vision Pro",
    description:
      "Vision-model document extraction that runs entirely in the browser: upload an image or PDF, get structured text back, then interrogate it in chat.",
    technologies: ["React", "TypeScript", "Vision LLMs", "OpenRouter", "pdf.js", "Streamlit"],
    status: "Personal",
    repo: "bcastelino/ocr-text-vision-pro",
    image: "/projects/ocr-text-vision-pro.png",
    demo: "https://bcastelino.github.io/ocr-text-vision-pro/",
  },
  {
    title: "LinkedIn Data Visualizer",
    description:
      "Drop in your LinkedIn export ZIP and get an interactive dashboard of your network and activity. Parsing happens client-side, so the data never leaves your machine.",
    technologies: ["React", "TypeScript", "Client-side parsing", "OpenRouter", "HTML report"],
    status: "Personal",
    repo: "bcastelino/linkedin-data-visualizer",
    image: "/projects/linkedin-data-visualizer.png",
    demo: "https://bcastelino.github.io/linkedin-data-visualizer/",
  },
];
