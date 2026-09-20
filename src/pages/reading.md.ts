import { getCollection, getEntry } from "astro:content";
import type { APIRoute } from "astro";

import enProse from "../i18n/prose/en.ts";
import dict from "../i18n/reading/en.ts";
import { pathAlternates } from "../utils/i18n-routes.ts";
import { markdownResponse } from "../utils/markdown/page.ts";
import { renderReadingBody } from "../utils/markdown/reading.ts";

export const GET: APIRoute = async () => {
  const page = await getEntry("readingPages", "en");

  if (page === undefined) return new Response("Not found", { status: 404 });

  const books = await getCollection("books");

  return markdownResponse(
    {
      title: page.data.metadata.title,
      heading: dict["page-title"],
      description: page.data.metadata.description,
      path: "/reading",
      locale: "en",
      alternates: pathAlternates("/reading"),
    },
    renderReadingBody({ books, dict, locale: "en" }),
    enProse,
  );
};
