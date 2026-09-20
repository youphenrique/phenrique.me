import type { APIRoute } from "astro";

/**
 * The `llms.txt` line is a comment, not a directive: no crawler acts on it. It
 * is there because `robots.txt` is the one file an agent is already certain to
 * fetch, which makes it the cheapest place to say that plain-Markdown versions
 * of these pages exist.
 */
const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", import.meta.env.SITE).href}

# Markdown versions of these pages, indexed at:
# ${new URL("llms.txt", import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
