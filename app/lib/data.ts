/**
 * Barrel export for the content layer.
 *
 * The actual copy lives in `app/lib/content/*` so that editing a fact does not
 * mean scrolling through one very long module. Import from here as before:
 * every existing `from "../lib/data"` import keeps working.
 */
export * from "./content/personal";
export * from "./content/about";
export * from "./content/skills";
export * from "./content/projects";
export * from "./content/experience";
export * from "./content/education";
export * from "./content/certifications";
export * from "./content/openSource";
export * from "./content/work";
export * from "./content/writing";
