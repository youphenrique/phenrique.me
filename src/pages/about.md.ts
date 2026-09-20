import { getEntry } from "astro:content";
import type { APIRoute } from "astro";

import enProse from "../i18n/prose/en.ts";
import { pathAlternates } from "../utils/i18n-routes.ts";
import { markdownResponse } from "../utils/markdown/page.ts";

export const GET: APIRoute = async () => {
  const entry = await getEntry("aboutPages", "en");

  if (entry === undefined) return new Response("Not found", { status: 404 });

  return markdownResponse(
    {
      title: entry.data.title,
      description: entry.data.metadata.description,
      path: "/about",
      locale: "en",
      alternates: pathAlternates("/about"),
    },
    entry.body ?? "",
    enProse,
  );
};
