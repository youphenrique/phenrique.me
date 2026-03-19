import { allHomePages, type HomePage } from "content-collections";

import type { Languages } from "@/types/app";

export function getHomePage(displayLanguage: Languages): HomePage | undefined {
  return allHomePages.find((page) => page._meta.path === `home-page.${displayLanguage}`);
}
