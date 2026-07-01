import { getExperimentBySlug } from "@/content/experiments";
import { notFound } from "next/navigation";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { Container } from "@/src/components/ui/Container";
import { JsonLd } from "@/src/components/seo/JsonLd";
import { absoluteUrl } from "@/src/lib/seo";

interface GrowthLabExperimentPageViewProps {
  slug: string;
}

export function GrowthLabExperimentPageView({ slug }: GrowthLabExperimentPageViewProps) {
  const experiment = getExperimentBySlug(slug);

  if (!experiment) {
    notFound();
  }

  const path = `/laboratorio-de-crecimiento/${experiment.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: experiment.title,
    description: experiment.summary,
    datePublished: "2026-06-24",
    inLanguage: "es",
    url: absoluteUrl(path),
    author: {
      "@type": "Person",
      name: "Miguel Ángel González Cruz",
    },
    about: experiment.category,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <article className="growth-lab-experiment">
        <Container>
          <header className="growth-lab-experiment__hero">
            <div className="growth-lab-experiment__hero-copy">
              <p className="growth-lab-experiment__eyebrow">Laboratorio de crecimiento</p>
              <div className="growth-lab-experiment__meta">
                <Badge>{experiment.category}</Badge>
                <span>{experiment.status}</span>
                <span>{experiment.publishedAt}</span>
              </div>
              <h1>{experiment.title}</h1>
              <p className="growth-lab-experiment__summary">{experiment.summary}</p>
            </div>

            <section className="growth-lab-experiment__metric" aria-label="Resultado principal">
              <div className="growth-lab-experiment__metric-topline">
                <span>Resultado principal</span>
                <span className="growth-lab-experiment__metric-mark" aria-hidden="true">↗</span>
              </div>
              <p className="growth-lab-experiment__metric-value">{experiment.primaryMetric.value}</p>
              <p className="growth-lab-experiment__metric-label">{experiment.primaryMetric.label}</p>
              <div className="growth-lab-experiment__metric-note">
                <span className="growth-lab-experiment__metric-note-dot" aria-hidden="true" />
                <p>{experiment.primaryMetric.note}</p>
              </div>
            </section>
          </header>

          <div className="growth-lab-experiment__layout">
            <div className="growth-lab-experiment__main">
              <section className="growth-lab-experiment__section">
                <p className="growth-lab-experiment__section-number">01</p>
                <div>
                  <h2>Problema</h2>
                  <p>{experiment.problem}</p>
                </div>
              </section>

              <section className="growth-lab-experiment__section">
                <p className="growth-lab-experiment__section-number">02</p>
                <div>
                  <h2>Solución aplicada</h2>
                  <p>{experiment.solution}</p>
                </div>
              </section>

              <section className="growth-lab-experiment__section">
                <p className="growth-lab-experiment__section-number">03</p>
                <div>
                  <h2>Qué se hizo</h2>
                  <ul>
                    {experiment.implementation.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            <aside className="growth-lab-experiment__aside">
              <Card className="growth-lab-experiment__aside-card">
                <p className="growth-lab-experiment__aside-label">Tiempo ahorrado</p>
                <p>{experiment.timeSaved}</p>
              </Card>
              <Card className="growth-lab-experiment__aside-card growth-lab-experiment__aside-card--impact">
                <p className="growth-lab-experiment__aside-label">Impacto observado</p>
                <p>{experiment.impact}</p>
              </Card>
            </aside>
          </div>

          <section className="growth-lab-experiment__learning">
            <div>
              <p className="growth-lab-experiment__eyebrow">Aprendizajes</p>
              <h2>La IA mejora la cualificación cuando el proceso ya tiene criterio.</h2>
            </div>
            <ul>
              {experiment.learnings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="growth-lab-experiment__next">
            <p className="growth-lab-experiment__eyebrow">Próximos pasos</p>
            <p>{experiment.nextSteps}</p>
          </section>
        </Container>
      </article>
    </>
  );
}
