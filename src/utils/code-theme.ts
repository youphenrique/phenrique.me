import type { ShikiOptions } from "comark/plugins/shiki";
import { createCssVariablesTheme } from "shiki";
import kotlin from "shiki/dist/langs/kotlin.mjs";

/**
 * Shiki writes token colours as inline styles at build time, so a normal theme
 * hard-codes hex values that Panda never sees. The css-variables theme writes
 * `var(--shiki-token-keyword)` and friends instead; `global.css` binds those to
 * the `syntax.*` semantic tokens. Colours, contrast and both themes therefore
 * live in `panda.config.ts`, checked by `scripts/check-syntax-colors.ts`.
 */
const baseTheme = createCssVariablesTheme({ name: "syntax-tokens" });

const syntaxTheme = {
  ...baseTheme,
  tokenColors: [
    ...(baseTheme.tokenColors ?? []),
    // The stock theme files object references (`result` in `result.ok`) under
    // `constant`, the same colour as `true` and `404`. An identifier is text.
    {
      scope: ["variable.other.object", "variable.other.class"],
      settings: { foreground: "var(--shiki-foreground)" },
    },
    // It only matches `variable.parameter.function`, which the TypeScript and
    // JavaScript grammars never emit, so parameters were never coloured.
    { scope: "variable.parameter", settings: { foreground: "var(--shiki-token-parameter)" } },
    // A type annotation's colon (`result: SaveResult`) is punctuation, but it
    // inherits `keyword` from `keyword.operator` and was painted like `export`.
    {
      scope: "keyword.operator.type.annotation",
      settings: { foreground: "var(--shiki-token-punctuation)" },
    },
  ],
};

/**
 * Shared by every Comark parse path. The plugin always requests a light and a
 * dark theme; both are the same theme, because the variables switch instead.
 */
export const codeHighlightOptions = {
  registerDefaultThemes: false,
  // Comark preloads only vue, tsx, svelte, ts, js, bash, json, yaml and astro.
  // Any other fence language fails inside the plugin and silently renders as
  // plain, unhighlighted text — register a language here before writing it.
  languages: [...kotlin],
  themes: {
    light: syntaxTheme,
    dark: syntaxTheme,
  },
} satisfies ShikiOptions;
