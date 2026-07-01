import type { Metadata } from "next";
import { experiments, getExperimentBySlug } from "@/content/experiments";
import { buildPageMetadata } from "@/src/lib/seo";
import { GrowthLabExperimentPageView } from "@/src/views/GrowthLabExperimentPageView";

interface GrowthLabExperimentPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return experiments.map((experiment) => ({ slug: experiment.slug }));
}

export function generateMetadata({ params }: GrowthLabExperimentPageProps): Metadata {
  const experiment = getExperimentBySlug(params.slug);
  const pathname = `/laboratorio-de-crecimiento/${params.slug}`;

  if (!experiment) {
    return buildPageMetadata({
      locale: "es",
      title: "Experimento no encontrado",
      description: "No se ha encontrado el experimento solicitado.",
      pathname,
      type: "article",
    });
  }

  return buildPageMetadata({
    locale: "es",
    title: "+30% de conversión a SQL",
    description: experiment.summary,
    pathname,
    type: "article",
  });
}

export default function GrowthLabExperimentPage({ params }: GrowthLabExperimentPageProps) {
  return <GrowthLabExperimentPageView slug={params.slug} />;
}
