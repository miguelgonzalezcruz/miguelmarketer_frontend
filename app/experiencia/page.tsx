import type { Metadata } from "next";
import { siteData } from "@/content/siteData";
import { buildPageMetadata } from "@/src/lib/seo";
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";
import { Section } from "@/src/components/ui/Section";
import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";

export const metadata: Metadata = buildPageMetadata({
  title: "Experiencia",
  description:
    "Trayectoria de Miguel González en liderazgo de marketing con foco en criterio, crecimiento y transformación digital.",
  pathname: "/experiencia",
});

export default function ExperienciaPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: "Experiencia", path: "/experiencia" },
        ]}
      />

      <Section
        eyebrow="Experiencia"
        title="Trayectoria profesional"
        description="Recorrido en compañías internacionales donde estrategia, priorización y ejecución tenían impacto directo en negocio."
      >
        <div className="cards-grid">
          {siteData.experience.map((item) => (
            <Card key={`${item.period}-${item.company}`} className="timeline-item">
              <p className="timeline-item__period">{item.period}</p>
              <h3 className="timeline-item__role">{item.role}</h3>
              <p className="timeline-item__company">{item.company}</p>
              <p className="timeline-item__scope">{item.scope}</p>
              <ul>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div style={{ marginTop: 18 }}>
          <Button
            href="/contacto"
            track={{ event: "cta_click", payload: { cta: "meeting_request", source: "experiencia" } }}
          >
            Hablemos
          </Button>
        </div>
      </Section>
    </>
  );
}
