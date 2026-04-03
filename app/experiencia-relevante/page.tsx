import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import { RelevantExperiencePageView } from "@/src/views/RelevantExperiencePageView";

export const metadata: Metadata = buildPageMetadata({
  locale: "es",
  title: "Experiencia Relevante",
  description:
    "Una selección de proyectos, etapas y contextos donde estrategia, ejecución y foco comercial se tradujeron en impacto real en negocio.",
  pathname: "/experiencia-relevante",
});

export default function ExperienciaRelevantePage() {
  return <RelevantExperiencePageView locale="es" />;
}
