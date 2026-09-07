import type { CollectionEntry } from "astro:content";

/**
 * Whether a draft entry should be rendered.
 *
 * Drafts are excluded from production builds, which is what keeps the two
 * fixture posts — the Markdown kitchen sink and the component gallery — out of
 * the index, the sitemap and the feed. They still need to be reachable while
 * working on the prose layer, though; a fixture nobody can open is a fixture
 * nobody checks. So `npm run dev` builds them and `npm run build` does not.
 */
export const showDrafts = import.meta.env.DEV;

/** Filters a writing collection down to the entries a given locale should show. */
export function publishedPosts(
  posts: CollectionEntry<"writing">[],
  locale: "en" | "pt",
): CollectionEntry<"writing">[] {
  return posts
    .filter((post) => post.data.locale === locale)
    .filter((post) => showDrafts || post.data.draft !== true)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
