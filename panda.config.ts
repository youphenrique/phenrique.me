import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx,astro}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
    semanticTokens: {
      colors: {
        clr_white_neutral_900: {
          // app-bg
          value: { base: "#faf6f2", _dark: "lab(5.26466% .56015 1.26457)" },
        },
        clr_book_card_bg: {
          // book-preview-card-bg
          value: { base: "#F0EEE6", _dark: "#18191B" },
        },
        clr_book_card_bg_hover: {
          // book-preview-card-bg (hovered)
          value: { base: "#e8e6dc", _dark: "#212225" },
        },
        clr_neutral_50_800: {
          // error-fallback-bg
          value: { base: "{colors.neutral.50}", _dark: "{colors.neutral.800}" },
        },
        clr_neutral_950_snow: {
          value: { base: "#0A0A0A", _dark: "#F5F5F5" },
        },
        clr_gray_soft: {
          value: { base: "#404040", _dark: "#E5E5E5" },
        },
        clr_coral_flame: {
          value: { base: "#D97757", _dark: "#D97757" },
        },
        clr_neutral_100_950_alpha_20: {
          // header-bg
          value: { base: "rgba(250, 246, 242, 0.5)", _dark: "rgba(17, 17, 17, 0.5)" },
        },
        clr_neutral_100_800: {
          // languages-menu-bg
          value: { base: "{colors.neutral.100}", _dark: "{colors.neutral.800}" },
        },
        bg_neutral_100_700: {
          // menu-hover-bg, border-color
          value: { base: "#e8e6dc", _dark: "{colors.neutral.700}" },
        },
        clr_neutral_300_700: {
          // menu-hover-bg, border-color
          value: { base: "{colors.neutral.300}", _dark: "{colors.neutral.700}" },
        },
        clr_neutral_900_50: {
          // text-hiper-primary, svg-hover-color, svg-fill-color
          value: { base: "{colors.neutral.900}", _dark: "{colors.neutral.50}" },
        },
        clr_neutral_800_200: {
          // text-primary
          value: { base: "{colors.neutral.800}", _dark: "{colors.neutral.200}" },
        },
        clr_neutral_700_400: {
          // text-secondary
          value: { base: "{colors.neutral.700}", _dark: "{colors.neutral.400}" },
        },
        clr_diff_added: {
          // latest-commit insertions
          value: { base: "#1a7f37", _dark: "#3fb950" },
        },
        clr_diff_removed: {
          // latest-commit deletions
          value: { base: "#cf222e", _dark: "#f85149" },
        },
        clr_neutral_400_500: {
          // text-forty
          value: { base: "{colors.neutral.400}", _dark: "{colors.neutral.500}" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
