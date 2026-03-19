import { allLinkbioPages, type LinkbioPage } from "content-collections";
import type { Languages } from "@/app/_types/app";

export function getLinkbioPage(displayLanguage: Languages): LinkbioPage | undefined {
  return allLinkbioPages.find((page) => page._meta.path === `linkbio-page.${displayLanguage}`);
}
