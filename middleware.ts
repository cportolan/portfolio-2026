import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

const PUBLIC_FILE = /\.[^/]+$/;

function getPreferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const languages = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0]?.trim())
    .filter(Boolean);

  for (const lang of languages) {
    const normalized = lang.toLowerCase();
    const match = locales.find((locale) => normalized.startsWith(locale));
    if (match) {
      return match;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE.test(pathname)
  ) {
    const response = NextResponse.next();
    response.headers.set("x-locale", defaultLocale);
    return response;
  }

  const pathnameLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!pathnameLocale) {
    const locale = getPreferredLocale(request.headers.get("accept-language"));
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    const response = NextResponse.redirect(url);
    response.headers.set("x-locale", locale);
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("x-locale", pathnameLocale);
  return response;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
