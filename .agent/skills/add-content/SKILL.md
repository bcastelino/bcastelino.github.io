---
name: add-content
description: how to add new content (blog, certification, project, case study, OSS PR, experience, skills) to the portfolio
---

Use this whenever Brian says he has written a new blog, earned a certification, shipped a project, wants a new case study, opened an open-source PR, or changed role/skills. The job is: derive the fields, confirm them, write one content module, sync the side effects, verify. Never commit, never push.

## Step 0: route

Ask which kind of item is being added, then follow only that branch in Step 3:

| Kind | Target file |
| --- | --- |
| Blog post | `app/lib/content/writing.ts` |
| Certification | `app/lib/content/certifications.ts` |
| Project | `app/lib/content/projects.ts` |
| Case study | `app/lib/content/work.ts` + `app/components/diagrams/index.tsx` |
| Open-source PR | `app/lib/content/openSource.ts` |
| Experience | `app/lib/content/experience.ts` |
| Skills | `app/lib/content/skills.ts` |

`app/lib/data.ts` is a barrel re-export. It only changes if a brand new content module is created.

## Step 1: derive, then confirm every field

1. If a source URL was given (issuer verification page, GitHub repo, blog post URL), read it and pull out what it actually states.
2. Read the target file first so the new entry matches the existing type and voice exactly.
3. Print a two-column table of `field` and `derived value`, marking anything guessed as `NEEDS CONFIRMATION`.
4. Wait for explicit confirmation or corrections before making any edit.

Never invent a verification URL, an issue date, a metric, a read time or a PR status. If it cannot be read from the source, ask.

## Step 2: placement

Always ask where the new entry goes in the array and whether an existing entry should be removed. State these two consequences before asking:

- `featuredCaseStudy = caseStudies[0]` in `app/lib/content/work.ts`, so inserting a case study at index 0 replaces the homepage hero case study.
- `featuredArticles` renders in a `md:grid-cols-3` grid in `app/components/sections/Writing.tsx`, so a 4th article wraps onto a second row. Adding one usually means dropping the oldest.

## Step 3: write the entry

### Blog post

Add an `Article` to `featuredArticles`: `title`, `href`, `topic`, `readTime`, `excerpt`.

- `href` is the path on the separate blog app, shape `/blogs/blog/<slug>/`, with a trailing slash. Verify it resolves before writing it.
- `readTime` comes from the live post, not an estimate.
- `excerpt` is one or two sentences describing what the reader gets, no marketing framing.

### Certification

Add a `Certification` to `certifications`: `name`, `issuer`, `date`, `badge`, `pdf`, `verifyUrl`, `covers`.

- `verifyUrl` is mandatory in practice: an issuer-hosted page a stranger can check. A PDF alone is not evidence.
- Badge PNG goes in `public/badges/`, certificate PDF in `public/certificates/`. Kebab-case filenames, no spaces, no `%20`. If either file is missing from the repo, stop and ask for it.
- `covers` lists what the exam actually tests, 4 to 6 items. The card renders the first 4.
- `BadgeMarquee` and the hero row read from this same array, so no edit is needed there.

Then update:
- The count line in `app/components/sections/Credentials.tsx` (`{certifications.length} certifications, ...`) only if its wording hardcodes anything else.
- `public/llms.txt`: add the bullet under `## Certifications` and fix the spelled-out count sentence above the list ("All seven are independently verifiable ...").

### Project

Add a `Project` to `projects`: `title`, `description`, `technologies`, `status`, and optionally `repo`, `image`, `demo`, `caseStudy`.

- `description` stays under 35 words. The card is a trailer, not the film.
- `status` is one of `Production`, `Open Source`, `Personal`.
- With no `image`, the card falls back to the GitHub social preview for `repo`, which requires a public repo. Otherwise put a 1280x640 PNG in `public/projects/`.
- Set `caseStudy` only if a matching `/work/<slug>` entry exists.
- Add a bullet under `## Projects` in `public/llms.txt`.

### Case study

Add a full `CaseStudy` to `caseStudies`: `slug`, `title`, `kicker`, `status`, `org`, `period`, `role`, `diagram`, `problem`, `contribution`, `approach`, `challenges`, `results`, `businessRelevance`, `tech`, `metaTitle`, `metaDescription`, plus optional `confidentiality` and `links`.

- Employer work must set `confidentiality: INTERNAL_NOTE` and express figures as ratios or rounded relatives, never absolutes. No proprietary names, data or model parameters.
- `challenges` are real failures and what changed because of them, not restated features.
- `results` need a stated baseline for any comparison.

Always scaffold a new diagram:
1. Write a new `<Name>Diagram` component in `app/components/diagrams/index.tsx` using `Defs`, `Box`, `Arrow`, `Label`, `LaneTitle` from `./primitives` and wrapping in `DiagramFrame` with a `title`, an explanatory `caption` and a `viewBox` (existing ones use `0 0 900 320`).
2. Register it in the `registry` map at the bottom of that file under a new short key.
3. Set the case study's `diagram` field to that key.

`app/sitemap.ts`, `app/work/page.tsx`, `app/work/[slug]/page.tsx` and the "See all N case studies" count all derive from the array, so leave them alone. Add a bullet under `## Case studies` in `public/llms.txt`.

### Open-source PR

Add a `PullRequest` to `pullRequests`: `number`, `title`, `url`, `state`, `status`, `summary`, optional `caseStudy`.

Obey the two rules in that file's header:
1. Never write "merged" without checking the PR itself.
2. In the same pass, re-verify every existing PR's state and status against GitHub, correct any that have moved, then update `lastVerified` in `openSourceProject`.

Mirror the corrected states, the PR count and the date into the `## Open source` paragraph of `public/llms.txt`.

### Experience

Add or edit an `ExperienceItem`: `title`, `company`, `period`, optional `logo` (under `public/logos/`), optional `caseStudySlug`, `description` as achievement bullets with numbers where they exist. If the current role changes, also update the `## About` section of `public/llms.txt`.

### Skills

Edit `skillGroups`. Keep `depth` an honest marker of how the group was actually used, for example "Daily, in production, since 2025". Do not pad `items` with tools that were only read about.

## Step 4: sync and flag

- **Assets**: confirm every referenced path under `public/` exists on disk with a kebab-case name.
- **`public/llms.txt`**: the section bullet plus any count or date it hardcodes.
- **Private, never commit**: `resume/` is gitignored. If the change belongs on the resume, say so and let Brian update `resume/brian-resume.tex` himself. Same for `portfolio-review-brian-castelino.md`.
- **`README.md` / `DESIGN.md`**: touch only when the change is structural, for example a new content module or a new section.

## Step 5: verify

// turbo
1. `npm run lint`

// turbo
2. `npm run build`

3. Visual check. Reuse an existing dev server on `http://localhost:3000` if one is already running rather than starting a second. Load the affected view (`/#writing`, `/#projects`, `/#credentials`, `/#open-source`, `/#experience`, `/work/<slug>/`), take a screenshot or accessibility snapshot, and confirm the new card renders with its image or badge, its tags and its links intact.
4. Report lint, build and visual results. Leave the working tree uncommitted for Brian to review.

## Style rules, non-negotiable

- **No em dashes** anywhere in this repo. Use a comma, semicolon, colon, hyphen or parentheses.
- Match the existing voice: short, concrete, specific. No marketing filler, no superlatives, no invented outcomes.
- Every claim is verifiable or it does not ship.
