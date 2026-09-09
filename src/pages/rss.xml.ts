import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { HOME } from "../consts";

interface Context {
  site: string;
}

export async function GET(context: Context) {
  // Writing only. Projects are a collection without a route of their own — they
  // are rendered inline on /work — so feeding them here would emit item links
  // to pages that do not exist.
  const items = (await getCollection("writing"))
    .filter((post) => post.data.locale === "en" && !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: HOME.TITLE,
    description: HOME.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.date,
      link: `/${item.collection}/${item.id}/`,
    })),
  });
}
