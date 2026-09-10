import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

import react from "@astrojs/react";

export default defineConfig({
  site: "https://www.phenrique.me",
  integrations: [sitemap(), react()],
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
  },
  // Fonts are fetched from Google at build time and served from this origin:
  // no third-party connection, preloadable URLs, and metric-matched fallbacks.
  // Only the `latin` subset ships — it covers both English and Portuguese.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Geist",
      cssVariable: "--font-geist",
      weights: ["100 900"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      weights: ["100 900"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["ui-monospace", "monospace"],
    },
    {
      provider: fontProviders.google(),
      name: "Fraunces",
      cssVariable: "--font-fraunces",
      weights: ["100 900"],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["serif"],
      // `.fraunces-font` and prose headings set SOFT and WONK. Google only
      // includes an axis in the file when it is requested, so without these
      // the variation settings are silently ignored.
      options: {
        experimental: {
          variableAxis: {
            opsz: [["9", "144"]],
            SOFT: [["0", "100"]],
            WONK: [["0", "1"]],
          },
        },
      },
    },
    {
      provider: fontProviders.google(),
      name: "Instrument Serif",
      cssVariable: "--font-instrument-serif",
      weights: [400],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["serif"],
    },
  ],
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});