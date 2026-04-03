import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import { HowIHelpPageView } from "@/src/views/HowIHelpPageView";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: "How I help",
  description:
    "Marketing leadership model: positioning, demand, RevOps and execution built around business outcomes.",
  pathname: "/en/how-i-help",
});

export default function HowIHelpPageEn() {
  return <HowIHelpPageView locale="en" />;
}
