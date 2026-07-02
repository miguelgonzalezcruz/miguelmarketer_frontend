import { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import { HomePageView } from "@/src/views/HomePageView";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: "Miguel González | Marketing Director & Growth Leader",
  absoluteTitle: true,
  description:
    "Executive profile of Miguel González for CEOs and recruiters looking for a marketing leader with sound judgment, business perspective and growth impact.",
  pathname: "/en",
  socialTitle: "Miguel González | Marketing Director & Growth Leader",
  socialDescription:
    "Executive marketing profile: positioning, demand and conversion aligned with business outcomes.",
});

export default function HomePageEn() {
  return <HomePageView locale="en" />;
}
