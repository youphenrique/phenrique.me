import { parseMarkdown, type ElementNode, type MarkdownDocument, type Node } from "comark";
import shiki from "comark/plugins/shiki";
import footnotes from "comark/plugins/footnotes";

import enProse from "../i18n/prose/en";
import ptProse from "../i18n/prose/pt";
import type { ProseDictionary } from "../i18n/prose/types";
import { PROSE_COMPONENT_TAGS } from "../ui/common/_components/prose/tags";

/**
 * Shared Comark parse configuration.
 *
 * Every page renders through this so the whole site agrees on one set of
 * plugins. Parsing happens in Astro frontmatter at build time — the resulting
 * document is handed to `MarkdownDocument`, which is a synchronous React
 * component, so pages render to static HTML with no client-side JavaScript.
 */

const dictionaries: Record<string, ProseDictionary> = { en: enProse, pt: ptProse };

/** Resolves a locale string (possibly a region tag like `pt-BR`) to a dictionary. */
function dictionaryFor(locale: string): ProseDictionary {
  return dictionaries[locale] ?? dictionaries[locale.split("-")[0]] ?? enProse;
}

function isElement(node: Node): node is ElementNode {
  // A comment node is also an array, but its tag slot holds `null`.
  return Array.isArray(node) && typeof node[0] === "string";
}

/** Children of an element node — everything after the tag and attribute slots. */
function childrenOf(node: ElementNode): Node[] {
  return node.slice(2) as Node[];
}

/**
 * Parses without the footnote plugin.
 *
 * Used to re-parse footnote bodies (see `parseFootnoteBodies`); running the
 * footnote plugin there would look for definitions inside a definition.
 */
function parseInline(markdown: string) {
  return parseMarkdown(markdown, { plugins: [shiki()] });
}

/**
 * Re-parses footnote bodies, which the footnote plugin leaves as raw text.
 *
 * `comark/plugins/footnotes@0.6` builds the definition list by copying the
 * definition's source straight into the `li`, so `[^1]: see [Chesterton](…)`
 * renders the literal brackets. Every other block on the site gets emphasis,
 * links and inline code, and a note that cites a source is the main reason to
 * reach for a footnote at all — so the body is parsed here and spliced back in.
 *
 * A single resulting paragraph is unwrapped, keeping the note inline with the
 * back-reference link the plugin appends. Note that the plugin only captures
 * the definition's first block: an indented continuation paragraph is dropped
 * before this runs, so footnotes are deliberately single-block.
 */
async function parseFootnoteBodies(document: MarkdownDocument): Promise<void> {
  const section = document.nodes.find(
    (node) => isElement(node) && node[0] === "section" && node[1].class === "footnotes",
  );
  if (section === undefined || !isElement(section)) return;

  const list = childrenOf(section).find((node) => isElement(node) && node[0] === "ol");
  if (list === undefined || !isElement(list)) return;

  for (const item of childrenOf(list)) {
    if (!isElement(item) || item[0] !== "li") continue;

    // The plugin emits `[body, " ", backref]`; the body may arrive split across
    // several adjacent strings, so take every leading one.
    const children = childrenOf(item);
    let count = 0;
    while (count < children.length && typeof children[count] === "string") count += 1;
    if (count === 0) continue;

    const source = children.slice(0, count).join("").trim();
    if (source === "") continue;

    const parsed = await parseInline(source);
    const [first] = parsed.nodes;
    const replacement =
      parsed.nodes.length === 1 && isElement(first) && first[0] === "p" ? childrenOf(first) : parsed.nodes;

    // The trailing space is consumed with the body above; restore it so the
    // back-reference link does not butt against the last word.
    item.splice(2, count, ...replacement, " ");
  }
}

/**
 * HTML tags Comark can emit from plain Markdown, plus the few this site writes
 * by hand in content. Anything outside this set is a `::component` invocation.
 */
