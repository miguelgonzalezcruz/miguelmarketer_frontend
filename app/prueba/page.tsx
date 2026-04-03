import Image from "next/image";
import type { Metadata } from "next";
import { siteData } from "@/content/siteData";
import { buildPageMetadata } from "@/src/lib/seo";
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";
import { Section } from "@/src/components/ui/Section";
import { Card } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";

export const metadata: Metadata = buildPageMetadata({
  title: "Casos y trayectoria",
  description:
    "Una selección de proyectos, etapas y contextos donde estrategia, ejecución y foco comercial se tradujeron en impacto real en negocio.",
  pathname: "/prueba",
});

function getCompanyInitials(company: string) {
  return company
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export default function PruebaPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: "Casos y trayectoria", path: "/prueba" },
        ]}
      />

      <Section
        title="Casos y trayectoria"
        description="Una selección de proyectos, etapas y contextos donde estrategia, ejecución y foco comercial se tradujeron en impacto real en negocio."
      >
        <div className="case-grid case-grid--overview">
          {siteData.caseSummaries.map((item) => (
            <Card key={item.slug} className="case-card case-card--overview">
              <div className="case-card__top case-card__top--overview">
                <Badge>{item.tag}</Badge>
                <div className={`case-card__logo case-card__logo--${item.slug}`} aria-hidden="true">
                  {item.logo ? (
                    <Image
                      src={item.logo}
                      alt={`${item.company} logo`}
                      width={120}
                      height={42}
                      className="case-card__logo-image"
                    />
                  ) : (
                    <span className="case-card__logo-fallback">
                      {getCompanyInitials(item.company)}
                    </span>
                  )}
                </div>
              </div>
              <div className="case-card__body case-card__body--overview">
                <h3>{item.title}</h3>
                <p className="case-card__block">
                  <strong>Reto:</strong> {item.challenge}
                </p>
                {item.approach ? (
                  <p className="case-card__block">
                    <strong>Enfoque:</strong> {item.approach}
                  </p>
                ) : null}
                <p className="case-card__block">
                  <strong>Impacto:</strong> {item.impact}
                </p>
              </div>
              <div className="case-card__credentials">
                <p className="case-card__signature">
                  {item.company} · {item.role} · {item.years}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="cases-page__closing">
          <p>
            Si alguno de estos contextos conecta con vuestro momento de negocio, puedo ampliar
            decisiones, trade-offs y aprendizajes en conversación.
          </p>
          <Button
            href="/contacto"
            track={{ event: "cta_click", payload: { cta: "meeting_request", source: "prueba" } }}
          >
            Hablemos
          </Button>
        </div>
      </Section>
    </>
  );
}
