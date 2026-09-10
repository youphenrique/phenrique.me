import type { Toc, TocLink } from "comark/plugins/toc";

/**
 * One row of a table of contents: flat, in document order.
 *
 * `comark/plugins/toc` nests each `h3` under its `h2`. Both renderers here — the
 * desktop rail and the mobile sheet — draw one row per heading and only need the
 * level to indent it, so the tree is flattened once at build time.
 */
export interface TocEntry {
  id: string;
  text: string;
  /** Heading level: `2` or `3`. */
  depth: number;
}

/** Below this, a page is short enough that a table of contents is noise. */
export const TOC_MIN_ENTRIES = 3;

export function flattenToc(toc: Toc | undefined): TocEntry[] {
  const entries: TocEntry[] = [];

  const visit = (links: TocLink[]) => {
    for (const link of links) {
      if (link.id !== "") entries.push({ id: link.id, text: link.text.trim(), depth: link.depth });
      if (link.children !== undefined) visit(link.children);
    }
  };

  visit(toc?.links ?? []);
  return entries;
}

export interface ReadingPosition {
  /** The section being read: the last heading to cross the reading line. */
  activeId: string | null;
  /** How far through the article body the reader is, from 0 to 1. */
  progress: number;
  /** Whether the article fills the reading zone — false above its first line and once the footer arrives. */
  inArticle: boolean;
}

/**
 * Reports which section the reader is in as the page scrolls.
 *
 * Measured with `getBoundingClientRect` on a frame-throttled scroll listener
 * rather than an IntersectionObserver: a page holds a handful of headings, and
 * "the last heading above a line" is a question about order, which an observer
 * only answers by reconstructing it from enter and leave events.
 *
 * The reading line sits 120px down (a third of a short viewport). That clears
 * the 5rem `scroll-margin-top` a jumped-to heading lands at, so following a link
 * activates the section it points to — and stays short of a subheading that
 * follows its heading closely, which a line further down would pick instead.
 *
 * @returns A function that removes the listeners.
 */
export function trackReadingPosition(ids: string[], onChange: (position: ReadingPosition) => void): () => void {
  const headings = ids.map((id) => document.getElementById(id)).filter((heading) => heading !== null);
  const article = headings[0]?.parentElement;
  if (article === undefined || article === null) return () => undefined;

  let frame = 0;
  let lastReported = "";

  const measure = () => {
    frame = 0;
    const viewport = window.innerHeight;
    const line = Math.min(viewport / 3, 120);
    // A final section too short to reach the line would never activate, so at
    // the bottom of the page the last heading on screen wins instead.
    const atBottom = window.scrollY + viewport >= document.documentElement.scrollHeight - 2;

    let activeId: string | null = null;
    for (const heading of headings) {
      const top = heading.getBoundingClientRect().top;
      if (top > (atBottom ? viewport : line)) break;
      activeId = heading.id;
    }

    const rect = article.getBoundingClientRect();
    const span = rect.height - viewport + line;
    const progress = span <= 0 ? 1 : Math.min(Math.max((line - rect.top) / span, 0), 1);
    const inArticle = rect.top < line && rect.bottom > viewport * 0.6;

    const key = `${activeId}|${progress.toFixed(3)}|${inArticle}`;
    if (key === lastReported) return;
    lastReported = key;
    onChange({ activeId, progress, inArticle });
  };

  const schedule = () => {
    if (frame === 0) frame = requestAnimationFrame(measure);
  };

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  measure();

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  };
}
