import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import { ResourcesPageView } from "@/src/views/ResourcesPageView";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: "Resources",
  description:
    "Resources for CEOs and recruiters: downloadable executive profile and Growth Scorecard beta.",
  pathname: "/en/resources",
});

export default function ResourcesPageEn() {
  return <ResourcesPageView locale="en" />;
}
