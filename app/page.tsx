import { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import { HomePageView } from "@/src/views/HomePageView";

export const metadata: Metadata = buildPageMetadata({
  locale: "es",
  title: "Miguel González | Marketing Director & Growth Leader",
  absoluteTitle: true,
  description:
    "Perfil ejecutivo de Miguel González para CEOs y headhunters que buscan un líder de marketing con criterio, visión de negocio e impacto en crecimiento.",
  pathname: "/",
  socialTitle: "Miguel González | Marketing Director & Growth Leader",
  socialDescription:
    "Perfil ejecutivo de marketing: posicionamiento, demanda y conversión conectados a resultados de negocio.",
});

export default function HomePage() {
  return <HomePageView locale="es" />;
}
