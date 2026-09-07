import type { ComponentType } from "react";

/**
 * A renderer in the map below.
 *
 * The Comark renderer hands a component the node's attributes verbatim, so the
 * prop shape differs per tag and the map cannot be given one honest type — this
 * mirrors `@comark/react`'s own `Record<string, React.ComponentType<any>>`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProseComponent = ComponentType<any>;

import IconLink from "../icon-link.tsx";
import CodeBlock from "./code-block.tsx";
import Figure from "./figure.tsx";
import Scripture from "./scripture.tsx";
import { createAside } from "./aside.tsx";
import { createCallout } from "./callout.tsx";
import { createProseTable } from "./prose-table.tsx";
import { PROSE_COMPONENT_TAGS } from "./tags.ts";
import enProse from "../../../i18n/prose/en.ts";
import ptProse from "../../../i18n/prose/pt.ts";
import type { ProseDictionary } from "../../../i18n/prose/types.ts";

/**
 * The renderer map handed to `MarkdownDocument`.
 *
 * Two kinds of entry live here. Lowercase HTML tags (`a`, `pre`, `table`)
 * override how Comark renders standard Markdown. The rest are `::component`
 * tags, and each one must also appear in `PROSE_COMPONENT_TAGS` — the parse
 * step validates documents against that set, so a component registered here but
 * missing there would be rejected before it ever renders.
 *
 * Built per locale rather than as a module constant because these render to
 * static HTML at build time and cannot reach `Astro.currentLocale` themselves.
 */
const dictionaries: Record<string, ProseDictionary> = { en: enProse, pt: ptProse };

function dictionaryFor(locale: string): ProseDictionary {
  return dictionaries[locale] ?? dictionaries[locale.split("-")[0]] ?? enProse;
}

export function createProseComponents(locale = "en"): Record<string, ProseComponent> {
  const dictionary = dictionaryFor(locale);

  const components: Record<string, ProseComponent> = {
    // Overrides for standard Markdown output.
    a: IconLink,
    pre: CodeBlock,
    table: createProseTable(dictionary),

    // `::component` invocations.
    callout: createCallout(dictionary),
    aside: createAside(dictionary),
    scripture: Scripture,
    figure: Figure,
  };

  // Cheap guarantee that the registry and the parser's allowlist agree: a tag
  // in one and not the other is a mistake that would otherwise only show up as
  // a failed build (or unstyled prose) on the first article that uses it.
  for (const tag of PROSE_COMPONENT_TAGS) {
    if (!(tag in components)) {
      throw new Error(`[prose] "::${tag}" is allowed by the parser but has no renderer registered.`);
    }
  }

  return components;
}
