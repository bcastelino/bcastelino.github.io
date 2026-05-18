export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "EDUCATION", href: "#education" },
  { label: "CERTIFICATIONS", href: "#certifications" },
  { label: "CONTACT", href: "#contact" },
];

export const personal = {
  firstName: "BRIAN",
  lastName: "CASTELINO",
  fullName: "Brian Denis Castelino",
  signature: "Br",
  tagline: "Turning messy data into meaningful stories - one query at a time.",
  email: "briancastelino07@gmail.com",
  location: "Dallas, TX, USA",
  resumePath: "https://drive.google.com/file/d/1MnCNBxaT8iKWHRXc0wxg1Oh9if54YKhi/view",
  profileImage: "/personal/profile.jpg",
  socials: {
    linkedin: "https://www.linkedin.com/in/cas7elino/",
    github: "https://github.com/bcastelino",
    twitter: "https://x.com/cas7elino",
  },
};

export const aboutIntro = `Results-driven AI Data Engineer and Product Analytics professional with 4.5+ years of experience designing scalable data platforms, deploying machine learning solutions, and delivering data-driven insights across enterprise environments. Proven expertise in Databricks, cloud ecosystems (AWS, GCP, Azure), MLOps automation, and advanced analytics, with a track record of improving forecasting accuracy, reducing deployment cycles, and enabling real-time decision-making at scale. Adept at building end-to-end data pipelines, LLM-powered applications, and self-service BI solutions that drive measurable business impact. Strong collaborator with cross-functional teams, combining technical depth with business acumen to translate complex data into actionable strategies. Holds an MS in Data Modeling and Warehousing with multiple cloud and Databricks certifications.`;

export const interests: string[] = [
  "Building Ultimate Team squads on FC25 (PS5).",
  "Hiking and trail walks - pretending I'm Bear Grylls for an afternoon.",
  "Die-hard Real Madrid CF fan. Cristiano Ronaldo is the GOAT.",
  "Folding origami animals for peace of mind.",
  "Collecting clever life hacks and productivity tools - most of my projects are inspired by them.",
  "Re-watching Breaking Bad enough times to quote Jesse Pinkman in my sleep.",
];

export const skillGroups = [
  {
    title: "Data Analysis & Engineering",
    items: [
      "Python (Pandas, NumPy, Scikit-learn)",
      "SQL & Database Management",
      "Exploratory Data Analysis (EDA)",
      "ETL / ELT Pipelines",
      "Statistical Analysis",
    ],
  },
  {
    title: "AI & LLMs",
    items: ["Generative AI", "LLMs", "RAG", "LangChain", "OpenAI", "OpenRoter", "HuggingFace", "Claude Code"],
  },
  {
    title: "Dashboards & BI",
    items: ["Tableau", "Power BI", "Snowflake", "Databricks", "Looker"],
  },
  {
    title: "Soft Skills",
    items: [
      "Problem Solving",
      "Data Storytelling",
      "Project Management",
      "Team Collaboration",
      "Technical Communication",
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  /** GitHub repo as `owner/repo` - used to auto-generate the social preview image and links. */
  repo?: string;
  /** Optional override image (used when `repo` is not provided). */
  image?: string;
  /** Optional external live demo URL. */
  demo?: string;
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
      "LLM-powered tool that turns natural-language prompts into fully built Power BI dashboards - auto-generating measures, visuals, and TMDL metadata from a single description.",
    technologies: ["Python", "LangChain", "Power BI", "TMDL", "OpenAI"],
    repo: "bcastelino/powerbi-dashboard-generator",
    image: "/projects/powerbi-dashboard-generator.png",
  },
  {
    title: "OCR Text Vision Pro",
    description:
      "Vision pipeline that extracts, cleans and structures text from images and scanned documents - combining OCR with LLM post-processing for high-accuracy data capture.",
    technologies: ["Python", "OpenCV", "Tesseract", "LLM", "React UI", "OCR"],
    repo: "bcastelino/ocr-text-vision-pro",
    image: "/projects/ocr-text-vision-pro.png",
  },
  {
    title: "LinkedIn Data Visualizer",
    description:
      "Interactive dashboard that turns your exported LinkedIn data into visual insights - connections, messages, activity trends and more.",
    technologies: ["OpenRouter", "FastAPI", "Gen AI", "React UI"],
    repo: "bcastelino/linkedin-data-visualizer",
    image: "/projects/linkedin-data-visualizer.png",
  },
];

export type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  logo?: string;
  description: string[];
};

