import { type CollectionEntry, getCollection } from "astro:content";
import type { APIRoute } from "astro";

import ptProse from "../../../i18n/prose/pt.ts";
import { postAlternates, routablePosts } from "../../../utils/content.ts";
import { markdownResponse } from "../../../utils/markdown/page.ts";

/**
 * `/pt/writing/<slug>.md`. Paths come from `routablePosts`, the same list the HTML
 * pages are generated from, so a draft never has a Markdown twin its page does
 * not also have.
 */
export async function getStaticPaths() {
  const posts = await getCollection("writing");

  return routablePosts(posts, "pt").map((post) => ({
    params: { slug: post.data.slug },
    props: { post, alternates: postAlternates(posts, post) },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { post, alternates } = props as {
    post: CollectionEntry<"writing">;
    alternates: ReturnType<typeof postAlternates>;
  };

  return markdownResponse(
    {
      title: post.data.title,
      description: post.data.description,
      path: `/pt/writing/${post.data.slug}`,
      locale: "pt",
      date: post.data.date,
      alternates,
    },
    post.body ?? "",
    ptProse,
  );
};
