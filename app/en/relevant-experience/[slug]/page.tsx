import type { Metadata } from "next";
import { getSiteData } from "@/content/siteData";
import { buildPageMetadata } from "@/src/lib/seo";
import { CaseDetailPageView } from "@/src/views/CaseDetailPageView";

interface CasePageProps {
  params: {
    slug: string;
  };
}

function getCaseBySlug(slug: string) {
  return getSiteData("en").caseDetails.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return getSiteData("en").caseDetails.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: CasePageProps): Metadata {
  const caseStudy = getCaseBySlug(params.slug);

  if (!caseStudy) {
    return buildPageMetadata({
      locale: "en",
      title: "Case not found",
      description: "The requested case study could not be found.",
      pathname: `/en/relevant-experience/${params.slug}`,
      type: "article",
    });
  }

  return buildPageMetadata({
    locale: "en",
    title: caseStudy.title,
    description: caseStudy.intro,
    pathname: `/en/relevant-experience/${caseStudy.slug}`,
    type: "article",
  });
}

export default function CaseDetailPageEn({ params }: CasePageProps) {
  return <CaseDetailPageView locale="en" slug={params.slug} />;
}
