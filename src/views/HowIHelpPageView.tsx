import { getSiteData } from "@/content/siteData";
import type { Locale } from "@/src/lib/i18n";
import { getLocalizedPath } from "@/src/lib/routes";
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";
import { Section } from "@/src/components/ui/Section";
import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";

interface HowIHelpPageViewProps {
  locale: Locale;
}

export function HowIHelpPageView({ locale }: HowIHelpPageViewProps) {
  const siteData = getSiteData(locale);
  const copy =
    locale === "en"
      ? {
          home: "Home",
          page: "How I help",
          title: "Marketing leadership for predictable growth",
          description:
            "I work with strategic clarity, rigorous execution and continuous improvement to sustain results.",
          workTitle: "How I usually work",
          workDescription:
            "Diagnosis, prioritization and execution in short decision cycles with clear ownership.",
          phase: "Phase",
          cta: "Let's talk",
        }
      : {
          home: "Inicio",
          page: "Cómo ayudo",
          title: "Dirección de marketing para crecimiento predecible",
          description:
            "Trabajo con claridad estratégica, ejecución rigurosa y mejora continua para sostener resultados.",
          workTitle: "Cómo suelo trabajar",
          workDescription:
            "Diagnóstico, priorización y ejecución en ciclos de decisión cortos y responsables claros.",
          phase: "Fase",
          cta: "Hablemos",
        };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: copy.home, path: getLocalizedPath(locale, "home") },
          { name: copy.page, path: getLocalizedPath(locale, "howIHelp") },
        ]}
      />

      <Section eyebrow={copy.page} title={copy.title} description={copy.description}>
        <div className="modules-grid">
          {siteData.howIHelpModules.map((module) => (
            <Card key={module.id}>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title={copy.workTitle} description={copy.workDescription}>
        <div className="steps-grid">
          {siteData.howIWork.steps.map((step, index) => (
            <Card key={step.title}>
              <p className="work-step__index">
                {copy.phase} {index + 1}
              </p>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </Card>
          ))}
        </div>

        <p className="work-cadence">{siteData.howIWork.cadence}</p>

        <div style={{ marginTop: 18 }}>
          <Button
            href={getLocalizedPath(locale, "contact")}
            track={{ event: "cta_click", payload: { cta: "meeting_request", source: "como_ayudo" } }}
          >
            {copy.cta}
          </Button>
        </div>
      </Section>
    </>
  );
}
