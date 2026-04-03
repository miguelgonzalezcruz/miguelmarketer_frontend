import Image from "next/image";
import { getSiteData } from "@/content/siteData";
import type { Locale } from "@/src/lib/i18n";
import { getLocalizedPath } from "@/src/lib/routes";
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";
import { Section } from "@/src/components/ui/Section";
import { Card } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";

interface RelevantExperiencePageViewProps {
  locale: Locale;
}

function getCompanyInitials(company: string) {
  return company
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export function RelevantExperiencePageView({ locale }: RelevantExperiencePageViewProps) {
  const siteData = getSiteData(locale);
  const copy =
    locale === "en"
      ? {
          home: "Home",
          page: "Relevant Experience",
          challenge: "Challenge",
          approach: "Approach",
          impact: "Impact",
          educationBadge: "RELEVANT EDUCATION",
          educationTitle:
            "A foundation in marketing, management and web development to operate with better judgment across strategy, business and execution.",
          closing:
            "Would you like a clearer view of my experience and how it could connect to your company's challenges?",
          cta: "Let's talk",
          degree: "Degree in Advertising and Public Relations",
        }
      : {
          home: "Inicio",
          page: "Experiencia Relevante",
          challenge: "Reto",
          approach: "Enfoque",
          impact: "Impacto",
          educationBadge: "FORMACION RELEVANTE",
          educationTitle:
            "Base en marketing, management y desarrollo web para trabajar con más criterio en estrategia, negocio y ejecución.",
          closing:
            "¿Te interesa conocer mejor mi experiencia y cómo puede conectar con los retos de tu empresa?",
          cta: "Hablemos",
          degree: "Licenciatura en Publicidad y Relaciones Públicas",
        };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: copy.home, path: getLocalizedPath(locale, "home") },
          { name: copy.page, path: getLocalizedPath(locale, "relevantExperience") },
        ]}
      />

      <Section title={copy.page}>
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
                  <strong>{copy.challenge}:</strong> {item.challenge}
                </p>
                {item.approach ? (
                  <p className="case-card__block">
                    <strong>{copy.approach}:</strong> {item.approach}
                  </p>
                ) : null}
                <p className="case-card__block">
                  <strong>{copy.impact}:</strong> {item.impact}
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
              <Badge>{copy.educationBadge}</Badge>
            </div>
            <div className="case-card__body case-card__body--overview case-card__body--education">
              <h3>{copy.educationTitle}</h3>

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
                  <p className="case-card__education-program">{copy.degree}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="cases-page__closing">
          <p>{copy.closing}</p>
          <Button
            href={getLocalizedPath(locale, "contact")}
            track={{
              event: "cta_click",
              payload: { cta: "meeting_request", source: "experiencia_relevante" },
            }}
          >
            {copy.cta}
          </Button>
        </div>
      </Section>
    </>
  );
}
