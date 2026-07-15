/**
 * Shared, deep-link-aware scrolling for the story-scroll page.
 *
 * The page uses GSAP ScrollTrigger pinning (`pinSpacing: false`) on desktop, so
 * live `getBoundingClientRect` values are corrupted by rotation transforms and
 * `position: fixed` pins — a naive `scrollIntoView()` / native hash jump lands
 * at the wrong offset. Instead, `scrollToSection` jumps to the section's
 * natural stacked offset (sum of preceding sections' intrinsic `offsetHeight`),
 * which is transform/pin-independent and therefore deterministic. The jump is
 * always instant (no smooth animation) by design.
 *
 * Scroll position is written through GSAP's scroll function
 * (`ScrollTrigger.getScrollFunc`) whenever GSAP is driving the page, so we stay
 * in its coordinate space (and remain correct if a smooth-scroll wrapper such
 * as ScrollSmoother is added later). We fall back to the native `window` scroll
 * on mobile / reduced-motion where GSAP is disabled.
 */
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ScrollFunc = (value?: number) => number;

/**
 * GSAP's getter/setter for the window scroll position, but only while
 * ScrollTrigger is actively driving the page (desktop path). Returns null on
 * mobile / reduced-motion so callers use the native scroll instead.
 */
function gsapScrollFunc(): ScrollFunc | null {
  try {
    if (ScrollTrigger.getAll().length > 0) {
      return ScrollTrigger.getScrollFunc(window) as ScrollFunc;
    }
  } catch {
    /* no-op */
  }
  return null;
}

/** Jump instantly to `top`, via GSAP's scroller when active, else native. */
function setScroll(top: number): void {
  const target = Math.max(0, Math.round(top));
  const fn = gsapScrollFunc();
  if (fn) {
    fn(target);
    return;
  }
  window.scrollTo({ top: target, behavior: "auto" });
}

export const SECTION_IDS = [
  "home",
  "about",
  "projects",
  "experience",
  "education",
  "certifications",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/** Normalise a raw hash (`"#contact"`, `"contact"`, `""`) to a section id. */
export function hashToId(hash: string | null | undefined): string {
  return (hash ?? "").replace(/^#/, "").trim();
}

/** True when `hash` points at one of the known page sections. */
export function isSectionHash(hash: string | null | undefined): boolean {
  const id = hashToId(hash);
  return (SECTION_IDS as readonly string[]).includes(id);
}

/** Height of the fixed header, used so a target section clears it. */
function headerOffset(): number {
  if (typeof document === "undefined") return 0;
  const header = document.querySelector("header");
  return header ? Math.round(header.getBoundingClientRect().height) : 0;
}

/** Cancel handle for the navigation (goToSection) currently in flight, if any. */
let activeNavCancel: (() => void) | null = null;

/**
 * The section's natural document offset — the scroll position at which its top
 * would sit at the very top of the viewport if nothing were pinned.
 *
 * We sum the intrinsic `offsetHeight` of every preceding flow section rather
 * than reading `getBoundingClientRect`, because on desktop GSAP applies
 * rotation transforms and pins sections with `position: fixed`
 * (`pinSpacing: false`), both of which corrupt live rects. `offsetHeight` is
 * the untransformed layout height, so this recovers the true stacked offset
 * regardless of the current pin/scroll state — making the jump deterministic.
 */
function naturalOffsetTop(target: HTMLElement): number {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>("[data-flow-section]")
  );
  let top = 0;
  for (const section of sections) {
    if (section === target) break;
    top += section.offsetHeight;
  }
  return top;
}

/**
 * Instantly scroll the given section to just below the fixed header.
 *
 * `home` (or an empty id) scrolls to the very top. Otherwise we jump straight
 * to `naturalOffsetTop - headerHeight`: because the page pins with
 * `pinSpacing: false`, the document's scroll length equals the natural stacked
 * length, so this lands the (higher-z-index) target section flush under the
 * header, covering the pinned section beneath it.
 */
export function scrollToSection(id: string): void {
  if (typeof window === "undefined") return;

  if (id === "" || id === "home") {
    setScroll(0);
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  setScroll(naturalOffsetTop(el) - headerOffset());
}

/**
 * Robustly navigate to `id` — used for both deep-links (page load) and in-page
 * nav clicks.
 *
 * A single `scrollToSection` pass can land early: section heights (and thus
 * the natural offsets it sums) are still settling as fonts/images load and
 * GSAP refreshes. We therefore re-assert the deterministic jump a handful of
 * times over the first second, and cancel immediately if the user scrolls or
 * presses a navigation key so we never fight their input.
 *
 * Returns a `cancel` function.
 */
export function goToSection(id: string): () => void {
  if (typeof window === "undefined") return () => {};

  // Cancel any navigation still in flight so rapid clicks / a new deep-link
  // don't fight each other.
  activeNavCancel?.();

  let cancelled = false;
  const timers: number[] = [];
  let observer: ResizeObserver | undefined;

  const cancel = () => {
    if (cancelled) return;
    cancelled = true;
    if (activeNavCancel === cancel) activeNavCancel = null;
    timers.forEach((t) => window.clearTimeout(t));
    observer?.disconnect();
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("keydown", onKey);
  };
  activeNavCancel = cancel;

  const assert = () => {
    if (!cancelled) scrollToSection(id);
  };

  const onKey = (e: KeyboardEvent) => {
    const navKeys = [
      "ArrowDown",
      "ArrowUp",
      "PageDown",
      "PageUp",
      "Home",
      "End",
      " ",
      "Spacebar",
    ];
    if (navKeys.includes(e.key)) cancel();
  };

  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("keydown", onKey);

  // Re-assert while the layout is still settling. The Hero's badge marquee (and
  // late fonts/images) can change section heights up to ~1s after load, which
  // shifts the natural offsets scrollToSection sums — a ResizeObserver on the
  // document catches those shifts and re-lands us without fighting the user.
  if (typeof ResizeObserver !== "undefined" && document.body) {
    observer = new ResizeObserver(() => assert());
    observer.observe(document.body);
  }

  [0, 60, 150, 300, 500, 800, 1200, 1800].forEach((delay) => {
    timers.push(window.setTimeout(assert, delay));
  });
  // Stop observing once things have almost certainly settled.
  timers.push(window.setTimeout(() => observer?.disconnect(), 2500));
  timers.push(window.setTimeout(cancel, 2600));

  return cancel;
}

/**
 * Update the URL hash without triggering the browser's native (inaccurate)
 * jump. Guarded so we only touch history once Next.js's App Router state is
 * present — otherwise Next's popstate handler crashes reading its internal
 * tree off a null state.
 */
export function setHash(hash: string): void {
  if (typeof window === "undefined") return;
  try {
    if (history.replaceState && history.state) {
      history.replaceState(history.state, "", hash);
    }
  } catch {
    /* no-op */
  }
}
