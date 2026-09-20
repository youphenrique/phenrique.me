import { getCollection, getEntry } from "astro:content";
import type { APIRoute } from "astro";

import ptProse from "../../i18n/prose/pt.ts";
import dict from "../../i18n/reading/pt.ts";
import { pathAlternates } from "../../utils/i18n-routes.ts";
import { markdownResponse } from "../../utils/markdown/page.ts";
import { renderReadingBody } from "../../utils/markdown/reading.ts";

export const GET: APIRoute = async () => {
  const page = await getEntry("readingPages", "pt");

  if (page === undefined) return new Response("Not found", { status: 404 });

  const books = await getCollection("books");

  return markdownResponse(
    {
      title: page.data.metadata.title,
      heading: dict["page-title"],
      description: page.data.metadata.description,
      path: "/pt/reading",
      locale: "pt",
      alternates: pathAlternates("/pt/reading"),
    },
    renderReadingBody({ books, dict, locale: "pt" }),
    ptProse,
  );
};
