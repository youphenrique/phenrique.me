---
title: "Comark component gallery"
description: "Every ::component the site registers, with the authoring syntax next to the result."
slug: "component-gallery"
locale: "en"
date: "2026-09-06"
draft: true
---

A fixture, like the kitchen sink, but for the components rather than the Markdown. Each section shows what to write and what it renders. Components are registered in `src/ui/common/_components/prose/index.tsx`; the parser validates every document against that registry, so a misspelt `::calout` fails the build rather than shipping as unstyled text.

## Callout

Three types, each pinned to one editorial tint. `type` defaults to `note`, and `title` overrides the label.

```md
::callout{type="note"}
The body is ordinary Markdown.
::
```

::callout{type="note"}
For a remark the reader can absorb in passing — a definition, a pointer, a clarification. The body is ordinary Markdown, so it takes **emphasis**, `code` and [links](/design.md).
::

::callout{type="warning"}
For a consequence the reader would regret discovering later. Reserve it: a page with three warnings has none.
::

::callout{type="insight"}
For the observation the section was built to deliver, when it deserves to survive skimming.
::

::callout{type="insight" title="On terminology"}
With `title` set, the label carries the specific point instead of the generic one.
::

::callout{type="note"}
A callout with more inside it.

- A list, which keeps its own rhythm.
- A second item.

And a closing paragraph, to check that the first and last blocks sit flush against the box.
::

## Aside

Marginalia: a remark the argument could afford to lose. Set apart quietly rather than boxed.

```md
::aside
Not load-bearing.
::
```

::aside
This renders in the text column today. It is the same authoring shape a right-hand sidenote needs, so promoting these into the wide gutter later is a change to the component and the grid — not to any content already written.
::

::aside{title="A note on sources"}
`title` overrides the label here too.
::

## Scripture

A quotation the argument answers to, rather than one inside it — the display serif, a wider setting, and a citation that makes the quote checkable. Use `>` blockquote for everything else.

Attribute values are plain text, not Markdown: `source="Augustine, *Confessions* I.1"` renders the asterisks literally.

```md
::scripture{source="Matthew 6:21" href="https://…"}
Where your treasure is, there your heart will be also.
::
```

::scripture{source="Matthew 6:21" href="https://www.biblegateway.com/passage/?search=Matthew%206%3A21&version=ESV"}
Where your treasure is, there your heart will be also.
::

::scripture{source="Augustine, Confessions I.1"}
You have made us for yourself, and our heart is restless until it rests in you.
::

## Figure

The only way to put an image outside the reading measure — a bare `![alt](src)` is parsed inside a paragraph and cannot leave the text column. `layout` defaults to `wide`.

Comark renders outside Astro's asset pipeline, so `src` is not processed: point it at a path under `public/`, and give `width` and `height` so the box is reserved before the file arrives.

```md
::figure{src="/images/example.webp" alt="…" caption="…" width="1600" height="900"}
::
```

::figure{src="/images/paper-grain.webp" alt="The paper grain texture, tiled" caption="Wide by default: the figure spans the full article width while its caption stays on the text measure." width="405" height="405"}
::

::figure{src="/images/paper-grain.webp" alt="The same texture, at text width" caption="With layout set to text, the figure aligns to the prose instead." layout="text" width="405" height="405"}
::
