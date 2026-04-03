import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import { ExperiencePageView } from "@/src/views/ExperiencePageView";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: "Experience",
  description:
    "Miguel González's track record in marketing leadership focused on judgment, growth and digital transformation.",
  pathname: "/en/experience",
});

export default function ExperiencePageEn() {
  return <ExperiencePageView locale="en" />;
}
