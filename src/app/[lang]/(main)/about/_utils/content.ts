import type { Languages } from "@/app/_types/app";
import { type AboutPage, allAboutPages } from "content-collections";

export function getAboutPage(displayLanguage: Languages): AboutPage | undefined {
  return allAboutPages.find((page) => page._meta.path === `about-page.${displayLanguage}`);
}
