/**
 * The one answer to "what is this page's address in the other language?".
 *
 * Two features need it and must not disagree: the `hreflang` links in
 * `head.astro`, which tell crawlers the two locales are translations, and the
 * header's language menu, which sends a reader across. When they disagree the
 * result is a search engine indexing a pair the reader cannot navigate between.
 */

export const LOCALES = ["en", "pt"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Every locale's address for one page. A missing key means "not translated". */
export type Alternates = Partial<Record<Locale, string>>;

/**
 * De-prefixed paths that exist in both locales, as plain `/foo` with no
 * trailing slash. Listed rather than derived: the file tree is the only other
 * source of truth, and it is not readable at runtime. `/404` is deliberately
 * absent — it is English-only — and so is `/linkbio`, which does not use the
 * main layout.
 */
const TRANSLATED_PATHS = new Set(["/", "/about", "/colophon", "/reading", "/work", "/writing"]);

function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Drops a trailing slash, so `/about/` and `/about` compare equal. `/` stays. */
export function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

/** Splits `/pt/writing` into its locale and the `/writing` it shares with `en`. */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const path = normalizePath(pathname);
  const [, first, ...rest] = path.split("/");

  if (first !== undefined && isLocale(first)) {
    return { locale: first, path: normalizePath(`/${rest.join("/")}`) };
  }

  return { locale: DEFAULT_LOCALE, path };
}

/** The address of a de-prefixed path in one locale. The default locale is bare. */
export function localizedPath(path: string, locale: Locale): string {
  const base = normalizePath(path);

  if (locale === DEFAULT_LOCALE) return base;

  return base === "/" ? `/${locale}` : `/${locale}${base}`;
}

/**
 * Alternates for a page whose address is the same in both locales — every page
 * but the articles, whose slugs are themselves translated.
 *
 * Returns the current locale alone for a path that is not in both, so a caller
 * can treat "one entry" as "no translation" without special-casing.
 */
export function pathAlternates(pathname: string): Alternates {
  const { locale, path } = stripLocale(pathname);

  if (!TRANSLATED_PATHS.has(path)) {
    return { [locale]: localizedPath(path, locale) };
  }

  return Object.fromEntries(LOCALES.map((l) => [l, localizedPath(path, l)]));
}

/**
 * Where the language menu should send a reader who has no translation to go to.
 *
 * Falls back to the section index — `/writing/some-post` with no counterpart
 * lands on `/pt/writing` rather than a 404 — and to the locale's home page when
 * the page has no section. Every section listed in `TRANSLATED_PATHS` exists in
 * both locales, so the fallback always resolves.
 */
export function localeSwitchHref(pathname: string, target: Locale, alternates?: Alternates): string {
  const mapped = alternates?.[target];
  if (mapped) return mapped;

  const { path } = stripLocale(pathname);
  const [, section] = path.split("/");
  const fallback = section ? `/${section}` : "/";

  return localizedPath(TRANSLATED_PATHS.has(fallback) ? fallback : "/", target);
}

/**
 * Matches an alternate's trailing-slash shape to the page's own, so `hreflang`
 * hrefs and the canonical URL never describe the same page two ways. The static
 * build emits directory-style URLs, so live pathnames carry a trailing slash.
 */
export function matchTrailingSlash(path: string, like: string): string {
  const wantsSlash = like.endsWith("/") && like !== "/";
  const normalized = normalizePath(path);

  if (normalized === "/") return "/";

  return wantsSlash ? `${normalized}/` : normalized;
}
