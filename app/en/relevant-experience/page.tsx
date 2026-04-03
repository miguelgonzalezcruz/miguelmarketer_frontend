import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import { RelevantExperiencePageView } from "@/src/views/RelevantExperiencePageView";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: "Relevant Experience",
  description:
    "A selection of projects, stages and operating contexts where strategy, execution and commercial focus translated into real business impact.",
  pathname: "/en/relevant-experience",
});

export default function RelevantExperiencePageEn() {
  return <RelevantExperiencePageView locale="en" />;
}
