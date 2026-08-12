# Copilot Instructions

## Commands

```bash
pnpm run dev          # Dev server at localhost:4321
pnpm run build        # astro check + astro build (type-check before build)
pnpm run preview      # Preview production build
pnpm run lint         # Run ESLint
pnpm run lint:fix     # Auto-fix ESLint issues
pnpm run prepare      # Regenerate Panda CSS (styled-system/) after config changes
pnpm run sync         # Regenerate TypeScript types for Astro modules
```

There are no automated tests.

## Architecture

This is a static Astro site (output: `static`) deployed to Vercel. Two distinct sections exist with separate layouts and routing:

- **Main portfolio/blog** (`src/pages/`) — uses `main-layout.astro`. Sections: home, blog, work, projects, reading.
- **Linkbio** (`src/pages/linkbio/`) — a separate link-in-bio page using `linkbio-layout.astro`, with its own i18n dictionaries in `src/i18n/linkbio/`.

Content is managed via the Astro Content Layer (`src/content.config.ts`):
- `blog`, `work`, `projects` — Markdown/MDX files
- `books`, `socialLinks`, `linkbioPages`, `readingPages` — YAML files

Homepage item counts are controlled by `SITE.NUM_POSTS_ON_HOMEPAGE`, `NUM_WORKS_ON_HOMEPAGE`, `NUM_PROJECTS_ON_HOMEPAGE` in `src/consts.ts`.

## Styling (Panda CSS)

Styles are generated at build time. The `styled-system/` directory is auto-generated — do not edit it directly.

- Import the `css` utility from `../../styled-system/css` (path relative to file location)
- Use semantic color tokens from `panda.config.ts`, not raw hex values:
  - `clr_neutral_800_200` — primary text
  - `clr_neutral_700_400` — secondary text
  - `clr_neutral_950_snow` — high-contrast text
  - `clr_white_neutral_900` — app background
  - `clr_neutral_300_700` — borders and hover backgrounds
  - `clr_coral_flame` — accent/brand color
- Token names follow the pattern `clr_<light-value>_<dark-value>`
- After changing `panda.config.ts`, run `pnpm run prepare` to regenerate

Entrance animations use the `animate` CSS class (defined in `global.css` via Bear Blog's base styles).

## i18n

Configured in `astro.config.ts` with locales `en` (default), `de`, `pt`. The linkbio section has per-locale pages and its own typed dictionaries (`src/i18n/linkbio/{en,de,pt}.ts`) implementing the `LinkbioDictionary` interface.

## Content Schemas

All schemas are defined in `src/content.config.ts` using Zod. Key fields:
- **blog/projects**: `draft: boolean` — filter out drafts with `.filter((post) => !post.data.draft)`
- **work**: `dateEnd` accepts either a `Date` or a string (e.g. `"Present"`)
- **books**: `status` is `"reading" | "finished"`, `finishedDate` is nullable

## Conventions

- Global site metadata (name, email, social links) lives in `src/consts.ts` — update there, not in individual pages.
- The `src/lib/utils.ts` file contains shared helpers: `readingTime(html)` and `dateRange(startDate, endDate)`.
- Prose/article content in Markdown is styled via `@prose-ui` — the wrapper element needs the `prose-ui` CSS class.
- `@fontsource-variable/fraunces` is imported in `main-layout.astro`; Geist fonts are used as the prose UI font family via CSS variables in `global.css`.
