import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import { ExperiencePageView } from "@/src/views/ExperiencePageView";

export const metadata: Metadata = buildPageMetadata({
  locale: "es",
  title: "Experiencia",
  description:
    "Trayectoria de Miguel González en liderazgo de marketing con foco en criterio, crecimiento y transformación digital.",
  pathname: "/experiencia",
});

export default function ExperienciaPage() {
  return <ExperiencePageView locale="es" />;
}
