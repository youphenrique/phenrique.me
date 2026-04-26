# Astro Nano - Project Context

Astro Nano is a static, minimalist, and lightweight portfolio and blog theme built with Astro, MDX, and TypeScript. It is designed for high performance (100/100 Lighthouse score), responsiveness, and accessibility.

## 🛠 Technology Stack

- **Framework:** [Astro](https://astro.build/) (v6+)
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
- Use semantic tokens defined in `panda.config.ts` for consistent colors and spacing.
- The `styled-system/` directory contains the generated CSS utility functions.
- Avoid raw hex codes in components; prefer the `clr_*` semantic tokens.

### Content
- Content is managed via the Astro Content Layer in `src/content.config.ts`.
- Supported loaders: `glob` for Markdown/MDX and YAML.
- **Collections:**
  - `blog`: Articles with `title`, `description`, `date`, `draft`.
  - `projects`: Portfolio items with `demoURL`, `repoURL`.
  - `work`: Professional experience.
  - `books`: Reading list tracking with status, genres, and ratings.

### Internationalization (i18n)
- Configured in `astro.config.ts` with `en`, `de`, and `pt`.
- Translation files are located in `src/i18n/`.

### Code Quality
- Strictly follow TypeScript types.
- Linting is enforced via ESLint with `eslint-plugin-astro`.
- Formatting is handled by Prettier.
