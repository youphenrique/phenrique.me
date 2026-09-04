# phenrique.me — Design System

The colour system for [phenrique.me](https://phenrique.me). One source of truth, mirrored publicly at [phenrique.me/design.md](https://phenrique.me/design.md).

Implemented in [`panda.config.ts`](../panda.config.ts) with
[Panda CSS](https://panda-css.com/). Point an agent at `/design.md` and it has everything it needs to write correct styles for this site.

---

## The one rule

**Components use semantic tokens. Never raw palette values, never hex.**

```ts
// ✅
css({ bg: "bg.raised", color: "text.secondary", borderColor: "border.subtle" })

// ❌ raw palette — has no light/dark pair
css({ bg: "sand.200", color: "ink.600" })

// ❌ hex — invisible to the system, breaks in dark mode
css({ bg: "#F0EEE6", color: "#55504A" })
```

A semantic token carries **both** theme values. A raw palette token carries one. Reaching past the semantic layer is how a component ends up unreadable in dark mode.

---

## Architecture

Two layers, and only the second is public API.

```
┌─ Layer 1 · raw palette ──────────── theme.extend.tokens.colors ──┐
│  sand · ink · coral · sage · moss · sky · periwinkle · clay      │
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
`theme.tokens` would *replace* the preset and silently take `fontSizes`,
`sizes`, `radii` and the default shadow scale with it.

Dark mode is the `_dark` condition, which Panda compiles to `.dark &`. The class is set on `<html>` by the inline theme script in `src/ui/common/head.astro`.

---

## Layer 1 — the raw palette

### Warm neutrals

`sand` and `ink` are **one continuous ramp split at the midpoint**. They are two names rather than one because each theme draws from one half: light mode takes surfaces from `sand` and text from `ink`, and dark mode does exactly the reverse.

| Token      | Hex       | Typical role                                      |
|------------|-----------|---------------------------------------------------|
| `sand.50`  | `#FAF6F2` | app canvas (light) · **fixed**                    |
| `sand.100` | `#F5F1E8` | sunken surface (light)                            |
| `sand.200` | `#F0EEE6` | raised surface (light)                            |
| `sand.300` | `#E7E3D9` | hover (light) · **primary text (dark)**           |
| `sand.400` | `#D9D3C6` | default border (light)                            |
| `sand.500` | `#C4BDAE` | strong border (light) · **secondary text (dark)** |
| `ink.300`  | `#A8A199` | muted text (dark)                                 |
| `ink.400`  | `#8A837A` | decorative only — 3.5:1, fails body text          |
| `ink.500`  | `#6E675E` | muted text (light)                                |
| `ink.600`  | `#55504A` | secondary text (light)                            |
| `ink.700`  | `#3D3A36` | strong border (dark)                              |
| `ink.800`  | `#2C2A28` | default border (dark) · hover (dark)              |
| `ink.850`  | `#232120` | **primary text (light)** · raised hover (dark)    |
| `ink.900`  | `#1A1918` | raised surface (dark)                             |
| `ink.950`  | `#0D0B0A` | app canvas (dark) · **fixed**                     |

The ramp is warm end to end. Dark surfaces are warm near-blacks, not the cool greys a default palette would give you — that is what keeps dark mode feeling like the same site rather than an inverted one.

### Accent — coral

`coral.500` `#D97757` is the brand colour and does not change.

| Token       | Hex       | Role                                 |
|-------------|-----------|--------------------------------------|
| `coral.50`  | `#FCF1EC` | subtle accent surface (light)        |
| `coral.100` | `#F7DED2` |                                      |
| `coral.200` | `#EFC2AE` |                                      |
| `coral.300` | `#E5A184` | accent emphasis (dark)               |
| `coral.400` | `#DF8968` | accent hover (dark)                  |
| `coral.500` | `#D97757` | **brand** — fills, indicators, rings |
| `coral.600` | `#B05334` | accent text on light surfaces        |
| `coral.700` | `#8C4128` | accent emphasis (light)              |
| `coral.800` | `#63301F` |                                      |
| `coral.900` | `#3A1D13` |                                      |
| `coral.950` | `#241210` | subtle accent surface (dark)         |

> **Why the ramp exists.** `coral.500` on `sand.50` is **2.9:1** — well under the
> 4.5:1 WCAG AA threshold for body text. It is perfectly fine as a *fill* (a
> progress bar, an active ring, an icon), because those are not text. But small
> text in light mode must use `coral.600` (**4.7:1**). In dark mode `coral.500`
> on `ink.950` is **6.3:1** and needs no substitute.
>
> `text.accent` already encodes this: `coral.600` in light, `coral.500` in dark.
> Use it and the problem disappears.

### Editorial tints

Six hues for classifying **content** — book genres, writing tags, work chips. Never for UI chrome, never for state.

Four steps each. `100`/`900` are surfaces (light/dark); `600`/`400` are the text that sits on them. Every pair clears 4.5:1.

| Hue          | `100` surface | `600` text | `400` text | `900` surface |
|--------------|---------------|------------|------------|---------------|
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
|----------------------|-----------|
| `signal.green`       | `#1A7F37` |
| `signal.greenBright` | `#3FB950` |
| `signal.red`         | `#CF222E` |
| `signal.redBright`   | `#F85149` |

---

## Layer 2 — semantic roles

This is the API. Everything below is what a component writes.

### `bg.*` — surfaces

| Token            | Light                  | Dark                    | Use for                           |
|------------------|------------------------|-------------------------|-----------------------------------|
| `bg.canvas`      | `sand.50`              | `ink.950`               | the page itself                   |
| `bg.raised`      | `sand.200`             | `ink.900`               | cards, menus, badges              |
| `bg.raisedHover` | `sand.300`             | `ink.850`               | hover on a raised surface         |
| `bg.sunken`      | `sand.100`             | `ink.900`               | wells and recessed areas          |
| `bg.hover`       | `rgba(10,10,10,.05)`   | `rgba(255,255,255,.06)` | hover on an *unknown* surface     |
| `bg.track`       | `sand.400`             | `ink.800`               | the groove behind a progress fill |
| `bg.overlay`     | `rgba(250,246,242,.5)` | `rgba(13,11,10,.55)`    | the blurred header pill           |
| `bg.scrim`       | `rgba(10,10,10,.32)`   | `rgba(0,0,0,.5)`        | modal backdrop                    |
| `bg.bloom`       | transparent            | `rgba(255,255,255,.03)` | radial bloom behind the home hero |

`bg.hover` is translucent on purpose: it tints whatever it lands on, so one token covers hover on canvas, on a card, and inside a menu. Use `bg.raisedHover`
only when you know the surface underneath.

### `text.*` — foreground

Ratios are measured against `bg.canvas` in the corresponding theme.

| Token            | Light       | Dark        | Contrast (light / dark)     |
|------------------|-------------|-------------|-----------------------------|
| `text.primary`   | `ink.850`   | `sand.300`  | 15.5:1 / 15.3:1             |
| `text.secondary` | `ink.600`   | `sand.500`  | 7.4:1 / 10.4:1              |
| `text.muted`     | `ink.500`   | `ink.300`   | 5.3:1 / 7.7:1               |
| `text.faint`     | `ink.400`   | `ink.400`   | 3.5:1 — **decorative only** |
| `text.accent`    | `coral.600` | `coral.500` | 4.7:1 / 6.3:1               |
| `text.onAccent`  | `sand.50`   | `sand.50`   | for text on an accent fill  |

**Choosing a level.** `primary` for headings and anything that must be read first. `secondary` for body copy and multi-line prose. `muted` for single-line metadata — authors, section labels, timestamps with context.
`faint` only where the text is genuinely incidental and never load-bearing; it fails AA for body text by design.

### `border.*` — strokes

| Token                   | Light                | Dark                    | Use for                          |
|-------------------------|----------------------|-------------------------|----------------------------------|
| `border.subtle`         | `rgba(10,10,10,.12)` | `rgba(255,255,255,.12)` | card and button outlines         |
| `border.default`        | `sand.400`           | `ink.800`               | dividers, menu edges, rules      |
| `border.strong`         | `sand.500`           | `ink.700`               | emphasis, empty-state glyphs     |
| `border.accent`         | `coral.500`          | `coral.500`             | focus rings, active indicators   |
| `border.underline`      | `rgba(10,10,10,.15)` | `rgba(255,255,255,.3)`  | link underlines at rest          |
| `border.underlineHover` | `rgba(10,10,10,.3)`  | `rgba(255,255,255,.55)` | link underlines on hover         |
| `border.hairline`       | `rgba(10,10,10,.09)` | `rgba(255,255,255,.11)` | row separators in a grouped list |

The translucent ones are deliberate exceptions to "use a ramp step": a stroke that has to sit on an unknown surface cannot be a solid colour.

### `accent.*` — the brand as an interactive role

| Token             | Light       | Dark        | Use for                     |
|-------------------|-------------|-------------|-----------------------------|
| `accent.default`  | `coral.500` | `coral.500` | fills, progress, indicators |
| `accent.hover`    | `coral.600` | `coral.400` | hover on an accent element  |
| `accent.subtle`   | `coral.50`  | `coral.950` | tinted accent background    |
| `accent.emphasis` | `coral.700` | `coral.300` | pressed / highest emphasis  |

**`accent.default` is not for text.** Fills and rings only. Accent *text* goes through `text.accent`, which is contrast-corrected per theme.

### `status.*`

| Token            | Light          | Dark                 | Use for         |
|------------------|----------------|----------------------|-----------------|
| `status.success` | `signal.green` | `signal.greenBright` | diff insertions |
| `status.danger`  | `signal.red`   | `signal.redBright`   | diff deletions  |
| `status.rating`  | `ochre.500`    | `ochre.400`          | filled stars    |

Reserved for machine-reported state. Never decoration.

### `sheet.*` — iOS-style bottom sheet

| Token               | Light                | Dark                    |
|---------------------|----------------------|-------------------------|
| `sheet.bg`          | `sand.200`           | `ink.900`               |
| `sheet.group`       | `sand.50`            | `ink.850`               |
| `sheet.groupActive` | `sand.300`           | `ink.800`               |
| `sheet.grabber`     | `rgba(10,10,10,.18)` | `rgba(255,255,255,.22)` |

The invariant: **the group card is always lighter than the backdrop it sits on**, in both themes. Row separators use `border.hairline`.

### `tint.*` — content classification

Twelve tokens, six matched pairs:

```ts
tint.sage.surface / tint.sage.text
tint.moss.surface / tint.moss.text
tint.sky.surface / tint.sky.text
tint.periwinkle.surface / tint.periwinkle.text
tint.clay.surface / tint.clay.text
tint.ochre.surface / tint.ochre.text
```

```ts
// a genre or tag chip
css({ bg: "tint.sage.surface", color: "tint.sage.text" })
```

**Always use a pair together.** Mixing `tint.sky.surface` with
`tint.clay.text` is not a supported combination and its contrast is unverified.

#### Assigning a hue to a category

Assignment must be **stable** — the same genre is the same colour on every visit — and ideally **distinct** among the categories shown together. Never assign by list index, or the colours shuffle whenever the list changes.

`src/utils/tint.ts` provides the general mechanism:

```ts
import { tintForKey, tintKey } from "../utils/tint.ts";

const hue = tintForKey(tintKey(label)); // stable, hash-based
```

`tintForKey` is stable but **not collision-free** — six hues means distinct labels will sometimes share one. It is a *fallback*, not a strategy.

For a small, known vocabulary, **pin it explicitly** and keep the hash for entries added later. `book-genre-badge.astro` does exactly this:

```ts
const GENRE_HUES: Record<string, TintHue> = {
  christian: "sage", theology: "periwinkle",
  apologetics: "sky", philosophy: "clay",
  "personal development": "ochre", education: "moss",
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
const TINT_CLASS: Record<TintHue, string> = {
  sage: css({ bg: "tint.sage.surface", color: "tint.sage.text" }),
  // …one entry per hue
};

class

= { TINT_CLASS[hue] }
```

### `linkbio.*` — scoped exception

`/linkbio` is a standalone always-dark page that does **not** follow the site theme. Its tokens are single-valued: identical in light and dark.

`canvas` · `surface` · `border` · `ring` · `textPrimary` · `textStrong` ·
`textSecondary` · `control` · `controlHover` · `menuSurface` · `menuBorder` ·
`menuItemHover` · `separator` · `headingFrom` · `headingTo`

**Only** `src/views/linkbio/**` and `src/layouts/linkbio-layout.astro` may use these, and those files must use nothing else.

---

## Elevation

Shadow tokens under `shadows.elevation.*`, each carrying its own dark variant.

| Token                      | Use for                                           |
|----------------------------|---------------------------------------------------|
| `elevation.pill`           | header pill once scrolled or with the menu open   |
| `elevation.avatar`         | hairline ring around the header avatar            |
| `elevation.sheet`          | side sheet (left / right / top)                   |
| `elevation.sheetBottom`    | bottom sheet — hairline top edge plus upward cast |
| `elevation.control`        | circular control lifted off a sheet surface       |
| `elevation.controlPressed` | that control settled while held                   |

The light-mode shadows are cool-tinted ambient casts. In dark mode that tint is invisible against the canvas, so each dark variant substitutes a deeper black cast **plus a hairline rim of light** — the rim is what actually reads as lift on a dark ground.

From CSS, reference them as custom properties:

```css
box-shadow:

var
(
--shadows-elevation-pill

)
; /* carries both themes */
```

---

## Long-form content

`prose-ui` renders Markdown and MDX. Its own custom properties are bound to semantic tokens in `src/ui/styles/global.css`, so prose inherits the palette rather than shipping prose-ui's defaults:

```css
--p-heading-text-color:

var
(
--colors-text-primary

)
;
--p-body-text-color:

var
(
--colors-text-secondary

)
;
--p-link-text-color:

var
(
--colors-text-accent

)
;
--p-link-text-decoration-color:

var
(
--colors-border-underline

)
;
```

Prose links are coral, matching the rest of the site. They were previously emerald, which put a second, unrelated accent in the middle of every article.

---

## Contrast

Every text role clears WCAG AA (4.5:1) on its intended surface, in both themes. The two deliberate exceptions are documented where they appear:

- **`text.faint`** — 3.5:1. Incidental text only, never load-bearing.
- **`coral.500` as text on light** — 2.9:1. Which is exactly why `text.accent`
  resolves to `coral.600` in light mode. Do not hand-roll `coral.500` text.

When adding a token, verify the pair before committing it.

---

## Adding to the system

1. **Reach for a semantic token first.** Most needs are already covered.
2. **If none fits, ask what the *role* is** — not what the colour is. `bg.raised`
   is a role; `clr_neutral_100_800` is a description of two values, which is how one token ends up doing four unrelated jobs.
3. **Add the raw value to Layer 1 only if no existing ramp step works.**
4. **Add the semantic token to Layer 2** with both `base` and `_dark`.
5. **Check contrast** if it will ever carry text.
6. **Document it here.**

Naming is `group.role` in camelCase: `bg.raisedHover`, `text.onAccent`,
`border.underlineHover`. The group says where it applies; the role says what it is for. Neither ever names a colour or a theme.
