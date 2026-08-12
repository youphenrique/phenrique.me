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
          value: { base: "#f6f5ed", _dark: "#111" },
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
          value: { base: "#EB5E41", _dark: "#EB5E41" },
        },
        clr_neutral_100_950_alpha_20: {
          // header-bg
          value: { base: "rgba(245, 245, 245, 0.2)", _dark: "rgba(10, 10, 10, 0.2)" },
        },
        clr_neutral_100_800: {
          // languages-menu-bg
          value: { base: "{colors.neutral.100}", _dark: "{colors.neutral.800}" },
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
