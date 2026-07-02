import type { Metadata } from "next";
import { SITE_URL, getSiteData } from "@/content/siteData";
import type { Locale } from "@/src/lib/i18n";

export function absoluteUrl(pathname: string) {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${normalized}`;
}

export function getSocialImagePath(locale: Locale) {
  return locale === "en" ? "/en/opengraph-image?v=20260701" : "/opengraph-image?v=20260701";
}

export function buildPageMetadata(input: {
  locale?: Locale;
  title: string;
  absoluteTitle?: boolean;
  description: string;
  pathname: string;
  type?: "website" | "article";
  canonical?: string;
  socialTitle?: string;
  socialDescription?: string;
}): Metadata {
  const url = absoluteUrl(input.pathname);
  const locale = input.locale ?? "es";
  const siteData = getSiteData(locale);
  const socialTitle = input.socialTitle ?? input.title;
  const socialDescription = input.socialDescription ?? input.description;
  const socialImage = {
    url: absoluteUrl(getSocialImagePath(locale)),
    width: 1200,
    height: 630,
    alt: "Miguel González, Marketing Director & Growth Leader",
  };

  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    alternates: {
      canonical: input.canonical ?? input.pathname,
    },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url,
      siteName: siteData.person.displayName,
      type: input.type ?? "website",
      locale: locale === "en" ? "en_US" : "es_ES",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [socialImage.url],
    },
  };
}
