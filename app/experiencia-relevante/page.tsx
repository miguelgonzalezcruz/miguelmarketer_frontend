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
  title: "Experiencia Relevante",
  description:
    "Una selección de proyectos, etapas y contextos donde estrategia, ejecución y foco comercial se tradujeron en impacto real en negocio.",
  pathname: "/experiencia-relevante",
});

function getCompanyInitials(company: string) {
  return company
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export default function ExperienciaRelevantePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: "Experiencia Relevante", path: "/experiencia-relevante" },
        ]}
      />

      <Section title="Experiencia Relevante">
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

          <Card className="case-card case-card--overview case-card--education">
            <div className="case-card__top case-card__top--overview">
              <Badge>FORMACION RELEVANTE</Badge>
            </div>
            <div className="case-card__body case-card__body--overview case-card__body--education">
              <h3>
                Base en marketing, management y desarrollo web para trabajar con más criterio en
                estrategia, negocio y ejecución.
              </h3>

              <div className="case-card__education-list">
                <div className="case-card__education-item">
                  <p className="case-card__education-school">TripleTen (USA)</p>
                  <p className="case-card__education-program">
                    Full-Stack Software Engineering (React)
                  </p>
                </div>

                <div className="case-card__education-item">
                  <p className="case-card__education-school">IESE Business School</p>
                  <p className="case-card__education-program">
                    Management Development Program (PDD)
                  </p>
                </div>

                <div className="case-card__education-item">
                  <p className="case-card__education-school">
                    Universidad de Málaga & Universitat Autònoma de Barcelona
                  </p>
                  <p className="case-card__education-program">
                    Licenciatura en Publicidad y Relaciones Públicas
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="cases-page__closing">
          <p>
            ¿Te interesa conocer mejor mi experiencia y cómo puede conectar con los retos de tu
            empresa?
          </p>
          <Button
            href="/contacto"
            track={{
              event: "cta_click",
              payload: { cta: "meeting_request", source: "experiencia_relevante" },
            }}
          >
            Hablemos
          </Button>
        </div>
      </Section>
    </>
  );
}
