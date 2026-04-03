import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getPreferredLocale, LOCALE_COOKIE, resolveLocale } from "@/src/lib/i18n";
import { switchLocalePath } from "@/src/lib/routes";

function shouldBypass(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/logos") ||
    pathname.startsWith("/case-logos") ||
    pathname.startsWith("/resources") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/public") ||
    pathname.includes(".")
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldBypass(pathname)) {
    return NextResponse.next();
  }

  const localeFromCookie = resolveLocale(request.cookies.get(LOCALE_COOKIE)?.value);
  const localeFromPath = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
  const hasLocaleCookie = Boolean(request.cookies.get(LOCALE_COOKIE)?.value);

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, "en", { path: "/" });
    return response;
  }

  if (hasLocaleCookie && localeFromCookie === "es") {
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, "es", { path: "/" });
    return response;
  }

  const preferredLocale = hasLocaleCookie
    ? localeFromCookie
    : getPreferredLocale(request.headers.get("accept-language"));

  if (preferredLocale === "en" && localeFromPath !== "en") {
    const targetPath = switchLocalePath(pathname, "en");

    if (targetPath !== pathname) {
      const url = request.nextUrl.clone();
      url.pathname = targetPath;
      const response = NextResponse.redirect(url);
      response.cookies.set(LOCALE_COOKIE, "en", { path: "/" });
      return response;
    }
  }

  const response = NextResponse.next();
  response.cookies.set(LOCALE_COOKIE, "es", { path: "/" });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
