export type SkillGroup = {
  title: string;
  /**
   * Honest depth marker. A flat list of logos tells a reader nothing about
   * whether you have run something in production or read its landing page.
   */
  depth: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Databricks & Lakehouse",
    depth: "Daily, in production, since 2025",
    items: [
      "PySpark",
      "Delta Lake",
      "Unity Catalog",
      "Medallion Architecture",
      "Databricks Jobs",
      "Databricks Apps",
      "Model Serving",
      "Genie",
    ],
  },
  {
    title: "ML & MLOps",
    depth: "Production forecasting platform, 3 registered model versions",
    items: [
      "MLflow",
      "XGBoost",
      "scikit-learn",
      "Time-series forecasting",
      "Feature engineering",
      "Hyperparameter tuning",
      "Model registry & promotion",
      "CI/CD for models",
    ],
  },
  {
    title: "LLM & Agent Engineering",
    depth: "Shipped agent skill toolkits and retrieval apps in the open",
    items: [
      "RAG",
      "Prompt engineering",
      "Agent Skills",
      "MCP",
      "LangChain",
      "OpenRouter",
      "HuggingFace",
      "Claude Code",
    ],
  },
  {
    title: "Data Engineering",
    depth: "Five years building ingestion and transformation pipelines",
    items: [
      "SQL",
      "Python",
      "ETL / ELT",
      "Airflow",
      "dbt",
      "Snowflake",
      "SQL Server",
      "REST API integration",
    ],
  },
  {
    title: "BI & Semantic Modelling",
    depth: "Automated the SQL-to-visual path end to end",
    items: [
      "Power BI",
      "TMDL",
      "PBIP / PBIR",
      "DAX",
      "Tableau",
      "Semantic models",
      "Self-service enablement",
    ],
  },
  {
    title: "Platform & Tooling",
    depth: "How the work actually ships",
    items: [
      "Git & GitHub Actions",
      "Docker",
      "TypeScript",
      "React",
      "Google Cloud",
      "Microsoft Fabric",
      "Pytest",
    ],
  },
];
