import { allReadingPages, type ReadingPage } from "content-collections";

import type { Languages } from "@/app/_types/app";

export function getReadingPage(displayLanguage: Languages): ReadingPage | undefined {
  return allReadingPages.find((page) => page._meta.path === `reading-page.${displayLanguage}`);
}
