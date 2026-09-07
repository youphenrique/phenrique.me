---
title: "Markdown kitchen sink"
description: "Every Markdown construct the site can render, on one page, so the prose layer can be judged as a whole."
slug: "markdown-kitchen-sink"
locale: "en"
date: "2026-09-07"
draft: true
---

This post is a fixture, not an article. It exists so the `.prose` layer can be reviewed against every construct at once instead of against whichever three a real post happened to use. It ships as a draft, so it is filtered out of the index, the sitemap and the feed.

The paragraph above and this one exercise the base setting. What matters here is the measure, the leading, and the gap between paragraphs — the three things that decide whether a long argument is comfortable to read or merely possible to read. A paragraph needs to run long enough to wrap several times before any of that can be judged, which is why this one keeps going past the point of having anything to say.

## Heading levels

The heading immediately above is an `h2`. Everything below walks the rest of the scale, so the steps between levels can be seen next to each other rather than imagined.

### This is an h3

An `h3` introduces a subdivision of the section. It should read as subordinate to the `h2` without disappearing into the body text.

#### This is an h4

By `h4` the scale has nearly reached body size, so weight and spacing carry the distinction rather than size.

##### This is an h5

A fifth level is rare in practice and mostly needs to not look broken.

###### This is an h6

The sixth is set as a label rather than a heading.

### Headings that follow each other

### With no text between them

Two headings in a row must not collide — the second should keep its own space above.

## Inline typography

Body text carries **strong emphasis**, *ordinary emphasis*, ***both together***, ~~struck-through text~~, `inline code`, a [link to an external site](https://www.w3.org/WAI/standards-guidelines/wcag/), a [link within the site](/writing), and <mark>highlighted text</mark>. Keyboard shortcuts render as <kbd>Cmd</kbd> + <kbd>K</kbd>, and an abbreviation like <abbr title="Cumulative Layout Shift">CLS</abbr> carries its expansion.

Punctuation gets its own workout: em dashes — like these — set off a clause, an ellipsis trails off…, "curly double quotes" and 'single quotes' sit inside a sentence, and a footnote marker rides along at the end of this one.[^measure]

A very long identifier such as `useDeferredValueWithTransitionFallback` must wrap or break rather than push the column open, and so must a bare URL like https://example.com/a/very/long/path/that/keeps/going/for/quite/a/while/indeed.

## Lists

An unordered list:

- A short item.
- An item long enough to wrap onto a second line, so the hanging indent under the marker can be checked against the text above it.
- An item with **strong text**, `code`, and a [link](https://astro.build).
- A nested list:
  - Second level, which takes a different marker.
  - Another second-level item.
    - Third level, different again.
- Back to the first level.

An ordered list:

1. Ordered items share the vertical rhythm of unordered ones.
2. An item that wraps needs its continuation lines to clear the number, which is what makes a two-digit list worth checking.
3. A third item.
   1. A nested ordered list restarts its own numbering.
   2. And continues.

A list whose items contain their own paragraphs:

- **Behaviour** — what becomes possible or different for a person. The dash-led definition pattern is common enough in these posts to be worth testing.

  A second paragraph inside the same list item, which needs to align with the first rather than with the marker.

- **Boundaries** — which APIs, storage, or permissions get crossed.

A task list:

- [x] The checkbox replaces the bullet rather than joining it.
- [ ] An unchecked item.
- [ ] An item long enough to wrap, so the checkbox can be checked against the first line's baseline rather than the centre of the block.

## Quotations

> A blockquote is a voice inside the argument. It stays at body size, set in italic, marked with a rule.
>
> A second paragraph inside the same quote.

> A short quote with an attribution line.
> <cite>Someone worth quoting</cite>

## Code

A fenced block with a language and a filename:

```ts [can-publish.ts]
type Article = { status: "draft" | "review" | "published"; hasRequiredFields: boolean };

export const canPublish = (article: Article) =>
  article.status === "review" && article.hasRequiredFields;
```

A block with a language and no filename:

```bash
pnpm install && pnpm run build
```

A block with neither, which gets no highlighting and must still look deliberate:

```
$ cat /etc/hostname
phenrique
```

Code blocks stay on the text measure, aligned with the prose. A block whose lines are far too long to fit must therefore scroll inside its own box rather than widen the page:

```json [tsconfig.excerpt.json]
{ "compilerOptions": { "target": "ES2022", "module": "ESNext", "moduleResolution": "Bundler", "strict": true, "noUncheckedIndexedAccess": true, "exactOptionalPropertyTypes": true, "jsx": "react-jsx" } }
```

### Straight after a heading

```ts [cluster.ts]
// A panel introduced by a heading stays part of that cluster, so it keeps
// less space above it than one that interrupts a paragraph.
export const clustered = true;
```

## Tables

A narrow table:

| Layer | Useful question |
| :-- | :-- |
| Behaviour | What should someone notice? |
| Boundaries | What can fail or become stale? |
| Proof | What protects the important path? |

A table with mixed alignment and enough columns to need scrolling on a phone:

| Token | Light | Dark | Contrast | Role |
| :-- | :-: | :-: | --: | :-- |
| `text.primary` | `ink.850` | `sand.300` | 15.5:1 | Headings |
| `text.secondary` | `ink.600` | `sand.500` | 7.4:1 | Body and prose |
| `text.muted` | `ink.500` | `ink.300` | 5.3:1 | Single-line metadata |
| `text.faint` | `ink.400` | `ink.400` | 3.5:1 | Incidental only |

## Rules and images

A thematic break separates what follows from what came before:

---

An image written as plain Markdown stays inside the text column, because it is parsed inside a paragraph and cannot leave it:

![The paper grain texture, tiled](/images/paper-grain.webp)

To place an image in the wider track, use `::figure` — see the component gallery.

## Footnotes

Footnotes collect at the end of the document, under their own label, separated from the argument by a rule.[^second] A note can carry emphasis, `code` and links.[^third]

Two markers on one sentence need punctuation between them[^measure]<sup>,&nbsp;</sup>[^second] — written back to back, the footnote plugin drops the first, so `parseContent` fails the build rather than letting a citation vanish.

Inline code is exempt from that check, so a character class like `[^abc]` in a regex passes through untouched.

[^measure]: The measure here is `--prose-measure`, set in `global.css` at 36rem — roughly 71 characters at the body size.
[^second]: Note that the plugin captures only the *first* block of a definition; an indented continuation paragraph is silently dropped, so a footnote is deliberately one block long.
[^third]: Markdown inside a note is parsed — see [the design system](/design.md) — which the footnote plugin does not do on its own.
