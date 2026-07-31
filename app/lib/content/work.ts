export type CaseStudyStatus = "Production" | "Open Source" | "Personal";

export type Challenge = { title: string; body: string };
export type Result = { value: string; label: string; note?: string };
export type CaseLink = { label: string; href: string };

export type CaseStudy = {
  slug: string;
  title: string;
  /** One line, shown under the title and in the card. */
  kicker: string;
  status: CaseStudyStatus;
  org: string;
  period: string;
  role: string;
  /** Key into the diagram registry in app/components/diagrams. */
  diagram: string;
  /** Present on employer work: what has been generalised and why. */
  confidentiality?: string;
  problem: string;
  contribution: string[];
  approach: string[];
  challenges: Challenge[];
  results: Result[];
  businessRelevance: string;
  tech: string[];
  links?: CaseLink[];
  metaTitle: string;
  metaDescription: string;
};

const INTERNAL_NOTE =
  "This is an internal system built for an employer. Component names are generalised, and figures are given as ratios or rounded relatives rather than absolutes. No proprietary data, model parameters or customer information appears here.";

export const caseStudies: CaseStudy[] = [
  {
    slug: "forecasting-platform-databricks",
    title: "A price forecasting platform that ships itself",
    kicker:
      "End-to-end forecasting on Databricks, from ingestion to a registered, promotable model.",
    status: "Production",
    org: "WorldLink US",
    period: "2025 – present",
    role: "AI Data Engineer: design and implementation",
    diagram: "forecasting",
    confidentiality: INTERNAL_NOTE,
    problem:
      "Forecasts existed, but getting one into production was a manual event. A model lived in a notebook, someone re-ran it by hand, and promoting a new version meant copying artefacts between environments and hoping nothing drifted. There was no registry, no validation gate and no clean way back if a release went wrong.",
    contribution: [
      "Designed the platform end to end: ingestion, feature engineering, training, registry and serving.",
      "Built the MLflow experiment and registry layer, including the promotion path from Dev to Prod.",
      "Wrote the automated validation gate that a model must pass before it can be promoted.",
      "Implemented the CI/CD workflow that makes a release a pipeline run rather than a manual checklist.",
      "Owned feature engineering and hyperparameter tuning against the baseline time-series model.",
    ],
    approach: [
      "Ingestion lands raw source data into Delta tables under Unity Catalog, so lineage and access control come from the platform rather than convention.",
      "Feature engineering runs as a versioned PySpark job. Feature definitions live in code, not in a notebook cell, which is what makes a rerun reproducible.",
      "Training logs every run to MLflow (parameters, metrics and artefacts) so comparing a candidate against the incumbent is a query rather than an argument.",
      "A candidate is only registered if it clears the validation gate: accuracy against a holdout window, plus schema and range checks that catch the silent failures.",
      "Promotion moves a registered version through stages. Rollback is selecting the previous version, which is the entire point of doing it this way.",
      "Serving exposes the promoted model through Databricks Model Serving, consumed by a React front end running as a Databricks App.",
    ],
    challenges: [
      {
        title: "A model that scores well can still be wrong",
        body: "Aggregate error hid failures on specific segments. I added slice-level checks to the validation gate so a candidate that improves the headline number but degrades a segment does not get promoted. The gate is deliberately stricter than the metric.",
      },
      {
        title: "Reproducibility is a data problem, not a code problem",
        body: "Re-running the same notebook gave different results because the feature inputs had moved underneath it. Pinning feature generation to versioned Delta reads made training runs comparable, which in turn made the registry meaningful.",
      },
      {
        title: "Rollback has to be boring",
        body: "The first design treated promotion as a deployment. That made rollback a redeployment, which nobody wants to do under pressure. Modelling promotion as a stage transition on a registered version turned recovery into a one-line change.",
      },
    ],
    results: [
      { value: "3", label: "production model versions registered" },
      { value: "~40%", label: "reduction in deployment cycle time" },
      { value: "18%", label: "MAPE reduction", note: "against the baseline time-series model" },
      { value: "~30%", label: "fewer production rollbacks" },
    ],
    businessRelevance:
      "The measurable win was cycle time, but the durable one was confidence. When promotion is gated and reversible, a team ships more often because a bad release costs minutes instead of a day.",
    tech: [
      "Databricks",
      "MLflow",
      "XGBoost",
      "PySpark",
      "Delta Lake",
      "Unity Catalog",
      "Model Serving",
      "Databricks Apps",
      "CI/CD",
    ],
    metaTitle: "Production ML forecasting platform on Databricks",
    metaDescription:
      "How I designed an end-to-end price forecasting platform on Databricks: MLflow registry, an automated validation gate, and a promotion path that makes rollback a one-line change.",
  },

  {
    slug: "multi-model-inference-router",
    title: "One inference layer, five ways in",
    kicker:
      "A routing service that lets five very different consumers hit the same models without each one reinventing the client.",
    status: "Production",
    org: "WorldLink US",
    period: "2025 – present",
    role: "AI Data Engineer: design and implementation",
    diagram: "router",
    confidentiality: INTERNAL_NOTE,
    problem:
      "Different consumers wanted the same predictions in incompatible shapes. A dashboard wanted a synchronous call. A batch job wanted throughput. A live view wanted a stream. Each team was about to build its own client against the serving endpoints, which would have meant five different retry policies, five caches and five places for the contract to drift.",
    contribution: [
      "Designed the routing layer and its request contract.",
      "Implemented validation, batching, caching and routing as separate, testable stages.",
      "Built the five integration paths and the persistence layer behind them.",
      "Load-tested the service and tuned it against the concurrency target.",
    ],
    approach: [
      "Every request enters through one gateway and is normalised into a single internal shape, so downstream logic never branches on how the caller arrived.",
      "The pipeline is four ordered stages (validate, batch, cache, route), each independently testable. Most of the reliability comes from that ordering rather than from any one stage.",
      "Batching coalesces concurrent requests for the same model, which is what keeps latency flat as concurrency rises.",
      "Caching keys on the semantic content of a request, not the transport it arrived over, so a dashboard call and a scheduled job hit the same warm entry.",
      "Results persist to Unity Catalog Delta tables, which means predictions are queryable history rather than a fire-and-forget response.",
      "Five integration paths are supported: synchronous REST, client polling, server-sent events, WebSockets, and scheduled Databricks Jobs.",
    ],
    challenges: [
      {
        title: "Concurrency exposed the cache, not the models",
        body: "Under load the bottleneck was not inference; it was duplicate work. Coalescing identical in-flight requests removed a large slice of the load before it ever reached a serving endpoint.",
      },
      {
        title: "Streaming and batching pull in opposite directions",
        body: "Server-sent events want to emit early; batching wants to wait for company. I capped the batch window so the streaming path stays responsive, and accepted slightly worse batch efficiency to keep the interactive path honest.",
      },
      {
        title: "Five consumers means five failure modes",
        body: "A dropped WebSocket and a failed scheduled job need different handling. Normalising at the edge but keeping transport-specific error surfaces stopped the abstraction from lying to its callers.",
      },
    ],
    results: [
      { value: "5", label: "integration patterns on one contract" },
      { value: "<2s", label: "response time", note: "at 1,000 concurrent users in load testing" },
      { value: "1", label: "client contract instead of five" },
    ],
    businessRelevance:
      "Consolidating on one inference layer meant new consumers could integrate in days rather than building a client from scratch. Every prediction became auditable, because they all land in the same governed tables.",
    tech: [
      "Databricks Apps",
      "Model Serving",
      "React",
      "Delta Lake",
      "Unity Catalog",
      "REST",
      "Server-sent events",
      "WebSockets",
    ],
    metaTitle: "Multi-model inference router serving five integration patterns",
    metaDescription:
      "A routing layer that serves REST, polling, SSE, WebSocket and scheduled-job consumers from one contract, holding sub-two-second responses at 1,000 concurrent users.",
  },

  {
    slug: "databricks-genie-power-bi-pipeline",
    title: "From an English question to a governed Power BI report",
    kicker:
      "An LLM pipeline that turns a natural-language question into governed SQL, then into a real semantic model and report.",
    status: "Production",
    org: "WorldLink US",
    period: "2025 – present",
    role: "AI Data Engineer: design and implementation",
    diagram: "genie",
    confidentiality: INTERNAL_NOTE,
    problem:
      "Business users asked questions in English; getting an answer meant a ticket, an analyst, and days of waiting. Text-to-SQL tools promised to close that gap but stopped at a result set, which is not what anyone actually wanted. People wanted a report they could keep, in the tool they already used.",
    contribution: [
      "Designed the pipeline from question to finished Power BI artefact.",
      "Integrated Databricks Genie so generated SQL runs inside Unity Catalog governance rather than around it.",
      "Built the result-profiling step that decides which visual a given shape of data deserves.",
      "Implemented the YAML to TMDL conversion that produces a real, openable Power BI project.",
    ],
    approach: [
      "The question goes to Databricks Genie, which generates SQL against Unity Catalog. Governance is inherited, so a user cannot ask their way past a permission.",
      "The result set is profiled before anything is drawn: cardinality, types, whether there is a time dimension, how many measures against how many dimensions.",
      "Visual selection is a rules layer over that profile, not a guess by the model. A single scalar becomes a card; a measure over time becomes a line chart; a measure over a category becomes a bar.",
      "The chosen structure is emitted as YAML, then converted to TMDL and PBIR, the file formats Power BI Desktop actually opens.",
      "The output is a project, not a screenshot. Someone can open it, change it and own it.",
    ],
    challenges: [
      {
        title: "The model should not choose the chart",
        body: "Letting the LLM pick a visual produced confident nonsense: pie charts of time series. Moving selection into deterministic rules over a profiled result set made the output predictable, and made failures explainable.",
      },
      {
        title: "TMDL is unforgiving",
        body: "Power BI's project format fails closed: a near-miss produces a file that will not open at all. Generating it reliably meant treating the format as a contract to validate against, rather than a template to fill in.",
      },
      {
        title: "Governance has to be inherited, not reimplemented",
        body: "It would have been easier to run generated SQL with a service principal. Routing through Genie instead means the answer respects the asker's own permissions, which is the difference between a demo and something you can deploy.",
      },
    ],
    results: [
      { value: "~60%", label: "less manual report creation time" },
      { value: "92%", label: "query-to-visual accuracy", note: "on the internal evaluation set" },
      { value: "0", label: "governance bypasses", note: "SQL runs under the asker's own permissions" },
    ],
    businessRelevance:
      "The point was never to remove analysts. It was to stop them spending their week rebuilding the same four charts, so the questions that actually need a human get one.",
    tech: [
      "Databricks Genie",
      "Unity Catalog",
      "Power BI",
      "TMDL",
      "PBIR",
      "Agent Skills",
      "Python",
      "LLM orchestration",
    ],
    metaTitle: "LLM pipeline: Databricks Genie to governed Power BI reports",
    metaDescription:
      "Turning natural-language questions into governed SQL and then into real Power BI semantic models, with visual selection kept deterministic rather than left to the model.",
  },

  {
    slug: "semantic-model-migration",
    title: "From a TMDL export to a governed metric view",
    kicker:
      "A deterministic pipeline that migrates Power BI semantic models into Unity Catalog metric views, with humans reviewing the measures the rules cannot settle.",
    status: "Production",
    org: "WorldLink US",
    period: "2025 – present",
    role: "AI Data Engineer: design and implementation",
    diagram: "migration",
    confidentiality:
      "This accelerator is described publicly on WorldLink's site. Component names here are generalised, and figures are the product's published benchmarks rather than customer data. No proprietary data, model parameters or customer information appears here.",
    problem:
      "Enterprises have years of business logic locked in Power BI semantic models: measures, relationships and formatting that define how the business reads data. As the lakehouse becomes the centre of the platform, that logic stays stuck in legacy BI tooling, outside Unity Catalog governance and unreachable by Genie. Moving it by hand means an engineer reading TMDL, translating every measure, reconstructing joins and validating KPIs manually: two to three days per model, with errors surfacing only at validation time. Across a fleet of models, migration is measured in months.",
    contribution: [
      "Built the TMDL parsing stage that extracts tables, measures, relationships and partition sources into one intermediate model.",
      "Wrote the configurable DAX-to-SQL, format-string and relationship mapping rules behind translation.",
      "Implemented the generation stage: metric view YAML, model summaries and review bundles for flagged measures.",
      "Built the deployment path that registers metric views as Unity Catalog objects via the SQL Statement Execution API.",
      "Owned the KPI parity validation harness that compares migrated results against the Power BI baseline.",
    ],
    approach: [
      "Parse reads the TMDL export into a single intermediate model. Everything downstream works off that model, never off the raw files, so a parsing fix propagates everywhere at once.",
      "Translate applies configurable mapping rules: DAX-to-SQL for measures, format strings, and relationship reconstruction. Rules are data rather than code branches, so supporting a new DAX pattern is a config change rather than a release.",
      "Generate produces the metric view YAML, a model summary, and a review bundle for every measure the rules could not settle. Flagged does not mean failed; it means a human looks at exactly one thing.",
      "Deploy registers the metric view as a Unity Catalog object through the SQL Statement Execution API, so the result is governed from the moment it exists.",
      "Validate runs KPI parity checks against the Power BI baseline and produces reviewer-ready quality reports. Sign-off reads a report; it does not re-derive numbers by hand.",
    ],
    challenges: [
      {
        title: "DAX is not SQL with different spelling",
        body: "Iterators like AVERAGEX and time-intelligence functions carry evaluation context that a string rewrite loses. Translation has to understand the pattern, not the text, which is why the rules operate on the parsed model, and why genuinely context-dependent measures are flagged for review instead of guessed at.",
      },
      {
        title: "Deterministic beats clever on the production path",
        body: "An LLM will happily translate any DAX you hand it, and be wrong in ways that pass a casual read. The supported path stays deterministic; bounded Mosaic AI review is an optional assist on flagged edge cases. That keeps the output reproducible, and reproducibility is what makes parity validation meaningful.",
      },
      {
        title: "Parity is a trust problem before it is a math problem",
        body: "A migrated number that differs from Power BI without an explanation kills adoption, even when the new number is more correct. The quality report shows both values and the difference, so a reviewer can tell a translation bug from a deliberate semantic change.",
      },
    ],
    results: [
      { value: "<2 min", label: "per-model conversion", note: "versus two to three days manually" },
      { value: ">95%", label: "KPI parity target", note: "on supported star-schema models" },
      { value: "60-80%", label: "faster migration", note: "published accelerator benchmark" },
      { value: "156+", label: "automated tests passing in CI" },
    ],
    businessRelevance:
      "The migration is not the point; the governance is. Once metric views live in Unity Catalog, access control, lineage and Genie come from the platform. The semantic layer stops being something trapped in a BI tool and becomes something the lakehouse can enforce and AI can query.",
    tech: [
      "Databricks",
      "Unity Catalog",
      "Metric Views",
      "TMDL",
      "DAX",
      "Power BI",
      "Databricks SQL",
      "Genie",
      "Workflows",
      "Python",
    ],
    links: [
      {
        label: "Product page",
        href: "https://worldlink-us.ai/partners/databricks/semantic-model-migration",
      },
    ],
    metaTitle: "Migrating Power BI semantic models to Unity Catalog metric views",
    metaDescription:
      "A deterministic five-stage pipeline that converts Power BI TMDL into governed Unity Catalog metric views: parse, translate, generate, deploy and validate, with KPI parity checked against the baseline.",
  },

  {
    slug: "powerbi-dashboard-generator",
    title: "Nine skills that build a Power BI project",
    kicker:
      "An open-source Agent Skills toolkit that goes from a plain-English request to a valid, branded PBIP.",
    status: "Open Source",
    org: "Open source (MIT)",
    period: "2026",
    role: "Author and maintainer",
    diagram: "skills",
    problem:
      "Agent tooling for BI tends to stop at generating a SQL query or a picture of a chart. Neither is a deliverable. The actual unit of work in Power BI is a project (a semantic model, visuals, a theme), and nothing was generating one that would open without hand-repair.",
    contribution: [
      "Authored all nine skills, the orchestration contract between them and the validation layer.",
      "Designed the two human confirmation gates that stop the pipeline running on a schema it guessed wrong.",
      "Built the source-agnostic introspection layer covering SQL databases, warehouses, files and APIs.",
      "Wrote the packaging and validation stage that guarantees the output opens in Power BI Desktop.",
    ],
    approach: [
      "Each skill is a folder with a SKILL.md contract, so any agent runtime that reads Markdown manifests can use them, no framework lock-in.",
      "Responsibility is split by stage rather than bundled: an entry-point orchestrator, a data-source connector, a four-stage build pipeline, then theming and dashboard composition.",
      "The pipeline is semantic-mapper to TMDL, visual-selector to choose a chart from the data profile, visual-generator to emit PBIR files, and project-packager to scaffold, validate and zip.",
      "Two confirmation gates sit in the flow: one after the data model is inferred, one after the scaffold. The agent stops and asks rather than guessing at scale.",
      "Validation runs before packaging, because an invalid PBIP is worse than no PBIP: it fails silently at open time, far from the cause.",
    ],
    challenges: [
      {
        title: "Composability is a contract problem",
        body: "Nine skills only compose if each one's output is the next one's declared input. Writing the contracts first, and treating data-model.json as the pivot, was what stopped this becoming one unmaintainable mega-skill.",
      },
      {
        title: "Agents guess confidently when schemas are ambiguous",
        body: "Source introspection cannot always infer relationships. Rather than let the agent invent them, the connector emits an explicit clarification list and the orchestrator gates on it.",
      },
    ],
    results: [
      { value: "9", label: "composable skills" },
      { value: "4", label: "pipeline stages, independently testable" },
      { value: "MIT", label: "licensed and public" },
    ],
    businessRelevance:
      "It closes the last mile that most natural-language BI tooling leaves open: not a chart image, but a project a BI developer can open, review and take ownership of.",
    tech: ["Python", "Agent Skills", "TMDL", "PBIP", "PBIR", "DAX", "Claude Code", "MCP"],
    links: [
      { label: "Repository", href: "https://github.com/bcastelino/powerbi-dashboard-generator" },
    ],
    metaTitle: "Power BI Dashboard Generator: nine composable Agent Skills",
    metaDescription:
      "An open-source Agent Skills toolkit that turns plain-English requests into valid, branded Power BI Desktop Projects: semantic model, visuals, theme and packaging.",
  },

  {
    slug: "ontobricks-graph-query-bounds",
    title: "Stopping one slow question from freezing an app",
    kicker:
      "Diagnosing and fixing an event-loop stall in a Databricks Labs project I don't maintain.",
    status: "Open Source",
    org: "databrickslabs/ontobricks",
    period: "2026",
    role: "External contributor",
    diagram: "ontobricks",
    problem:
      "In OntoBricks' Graph Chat, one broad question could freeze the entire application until it was redeployed. Not slow: frozen, for every user at once. That is the kind of bug that looks like an infrastructure problem and is actually an architecture problem.",
    contribution: [
      "Diagnosed the root cause: a blocking graph read executing directly on the single uvicorn event loop.",
      "Established the second half of the failure: reads were unbounded in time and result size, pinning a database session indefinitely.",
      "Implemented server-side bounds, off-loop execution and an auto-sized worker pool.",
      "Added regression tests covering both failure paths, and documented the trade-off for reviewers.",
    ],
    approach: [
      "The application ran on a single uvicorn event loop. A deep traversal, an unfiltered lookup or a heavy resolver ran on that loop, so while it worked, nothing else could, including health checks.",
      "The fix has two halves. Blocking work moves off the event loop so a slow query occupies a worker instead of the whole process. Every read gains a server-side bound so it cannot run forever.",
      "Bound resolution follows an explicit order (request override, then environment, then default) with clamping so a caller cannot disable the protection.",
      "The worker pool auto-sizes to the instance rather than assuming a fixed count, because the deployment target varies.",
      "Statement timeouts reset on pooled connections, so a bound applied to one request can never leak to whoever borrows that connection next. That detail is easy to miss and causes very confusing bugs later.",
      "The result is a behaviour change, stated plainly in the PR: a genuinely oversized query now fails as one cancelled request instead of taking the application down.",
    ],
    challenges: [
      {
        title: "The reported symptom was not the bug",
        body: "'Graph Chat is slow' pointed at query performance. Slowness was real but incidental. The reason it took the whole app down was that it ran on the shared event loop. Fixing only the query would have made the freeze rarer and no less total.",
      },
      {
        title: "Bounds leak if you are careless with pools",
        body: "Applying a statement timeout to a pooled connection silently affects the next borrower. Resetting it on release was a small change that prevented a class of bug that would have been very hard to attribute later.",
      },
      {
        title: "Contributing to a codebase you don't own",
        body: "This meant matching their conventions, their changelog format and their review expectations, and being explicit about what I could not verify locally: the toolchain would not fully install in my environment, so I stated exactly which subset I ran and left the rest to CI.",
      },
    ],
    results: [
      { value: "Open", label: "PR #116, labelled 'status: in progress'" },
      { value: "v0.7.0", label: "milestone the maintainers accepted it into" },
      { value: "4", label: "PRs opened to the project" },
    ],
    businessRelevance:
      "Most production incidents are not exotic. They are a blocking call on a shared resource with no upper bound. Recognising that shape quickly, in a codebase you have never seen, is most of the job.",
    tech: ["Python", "FastAPI", "uvicorn", "asyncio", "PostgreSQL", "Databricks", "pytest"],
    links: [
      { label: "PR #116", href: "https://github.com/databrickslabs/ontobricks/pull/116" },
      { label: "Project", href: "https://github.com/databrickslabs/ontobricks" },
    ],
    metaTitle: "Fixing an event-loop stall in databrickslabs/ontobricks",
    metaDescription:
      "Diagnosing why one broad question could freeze an entire FastAPI application, and the two-part fix: bound every graph read and move blocking work off the event loop.",
  },

  {
    slug: "medallion-etl-databricks",
    title: "A medallion pipeline you can actually read",
    kicker:
      "Bronze, Silver and Gold on Databricks for market data, built small enough to explain end to end.",
    status: "Personal",
    org: "Personal project (MIT)",
    period: "2026",
    role: "Author",
    diagram: "medallion",
    problem:
      "Medallion architecture gets described a lot more often than it gets shown. I wanted a complete, readable reference where each layer's responsibility is obvious and the whole thing is small enough to hold in your head.",
    contribution: [
      "Built the full pipeline: ingestion, layering, transformation and the analytics-ready output.",
      "Defined the contract for each layer so responsibilities do not bleed across boundaries.",
      "Kept it deliberately small; the point is legibility, not scale.",
    ],
    approach: [
      "Bronze is append-only and faithful to the source. No cleaning, no opinions: if you clean here, you can never reproduce what the source actually sent.",
      "Silver deduplicates, enforces types and applies business rules. This is the layer that decides what 'correct' means.",
      "Gold aggregates into the shapes a dashboard consumes, so query-time work stays trivial.",
      "Each layer is a Delta table, which makes the boundaries inspectable and every step re-runnable.",
    ],
    challenges: [
      {
        title: "Resisting the urge to clean early",
        body: "Filtering bad rows in Bronze is tempting and quietly destroys your ability to reproduce a source-side bug. Keeping Bronze faithful is a discipline, not a default.",
      },
    ],
    results: [
      { value: "3", label: "layers with explicit contracts" },
      { value: "Public", label: "MIT-licensed and readable end to end" },
    ],
    businessRelevance:
      "A reference implementation is a teaching tool. The value is that someone can read all of it in one sitting and see exactly why each boundary exists.",
    tech: ["Databricks", "PySpark", "Delta Lake", "Python", "Medallion architecture"],
    links: [{ label: "Repository", href: "https://github.com/bcastelino/stock-dash-e2e" }],
    metaTitle: "Medallion ETL pipeline on Databricks",
    metaDescription:
      "A small, readable Bronze/Silver/Gold pipeline on Databricks and Delta Lake, built as a reference for why each layer boundary exists.",
  },
];

export const caseStudyBySlug = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug);

/** The one featured on the homepage above everything else. */
export const featuredCaseStudy = caseStudies[0];
