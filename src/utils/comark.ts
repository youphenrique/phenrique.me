import { parseMarkdown, type MarkdownDocument } from "comark";
import shiki from "comark/plugins/shiki";

/**
 * Shared Comark parse configuration.
 *
 * Every page renders through this so the whole site agrees on one set of
 * plugins. Parsing happens in Astro frontmatter at build time — the resulting
 * document is handed to `MarkdownDocument`, which is a synchronous React
 * component, so pages render to static HTML with no client-side JavaScript.
 */

/**
 * Shiki tokenises code blocks at build time. The highlighter is a singleton
 * inside the plugin, so the cost is paid once per build rather than per page.
 */
const plugins = [shiki()];

/** Parses a raw markdown body into a Comark document. */
export function parseContent(body: string): Promise<MarkdownDocument> {
  return parseMarkdown(body, { plugins });
}