export const experience: ExperienceItem[] = [
  {
    title: "AI Data Engineer",
    company: "WorldLink US",
    period: "Sept 2025 - Present",
    description: [
      "Architected and deployed an end-to-end commodity price forecasting platform on Databricks using MLflow, XGBoost, and CI/CD - registering 3 production model versions and reducing deployment cycle time by 40%.",
      "Built a scalable ML inference application (React + Databricks Apps) supporting 1,000 concurrent users with <2s latency, enabling real-time enterprise-wide access to predictive insights.",
      "Implemented automated MLOps workflows (model validation, versioning, Dev→Prod promotion) - cutting production rollbacks by 30% and release errors by 45%.",
      "Improved forecasting performance through advanced feature engineering and hyperparameter tuning, achieving an 18% reduction in MAPE relative to baseline time-series models.",
      "Engineered an LLM-powered NLQ-to-BI visualization pipeline integrating Databricks Genie with Power BI, reducing manual report creation time by 60% and increasing self-service analytics adoption by 35%.",
      "Automated SQL-to-visual translation and YAML ↔ TMDL metadata conversion using Agent Skills and LLM orchestration, achieving 92% query-to-visual accuracy and reducing BI configuration effort by 50%.",
    ],
  },
  {
    title: "Graduate Teaching Assistant (GTA)",
    company: "George Mason University",
    period: "Aug 2024 - Jan 2025",
    description: [
      "Led weekly sessions for 40+ students on Excel modeling using Frontline Solver simulations, increasing student accuracy in solving linear and mixed-integer optimization problems by 30%.",
      "Facilitated interactive labs on Gurobi in Python, resulting in a 20% increase in student engagement scores.",
    ],
  },
  {
    title: "Senior Product Analyst",
    company: "Media.Net Software Services Pvt. Ltd.",
    period: "Dec 2021 - Aug 2023",
    description: [
      "Collaborated with cross-functional teams to plan and deliver data-driven solutions optimizing AdTech performance.",
      "Set up 10+ weekly A/B testing environments using in-house tools to statistically evaluate creative templates - improving recommendation accuracy by 50% and campaign ROI by 70%.",
      "Automated workflows using Python, Excel, and SQL, reducing manual effort by 50% while managing ambiguity in data.",
      "Led end-to-end project execution across 5+ initiatives using Jira and Confluence, ensuring 100% on-time delivery.",
      "Mentored 10 junior analysts on ETL design, SQL querying, and business reporting tools, increasing productivity by 40%.",
    ],
  },
  {
    title: "Product Analyst",
    company: "Media.Net Software Services Pvt. Ltd.",
    period: "July 2019 - Dec 2021",
    description: [
      "Developed stored procedures to automate ingestion and transformation of 5+ GB of ad-serving data into SQL Server using Python and Excel-based automation, reducing batch processing time by 50%.",
      "Collaborated with engineering to integrate new ad platforms via REST APIs, increasing impression delivery by 20%.",
      "Delivered weekly campaign performance insights and optimization reports to 10+ clients using Tableau/Excel, improving retention by 10%.",
    ],
  },
];

export type EducationItem = {
  degree: string;
  school: string;
  period: string;
  logo?: string;
  summary: string;
  description: string[];
};

export const education: EducationItem[] = [
  {
    degree: "Master's of Science in Data Analytics Engineering",
    school: "George Mason University (GMU) - College of Engineering and Computing",
    period: "Aug 2023 - May 2025",
    logo: "/logos/gmu-logo.png",
    summary:
      "The MS-DAEN at GMU is a 30-credit multidisciplinary program designed to equip students with the technologies and methodologies needed for data-driven decision-making. Housed in the College of Engineering and Computing, the curriculum integrates expertise from statistics, computer science, and operations research.",
    description: [
      "Statistical Methods",
      "Data Mining",
      "Machine Learning",
      "Big Data Analytics",
      "Data Visualization",
    ],
  },
  {
    degree: "Bachelor's of Engineering in Information Technology",
    school: "University of Mumbai (MU) - Don Bosco Institute of Technology",
    period: "July 2015 - Jun 2019",
    logo: "/logos/dbit-logo.png",
    summary:
      "The BE in Info Tech at the University of Mumbai is a 4-year undergraduate program spread across 8 semesters. It is designed to bridge the gap between academic principles and dynamic industry practices, focusing on the planning, management, and security of IT infrastructure. It helps developing expertise in computer applications, programming, and networking. Also emerges in adapting to latest fields such as Analytics, Blockchain, Cloud Computing, and Data Science.",
    description: [
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
      "Web Technologies",
    ],
  },
];

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  /** Path to the issued PDF under /public (used as the card link). */
  pdf?: string;
  /** External credential verification URL (used if no PDF is available). */
  url?: string;
  /** Path to the square badge image under /public. */
  badge: string;
};

export const certifications: Certification[] = [
  {
    name: "Microsoft Certified: Fabric Data Engineer Associate",
    issuer: "Microsoft",
    date: "2026",
    badge: "/badges/microsoft-certified-associate-badge.png",
    pdf: "/certificates/Microsoft Certified Fabric Data Engineer Associate.pdf",
  },
  {
    name: "Databricks Certified Generative AI Engineer Associate",
    issuer: "Databricks",
    date: "2025",
    badge: "/badges/db_agai.png",
    pdf: "/certificates/Databricks Certified Generative AI Engineer Associate.pdf",
  },
  {
    name: "Databricks Certified Data Engineer Professional",
    issuer: "Databricks",
    date: "2026",
    badge: "/badges/db_dep.png",
    pdf: "/certificates/Databricks Certified Data Engineer Professional Certificate.pdf",
  },
  {
    name: "Databricks Certified Data Engineer Associate",
    issuer: "Databricks",
    date: "2025",
    badge: "/badges/db_dea.png",
    pdf: "/certificates/Databricks Certified Data Engineer Associate.pdf",
  },
  {
    name: "SnowPro Advanced: Data Engineer",
    issuer: "Snowflake",
    date: "2026",
    badge: "/badges/dea_c02_ade_badge.png",
    pdf: "/certificates/SnowPro Advanced Data Engineer Certification.pdf",
  },
  {
    name: "SnowPro Core",
    issuer: "Snowflake",
    date: "2026",
    badge: "/badges/cof_c03_badge.png",
    pdf: "/certificates/SnowPro Core Certification.pdf",
  },
  {
    name: "Associate Cloud Engineer",
    issuer: "Google Cloud",
    date: "2025",
    badge: "/badges/gcp_badge.png",
    pdf: "/certificates/Associate Cloud Engineer.pdf",
  },
];
