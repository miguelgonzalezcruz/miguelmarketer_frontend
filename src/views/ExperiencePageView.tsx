import { getSiteData } from "@/content/siteData";
import type { Locale } from "@/src/lib/i18n";
import { getLocalizedPath } from "@/src/lib/routes";
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";
import { Section } from "@/src/components/ui/Section";
import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";

interface ExperiencePageViewProps {
  locale: Locale;
}

export function ExperiencePageView({ locale }: ExperiencePageViewProps) {
  const siteData = getSiteData(locale);
  const copy =
    locale === "en"
      ? {
          home: "Home",
          page: "Experience",
          title: "Professional track record",
          description:
            "Career path across international companies where strategy, prioritization and execution had direct impact on the business.",
          cta: "Let's talk",
        }
      : {
          home: "Inicio",
          page: "Experiencia",
          title: "Trayectoria profesional",
          description:
            "Recorrido en compañías internacionales donde estrategia, priorización y ejecución tenían impacto directo en negocio.",
          cta: "Hablemos",
        };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: copy.home, path: getLocalizedPath(locale, "home") },
          { name: copy.page, path: getLocalizedPath(locale, "experience") },
        ]}
      />

      <Section eyebrow={copy.page} title={copy.title} description={copy.description}>
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
            href={getLocalizedPath(locale, "contact")}
            track={{ event: "cta_click", payload: { cta: "meeting_request", source: "experiencia" } }}
          >
            {copy.cta}
          </Button>
        </div>
      </Section>
    </>
  );
}
