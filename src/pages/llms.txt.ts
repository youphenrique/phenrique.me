import { getCollection, getEntry } from "astro:content";
import type { APIRoute } from "astro";

import { FEED, SITE } from "../consts.ts";
import { listedPosts } from "../utils/content.ts";
import type { Locale } from "../utils/i18n-routes.ts";

/**
 * `/llms.txt` — the index an agent reads first.
 *
 * The convention (llmstxt.org) is a single Markdown file: an H1 naming the
 * site, a blockquote summarising it, then H2 sections of annotated links. The
 * links here point at the `.md` twins rather than the pages, so following one
 * costs no HTML parsing and yields the same words.
 *
 * Generated from the collections, so a new article appears here the moment it
 * has a page — an index that has to be remembered is an index that goes stale.
 */

function absolute(path: string): string {
  return new URL(path, import.meta.env.SITE).href;
}

interface Link {
  title: string;
  path: string;
  description: string;
}

function section(heading: string, links: Link[]): string {
  const lines = links.map((link) => `- [${link.title}](${absolute(`${link.path}.md`)}): ${link.description}`);

  return `## ${heading}\n\n${lines.join("\n")}`;
}

/** In the header's order, which is the order a reader meets these pages in. */
async function pagesFor(locale: Locale): Promise<Link[]> {
  const prefix = locale === "en" ? "" : `/${locale}`;
  const [about, work, reading, colophon] = await Promise.all([
    getEntry("aboutPages", locale),
    getEntry("work", locale),
    getEntry("readingPages", locale),
    getEntry("colophonPages", locale),
  ]);

  const links: Link[] = [];

  if (about !== undefined) {
    links.push({
      title: about.data.title,
      path: `${prefix}/about`,
      description: about.data.metadata.description,
    });
  }

  if (work !== undefined) {
    links.push({
      title: work.data.metadata.title,
      path: `${prefix}/work`,
      description: work.data.metadata.description,
    });
  }

  if (reading !== undefined) {
    links.push({
      title: reading.data.metadata.title,
      path: `${prefix}/reading`,
      description: reading.data.metadata.description,
    });
  }

  if (colophon !== undefined) {
    links.push({
      title: colophon.data.title,
      path: `${prefix}/colophon`,
      description: colophon.data.description,
    });
  }

  return links;
}

function articlesFor(posts: Awaited<ReturnType<typeof getCollection<"writing">>>, locale: Locale): Link[] {
  const prefix = locale === "en" ? "" : `/${locale}`;

  // Drafts are excluded: `listedPosts` is what the writing index shows, and an
  // agent should see the site the way a reader does.
  return listedPosts(posts, locale).map((post) => ({
    title: post.data.title,
    path: `${prefix}/writing/${post.data.slug}`,
    description: post.data.description,
  }));
}

export const GET: APIRoute = async () => {
  const posts = await getCollection("writing");

  const sections = [
    section("Pages", await pagesFor("en")),
    section("Writing", articlesFor(posts, "en")),
    section("Português", [...(await pagesFor("pt")), ...articlesFor(posts, "pt")]),
    // Not a `.md` twin of a page, so it is listed by its own address.
    `## Reference\n\n- [Design system](${absolute("/design.md")}): The colour, type and prose system this site is built on.`,
  ];

  const document = `# ${SITE.NAME}\n\n> ${FEED.DESCRIPTION}\n\n${sections.join("\n\n")}\n`;

  return new Response(document, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
};
