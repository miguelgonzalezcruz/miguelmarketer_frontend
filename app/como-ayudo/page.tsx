import type { Metadata } from "next";
import { siteData } from "@/content/siteData";
import { buildPageMetadata } from "@/src/lib/seo";
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";
import { Section } from "@/src/components/ui/Section";
import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";

export const metadata: Metadata = buildPageMetadata({
  title: "Cómo ayudo",
  description:
    "Modelo de liderazgo de marketing: posicionamiento, demanda, RevOps y ejecución orientada a negocio.",
  pathname: "/como-ayudo",
});

export default function ComoAyudoPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: "Cómo ayudo", path: "/como-ayudo" },
        ]}
      />

      <Section
        eyebrow="Cómo ayudo"
        title="Dirección de marketing para crecimiento predecible"
        description="Trabajo con claridad estratégica, ejecución rigurosa y mejora continua para sostener resultados."
      >
        <div className="modules-grid">
          {siteData.howIHelpModules.map((module) => (
            <Card key={module.id}>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="Cómo suelo trabajar"
        description="Diagnóstico, priorización y ejecución en ciclos de decisión cortos y responsables claros."
      >
        <div className="steps-grid">
          {siteData.howIWork.steps.map((step, index) => (
            <Card key={step.title}>
              <p className="work-step__index">Fase {index + 1}</p>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </Card>
          ))}
        </div>

        <p className="work-cadence">{siteData.howIWork.cadence}</p>

        <div style={{ marginTop: 18 }}>
          <Button
            href="/contacto"
            track={{ event: "cta_click", payload: { cta: "meeting_request", source: "como_ayudo" } }}
          >
            Hablemos
          </Button>
        </div>
      </Section>
    </>
  );
}
