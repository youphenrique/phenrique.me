import type { CollectionEntry } from "astro:content";

import type { WorkDictionary } from "../../i18n/work/types.ts";
import type { Locale } from "../i18n-routes.ts";

/**
 * Composes `/work` as Markdown.
 *
 * The page is the one place on the site where the content is mostly *not*
 * prose: highlights, a stack table, roles and education are structured fields
 * that `view.astro` turns into cards and grids. A conversion from the rendered
 * HTML would flatten all of it into anonymous paragraphs, so the document is
 * composed from the same entry and the same dictionary the view reads — the
 * section order below is the page's order, for the same editorial reasons.
 *
 * The introduction is spliced in as raw Markdown: it is the one part of the
 * page that reads as writing, and `markdownResponse` flattens its `::callout`
 * blocks along with everything else in a single pass.
 */

interface WorkSources {
  page: CollectionEntry<"work">;
  experience: CollectionEntry<"workExperience">[];
  projects: CollectionEntry<"projects">[];
  dict: WorkDictionary;
  locale: Locale;
}

/** Joins the parts of a metadata line the way the cards read them out. */
function metaLine(parts: (string | undefined)[]): string {
  return parts.filter((part) => part !== undefined && part !== "").join(" · ");
}

function section(heading: string, body: string): string {
  return `## ${heading}\n\n${body}`;
}

export function renderWorkBody({ page, experience, projects, dict, locale }: WorkSources): string {
  // Dates are authored as plain YAML days and parsed as UTC midnight; formatting
  // in the build machine's zone would render the previous month west of
  // Greenwich. Same formatter as the view, so the two never disagree.
  const month = new Intl.DateTimeFormat(locale, { month: "short", year: "numeric", timeZone: "UTC" });

  const range = (start: Date, end: Date | null): string =>
    `${month.format(start)} — ${end === null ? dict.present : month.format(end)}`;

  const sections: string[] = [
    page.body ?? "",
    `[${dict["resume-cta"]}](${page.data.resumeURL})`,
    section(
      dict.sections.highlights,
      page.data.highlights.map((h) => `- **${h.title}** — ${h.description}`).join("\n"),
    ),
  ];

  if (projects.length > 0) {
    sections.push(
      section(
        dict.sections.projects,
        projects
          .map((project) => {
            const href = project.data.repoURL ?? project.data.demoURL;
            const name = href === undefined ? `**${project.data.title}**` : `**[${project.data.title}](${href})**`;

            return `- ${name} — ${project.data.tagline}`;
          })
          .join("\n"),
      ),
    );
  }

  sections.push(
    section(
      dict.sections.experience,
      experience
        .map((entry) => {
          const { company, companyURL, role, location, arrangement, dateStart, dateEnd } = entry.data;
          const at = companyURL === undefined ? company : `[${company}](${companyURL})`;
          const meta = metaLine([range(dateStart, dateEnd), location, dict.arrangement[arrangement]]);
          // The body is the role's bullet list. Its own headings would collide
          // with the page outline, so roles sit at `###` and the list follows.
          const body = (entry.body ?? "").trim();

          return `### ${role} — ${at}\n\n${meta}\n\n${body}`.trim();
        })
        .join("\n\n"),
    ),
    section(
      dict.sections.stack,
      page.data.stack.map((group) => `- **${group.label}**: ${group.items.join(", ")}`).join("\n"),
    ),
    section(
      dict.sections.education,
      page.data.education
        .map((entry) => `- **${entry.degree}** — ${metaLine([entry.institution, entry.location, entry.period])}`)
        .join("\n"),
    ),
    section(
      dict.sections.languages,
      page.data.languages.map((language) => `- ${language.name} — ${language.level}`).join("\n"),
    ),
  );

  return sections.join("\n\n");
}
