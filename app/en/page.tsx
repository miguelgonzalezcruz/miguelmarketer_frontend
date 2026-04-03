import { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import { HomePageView } from "@/src/views/HomePageView";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: "Disciplined growth for marketing leadership",
  description:
    "Executive profile of Miguel González for CEOs and recruiters looking for a marketing leader with sound judgment, business perspective and growth impact.",
  pathname: "/en",
});

export default function HomePageEn() {
  return <HomePageView locale="en" />;
}
