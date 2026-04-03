import type { Locale } from "@/src/lib/i18n";

export type RouteKey =
  | "home"
  | "contact"
  | "howIHelp"
  | "experience"
  | "relevantExperience"
  | "caseDetail"
  | "resources"
  | "cases";

interface RouteMatch {
  routeKey: RouteKey;
  params?: {
    slug?: string;
  };
}

export function getLocalizedPath(
  locale: Locale,
  routeKey: RouteKey,
  params?: { slug?: string }
) {
  if (routeKey === "home") {
    return locale === "en" ? "/en" : "/";
  }

  if (routeKey === "contact") {
    return locale === "en" ? "/en/contact" : "/contacto";
  }

  if (routeKey === "howIHelp") {
    return locale === "en" ? "/en/how-i-help" : "/como-ayudo";
  }

  if (routeKey === "experience") {
    return locale === "en" ? "/en/experience" : "/experiencia";
  }

  if (routeKey === "relevantExperience") {
    return locale === "en" ? "/en/relevant-experience" : "/experiencia-relevante";
  }

  if (routeKey === "caseDetail") {
    const slug = params?.slug ?? "";
    return locale === "en"
      ? `/en/relevant-experience/${slug}`
      : `/experiencia-relevante/${slug}`;
  }

  if (routeKey === "resources") {
    return locale === "en" ? "/en/resources" : "/recursos";
  }

  return locale === "en" ? "/en/cases" : "/casos";
}

export function getRouteMatch(pathname: string): RouteMatch | null {
  if (pathname === "/" || pathname === "/en") {
    return { routeKey: "home" };
  }

  const englishCaseMatch = pathname.match(/^\/en\/relevant-experience\/([^/]+)$/);
  if (englishCaseMatch) {
    return { routeKey: "caseDetail", params: { slug: englishCaseMatch[1] } };
  }

  const englishLegacyCaseMatch = pathname.match(/^\/en\/cases\/([^/]+)$/);
  if (englishLegacyCaseMatch) {
    return { routeKey: "caseDetail", params: { slug: englishLegacyCaseMatch[1] } };
  }

  const spanishCaseMatch = pathname.match(/^\/experiencia-relevante\/([^/]+)$/);
  if (spanishCaseMatch) {
    return { routeKey: "caseDetail", params: { slug: spanishCaseMatch[1] } };
  }

  const spanishLegacyCaseMatch = pathname.match(/^\/casos\/([^/]+)$/);
  if (spanishLegacyCaseMatch) {
    return { routeKey: "caseDetail", params: { slug: spanishLegacyCaseMatch[1] } };
  }

  const staticRoutes: Array<[string, RouteKey]> = [
    ["/contacto", "contact"],
    ["/en/contact", "contact"],
    ["/como-ayudo", "howIHelp"],
    ["/en/how-i-help", "howIHelp"],
    ["/experiencia", "experience"],
    ["/en/experience", "experience"],
    ["/experiencia-relevante", "relevantExperience"],
    ["/en/relevant-experience", "relevantExperience"],
    ["/recursos", "resources"],
    ["/en/resources", "resources"],
    ["/casos", "cases"],
    ["/en/cases", "cases"],
  ];

  const found = staticRoutes.find(([candidate]) => candidate === pathname);
  if (found) {
    return { routeKey: found[1] };
  }

  return null;
}

export function switchLocalePath(pathname: string, locale: Locale) {
  const match = getRouteMatch(pathname);

  if (match) {
    return getLocalizedPath(locale, match.routeKey, match.params);
  }

  return pathname;
}
