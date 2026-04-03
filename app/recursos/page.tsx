import type { Metadata } from "next";
import { siteData } from "@/content/siteData";
import { buildPageMetadata } from "@/src/lib/seo";
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";
import { Section } from "@/src/components/ui/Section";
import { Card } from "@/src/components/ui/Card";
import { PdfGateModalTrigger } from "@/src/components/forms/PdfGateModalTrigger";
import { WaitlistCard } from "@/src/components/forms/WaitlistCard";

export const metadata: Metadata = buildPageMetadata({
  title: "Recursos",
  description:
    "Recursos para CEOs y headhunters: perfil ejecutivo descargable y herramienta Growth Scorecard en beta.",
  pathname: "/recursos",
});

export default function RecursosPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: "Recursos", path: "/recursos" },
        ]}
      />

      <Section
        eyebrow="Recursos"
        title="Material para evaluación ejecutiva"
        description="Accede al perfil en PDF y deja tu email para la beta del Growth Scorecard."
      >
        <div className="resource-grid">
          <Card>
            <h3>{siteData.resources.leadMagnet.title}</h3>
            <p>{siteData.resources.leadMagnet.description}</p>
            <div className="resource-card__footer">
              <PdfGateModalTrigger source="recursos" />
            </div>
          </Card>

          <Card>
            <WaitlistCard source="recursos" />
          </Card>
        </div>
      </Section>
    </>
  );
}
