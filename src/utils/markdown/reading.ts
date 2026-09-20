import type { CollectionEntry } from "astro:content";

import type { ReadingDictionary } from "../../i18n/reading/types.ts";
import type { Locale } from "../i18n-routes.ts";

/**
 * Composes `/reading` as Markdown.
 *
 * Two sections, in the page's order and under the page's own headings: what is
 * being read now, with the progress and summary the preview card shows, then
 * the finished list newest first. Covers are dropped — an `alt` string
 * describing a book jacket is chrome, not content — and so is the empty state,
 * which is replaced by a plain sentence when there is nothing to list.
 */

interface ReadingSources {
  books: CollectionEntry<"books">[];
  dict: ReadingDictionary;
  locale: Locale;
}

/** `★★★★☆`, the same five-slot scale the finished list renders as icons. */
function stars(rating: number): string {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));

  return `${"★".repeat(filled)}${"☆".repeat(5 - filled)} (${filled}/5)`;
}

function metaLine(parts: (string | undefined)[]): string {
  return parts.filter((part) => part !== undefined && part !== "").join(" · ");
}

export function renderReadingBody({ books, dict, locale }: ReadingSources): string {
  // Authored as plain YAML days and parsed as UTC midnight; see the view.
  const day = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  const reading = books.filter((book) => book.data.status === "reading");

  const finished = books
    .filter((book) => book.data.status === "finished")
    .sort((a, b) => (b.data.finished_date?.getTime() ?? 0) - (a.data.finished_date?.getTime() ?? 0));

  const current =
    reading.length === 0
      ? dict["currently-reads"]["no-reads"].description
      : reading
          .map((book) => {
            const { title, authors, genres, progress, last_update, description } = book.data;
            const updated = last_update === null ? undefined : `${dict["currently-reads"]["last-update"]} ${day.format(last_update)}`;
            const meta = metaLine([authors.join(", "), genres.join(", "), `${progress}%`, updated]);
            const summary = description === null ? "" : `\n\n${description.trim()}`;

            return `### ${title}\n\n${meta}${summary}`;
          })
          .join("\n\n");

  const more = finished
    .map((book) => `- **${book.data.title}** — ${metaLine([book.data.authors.join(", "), stars(book.data.rating)])}`)
    .join("\n");

  return [
    `## ${dict["currently-reads"]["section-title"]}\n\n${current}`,
    `## ${dict["more-reads"]}\n\n${more}`,
  ].join("\n\n");
}
