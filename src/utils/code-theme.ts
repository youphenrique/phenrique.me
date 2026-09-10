import type { ShikiOptions } from "comark/plugins/shiki";
import materialThemeLighter from "shiki/dist/themes/material-theme-lighter.mjs";
import materialThemePalenight from "shiki/dist/themes/material-theme-palenight.mjs";

/**
 * Syntax colours are a separate palette because Shiki writes them as inline
 * styles at build time; Panda cannot resolve semantic tokens inside a theme.
 * Every replacement is the same value as a darker step in `panda.config.ts`.
 * They are deliberately tuned to the code panel's light `bg.raised` surface.
 */
const LIGHT_CODE_BACKGROUND = "#F0EEE6";
const LIGHT_CODE_FOREGROUND = "#55504A";
const MINIMUM_CODE_CONTRAST = 5;

const warmLightReplacements: Record<string, string> = {
  "#90A4AE": LIGHT_CODE_FOREGROUND, // ink.600 — variables and comments
  "#91B859": "#3F6B51", // sage.600 — strings
  "#39ADB5": "#2F5D8C", // sky.600 — punctuation and control flow
  "#FF5370": "#8C4128", // coral.700 — booleans and quote punctuation
  "#F76D47": "#8A4E2F", // clay.600 — numbers and attributes
  "#6182B8": "#4E4899", // periwinkle.600 — functions
  "#9C3EDA": "#4E4899", // periwinkle.600 — storage and modifiers
  "#E53935": "#8C4128", // coral.700 — properties and definitions
  "#E2931D": "#7A5A1B", // ochre.600 — types and classes
  "#8796B0": LIGHT_CODE_FOREGROUND,
  "#90A4AE90": LIGHT_CODE_FOREGROUND,
  "#916B53": "#8A4E2F",
};

function relativeLuminance(hex: string): number {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    ?.map((channel) => Number.parseInt(channel, 16) / 255);

  if (channels === undefined || channels.length !== 3) {
    throw new Error(`[code-theme] Expected a six-digit hex colour, received "${hex}".`);
  }

  const [red, green, blue] = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );

  return red * 0.2126 + green * 0.7152 + blue * 0.0722;
}

function contrastRatio(foreground: string, background: string): number {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

for (const colour of new Set(Object.values(warmLightReplacements))) {
  const ratio = contrastRatio(colour, LIGHT_CODE_BACKGROUND);
  if (ratio < MINIMUM_CODE_CONTRAST) {
    throw new Error(
      `[code-theme] ${colour} has ${ratio.toFixed(2)}:1 contrast on ` +
        `${LIGHT_CODE_BACKGROUND}; expected at least ${MINIMUM_CODE_CONTRAST}:1.`,
    );
  }
}

const baseTokenColors = materialThemeLighter.tokenColors;
if (baseTokenColors === undefined) {
  throw new Error("[code-theme] The Material Theme Lighter base has no token colours.");
}

const warmLightTheme = {
  ...materialThemeLighter,
  name: "astro-nano-warm-light",
  displayName: "Astro Nano Warm Light",
  colors: {
    ...materialThemeLighter.colors,
    "editor.background": LIGHT_CODE_BACKGROUND,
    "editor.foreground": LIGHT_CODE_FOREGROUND,
  },
  tokenColors: baseTokenColors.map((rule) => {
    const foreground = rule.settings.foreground;
    if (foreground === undefined) return rule;

    const replacement = warmLightReplacements[foreground.toUpperCase()];
    if (replacement === undefined) {
      throw new Error(`[code-theme] No accessible warm replacement is defined for ${foreground}.`);
    }

    return { ...rule, settings: { ...rule.settings, foreground: replacement } };
  }),
};

/** Shared by every Comark parse path so a block receives the same two themes. */
export const codeHighlightOptions = {
  registerDefaultThemes: false,
  themes: {
    light: warmLightTheme,
    dark: materialThemePalenight,
  },
} satisfies ShikiOptions;
