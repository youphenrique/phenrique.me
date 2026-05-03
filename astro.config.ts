import { defineConfig } from "astro/config";
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
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});