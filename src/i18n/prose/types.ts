/**
 * Strings that belong to rendered Markdown rather than to any one page.
 *
 * These are consumed in two places that cannot reach an Astro dictionary on
 * their own: the Comark parse step (which injects the footnote section heading)
 * and the React components in the prose registry (which render static HTML at
 * build time, with no access to `Astro.currentLocale`). Both receive the
 * dictionary explicitly — see `parseContent` and `createProseComponents`.
 */
export interface ProseDictionary {
  /** Heading above the footnote list the parser appends to a document. */
  "footnotes-label": string;
  /** Accessible name for the scroll region wrapped around a wide table. */
  "table-label": string;
  /** Back-reference title on a footnote's return link. */
  "footnote-back": string;
  /** Default callout labels, overridable per block with `title`. */
  "callout-note": string;
  "callout-warning": string;
  "callout-insight": string;
  /** Label introducing an `::aside` block. */
  "aside-label": string;
}