const HTML_TAGS = new Set([
  "a", "abbr", "aside", "b", "blockquote", "br", "caption", "cite", "code", "col", "colgroup", "dd", "del",
  "details", "div", "dl", "dt", "em", "figcaption", "figure", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img",
  "input", "ins", "kbd", "li", "mark", "ol", "p", "picture", "pre", "q", "s", "samp", "section", "small", "source",
  "span", "strong", "sub", "summary", "sup", "table", "tbody", "td", "tfoot", "th", "thead", "time", "tr", "u",
  "ul", "var", "wbr",
]);

/**
 * Fails the build on a footnote marker the plugin did not pick up.
 *
 * Two markers written back to back — `[^a][^b]` — silently lose the first: it
 * stays in the text as literal `[^a]`, and its definition is dropped from the
 * list entirely. Nothing warns, and the reference simply disappears from the
 * published page. Since a lost citation is exactly the kind of error that
 * survives proofreading, any marker still sitting in a text node after parsing
 * fails the build. Separate adjacent markers with punctuation — `[^a]<sup>,
 * </sup>[^b]` — which reads better than `[7][8]` anyway.
 *
 * A marker whose definition is missing fails the same way in a different shape:
 * the plugin strips the brackets and leaves `<span>^label</span>`, which reads
 * as stray text on the page. Both are caught here.
 *
 * Code is skipped: `[^abc]` is a character class, not a footnote.
 */
function assertFootnotesResolved(nodes: Node[]): void {
  for (const node of nodes) {
    if (typeof node === "string") {
      const match = /\[\^[^\]\s]+\]/.exec(node);
      if (match !== null) {
        throw new Error(
          `[comark] Unresolved footnote marker "${match[0]}" left in the text. ` +
            `The footnote plugin drops a marker written immediately after another one — ` +
            `separate adjacent markers with punctuation.`,
        );
      }
      continue;
    }
    if (!isElement(node)) continue;
    if (node[0] === "code" || node[0] === "pre") continue;

    // `["span", {}, "^label"]` — an attribute-less span holding only the label
    // is the plugin's signature for a reference with no matching definition.
    const [tag, attrs, ...children] = node;
    if (tag === "span" && Object.keys(attrs).length === 0 && children.length === 1) {
      const only = children[0];
      if (typeof only === "string" && only.startsWith("^")) {
        throw new Error(
          `[comark] Footnote "[^${only.slice(1)}]" has no definition. ` +
            `Add a "[^${only.slice(1)}]: …" line, or remove the reference.`,
        );
      }
    }

    assertFootnotesResolved(childrenOf(node));
  }
}

/**
 * Fails the build on a `::component` that nothing renders.
 *
 * An unregistered component is not an error for Comark or for React: the
 * renderer emits `<callout type="warning">…</callout>` as an unknown element,
 * which the browser styles as an inline span. A typo therefore ships as prose
 * that has quietly lost its box, with nothing in the build log. Checking the
 * tree against the registry turns that into a build failure instead.
 */
function assertKnownComponents(nodes: Node[]): void {
  for (const node of nodes) {
    if (!isElement(node)) continue;

    const tag = node[0];
    if (!HTML_TAGS.has(tag) && !PROSE_COMPONENT_TAGS.has(tag)) {
      const known = [...PROSE_COMPONENT_TAGS].sort().join(", ");
      throw new Error(
        `[comark] Unknown component "::${tag}" in Markdown content. ` +
          `Registered components are: ${known}. ` +
          `Register a renderer in src/ui/common/_components/prose/index.tsx, or fix the name.`,
      );
    }

    assertKnownComponents(childrenOf(node));
  }
}

/**
 * Parses a raw markdown body into a Comark document.
 *
 * @param body - Raw markdown, e.g. `entry.body` from a content collection.
 * @param locale - Drives parser-injected copy; currently the footnote heading.
 */
export async function parseContent(body: string, locale = "en"): Promise<MarkdownDocument> {
  const dictionary = dictionaryFor(locale);

  // Shiki tokenises code blocks at build time. The highlighter is a singleton
  // inside the plugin, so the cost is paid once per build rather than per page.
  const document = await parseMarkdown(body, {
    plugins: [shiki(), footnotes({ label: dictionary["footnotes-label"], hr: false })],
  });

  await parseFootnoteBodies(document);
  assertKnownComponents(document.nodes);
  assertFootnotesResolved(document.nodes);

  return document;
}
