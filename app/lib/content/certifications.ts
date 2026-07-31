export type Certification = {
  name: string;
  issuer: string;
  date: string;
  /** Path to the issued PDF under /public. Kebab-case, no %20 in URLs. */
  pdf?: string;
  /**
   * Issuer-hosted verification page. This is the link that matters: a PDF
   * proves nothing on its own, a credential URL is checkable by a stranger.
   */
  verifyUrl?: string;
  /** Path to the square badge image under /public. */
  badge: string;
  /** Skills the exam actually covers, used as supporting evidence, not filler. */
  covers: string[];
};

export const certifications: Certification[] = [
  {
    name: "Databricks Certified Data Engineer Professional",
    issuer: "Databricks",
    date: "2026",
    badge: "/badges/db_dep.png",
    pdf: "/certificates/databricks-data-engineer-professional.pdf",
    verifyUrl:
      "https://credentials.databricks.com/ca87d0c6-30c3-4258-a7f3-a890f39e65ba",
    covers: [
      "PySpark",
      "Delta Lake",
      "Lakehouse",
      "Workflows",
      "Production deployment",
      "Security",
    ],
  },
  {
    name: "SnowPro Advanced: Data Engineer",
    issuer: "Snowflake",
    date: "2026",
    badge: "/badges/dea_c02_ade_badge.png",
    pdf: "/certificates/snowpro-advanced-data-engineer.pdf",
    verifyUrl:
      "https://achieve.snowflake.com/7f0bf120-e57e-460c-b7ed-af2063da5fdd",
    covers: [
      "Snowpark",
      "Streams",
      "Tasks",
      "Dynamic Tables",
      "Governance",
      "Performance tuning",
    ],
  },
  {
    name: "Associate Cloud Engineer",
    issuer: "Google Cloud",
    date: "2025",
    badge: "/badges/gcp_badge.png",
    pdf: "/certificates/google-associate-cloud-engineer.pdf",
    verifyUrl:
      "https://www.credly.com/badges/6c5ffc1e-4f08-4555-9829-96dde693a7a2/public_url",
    covers: [
      "GCP",
      "Compute Engine",
      "IAM",
      "GKE",
      "Pub/Sub",
      "Cloud Storage",
      "Networking",
    ],
  },
  {
    name: "Microsoft Certified: Fabric Data Engineer Associate",
    issuer: "Microsoft",
    date: "2026",
    badge: "/badges/microsoft-certified-associate-badge.png",
    pdf: "/certificates/microsoft-fabric-data-engineer-associate.pdf",
    verifyUrl:
      "https://learn.microsoft.com/api/credentials/share/en-us/BrianCastelino/397BBEF8F4BAB443",
    covers: [
      "Lakehouse",
      "OneLake",
      "Data Factory",
      "Data pipelines",
      "Power BI",
      "Semantic models",
    ],
  },
  {
    name: "Databricks Certified Generative AI Engineer Associate",
    issuer: "Databricks",
    date: "2025",
    badge: "/badges/db_agai.png",
    pdf: "/certificates/databricks-generative-ai-engineer-associate.pdf",
    verifyUrl:
      "https://credentials.databricks.com/bf771d59-b364-4fa5-9089-33861f81728a",
    covers: [
      "LLMs",
      "RAG",
      "Vector Search",
      "Embeddings",
      "Model Serving",
      "MLflow",
      "Mosaic AI",
    ],
  },
  {
    name: "Databricks Certified Data Engineer Associate",
    issuer: "Databricks",
    date: "2025",
    badge: "/badges/db_dea.png",
    pdf: "/certificates/databricks-data-engineer-associate.pdf",
    verifyUrl:
      "https://credentials.databricks.com/abf2b2b0-f3f7-4a28-adb4-6781f7eaf24e",
    covers: [
      "Data modeling",
      "ETL",
      "Spark SQL",
      "Delta tables",
      "SQL optimisation",
    ],
  },
  {
    name: "SnowPro Core",
    issuer: "Snowflake",
    date: "2026",
    badge: "/badges/cof_c03_badge.png",
    pdf: "/certificates/snowpro-core.pdf",
    verifyUrl:
      "https://achieve.snowflake.com/642c927d-9e94-4a64-9394-686e37cdbea1",
    covers: [
      "SQL",
      "Data warehousing",
      "Data loading",
      "Data pipelines",
      "Security",
      "Performance optimisation",
    ],
  },
];
