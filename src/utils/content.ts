import { LOCALES, localizedPath, type Alternates } from "./i18n-routes.ts";
import type { CollectionEntry } from "astro:content";

/**
 * Whether a draft entry should be rendered.
 *
 * Drafts are excluded from production builds, which keeps them out of the
 * index, the sitemap and the feed. They still need to be reachable while being
 * written, though; a draft nobody can open is a draft nobody checks. So
 * `npm run dev` builds them and `npm run build` does not.
 */
export const showDrafts = import.meta.env.DEV;

function postsForLocale(
  posts: CollectionEntry<"writing">[],
  locale: "en" | "pt",
): CollectionEntry<"writing">[] {
  return posts
    .filter((post) => post.data.locale === locale)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Posts that belong on the public writing index. Drafts are never listed. */
export function listedPosts(
  posts: CollectionEntry<"writing">[],
  locale: "en" | "pt",
): CollectionEntry<"writing">[] {
  return postsForLocale(posts, locale).filter((post) => post.data.draft !== true);
}

/** Posts with generated pages. Draft URLs remain directly previewable in dev. */
export function routablePosts(
  posts: CollectionEntry<"writing">[],
  locale: "en" | "pt",
): CollectionEntry<"writing">[] {
  return postsForLocale(posts, locale).filter((post) => showDrafts || post.data.draft !== true);
}

/**
 * Where a post lives in each locale.
 *
 * Articles are the one page type whose address is translated too — the
 * Portuguese counterpart of `/writing/interfaces-are-arguments` is
 * `/pt/writing/interfaces-sao-argumentos`, not the same slug under a prefix —
 * so the pair cannot be derived from the URL and is declared in frontmatter
 * instead, via a `translationKey` both files share.
 *
 * Only posts that actually have a page are included: a translation that is
 * still a draft is not a page a crawler or a reader can reach, and pointing
 * `hreflang` at a URL that 404s is worse than omitting it.
 */
export function postAlternates(
  posts: CollectionEntry<"writing">[],
  post: CollectionEntry<"writing">,
): Alternates {
  const self = { [post.data.locale]: localizedPath(`/writing/${post.data.slug}`, post.data.locale) };
  const key = post.data.translationKey;

  if (key === undefined) return self;

  const entries = LOCALES.flatMap((locale) => {
    const match = routablePosts(posts, locale).find((p) => p.data.translationKey === key);
    return match ? [[locale, localizedPath(`/writing/${match.data.slug}`, locale)] as const] : [];
  });

  return Object.fromEntries(entries);
}
