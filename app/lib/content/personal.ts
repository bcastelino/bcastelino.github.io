export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "HOME", href: "#home" },
  { label: "WORK", href: "#work" },
  { label: "OPEN SOURCE", href: "#open-source" },
  { label: "PROJECTS", href: "#projects" },
  { label: "WRITING", href: "#writing" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "ABOUT", href: "#about" },
  { label: "CREDENTIALS", href: "#credentials" },
  { label: "CONTACT", href: "#contact" },
  { label: "BLOGS", href: "/blogs/" },
];

export const personal = {
  firstName: "BRIAN",
  lastName: "CASTELINO",
  fullName: "Brian Denis Castelino",
  signature: "Br",
  email: "contact@bcastelino.com",
  location: "Dallas, TX, USA",
  /** Served from this domain, no third-party dependency. */
  resumePath: "/personal/Brian_Castelino_Resume.pdf",
  profileImage: "/personal/profile.jpg",
  socials: {
    linkedin: "https://www.linkedin.com/in/cas7elino/",
    github: "https://github.com/bcastelino",
    twitter: "https://x.com/cas7elino",
  },
};

/**
 * Hero copy. The headline is the page's single visible `h1`; it states what
 * I do, not who I am, because a recruiter decides in about four seconds.
 */
export const hero = {
  headline: "I ship ML and LLM systems into production on Databricks.",
  supporting:
    "AI Data Engineer at WorldLink US. I build forecasting platforms, inference services and natural-language-to-BI pipelines, then write about how they actually work.",
  /** Every claim here is independently verifiable from this page. */
  proofLine: [
    "7 cloud & data certifications",
    "4 PRs to databrickslabs/ontobricks",
    "MS Data Analytics Engineering, GMU",
  ],
};

export const availability = {
  open: true,
  chip: "Open to work",
  statement:
    "Open to AI/ML Data Engineer, Analytics Engineering and Data Platform roles. Based in Dallas, TX; open to relocation and remote.",
};

/** Short positioning line reused in the footer and metadata. */
export const positioningLine =
  "AI Data Engineer building production ML, LLM and analytics systems on Databricks.";
