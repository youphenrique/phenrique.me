import { localizedPath, stripLocale } from "../i18n-routes.ts";

/**
 * Which pages have a `.md` twin, and where it lives.
 *
 * One answer for two callers that must not disagree: the `rel="alternate"`
 * link in `head.astro`, which is how an agent discovers the Markdown from the
 * HTML, and `/llms.txt`, which is how it discovers it without the HTML.
 *
 * Listed rather than derived, for the same reason as `TRANSLATED_PATHS`: the
 * file tree is the only other source of truth and it is not readable at
 * runtime. Adding an endpoint means adding it here, or the page ships a
 * Markdown version nothing links to.
 */
const MARKDOWN_PATHS = new Set(["/about", "/work", "/reading", "/ai", "/colophon"]);

/** Every article has one; the index at `/writing` is a listing, not a document. */
function isArticle(path: string): boolean {
  return path.startsWith("/writing/");
}

/** The `.md` address of a page, or `undefined` when it has none. */
export function markdownPath(pathname: string): string | undefined {
  const { locale, path } = stripLocale(pathname);

  if (!MARKDOWN_PATHS.has(path) && !isArticle(path)) return undefined;

  return `${localizedPath(path, locale)}.md`;
}
