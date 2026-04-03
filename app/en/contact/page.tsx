import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import { ContactPageView } from "@/src/views/ContactPageView";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: "Contact",
  description:
    "Qualified contact form for Marketing Director, Head of Marketing or CMO hiring processes.",
  pathname: "/en/contact",
});

export default function ContactPageEn() {
  return <ContactPageView locale="en" />;
}
