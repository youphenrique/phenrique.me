import { LOCALES, localizedPath, type Alternates } from "./i18n-routes.ts";
import type { CollectionEntry } from "astro:content";

function postsForLocale(
  posts: CollectionEntry<"writing">[],
  locale: "en" | "pt",
): CollectionEntry<"writing">[] {
  return posts
    .filter((post) => post.data.locale === locale)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** All posts are public; draft status is displayed to readers. */
export function listedPosts(
  posts: CollectionEntry<"writing">[],
  locale: "en" | "pt",
): CollectionEntry<"writing">[] {
  return postsForLocale(posts, locale);
}

/** Every post in the index has a generated page. */
export function routablePosts(
  posts: CollectionEntry<"writing">[],
  locale: "en" | "pt",
): CollectionEntry<"writing">[] {
  return postsForLocale(posts, locale);
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
 * Only translations that have a corresponding entry are included.
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
