import { NextRequest, NextResponse } from "next/server";

import type { Languages } from "@/types/app";

function normalizeUserLanguage(language: string | undefined): Languages {
  if (language === undefined) return "en";

  const tag = language.toLowerCase();

  const languages: Record<string, Languages> = {
    en: "en",
    pt: "pt",
    de: "de",
  };

  // Exact match first
  if (tag in languages) return languages[tag];

  // Fallback to the primary subtag (e.g., "en" from "en-CA")
  const primary = tag.split("-")[0] as keyof typeof languages;

  if (primary && primary in languages) return languages[primary];

  return "en";
}

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const acceptLanguage = requestHeaders.get("accept-language");
  const locale = acceptLanguage?.split(",")[0];
  const displayLanguage = normalizeUserLanguage(locale);

  // check if the route already has a language
  if (request.nextUrl.pathname.startsWith(`/${displayLanguage}`)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(
    new URL(`/${displayLanguage}${request.nextUrl.pathname}`, request.url),
  );
}

export const config = {
  matcher: ["/", "/about/:path*", "/reading/:path*", "/linkbio"],
};
