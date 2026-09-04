import fs from "node:fs";
import path from "node:path";

import type { APIRoute } from "astro";

/**
 * Serves docs/design-system.md verbatim at /design.md, the way Resend publishes
 * resend.com/design.md: one source of truth in the repo, readable by people and
 * by agents pointed at the live site.
 *
 * Read at build time (`output: "static"`), so the file is inlined into the
 * generated response and never touched at runtime.
 */
const designDoc = fs.readFileSync(path.resolve("docs/design-system.md"), "utf-8");

export const GET: APIRoute = () => {
  return new Response(designDoc, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
};
