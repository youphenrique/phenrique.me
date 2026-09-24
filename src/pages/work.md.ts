import { getCollection, getEntry } from "astro:content";
import type { APIRoute } from "astro";

import enProse from "../i18n/prose/en.ts";
import dict from "../i18n/work/en.ts";
import { pathAlternates } from "../utils/i18n-routes.ts";
import { markdownResponse } from "../utils/markdown/page.ts";
import { renderWorkBody } from "../utils/markdown/work.ts";

export const GET: APIRoute = async () => {
  const page = await getEntry("work", "en");

  if (page === undefined) return new Response("Not found", { status: 404 });

  const experience = (
    await getCollection(
      "workExperience",
      (entry) => entry.id.startsWith("en/") || !entry.id.includes("/"),
    )
  ).sort((a, b) => b.data.dateStart.valueOf() - a.data.dateStart.valueOf());

  const projects = (await getCollection("projects"))
    .filter((project) => !project.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return markdownResponse(
    {
      title: page.data.metadata.title,
      heading: dict["page-title"],
      description: page.data.metadata.description,
      path: "/work",
      locale: "en",
      alternates: pathAlternates("/work"),
    },
    renderWorkBody({ page, experience, projects, dict, locale: "en" }),
    enProse,
  );
};
