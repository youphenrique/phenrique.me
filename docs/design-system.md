# phenrique.me — Design System

The colour system for [phenrique.me](https://phenrique.me). One source of truth, mirrored publicly at [phenrique.me/design.md](https://phenrique.me/design.md).

Implemented in [`panda.config.ts`](../panda.config.ts) with
[Panda CSS](https://panda-css.com/). Point an agent at `/design.md` and it has everything it needs to write correct styles for this site.

---

## The one rule

**Components use semantic tokens. Never raw palette values, never hex.**

```ts
// ✅
css({ bg: "bg.raised", color: "text.secondary", borderColor: "border.subtle" });

// ❌ raw palette — has no light/dark pair
css({ bg: "paper.200", color: "graphite.600" });

// ❌ hex — invisible to the system, breaks in dark mode
css({ bg: "#F4F4F2", color: "#52524E" });
```

A semantic token carries **both** theme values. A raw palette token carries one. Reaching past the semantic layer is how a component ends up unreadable in dark mode.

---

## Architecture

Two layers, and only the second is public API.

```
┌─ Layer 1 · raw palette ──────────── theme.extend.tokens.colors ──┐
│  paper · graphite · vermilion · sage · moss · sky · periwinkle   │
│  ochre · signal                                                  │
│  Fixed hues on fixed ramps. Never referenced from a component.   │
└──────────────────────────────┬───────────────────────────────────┘
                               │ bound per theme
┌──────────────────────────────▼───────────────────────────────────┐
│  Layer 2 · semantic roles ─── theme.extend.semanticTokens.colors │
│  bg · text · border · accent · status · sheet · tint · linkbio   │
│  Each holds a { base, _dark } pair. This is what you write.      │
└──────────────────────────────────────────────────────────────────┘
```

Both live under `theme.extend` so they **merge** with Panda's preset. A bare
`theme.tokens` would _replace_ the preset and silently take `fontSizes`,
`sizes`, `radii` and the default shadow scale with it.

Dark mode is the `_dark` condition, which Panda compiles to `.dark &`. The class is set on `<html>` by the inline theme script in `src/ui/components/head.astro`.

---

## Layer 1 — the raw palette

### Neutrals

`paper` and `graphite` are **one continuous ramp split at the midpoint**. They are two names rather than one because each theme draws from one half: light mode takes surfaces from `paper` and text from `graphite`, and dark mode does exactly the reverse.

| Token          | Value     | Role                                              |
| -------------- | --------- | ------------------------------------------------- |
| `paper.0`      | `#FFFFFF` | code panel (light)                                |
| `paper.50`     | `#FAFAF9` | app canvas (light) · **fixed**                    |
| `paper.100`    | `#F7F7F5` | sunken surface (light)                            |
| `paper.200`    | `#F4F4F2` | raised surface (light)                            |
| `paper.300`    | `#ECECEA` | hover (light) · **primary text (dark)**           |
| `paper.400`    | `#E0E0DC` | default border (light)                            |
| `paper.500`    | `#C2C2BD` | strong border (light) · **secondary text (dark)** |
| `graphite.300` | `#A1A19C` | muted text (dark)                                 |
| `graphite.400` | `#878782` | decorative only — 3.5:1, fails body text          |
| `graphite.500` | `#6B6B66` | muted text (light)                                |
| `graphite.600` | `#52524E` | secondary text (light)                            |
| `graphite.700` | `#3A3A37` | strong border (dark)                              |
| `graphite.800` | `#262625` | default border (dark) · hover (dark)              |
| `graphite.850` | `#1C1C1B` | **primary text (light)** · raised hover (dark)    |
| `graphite.900` | `#151514` | raised surface (dark)                             |
| `graphite.950` | `#0B0B0A` | app canvas (dark) · **fixed**                     |

The ramp is near-neutral end to end — OKLCH chroma at or under 0.004, a whisper of warmth so it does not read as a stock grey scale. It replaced a cream ramp (`#F0EEE6`, `#FAF6F2`) that was, value for value, the canvas of claude.ai; paired with the old clay accent, it made the site read as AI-generated. Warmth now comes from the accent, used sparingly, rather than from every surface.

### Accent — vermilion

`vermilion.500` `#FF5B04` is the brand colour and does not change. It is a saturated signal orange on purpose: the clay it replaced (`#D97757`) was Anthropic's, and what made that one recognisable was its dustiness.

| Token           | Value     | Role                                  |
| --------------- | --------- | ------------------------------------- |
| `vermilion.50`  | `#FFF1EA` | subtle accent surface (light)         |
| `vermilion.100` | `#FFDCC9` |                                       |
| `vermilion.200` | `#FFBE9C` |                                       |
| `vermilion.300` | `#FF9A66` | accent emphasis (dark)                |
| `vermilion.400` | `#FF7A33` | accent hover (dark)                   |
| `vermilion.500` | `#FF5B04` | **brand** — fills, indicators, rings  |
| `vermilion.600` | `#A93F17` | accent text on light surfaces (oxide) |
| `vermilion.700` | `#84310F` | accent emphasis (light)               |
| `vermilion.800` | `#5C220B` |                                       |
| `vermilion.900` | `#3A1607` |                                       |
| `vermilion.950` | `#220D04` | subtle accent surface (dark)          |

> **Why the ramp exists.** `vermilion.500` on `paper.50` is **3.0:1** — well under the
> 4.5:1 WCAG AA threshold for body text. It is perfectly fine as a _fill_ (a
> progress bar, an active ring, an icon), because those are not text. But small
> text in light mode must use `vermilion.600` (**5.9:1**). In dark mode `vermilion.500`
> on `graphite.950` is **6.3:1** and needs no substitute. The lightness jump from
> 500 to 600 is deliberate: one is a fill, the other is ink.
>
> `text.accent` already encodes this: `vermilion.600` in light, `vermilion.500` in dark.
> Use it and the problem disappears.
>
> Keep the accent rare — the wordmark, links, one indicator per view. Rarity is
> what makes it read as an identity rather than decoration.

### Editorial tints

Six hues for classifying **content** — book genres, writing tags, work chips. Never for UI chrome, never for state.

Four steps each. `100`/`900` are surfaces (light/dark); `600`/`400` are the text that sits on them. Every pair clears 4.5:1.

| Hue          | `100` surface | `600` text | `400` text | `900` surface |
| ------------ | ------------- | ---------- | ---------- | ------------- |
| `sage`       | `#DDE7E0`     | `#3F6B51`  | `#8FB39C`  | `#1B2E22`     |
| `moss`       | `#DCE6DA`     | `#3D6140`  | `#8CAE8F`  | `#1A2A1B`     |
| `sky`        | `#DAE5F2`     | `#2F5D8C`  | `#8FB2D9`  | `#16283D`     |
| `periwinkle` | `#E2E1F4`     | `#4E4899`  | `#A9A5DE`  | `#221F45`     |
| `clay`       | `#F4E1D6`     | `#8A4E2F`  | `#D9A184`  | `#3A2016`     |
| `ochre`      | `#F5E7CC`     | `#7A5A1B`  | `#D4B36A`  | `#33260C`     |

`ochre.500` `#C89B3C` additionally backs `status.rating` (filled stars).

### Signal

Diff and status hues, kept from GitHub because they are purpose-built for the red/green distinction and already tuned for both themes.

| Token                | Hex       |
| -------------------- | --------- |
| `signal.green`       | `#1A7F37` |
| `signal.greenBright` | `#3FB950` |
| `signal.red`         | `#CF222E` |
| `signal.redBright`   | `#F85149` |

### Code

Syntax hues, used only behind `syntax.*`. Purpose-built like `signal`: a deep step for the light theme, a bright step for the dark one.

They are deliberately **not** the editorial tints. The tints share one lightness so a row of badges reads as a quiet set — and that sameness is exactly what makes highlighted code illegible. A first pass built on `sage.600`, `sky.600`, `periwinkle.600` and friends cleared contrast but put every token within 0.06 of the same OKLCH lightness, with booleans and numbers only ΔE 3 apart.

| Token            | Hex       | Token                  | Hex       |
| ---------------- | --------- | ---------------------- | --------- |
| `code.plum`      | `#9A2F6B` | `code.plumBright`      | `#E68BC0` |
| `code.green`     | `#2E6B3A` | `code.greenBright`     | `#A3CF8C` |
| `code.vermilion` | `#A8401B` | `code.vermilionBright` | `#F0A070` |
| `code.blue`      | `#2C56A8` | `code.blueBright`      | `#8DB2F2` |
| `code.amber`     | `#855700` | `code.amberBright`     | `#E3C173` |
| `code.stone`     | `#63635E` |                        |           |

`code.stone` is the light-theme comment neutral: 6.0:1 on `bg.code`, a step lighter than `graphite.600` so it stays distinct from punctuation.

---

## Layer 2 — semantic roles

This is the API. Everything below is what a component writes.

### `bg.*` — surfaces

| Token            | Light                  | Dark                    | Use for                              |
| ---------------- | ---------------------- | ----------------------- | ------------------------------------ |
| `bg.canvas`      | `paper.50`             | `graphite.950`          | the page itself                      |
| `bg.raised`      | `paper.200`            | `graphite.900`          | cards, menus, badges                 |
| `bg.raisedHover` | `paper.300`            | `graphite.850`          | hover on a raised surface            |
| `bg.code`        | `paper.0` (`#FFFFFF`)  | `graphite.900`          | the fenced code panel, and only that |
| `bg.sunken`      | `paper.100`            | `graphite.900`          | wells and recessed areas             |
| `bg.hover`       | `rgba(10,10,10,.05)`   | `rgba(255,255,255,.06)` | hover on an _unknown_ surface        |
| `bg.track`       | `paper.400`            | `graphite.800`          | the groove behind a progress fill    |
| `bg.overlay`     | `rgba(250,246,242,.5)` | `rgba(13,11,10,.55)`    | the blurred header pill              |
| `bg.scrim`       | `rgba(10,10,10,.32)`   | `rgba(0,0,0,.5)`        | modal backdrop                       |
| `bg.bloom`       | transparent            | `rgba(255,255,255,.03)` | radial bloom behind the home hero    |

`bg.code` is deliberately split off from `bg.raised`. A fenced block reads as a quoted artefact rather than another card, and it is the one surface
where light mode inverts the stack: the panel is _brighter_ than the off-white canvas, which is what separates it, with `border.hairline` doing the rest.
Dark mode keeps `graphite.900` — a lifted panel already reads there, and going lighter would eat into the 5:1 floor `syntax.*` is held to. Only
`code-block.tsx` may use it; cards, sheets, the TOC rail, tweet embeds and inline `code` stay on `bg.raised`.

`bg.hover` is translucent on purpose: it tints whatever it lands on, so one token covers hover on canvas, on a card, and inside a menu. Use `bg.raisedHover`
only when you know the surface underneath.

### `text.*` — foreground

Ratios are measured against `bg.canvas` in the corresponding theme.

| Token            | Light           | Dark            | Contrast (light / dark)        |
| ---------------- | --------------- | --------------- | ------------------------------ |
| `text.primary`   | `graphite.850`  | `paper.300`     | 16.3:1 / 16.6:1                |
| `text.secondary` | `graphite.600`  | `paper.500`     | 7.5:1 / 11.0:1                 |
| `text.muted`     | `graphite.500`  | `graphite.300`  | 5.1:1 / 7.6:1                  |
| `text.faint`     | `graphite.400`  | `graphite.400`  | 3.5:1 — **decorative only**    |
| `text.accent`    | `vermilion.600` | `vermilion.500` | 5.9:1 / 6.3:1                  |
| `text.onAccent`  | `graphite.950`  | `graphite.950`  | text on an accent fill — 6.3:1 |

**Choosing a level.** `primary` for headings and anything that must be read first. `secondary` for body copy and multi-line prose. `muted` for single-line metadata — authors, section labels, timestamps with context.
`faint` only where the text is genuinely incidental and never load-bearing; it fails AA for body text by design.

### `border.*` — strokes

| Token                   | Light                | Dark                    | Use for                          |
| ----------------------- | -------------------- | ----------------------- | -------------------------------- |
| `border.subtle`         | `rgba(10,10,10,.12)` | `rgba(255,255,255,.12)` | card and button outlines         |
| `border.default`        | `paper.400`          | `graphite.800`          | dividers, menu edges, rules      |
| `border.strong`         | `paper.500`          | `graphite.700`          | emphasis, empty-state glyphs     |
| `border.accent`         | `vermilion.500`      | `vermilion.500`         | active indicators, quote rules   |
| `border.focus`          | `vermilion.600`      | `vermilion.500`         | keyboard focus rings             |
| `border.underline`      | `rgba(10,10,10,.15)` | `rgba(255,255,255,.3)`  | link underlines at rest          |
| `border.underlineHover` | `rgba(10,10,10,.3)`  | `rgba(255,255,255,.55)` | link underlines on hover         |
| `border.hairline`       | `rgba(10,10,10,.09)` | `rgba(255,255,255,.11)` | row separators in a grouped list |

The translucent ones are deliberate exceptions to "use a ramp step": a stroke that has to sit on an unknown surface cannot be a solid colour.

**Focus rings use `border.focus`, never `border.accent`.** A focus indicator needs 3:1 against what surrounds it, and `vermilion.500` is only 3.0:1 on the light canvas; `vermilion.600` is 5.9:1. The standard ring is `outline: 2px solid token(colors.border.focus)` with a `2px` offset. Inset it (`-2px`) when the control sits flush inside a bordered group, such as a segmented switch or a grouped-list row, so the ring does not cut the group's edge.

### `accent.*` — the brand as an interactive role

| Token             | Light           | Dark            | Use for                     |
| ----------------- | --------------- | --------------- | --------------------------- |
| `accent.default`  | `vermilion.500` | `vermilion.500` | fills, progress, indicators |
| `accent.hover`    | `vermilion.600` | `vermilion.400` | hover on an accent element  |
| `accent.subtle`   | `vermilion.50`  | `vermilion.950` | tinted accent background    |
| `accent.emphasis` | `vermilion.700` | `vermilion.300` | pressed / highest emphasis  |

**`accent.default` is not for text.** Fills and rings only. Accent _text_ goes through `text.accent`, which is contrast-corrected per theme.

### `status.*`

| Token            | Light          | Dark                 | Use for         |
| ---------------- | -------------- | -------------------- | --------------- |
| `status.success` | `signal.green` | `signal.greenBright` | diff insertions |
| `status.danger`  | `signal.red`   | `signal.redBright`   | diff deletions  |
| `status.rating`  | `ochre.500`    | `ochre.400`          | filled stars    |

Reserved for state. Never decoration.

`status.pending` is a badge set — `surface` / `text` / `border`, used together like a tint — for content that is not final yet, i.e. drafts. It sits on the same ochre steps as `tint.ochre` (`100`/`600` light, `900`/`400` dark), so it carries that pair's verified contrast. It is a separate role because it reports state rather than classifying content, and it is amber because a neutral badge is the same grey pill as a selected control (the writing filter), and read as one. Use it through `<Badge tone="pending">`.

### `syntax.*` — code highlighting

Ratios are measured against `bg.code`, the code panel, in the corresponding theme.

| Token                | Light            | Dark                   | Contrast (light / dark) |
| -------------------- | ---------------- | ---------------------- | ----------------------- |
| `syntax.text`        | `graphite.850`   | `paper.300`            | 17.1:1 / 15.4:1         |
| `syntax.punctuation` | `graphite.700`   | `paper.500`            | 11.4:1 / 10.2:1         |
| `syntax.comment`     | `code.stone`     | `graphite.300`         | 6.0:1 / 7.0:1           |
| `syntax.keyword`     | `code.plum`      | `code.plumBright`      | 7.0:1 / 7.7:1           |
| `syntax.string`      | `code.green`     | `code.greenBright`     | 6.4:1 / 10.3:1          |
| `syntax.constant`    | `code.vermilion` | `code.vermilionBright` | 6.2:1 / 8.7:1           |
| `syntax.function`    | `code.blue`      | `code.blueBright`      | 7.0:1 / 8.5:1           |
| `syntax.parameter`   | `code.amber`     | `code.amberBright`     | 6.3:1 / 10.6:1          |
| `syntax.inserted`    | `moss.600`       | `signal.greenBright`   | 7.0:1 / 7.2:1           |
| `syntax.deleted`     | `vermilion.700`  | `signal.redBright`     | 8.7:1 / 5.5:1           |
| `syntax.changed`     | `ochre.600`      | `ochre.400`            | 6.4:1 / 9.1:1           |

**How it reaches the page.** Comark's Shiki plugin tokenises code at build time with Shiki's css-variables theme (`src/utils/code-theme.ts`), so the markup carries `color: var(--shiki-token-keyword)` rather than a hex value. `global.css` binds each `--shiki-token-*` to a `syntax.*` role on `.shiki`, and the roles switch with the page like every other semantic token. Shiki's `string-expression` and `link` are folded into `string` and `function`.

**Two rules, enforced.** `npm run check:syntax` runs as part of `build` and fails it when, in either theme:

- a role drops under **5:1** on `bg.code` — stricter than AA's 4.5:1, for headroom at 14px; or
- two roles that can share a line sit closer than **ΔE 8** in OKLab. Contrast alone would pass seven near-identical browns. The diff roles are exempt: they colour whole lines, never sit next to a keyword.

**Separate by lightness, not only hue.** Text that clears 5:1 on a light panel has to sit near the middle of the lightness range, so hue alone cannot carry the distinction. Identifiers are near-black, colour sits at 5–6:1, and comments recede as a mid neutral. No italics: Geist Mono is loaded upright only, so the browser would fake an oblique.

**Languages.** Comark's plugin preloads only vue, tsx, svelte, ts, js, bash, json, yaml and astro. Any other fence language throws inside the plugin and renders as plain, unhighlighted text with no build error, so register it in `languages` in `src/utils/code-theme.ts` first (Kotlin is registered there). Some grammars scope less than TypeScript's: Kotlin leaves parameters, colons and qualified names like `SaveResult.Saved` unscoped, so they render as `syntax.text`.

**Adding a role.** Add it here and in `panda.config.ts`, bind its `--shiki-token-*` variable in `global.css`, then run the check. Never paste a Shiki theme's hex values into a component or a theme file; they are invisible to both themes and to the check.

### `sheet.*` — iOS-style bottom sheet

| Token               | Light                | Dark                    |
| ------------------- | -------------------- | ----------------------- |
| `sheet.bg`          | `paper.200`          | `graphite.900`          |
| `sheet.group`       | `paper.50`           | `graphite.850`          |
| `sheet.groupActive` | `paper.300`          | `graphite.800`          |
| `sheet.grabber`     | `rgba(10,10,10,.18)` | `rgba(255,255,255,.22)` |

The invariant: **the group card is always lighter than the backdrop it sits on**, in both themes. Row separators use `border.hairline`.

### `tint.*` — content classification

Eighteen tokens, six matched sets:

```ts
tint.sage.surface / tint.sage.text / tint.sage.border;
tint.moss.surface / tint.moss.text / tint.moss.border;
tint.sky.surface / tint.sky.text / tint.sky.border;
tint.periwinkle.surface / tint.periwinkle.text / tint.periwinkle.border;
tint.clay.surface / tint.clay.text / tint.clay.border;
tint.ochre.surface / tint.ochre.text / tint.ochre.border;
```

`border` is the set's text hue mixed to ~22% (light) / ~26% (dark) over transparent, so the ring reads as a slightly deeper edge of the same surface, not as an outline in a second colour.

Don't hand-roll a chip: use `Badge` (`src/ui/components/badge.astro`), which applies a whole set from a `tone` prop — a hue, `pending` for a draft, or `neutral` (the default) for a plain label. Keep `neutral` away from controls: it is the same grey pill as a selected filter. It is a 20px pill (`xs` text, `full` radius, 1px border) sized to sit inside a `sm` metadata line without growing it.

```astro
<Badge tone={hue}>{genre}</Badge>
<Badge tone="pending">{draftLabel}</Badge>
```

**Always use a set together.** Mixing `tint.sky.surface` with
`tint.clay.text` is not a supported combination and its contrast is unverified.

#### Assigning a hue to a category

Assignment must be **stable** — the same genre is the same colour on every visit — and ideally **distinct** among the categories shown together. Never assign by list index, or the colours shuffle whenever the list changes.

`src/utils/tint.ts` provides the general mechanism:

```ts
import { tintForKey, tintKey } from "../utils/tint.ts";

const hue = tintForKey(tintKey(label)); // stable, hash-based
```

`tintForKey` is stable but **not collision-free** — six hues means distinct labels will sometimes share one. It is a _fallback_, not a strategy.

For a small, known vocabulary, **pin it explicitly** and keep the hash for entries added later. `book-genre-badge.astro` does exactly this:

```ts
const GENRE_HUES: Record<string, TintHue> = {
  christian: "sage",
  theology: "periwinkle",
  apologetics: "sky",
  philosophy: "clay",
  "personal development": "ochre",
  education: "moss",
};

const key = tintKey(genre);
const hue = GENRE_HUES[key] ?? tintForKey(key);
```

Hashing the six real genres collapses them onto two hues; pinning gives six distinct ones, and the fallback guarantees a new genre still renders tinted rather than dropping to a neutral chip.

#### Panda cannot extract a dynamic token

Panda resolves styles statically, so a computed token path generates **no CSS**:

```ts
// ❌ produces no rule — the chip renders unstyled
css({ bg: `tint.${hue}.surface` })

// ✅ literal strings per hue, selected at render time
const TONE_CLASS: Record<BadgeTone, string> = {
  sage: css({ bg: "tint.sage.surface", color: "tint.sage.text", borderColor: "tint.sage.border" }),
  // …one entry per hue
};

class

= { TONE_CLASS[tone] }
```

### `linkbio.*` — scoped exception

`/linkbio` is a standalone always-dark page that does **not** follow the site theme. Its tokens are single-valued: identical in light and dark.

`canvas` · `surface` · `border` · `ring` · `textPrimary` · `textSecondary` · `control` · `controlHover` · `menuSurface` · `menuBorder` · `menuItemHover` · `separator` · `headingFrom` · `headingTo` · `focus`

`linkbio.focus` is the keyboard focus ring, bound to `vermilion.500` so focus looks the same here as on the rest of the site (where `border.focus` resolves to the same colour in dark mode). It clears 3:1 on every linkbio surface: 6.8:1 on the canvas, 4.8:1 on `control` and 4.9:1 on `menuSurface`, 3.3:1 on a highlighted `menuItemHover`. Use `outline: 2px solid token(colors.linkbio.focus)` with a `2px` offset, inset (`-2px`) for menu items.

**Only** `src/views/linkbio/**` and `src/layouts/linkbio-layout.astro` may use these, and those files must use nothing else.

---

## Elevation

Shadow tokens under `shadows.elevation.*`, each carrying its own dark variant.

| Token                      | Use for                                           |
| -------------------------- | ------------------------------------------------- |
| `elevation.pill`           | header pill once scrolled or with the menu open   |
| `elevation.avatar`         | hairline ring around the header avatar            |
| `elevation.sheet`          | side sheet (left / right / top)                   |
| `elevation.sheetBottom`    | bottom sheet — hairline top edge plus upward cast |
| `elevation.control`        | circular control lifted off a sheet surface       |
| `elevation.controlPressed` | that control settled while held                   |

The light-mode shadows are cool-tinted ambient casts. In dark mode that tint is invisible against the canvas, so each dark variant substitutes a deeper black cast **plus a hairline rim of light** — the rim is what actually reads as lift on a dark ground.

From CSS, reference them as custom properties:

```css
box-shadow: var (--shadows-elevation-pill); /* carries both themes */
```

---

## Long-form content

Rendered Markdown is styled by the `.prose` layer in `src/ui/styles/global.css`, applied by `src/ui/components/markdown.astro`. It is a plain element stylesheet — headings, paragraphs, lists, links, tables, inline code, rules and images — and every value in it is a semantic token:

```css
.prose :is(h1, h2, h3, h4, h5, h6) {
  color: var(--colors-text-primary);
}

.prose :is(p, li, td, th, blockquote) code {
  background-color: var(--colors-bg-raised);
}

.prose :is(th, td) {
  border-bottom: 1px solid var(--colors-border-hairline);
}
```

Prose links are vermilion, matching the rest of the site. They were previously emerald, which put a second, unrelated accent in the middle of every article.

This layer replaced `@prose-ui/style`, adopted when the site ran on Next.js and MDX. Roughly half of that stylesheet styled its own React components (`.callout`, `.steps`, `.cards`, `.tabs`, `.code-group`); Comark emits none of them, and only ten of its 222 rules ever matched a page. Its colours were not carried over: unbound properties fell back to neutral greys — `oklch(0.97 0 0)`
behind inline code, `oklch(0.5 0 0)` for table headers — which sat outside the token system and were invisible to the system.

`.prose` lives in its own cascade layer, declared _before_ Panda's:

```css
@layer reset, base, tokens, prose, recipes, utilities;
```

That ordering is what lets a component override a prose default with `css()`. Left unlayered, these element rules would beat every Panda class regardless of specificity — `.prose blockquote { font-style: italic }` would win over an explicit `fontStyle: "normal"` on the element itself.

Headings in prose are set in **Fraunces**, matching the page titles and the site's display voice; body text stays in Geist. The variation settings (`SOFT 50`, `WONK 1`) are repeated in the prose layer because rendered Markdown cannot carry `.fraunces-font` on its own headings. Tracking is roughly half the negative value the Geist-tuned scale used — a serif with this much modulation closes up quickly. The footnote label is explicitly exempt: it is apparatus, not display, so it stays in the
interface face.

Quotations are set in **Instrument Serif** at 1.5rem, italic, behind the accent rule, in `text.primary` — a quotation is content the author chose to include, not chrome to play down. There is one quotation style and `::quote` renders the same one; the component adds a citation rather than a different look, so an author picks between `>` and `::quote` on whether there is a source to attribute. A quote's own attribution — an inline `cite` or the component's
`figcaption` — is apparatus and stays in Geist.

The scale is anchored below the page's own post title (`4xl`, 2.25rem), so a body `#` cannot outrank the thing it sits under:

| Level                         |      Size | Note                                                     |
| :---------------------------- | --------: | :------------------------------------------------------- |
| Post title (outside `.prose`) |   2.25rem | `4xl`, matching the about and home titles                |
| `h1`                          |   1.75rem |                                                          |
| `h2`                          |    1.5rem | The top level in practice — see below                    |
| `h3`                          |   1.25rem |                                                          |
| `h4`                          |      1rem | Body size; the face and weight carry it                  |
| `h5`                          | 0.9375rem |                                                          |
| `h6`                          |  0.875rem | Uppercase label, `text.muted` — apparatus, not a heading |

`h2` is the rung that matters. An article's title comes from frontmatter, so no post in the collection opens a `#`; `##` is the top-level heading every article actually uses. The scale used to sit one step lower — anchored under a `3xl`
title — which left `h2` at 1.3125rem, 1.31× the body size, carrying a section break on the strength of the serif face alone.

### The reading column

`.prose` is typography; `.prose-longform` adds the column, and article pages apply both. It is a three-track grid — everything lands on `text`, and a block carrying `data-prose-track="wide"` spans the full article width instead:

| Track  | Width                                                   | Holds                             |
| :----- | :------------------------------------------------------ | :-------------------------------- |
| `text` | `--prose-measure`, 40rem (~79 characters)               | Everything, including code blocks |
| `wide` | The container — 64rem at `lg`, 61rem inside the gutters | Tables and `::figure`             |

Code blocks stay on the measure deliberately: a sample that lines up with the prose around it reads as part of the argument, and a long line scrolls inside its own box. Tables and figures take the extra width because it buys them something — columns that would otherwise wrap, and an image that would otherwise be smaller than the thing it illustrates.

The measure is 40rem, ~79 characters. Panda's `prose` size token (65ch)
resolves in Geist to 43rem, which runs to ~85 — past the 60–75 that continuous reading is comfortable in, and close to the 89 the old single-column layout ran to; 40rem takes most of the extra width without going there. It is written as a fixed rem rather than a `ch` value because `ch` is a font metric, and
`font-display: swap` would otherwise widen the whole column by several rem the moment Geist replaced the fallback face. The `wide` track is sized from the measure, not independently: the container went 4xl → 5xl at the same time, so a figure keeps a full 10rem of overhang per side and breaking out still reads as breaking out. Page furniture outside `.prose` — a post's date and title — aligns to the same measure with the `prose-column` class.

Rhythm is expressed as **top margins only, never bottom**. Margins do not collapse between grid items, so the usual top-and-bottom pattern would silently double every gap the moment the container became a grid.

Panels — code blocks, tables and figures — carry `data-prose-panel` and sit in more air than a paragraph does, claimed on both sides:

| Between                               |    Gap |
| :------------------------------------ | -----: |
| Paragraph and paragraph               | 1.15em |
| Paragraph and panel, either direction |    2em |
| Heading and the panel it introduces   |    1em |

`data-prose-panel` is deliberately separate from `data-prose-track`. They were briefly the same attribute, and the moment code blocks stopped breaking out of the measure they silently lost all their spacing — placement and rhythm are independent decisions and need independent hooks.

### Components in content

Markdown may invoke components with Comark's `::name` syntax. Each is registered in `src/ui/components/prose/index.tsx` and listed in `tags.ts`; the parser validates every document against that list, so `::calout` fails the build rather than shipping as an unstyled inline element — which is what an unregistered tag silently renders as.

| Component                   | For                                    | Notes                                                                          |
| :-------------------------- | :------------------------------------- | :----------------------------------------------------------------------------- |
| `::callout{type}`           | A remark that interrupts the argument  | `note` (sky), `warning` (ochre), `insight` (sage); `title` overrides the label |
| `::aside`                   | Marginalia the argument could lose     | Text column today; the shape a right-hand sidenote will take                   |
| `::quote{source href}`      | A quotation with a source to attribute | Same treatment as `>`; adds a linkable citation in a `figcaption`              |
| `::figure{src alt caption}` | An image outside the measure           | `layout="wide"` by default                                                     |
| `::tweet{author href}`      | An X post, rendered as a static card   | `handle`, `avatar`, `date` optional; nest a `:::tweet` for a referenced post   |

Three authoring constraints worth knowing. Attribute values are plain text, not Markdown — `source="Augustine, *Confessions* I.1"` renders the asterisks. Comark bypasses Astro's asset pipeline, so a `::figure` `src` is not processed:
point it under `public/` and give `width` and `height` so the box is reserved. And a `::tweet` `href` must be a post URL on `x.com` or `twitter.com`; any other host fails the build, as does a handle that cannot be read from `handle` or from the URL's first path segment.

A bare `![alt](src)` is parsed inside a paragraph and therefore cannot leave the text column. `::figure` is the only way to place an image in the `wide` track.

### Table of contents

`<Markdown toc />` adds a table of contents built by `comark/plugins/toc` from the document's top-level `h2` and `h3` headings. Articles, `/about` and `/colophon` turn it on. A page with fewer than three headings gets none — at that length an outline is noise.

It takes two shapes, split by a single media query, `(min-width: 80rem) and (hover: hover)`:

| Where                               | Shape                                                                    | Component            |
| :---------------------------------- | :----------------------------------------------------------------------- | :------------------- |
| Wide screen, real pointer           | Hairline ticks at the viewport's right edge; hover or focus opens a card | `toc/toc-rail.astro` |
| Everything else, touch of any width | A floating pill naming the current section, opening a bottom sheet       | `toc/toc-sheet.tsx`  |

The rail sits at the viewport edge, not in the article's gutter, because the gutter is the `wide` track that tables and figures break out into. Ticks are `border.strong`, an `h3` half the length of an `h2`; the current section's tick lengthens and turns `accent.default`, and the card repeats it as a 2px bar beside the title. The card stays focusable while closed (transparent, not `visibility: hidden`), so `:focus-within` opens it for keyboard users.

The pill is the header's pill in miniature — `bg.overlay` behind a blur, `elevation.pill` — with a progress ring in `accent.default` over `bg.track`. It only appears once the reader is inside the article, and it is hydrated with `client:media` on the inverse query, so wide pointer screens never load it.

The first row of both the card and the sheet is `Back to top` — a plain `#main` fragment link, the same one `back-to-top.astro` renders under the prose at the end of every long-form page. Nothing scripts the scroll: the browser animates it through `scroll-behavior`, drops to an instant jump under reduced motion, and carries the sequential focus point with it.

Both read one tracker, `trackReadingPosition` in `src/utils/toc.ts`: the active section is the last heading above a reading line 120px down, which clears the `scroll-margin-top: 5rem` every prose heading carries. The two queries are duplicated as literals because Panda extracts styles statically — change one and change the other.

### Footnotes

`comark/plugins/footnotes` collects `[^ref]` markers into a labelled section at the end of the document. Three things about it are worth remembering.

It copies a definition's source in as raw text, so `src/utils/comark.ts`
re-parses each body to restore emphasis, code and links. It captures only a definition's _first_ block, so an indented continuation paragraph is dropped — footnotes are deliberately one block long.

And it has two silent failure modes, both of which now fail the build instead:

| Written                | What the plugin does                        | Fix                                         |
| :--------------------- | :------------------------------------------ | :------------------------------------------ |
| `[^a][^b]`             | Drops the first marker _and_ its definition | Separate them: `[^a]<sup>,&nbsp;</sup>[^b]` |
| `[^x]` with no `[^x]:` | Strips the brackets, leaves stray `^x` text | Add the definition, or remove the reference |

Both were found by writing them, not by reading the plugin. `assertFootnotesResolved`
skips code, so a character class like `[^abc]` in a regex passes through.

There are no fixture posts, so judge changes to this layer against the pages that use it. `/about` carries links, footnotes, `::callout` and `::quote`. `/writing/interfaces-are-arguments` carries `::tweet` embeds, tables and a code block. `/writing/the-shape-of-a-good-change` carries task lists; it is a draft, so it renders under `npm run dev` only. No page uses `::aside` or `::figure` yet, so a change to either needs a throwaway draft to be checked against.

Code blocks are coloured through `syntax.*` — see [that section](#syntax--code-highlighting) for how Shiki's output is bound to the tokens. Judge a palette change against the `save-profile.ts` block on `/writing/interfaces-are-arguments` in both themes, and run `npm run check:syntax`.

---

## Contrast

Every text role clears WCAG AA (4.5:1) on its intended surface, in both themes. The two deliberate exceptions are documented where they appear:

- **`text.faint`** — 3.5:1. Incidental text only, never load-bearing.
- **`vermilion.500` as text on light** — 3.0:1. Which is exactly why `text.accent`
  resolves to `vermilion.600` in light mode. Do not hand-roll `vermilion.500` text.

Syntax colours are held to a stricter 5:1 on `bg.code`, plus a minimum separation from each other, by `npm run check:syntax`, which runs in `build`.

When adding a token, verify the pair before committing it.

---

## Adding to the system

1. **Reach for a semantic token first.** Most needs are already covered.
2. **If none fits, ask what the _role_ is** — not what the colour is. `bg.raised`
   is a role; `clr_neutral_100_800` is a description of two values, which is how one token ends up doing four unrelated jobs.
3. **Add the raw value to Layer 1 only if no existing ramp step works.**
4. **Add the semantic token to Layer 2** with both `base` and `_dark`.
5. **Check contrast** if it will ever carry text.
6. **Document it here.**

Naming is `group.role` in camelCase: `bg.raisedHover`, `text.onAccent`, `border.underlineHover`. The group says where it applies; the role says what it is for. Neither ever names a colour or a theme.
