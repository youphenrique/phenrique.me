import type { Languages } from "@/app/_types/app";
import { allMetadata, type Metadatum } from "content-collections";

export function getMetadata(displayLanguage: Languages): Metadatum | undefined {
  return allMetadata.find((page) => page._meta.path === `metadata.${displayLanguage}`);
}
