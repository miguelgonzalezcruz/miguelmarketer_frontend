import type { Metadata } from "next";
import { SITE_URL, getSiteData } from "@/content/siteData";
import type { Locale } from "@/src/lib/i18n";

export function absoluteUrl(pathname: string) {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${normalized}`;
}

export function buildPageMetadata(input: {
  locale?: Locale;
  title: string;
  description: string;
  pathname: string;
  type?: "website" | "article";
  canonical?: string;
}): Metadata {
  const url = absoluteUrl(input.pathname);
  const locale = input.locale ?? "es";
  const siteData = getSiteData(locale);

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: input.canonical ?? input.pathname,
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: siteData.person.displayName,
      type: input.type ?? "website",
      locale: locale === "en" ? "en_US" : "es_ES",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
}
