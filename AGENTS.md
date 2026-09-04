# Astro Nano - Project Context

Astro Nano is a static, minimalist, and lightweight portfolio and blog theme built with Astro, MDX, and TypeScript. It is designed for high performance (100/100 Lighthouse score), responsiveness, and accessibility.

## 🛠 Technology Stack

- **Framework:** [Astro](https://astro.build/) (v7+)
- **Styling:** [Panda CSS](https://panda-css.com/) (Modern CSS-in-JS/Build-time CSS)
- **Content:** Astro Content Layer with Markdown and MDX support.
- **Language:** TypeScript
- **i18n:** Built-in support for English (default) and Portuguese.
- **Deployment:** Optimized for Vercel (static output).

## 📁 Project Structure

- `src/content/`: Main content collections (Blog, Projects, Work, Books, Social Links).
- `src/pages/`: File-based routing, including i18n-specific routes.
- `src/components/`: Reusable Astro components.
- `src/layouts/`: Base templates (`main-layout.astro`, `linkbio-layout.astro`).
- `src/i18n/`: Localization data and types.
- `src/consts.ts`: Global site metadata and configuration.
- `panda.config.ts`: Styling configuration and semantic tokens.

## 🚀 Building and Running

The project uses `npm` (or `pnpm`/`yarn`) for package management.

- **Install dependencies:** `npm install`
- **Development server:** `npm run dev` (starts at `localhost:4321`)
- **Build for production:** `npm run build` (runs `astro check` and `astro build`)
- **Preview production build:** `npm run preview`
- **Linting:** `npm run lint` or `npm run lint:fix`
- **Panda CSS Codegen:** `npm run prepare` (automatically runs `panda codegen`)

## 🎨 Development Conventions

### Styling (Panda CSS)
- The `styled-system/` directory contains the generated CSS utility functions.
- Run `npm run prepare` (`panda codegen`) after changing `panda.config.ts`. A running dev server does **not** pick up config changes — restart it.
- In `panda.config.ts`, tokens go under `theme.extend.*`, never `theme.*` directly. A top-level `theme.tokens` **replaces** Panda's preset instead of merging, silently removing `fontSizes`, `sizes`, `radii` and the default shadow scale.

### Color (Design System)

Full documentation: **[`docs/design-system.md`](docs/design-system.md)**, published at **[/design.md](https://www.phenrique.me/design.md)**.

Two layers, and only the second is public API:

- **Layer 1 — raw palette** (`theme.extend.tokens.colors`): `sand`, `ink`, `coral`, the editorial tints (`sage`, `moss`, `sky`, `periwinkle`, `clay`, `ochre`) and `signal`. Never referenced from a component.
- **Layer 2 — semantic roles** (`theme.extend.semanticTokens.colors`): `bg.*`, `text.*`, `border.*`, `accent.*`, `status.*`, `sheet.*`, `tint.*`, `linkbio.*`. Each carries a `{ base, _dark }` pair. **This is what components write.**

```ts
// ✅ semantic role — carries both themes
css({ bg: "bg.raised", color: "text.secondary", borderColor: "border.subtle" })

// ❌ raw palette (single value) or hex (invisible to the system)
css({ bg: "sand.200", color: "#55504A" })
```

Rules worth knowing before writing styles:

- **No hex, no `rgba()` in components.** Every colour is a semantic token. Translucent tokens (`bg.hover`, `bg.scrim`, `border.subtle`, `border.underline`, `border.hairline`) already cover the cases a solid ramp step cannot.
- **`accent.default` is never text.** It is for fills, rings and indicators. Accent text uses `text.accent`, which resolves to `coral.600` in light mode — `coral.500` is only 2.9:1 on the cream canvas and fails AA.
- **Text levels:** `text.primary` headings · `text.secondary` body and prose · `text.muted` single-line metadata · `text.faint` incidental only (3.5:1, fails AA by design).
- **`tint.*` classifies content, not chrome.** Use `surface`/`text` as a matched pair; never mix hues across a pair. Assign a hue per category with `tintForKey` from `src/utils/tint.ts`, pinning small known vocabularies explicitly (see `GENRE_HUES` in `book-genre-badge.astro`) — never by list index.
- **Panda extracts styles statically.** A computed token path such as `` css({ bg: `tint.${hue}.surface` }) `` generates no CSS at all. Use a `Record<Hue, string>` of literal `css()` calls and index into it. The same applies to token names inside JS strings: write CSS custom properties in kebab-case (`--colors-bg-raised-hover`), not the dotted token path.
- **`linkbio.*` is scoped.** Only `src/views/linkbio/**` and `src/layouts/linkbio-layout.astro` may use it, and those files use nothing else — `/linkbio` is always dark and does not follow the site theme.
- **Elevation** lives in `shadows.elevation.*`; from plain CSS use `var(--shadows-elevation-pill)`, which carries both themes.
- Long-form content: `prose-ui`'s custom properties are bound to semantic tokens in `src/ui/styles/global.css`. Change them there, not per-article.

### Content
- Content is managed via the Astro Content Layer in `src/content.config.ts`.
- Supported loaders: `glob` for Markdown/MDX and YAML.
- **Collections:**
    - `blog`: Articles with `title`, `description`, `date`, `draft`.
    - `projects`: Portfolio items with `demoURL`, `repoURL`.
    - `work`: Professional experience.
    - `books`: Reading list tracking with status, genres, and ratings.

### Internationalization (i18n)
- Configured in `astro.config.ts` with `en` (default) and `pt`.
- Translation files are located in `src/i18n/`.

### Code Quality
- Strictly follow TypeScript types.
- Linting is enforced via ESLint with `eslint-plugin-astro`.
- Formatting is handled by Prettier.
