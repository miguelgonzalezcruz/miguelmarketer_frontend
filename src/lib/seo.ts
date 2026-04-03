import type { Metadata } from "next";
import { SITE_URL, siteData } from "@/content/siteData";

export function absoluteUrl(pathname: string) {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${normalized}`;
}

export function buildPageMetadata(input: {
  title: string;
  description: string;
  pathname: string;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(input.pathname);

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: input.pathname,
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: siteData.person.displayName,
      type: input.type ?? "website",
      locale: "es_ES",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
}
