/**
 * The two kinds of post in the `writing` collection, and the index pages that
 * filter on them.
 *
 * Kept free of `astro:content` imports so `content.config.ts` can read the
 * enum from here without importing the collection it defines.
 */

export const WRITING_KINDS = ["article", "note"] as const;

export type WritingKind = (typeof WRITING_KINDS)[number];

/**
 * The index page for each kind, as a segment under `/writing`. These are
 * static pages beside `[...slug].astro`, so they outrank any post with the
 * same slug — `assertSlugIsFree` makes that a build error instead of a post
 * that silently never renders.
 */
export const KIND_SEGMENTS: Record<WritingKind, string> = {
  article: "articles",
  note: "notes",
};

const RESERVED = new Set(Object.values(KIND_SEGMENTS));

export function assertSlugIsFree(slug: string): void {
  if (RESERVED.has(slug)) {
    throw new Error(`A post's slug "${slug}" collides with the /writing/${slug} index page. Rename the post's slug.`);
  }
}
