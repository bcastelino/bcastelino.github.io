<div align="center">

# bcastelino.github.io - Personal Portfolio

[![Deploy Status](https://github.com/bcastelino/bcastelino.github.io/actions/workflows/main.yml/badge.svg)](https://github.com/bcastelino/bcastelino.github.io/actions/workflows/main.yml)
[![Live Site](https://img.shields.io/badge/Live%20Site-bcastelino.github.io-blue?style=flat&logo=github)](https://bcastelino.github.io)

A single-page, scroll-driven portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Framer Motion** and **GSAP ScrollTrigger**. Statically exported and deployed to GitHub Pages via GitHub Actions.

</div>

> **🌐 Live Site**: <https://bcastelino.github.io>

---

## ✨ Highlights

- **Single-page story scroll** - every section pins, and the next one flips in over it via GSAP `ScrollTrigger` (rotation pivot at the bottom-left). Honors `prefers-reduced-motion` and is auto-disabled on touch/small screens to avoid pin jank.
- **Fully responsive** - fluid `clamp()` typography for the hero, breakpoint-aware grids in every section, explicit `viewport` meta, and a global `overflow-x: hidden` safety net for mobile / tablet / desktop.
- **Always-home navigation** - refresh disables `history.scrollRestoration` and clears any stray hash, so the page always lands at the Hero. The `Br` signature and `HOME` menu item both force a smooth scroll to the top, even when already at `#home`.
- **Theme-aware lime accent** - bright `#C3E41D` in dark mode, darker olive `#5C7C12` in light mode for accessible contrast on white. Driven by CSS variables (`--accent` / `--accent-fg`).
- **Hero with blur-in animation + mouse parallax** - `BRIAN` / `CASTELINO` rendered in Fira Code with a per-letter blur-reveal (`BlurText`), a circular profile overlay, and a subtle cursor-driven parallax (text drifts opposite the mouse, centered on the viewport).
- **Interactive hover buttons** - reusable `InteractiveHoverButton` with an expanding-dot fill, slide-in action label, and an idle → loading → success lifecycle. Used for the contact form submit (driven by Formspree state) and the résumé download CTA.
- **Auto GitHub social previews** - each project card pulls its preview straight from `opengraph.githubassets.com` based on the `owner/repo` it points to. Falls back to a placeholder on error.
- **Real certifications** - badge PNGs in `public/badges/` and PDF artifacts in `public/certificates/`, mapped through a single data array.
- **Formspree-backed contact form** with success/error animations.
- **Static export** for GitHub Pages, with a Pages workflow that **skips deploys when only docs/tooling files change**.

---

## 🛠️ Tech Stack

| Concern              | Choice                                                  |
| -------------------- | ------------------------------------------------------- |
| Framework            | [Next.js 14](https://nextjs.org/) (App Router)          |
| Language             | [TypeScript](https://www.typescriptlang.org/)           |
| Styling              | [Tailwind CSS](https://tailwindcss.com/) + CSS vars     |
| Reveal animations    | [Framer Motion](https://www.framer.com/motion/)         |
| Scroll choreography  | [GSAP](https://gsap.com/) + ScrollTrigger + `@gsap/react` |
| Icons                | [lucide-react](https://lucide.dev/)                     |
| Contact form         | [@formspree/react](https://formspree.io/)               |
| Fonts                | `next/font/google` - Inter + Fira Code                  |
| Hosting              | GitHub Pages (static export)                            |
| CI/CD                | GitHub Actions                                          |

---

## 📁 Project Structure

```
bcastelino.github.io/
├── .github/workflows/
│   └── main.yml                  # Pages deploy; ignores docs/tooling changes
├── app/
│   ├── layout.tsx                # Root layout, fonts, inline theme bootstrap
│   ├── page.tsx                  # Single page → composes Header + FlowArt + Footer
│   ├── globals.css               # CSS vars, theme tokens, scrollbar, animations
│   ├── lib/
│   │   └── data.ts               # All content: personal, projects, experience,
│   │                             # education, certifications, skills, nav
│   └── components/
│       ├── Header.tsx            # Fixed nav: menu (HOME = scroll-to-top), signature, theme toggle
│       ├── Hero.tsx              # BRIAN / CASTELINO hero + mouse parallax (FlowSection)
│       ├── BlurText.tsx          # Per-letter / per-word blur-reveal animation
│       ├── FlowArt.tsx           # GSAP story-scroll: pin + rotate-in (off on mobile)
│       ├── Section.tsx           # Shared section shell (FlowSection wrapper)
│       ├── InteractiveHoverButton.tsx  # Dot-fill CTA with idle/loading/success states
│       ├── Footer.tsx
│       └── sections/
│           ├── About.tsx
│           ├── Projects.tsx      # GitHub OG previews + onError fallback
│           ├── Experience.tsx    # Timeline
│           ├── Education.tsx
│           ├── Certifications.tsx# Badge PNG → PDF link
│           └── Contact.tsx       # Formspree form + résumé button
├── public/
│   ├── personal/                 # Profile photo
│   ├── projects/                 # Optional project screenshots / placeholder
│   ├── badges/                   # Certification badge PNGs
│   ├── certificates/             # Issued PDF certificates
│   └── logos/                    # Company / school logos
├── next.config.js                # output: 'export', trailingSlash, unoptimized images
├── tailwind.config.js            # accent color, font variables, class dark mode
├── postcss.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🧭 How a visitor experiences the site

1. **Theme + scroll position are set before paint** - an inline script in `app/layout.tsx` reads `localStorage.theme` (or defaults to dark), toggles `.dark` on `<html>` to avoid a flash, sets `history.scrollRestoration = 'manual'`, and clears any non-`#home` hash so a refresh always lands on the Hero.
2. **Hero** appears first - `BlurText` letters fade and de-blur in sequence over Fira Code; the circular profile image overlays the name; a tagline below uses the same effect at the word level; on pointer devices the name follows the cursor with a subtle inverse parallax.
3. **Story scroll begins** - as you scroll past the hero on desktop/tablet (≥ 768 px), the About section pins at its bottom and the Projects section flips in over it from `rotation: 30deg` to `0deg` (origin: bottom-left). Each subsequent section does the same. On mobile the choreography is disabled and sections simply stack.
4. **Each section's content** uses Framer Motion `whileInView` for its internal cards/timeline items so the reveals stay snappy.
5. **Contact form** posts to Formspree; the `InteractiveHoverButton` submit reflects `idle → loading → success` directly from Formspree state.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or later
- **npm**

### Local development

```bash
git clone https://github.com/bcastelino/bcastelino.github.io.git
cd bcastelino.github.io
npm install
npm run dev
```

Open <http://localhost:3000> - hot reload is enabled.

### Production build

```bash
npm run build      # outputs static export to ./out
```

> Don't run `npm run build` while `npm run dev` is active - both write to `.next/` and will conflict. Stop the dev server first, or use a separate clone.

### Available scripts

| Command         | Purpose                                              |
| --------------- | ---------------------------------------------------- |
| `npm run dev`   | Start dev server with HMR on <http://localhost:3000> |
| `npm run build` | Static export → `./out` for GitHub Pages             |
| `npm run start` | Serve the production build locally                   |
| `npm run lint`  | Run `next lint`                                      |

---

## 🎨 Customising the site

All content lives in **`app/lib/data.ts`** - there is no CMS. Edit the arrays and objects and the site updates automatically.

| What you want to change         | Where to edit                                                         |
| ------------------------------- | --------------------------------------------------------------------- |
| Name, tagline, socials, email   | `personal` object in `app/lib/data.ts`                                |
| About copy + interests          | `aboutIntro` string + `interests` array                               |
| Skills grouped by category      | `skillGroups` array                                                   |
| Projects                        | `projects` array - set `repo: "owner/name"` for auto OG               |
| Experience timeline             | `experience` array                                                    |
| Education cards                 | `education` array                                                     |
| Certifications                  | `certifications` array - `badge` PNG + `pdf` path                     |
| Nav menu labels / order         | `navItems` array                                                      |
| Theme colors                    | `:root` and `.dark` CSS variables in `app/globals.css`                |
| Hero size / font                | `NAME_SIZE_CLASSES` (`clamp()`) in `app/components/Hero.tsx`          |
| Hero parallax intensity         | `max` constant in the mousemove handler in `Hero.tsx`                 |
| Education summary + coursework  | `summary` (paragraph) + `description` (pills) on each `EducationItem` |
| CTA button look + states        | `app/components/InteractiveHoverButton.tsx`                           |
| Section animations              | Framer Motion props inside each section component                     |
| Scroll choreography             | Tweens / triggers in `app/components/FlowArt.tsx`                     |

### Assets

| Folder                | Drop in                                                    |
| --------------------- | ---------------------------------------------------------- |
| `public/personal/`    | Profile photo (`profile.jpg`)                              |
| `public/badges/`      | Square certification badge PNGs                            |
| `public/certificates/`| Issued certificate PDFs                                    |
| `public/logos/`       | Company / school logos                                     |
| `public/projects/`    | Manual project screenshots (used when `repo` is unset, or as the fallback if the OG fetch fails) |

### Contact form

The form posts to Formspree. Update the form ID in `app/components/sections/Contact.tsx`:

```ts
const [state, handleSubmit] = useForm("YOUR_FORMSPREE_ID");
```

### Resume link

Set `personal.resumePath` in `app/lib/data.ts` - can be a local PDF under `public/` or any external URL (the current site uses a Google Drive link).

---

## 🧩 Notable implementation details

- **`FlowArt` (`app/components/FlowArt.tsx`)** - finds every `[data-flow-section]` descendant and, for each, pins it at `bottom bottom → bottom top` and tweens the next one's inner from `rotation: 30deg` to `0deg` between `top bottom` and `top 25%`. The hero is also a FlowSection so the first content section flips in over it. `prefers-reduced-motion` **or** a viewport ≤ 767 px disables the GSAP setup entirely.
- **`BlurText` (`app/components/BlurText.tsx`)** - IntersectionObserver-driven; once the element enters the viewport each letter/word transitions from `blur(10px) translateY(-20px) opacity:0` to `blur(0) translateY(0) opacity:1` with a configurable per-segment delay.
- **Hero parallax (`app/components/Hero.tsx`)** - a `mousemove` handler (rAF-throttled) normalises the cursor position to ±1 around the viewport center and applies `translate3d(-nx*max%, -ny*max%, 0)` to the name wrapper. Negated, so the text drifts opposite the cursor; capped at ±4% so it stays subtle. Skipped on coarse pointers and when `prefers-reduced-motion` is set.
- **`InteractiveHoverButton` (`app/components/InteractiveHoverButton.tsx`)** - supports both `as="button"` (with optional external `status` override) and `as="a"`. The resting dot uses `scale-[120]` on hover so the accent fill comfortably covers full-width buttons; the action label slides in from the left with `translate-x` + `opacity`. No `clsx` / `tailwind-merge` dependency.
- **Always-home navigation** - the boot script in `<head>` sets `history.scrollRestoration = 'manual'` and strips non-`#home` hashes on load. The `Br` signature and the `HOME` menu item both `preventDefault` and call `window.scrollTo({ top: 0, behavior: 'smooth' })`, which works even when already at `#home` (where browsers normally no-op).
- **Project previews** - `githubSocialImage("owner/repo")` returns `https://opengraph.githubassets.com/1/owner/repo`. The image lives inside a small client component (`ProjectPreview`) so its `onError` handler can swap to `/projects/project-placeholder.jpg` if the OG endpoint 4xx's (e.g. private repos).
- **Theme toggle** - a small inline script in `<head>` applies the saved theme **before paint**, then the `Header` button flips the `.dark` class on `<html>` and persists to `localStorage`.

---

## 🔧 Configuration files

- **`next.config.js`** - `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true` (required for static hosting on GitHub Pages).
- **`tailwind.config.js`** - `darkMode: 'class'`, `accent` color, Inter / Fira Code font variable mappings.
- **`postcss.config.js`** - Tailwind + autoprefixer.
- **`tsconfig.json`** - Next.js defaults, `strict: false` to allow incremental adoption.
- **`.github/workflows/main.yml`** - GitHub Actions Pages deployment with `paths-ignore` for docs/tooling.
- **`public/.nojekyll`** - disables Jekyll on GitHub Pages so files starting with `_` are served.

---

## 📊 Deployment

- **Status** - see the [Actions tab](https://github.com/bcastelino/bcastelino.github.io/actions)
- **Live** - <https://bcastelino.github.io>
- **Build badge** - ![Deploy Status](https://github.com/bcastelino/bcastelino.github.io/actions/workflows/main.yml/badge.svg)

---

## 📄 License

Open source under the [MIT License](LICENSE).

---

## 🐱‍👤 Author

<table>
   <tr>
      <td>
         <img src="https://raw.githubusercontent.com/bcastelino/bcastelino.github.io/refs/heads/main/public/personal/profile.jpg" alt="Brian Denis Castelino" style="border-radius: 50%; width: 180px; height: 180px; object-fit: cover; border: 4px solid #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      </td>
      <td>
         <h1>Brian Denis Castelino</h1>
         <p><strong>AI Data Engineer · Data Analytics · GenAI</strong></p>
         <p>I turn vague ideas into clean, working systems - because someone's got to 🤖</p>
         <p>
            <a href="https://github.com/bcastelino" target="_blank">GitHub</a> ·
            <a href="https://linkedin.com/in/cas7elino" target="_blank">LinkedIn</a> ·
            <a href="https://twitter.com/cas7elino" target="_blank">Twitter / X</a> ·
            <a href="mailto:briancastelino07@gmail.com">Email</a>
         </p>
      </td>
   </tr>
</table>

---

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, Framer Motion, and GSAP.
