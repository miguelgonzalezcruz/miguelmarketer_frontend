import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";
import { Section } from "@/src/components/ui/Section";
import { ContactBlock } from "@/src/components/sections/ContactBlock";

export const metadata: Metadata = buildPageMetadata({
  title: "Contacto",
  description:
    "Formulario de contacto cualificado para procesos de contratación de Marketing Director, Head of Marketing o CMO.",
  pathname: "/contacto",
});

export default function ContactoPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: "Contacto", path: "/contacto" },
        ]}
      />

      <Section
        title="Contacta"
      >
        <ContactBlock source="contacto" />
      </Section>
    </>
  );
}
