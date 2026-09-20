import type { ProseDictionary } from "../../i18n/prose/types.ts";
import type { Alternates, Locale } from "../i18n-routes.ts";
import { flattenDirectives } from "./directives.ts";

/**
 * Builds the plain-Markdown twin of a page, served at the page's own address
 * with `.md` appended — `/about` and `/about.md`, the way `/design.md` already
 * publishes the design system.
 *
 * The document opens with YAML frontmatter rather than prose metadata so the
 * facts an agent needs first (what this is, where it lives, which language,
 * when it was published) are parseable without reading the article, and the
 * source URL travels with the text once it has been copied somewhere else.
 */

export interface MarkdownPage {
  title: string;
  /**
   * The `# ` line, when the page's heading is not its `<title>`. `/reading` is
   * titled "Reading" and headed "Reading" in English but "Leitura" in
   * Portuguese, and the document should open with the words the page shows.
   */
  heading?: string;
  description: string;
  /** Site-relative path of the HTML page this mirrors, e.g. `/about`. */
  path: string;
  locale: Locale;
  /** Publication date, for the collections that have one. */
  date?: Date;
  /** Every locale's address for the page, as used for `hreflang`. */
  alternates?: Alternates;
}

/** YAML double-quoted style accepts JSON's escaping, which covers every title. */
function yamlValue(value: string): string {
  return JSON.stringify(value);
}

function absoluteURL(path: string): string {
  return new URL(`${path}.md`, import.meta.env.SITE).href;
}

function frontmatter(page: MarkdownPage): string {
  const lines = [
    `title: ${yamlValue(page.title)}`,
    `description: ${yamlValue(page.description)}`,
    `source: ${absoluteURL(page.path)}`,
    `locale: ${page.locale}`,
  ];

  if (page.date !== undefined) {
    lines.push(`date: ${page.date.toISOString().slice(0, 10)}`);
  }

  // Only genuine translations are listed. A single entry is the page itself,
  // which tells a reader nothing it does not already have.
  const translations = Object.entries(page.alternates ?? {}).filter(([locale]) => locale !== page.locale);

  if (translations.length > 0) {
    lines.push("translations:");
    for (const [locale, path] of translations) {
      lines.push(`  ${locale}: ${absoluteURL(path)}`);
    }
  }

  return `---\n${lines.join("\n")}\n---`;
}

/** The document as a string, for `/llms.txt` and for the endpoints below. */
export function renderMarkdownPage(page: MarkdownPage, body: string, dictionary: ProseDictionary): string {
  const prose = flattenDirectives(body, dictionary).trim();

  return `${frontmatter(page)}\n\n# ${page.heading ?? page.title}\n\n${prose}\n`;
}

/**
 * The response an `.md` endpoint returns.
 *
 * `text/markdown` rather than `text/plain`: a client that can do something with
 * the structure should be able to tell, and browsers display both inline.
 */
export function markdownResponse(page: MarkdownPage, body: string, dictionary: ProseDictionary): Response {
  return new Response(renderMarkdownPage(page, body, dictionary), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
