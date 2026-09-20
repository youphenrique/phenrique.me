import type { ProseDictionary } from "../../i18n/prose/types.ts";
import { CAREER_START_YEAR } from "../constants.ts";

/**
 * Flattens Comark's `::component` syntax into plain Markdown.
 *
 * The `.md` endpoints serve the same bodies the site renders, but a reader on
 * the other end is a parser, not Comark: `::callout{type="note" title="Now"}`
 * left in the text is a directive nothing resolves, and its title — which the
 * page shows as the callout's label — would arrive as attribute noise. So each
 * block is rewritten into the closest thing standard Markdown has, which is
 * almost always a blockquote carrying the same words the page displays.
 *
 * This works on the source rather than on a parsed document on purpose. Comark
 * parses to a render tree aimed at React, and turning that back into Markdown
 * would mean a second serialiser for every node type the site can emit. The
 * directive syntax, by contrast, is line-based and the site uses six of them.
 */

type Attributes = Record<string, string>;

/** ```/~~~ fence. Inside one, `::anything` is code, not a directive. */
const FENCE = /^\s*(```|~~~)/;

/** `::name{key="value" …}` — two or more colons, since nesting adds one. */
const OPEN = /^(:{2,})([A-Za-z][A-Za-z0-9-]*)[ \t]*(?:\{([^}]*)\})?[ \t]*$/;

/** The matching `::` line. The colon count pairs it with its opener. */
const CLOSE = /^(:{2,})[ \t]*$/;

const ATTRIBUTE = /([A-Za-z_][A-Za-z0-9_-]*)(?:="([^"]*)")?/g;

/**
 * `:yoe` inline, which the page renders as a computed number. Written out here
 * rather than left as a directive: a file that says "with :yoe years of
 * experience" is worse than no answer, because it reads like a real one.
 */
const YOE = /(?<![A-Za-z0-9:]):yoe\b/g;

function parseAttributes(source: string | undefined): Attributes {
  if (source === undefined) return {};

  const attributes: Attributes = {};
  for (const [, key, value] of source.matchAll(ATTRIBUTE)) {
    attributes[key] = value ?? "";
  }

  return attributes;
}

/** Wraps parts in one blockquote, blank-line separated, `>`-prefixed. */
function blockquote(...parts: (string | undefined)[]): string {
  const body = parts.filter((part) => part !== undefined && part !== "").join("\n\n");

  return body
    .split("\n")
    .map((line) => (line === "" ? ">" : `> ${line}`))
    .join("\n");
}

/** `— [Paul Irish, About](https://…)`, with whichever half is present. */
function attribution(source: string | undefined, href: string | undefined): string | undefined {
  if (source !== undefined && href !== undefined) return `— [${source}](${href})`;
  if (source !== undefined) return `— ${source}`;
  if (href !== undefined) return `— ${href}`;

  return undefined;
}

const CALLOUT_LABELS = {
  note: "callout-note",
  warning: "callout-warning",
  insight: "callout-insight",
} as const;

/**
 * The words the callout actually shows. `type` is a colour on the page, never
 * text, so it is not written out; an unknown type falls back to the note label
 * exactly as `createCallout` does.
 */
function calloutLabel(attributes: Attributes, dictionary: ProseDictionary): string {
  if (attributes.title !== undefined && attributes.title !== "") return `**${attributes.title}**`;

  const key = CALLOUT_LABELS[attributes.type as keyof typeof CALLOUT_LABELS] ?? "callout-note";

  return `**${dictionary[key]}**`;
}

function tweetHeader(attributes: Attributes): string | undefined {
  const { author, handle, date } = attributes;
  if (author === undefined) return undefined;

  const identity = handle === undefined ? `**${author}**` : `**${author}** (@${handle})`;

  return date === undefined ? identity : `${identity} · ${date}`;
}

function figure(attributes: Attributes): string {
  const { src = "", alt = "", caption } = attributes;
  const image = `![${alt}](${src})`;

  return caption === undefined ? image : `${image}\n\n*${caption}*`;
}

function render(tag: string, attributes: Attributes, body: string, dictionary: ProseDictionary): string {
  switch (tag) {
    case "callout":
      return blockquote(calloutLabel(attributes, dictionary), body);
    case "aside":
      return blockquote(`**${dictionary["aside-label"]}**`, body);
    case "quote":
      return blockquote(body, attribution(attributes.source, attributes.href));
    case "tweet":
      return blockquote(tweetHeader(attributes), body, attribution(undefined, attributes.href));
    case "figure":
      return figure(attributes);
    default:
      // An unregistered component fails the build in `assertKnownComponents`
      // long before it reaches here, so this is the case where a block has no
      // Markdown equivalent worth inventing: keep the content, drop the box.
      return body;
  }
}

interface Flattened {
  text: string;
  /** Index of the line after the block this call consumed. */
  next: number;
}

function flatten(lines: string[], start: number, closer: number | null, dictionary: ProseDictionary): Flattened {
  const out: string[] = [];
  let fence: string | null = null;
  let index = start;

  while (index < lines.length) {
    const line = lines[index];

    if (fence !== null) {
      out.push(line);
      if (line.trimStart().startsWith(fence)) fence = null;
      index += 1;
      continue;
    }

    const fenced = FENCE.exec(line);
    if (fenced !== null) {
      fence = fenced[1];
      out.push(line);
      index += 1;
      continue;
    }

    const closed = CLOSE.exec(line);
    if (closed !== null && closer !== null && closed[1].length === closer) {
      return { text: out.join("\n"), next: index + 1 };
    }

    const opened = OPEN.exec(line);
    if (opened !== null) {
      const inner = flatten(lines, index + 1, opened[1].length, dictionary);
      out.push(render(opened[2], parseAttributes(opened[3]), inner.text.trim(), dictionary));
      index = inner.next;
      continue;
    }

    out.push(line);
    index += 1;
  }

  return { text: out.join("\n"), next: index };
}

/** Rewrites every directive in a raw collection body. Plain Markdown passes through. */
export function flattenDirectives(body: string, dictionary: ProseDictionary): string {
  const { text } = flatten(body.split("\n"), 0, null, dictionary);

  return text.replace(YOE, String(new Date().getFullYear() - CAREER_START_YEAR));
}
