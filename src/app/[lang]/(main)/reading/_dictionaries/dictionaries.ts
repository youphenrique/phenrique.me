import "server-only";
import type { Languages } from "@/types/app";

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  de: () => import("./de.json").then((module) => module.default),
  pt: () => import("./pt.json").then((module) => module.default),
};

export const getAppDictionary = async (locale: Languages) => dictionaries[locale]();
