import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import { ContactPageView } from "@/src/views/ContactPageView";

export const metadata: Metadata = buildPageMetadata({
  locale: "es",
  title: "Contacto",
  description:
    "Formulario de contacto cualificado para procesos de contratación de Marketing Director, Head of Marketing o CMO.",
  pathname: "/contacto",
});

export default function ContactoPage() {
  return <ContactPageView locale="es" />;
}
