import { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import { HomePageView } from "@/src/views/HomePageView";

export const metadata: Metadata = buildPageMetadata({
  locale: "es",
  title: "Crecimiento con criterio para liderazgo de marketing",
  description:
    "Perfil ejecutivo de Miguel González para CEOs y headhunters que buscan un líder de marketing con criterio, visión de negocio e impacto en crecimiento.",
  pathname: "/",
});

export default function HomePage() {
  return <HomePageView locale="es" />;
}
