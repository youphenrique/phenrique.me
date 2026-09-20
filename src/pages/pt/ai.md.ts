import { getEntry } from "astro:content";
import type { APIRoute } from "astro";

import ptProse from "../../i18n/prose/pt.ts";
import { pathAlternates } from "../../utils/i18n-routes.ts";
import { markdownResponse } from "../../utils/markdown/page.ts";

export const GET: APIRoute = async () => {
  const entry = await getEntry("aiPages", "pt");

  if (entry === undefined) return new Response("Not found", { status: 404 });

  return markdownResponse(
    {
      title: entry.data.title,
      description: entry.data.description,
      path: "/pt/ai",
      locale: "pt",
      alternates: pathAlternates("/pt/ai"),
    },
    entry.body ?? "",
    ptProse,
  );
};
