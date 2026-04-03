import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import { HowIHelpPageView } from "@/src/views/HowIHelpPageView";

export const metadata: Metadata = buildPageMetadata({
  locale: "es",
  title: "Cómo ayudo",
  description:
    "Modelo de liderazgo de marketing: posicionamiento, demanda, RevOps y ejecución orientada a negocio.",
  pathname: "/como-ayudo",
});

export default function ComoAyudoPage() {
  return <HowIHelpPageView locale="es" />;
}
