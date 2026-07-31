export type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  logo?: string;
  /** Optional link to the case study that evidences this role's work. */
  caseStudySlug?: string;
  description: string[];
};

export const experience: ExperienceItem[] = [
  {
    title: "AI Data Engineer",
    company: "WorldLink US",
    period: "Sept 2025 – Present",
    caseStudySlug: "forecasting-platform-databricks",
    description: [
      "Architected and deployed an end-to-end price forecasting platform on Databricks using MLflow, XGBoost and CI/CD, registering three production model versions and cutting deployment cycle time by roughly 40%.",
      "Built a multi-model inference service (React + Databricks Apps) serving five integration patterns, holding sub-two-second response times under a 1,000-concurrent-user load test.",
      "Implemented automated MLOps workflows (model validation, versioning and Dev→Prod promotion), reducing production rollbacks by about 30% and release errors by about 45%.",
      "Improved forecast accuracy through feature engineering and hyperparameter tuning, achieving an 18% reduction in MAPE against the baseline time-series model.",
      "Engineered an LLM-powered natural-language-to-BI pipeline integrating Databricks Genie with Power BI, cutting manual report creation time by around 60%.",
      "Automated SQL-to-visual translation and YAML ↔ TMDL metadata conversion with Agent Skills and LLM orchestration, reaching 92% query-to-visual accuracy on the internal evaluation set.",
    ],
  },
  {
    title: "Graduate Teaching Assistant",
    company: "George Mason University",
    period: "Aug 2024 – Jan 2025",
    logo: "/logos/gmu-logo.png",
    description: [
      "Led weekly sessions for 40+ students on optimisation modelling in Excel with Frontline Solver, improving accuracy on linear and mixed-integer problems by around 30%.",
      "Ran interactive labs on Gurobi in Python, raising measured student engagement scores by about 20%.",
    ],
  },
  {
    title: "Senior Product Analyst",
    company: "Media.Net Software Services Pvt. Ltd.",
    period: "Jan 2022 – Aug 2023",
    logo: "/logos/mnet-logo.png",
    description: [
      "Partnered with engineering, product and campaign teams to ship data-driven changes to AdTech serving performance.",
      "Ran 10+ concurrent weekly A/B tests on creative templates using in-house tooling, improving recommendation accuracy by around 50% and campaign ROI by around 70%.",
      "Automated recurring analysis in Python and SQL, removing roughly half the manual effort from the weekly reporting cycle.",
      "Led execution across 5+ initiatives in Jira and Confluence, delivering all of them on schedule.",
      "Mentored 10 junior analysts on ETL design, SQL and reporting practice.",
    ],
  },
  {
    title: "Product Analyst",
    company: "Media.Net Software Services Pvt. Ltd.",
    period: "July 2019 – Dec 2021",
    logo: "/logos/mnet-logo.png",
    description: [
      "Built stored procedures automating ingestion and transformation of 5+ GB of daily ad-serving data into SQL Server, halving batch processing time.",
      "Integrated new ad platforms over REST APIs alongside engineering, increasing impression delivery by around 20%.",
      "Delivered weekly campaign performance and optimisation reporting to 10+ clients in Tableau and Excel.",
    ],
  },
];
