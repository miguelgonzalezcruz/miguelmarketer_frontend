import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import { ResourcesPageView } from "@/src/views/ResourcesPageView";

export const metadata: Metadata = buildPageMetadata({
  locale: "es",
  title: "Recursos",
  description:
    "Recursos para CEOs y headhunters: perfil ejecutivo descargable y herramienta Growth Scorecard en beta.",
  pathname: "/recursos",
});

export default function RecursosPage() {
  return <ResourcesPageView locale="es" />;
}
