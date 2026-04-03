import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { siteData } from "@/content/siteData";
import { buildPageMetadata, absoluteUrl } from "@/src/lib/seo";
import { Button } from "@/src/components/ui/Button";
import { Section } from "@/src/components/ui/Section";
import { Card } from "@/src/components/ui/Card";
import { JsonLd } from "@/src/components/seo/JsonLd";
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";
import { TrackOnMount } from "@/src/components/tracking/TrackOnMount";

interface CasePageProps {
  params: {
    slug: string;
  };
}

function getCompanyInitials(company: string) {
  return company
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

function getCaseBySlug(slug: string) {
  return siteData.caseDetails.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return siteData.caseDetails.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: CasePageProps): Metadata {
  const caseStudy = getCaseBySlug(params.slug);

  if (!caseStudy) {
    return buildPageMetadata({
      title: "Caso no encontrado",
      description: "No se ha encontrado el caso solicitado.",
      pathname: `/experiencia-relevante/${params.slug}`,
      type: "article",
    });
  }

  return buildPageMetadata({
    title: caseStudy.title,
    description: caseStudy.intro,
    pathname: `/experiencia-relevante/${caseStudy.slug}`,
    type: "article",
  });
}

export default function CaseDetailPage({ params }: CasePageProps) {
  const caseStudy = getCaseBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  const caseSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: caseStudy.title,
    description: caseStudy.intro,
    inLanguage: "es",
    url: absoluteUrl(`/experiencia-relevante/${caseStudy.slug}`),
    author: {
      "@type": "Person",
      name: siteData.person.fullName,
    },
    keywords: [caseStudy.tag, caseStudy.company].filter(Boolean).join(", "),
    text: [caseStudy.intro, caseStudy.challenge, ...caseStudy.actions, caseStudy.resultPublic].join(" "),
  };

  return (
    <>
      <TrackOnMount event="case_open" payload={{ slug: caseStudy.slug }} />
      <JsonLd data={caseSchema} />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: "Experiencia Relevante", path: "/experiencia-relevante" },
          { name: caseStudy.title, path: `/experiencia-relevante/${caseStudy.slug}` },
        ]}
      />

      <Section>
        <article className="case-detail">
          <header className="case-detail__header">
            <div className="case-detail__meta-row">
              <p className="case-detail__meta-line">
                <span className="case-detail__meta-tag">{caseStudy.tag}</span>
                <span className="case-detail__meta-dot">·</span>
                <span>{caseStudy.company}</span>
                <span className="case-detail__meta-dot">·</span>
                <span>{caseStudy.role}</span>
                <span className="case-detail__meta-dot">·</span>
                <span>{caseStudy.years}</span>
              </p>
              <div
                className={`case-detail__meta-logo case-detail__meta-logo--${caseStudy.slug}`}
                aria-hidden="true"
              >
                {caseStudy.logo ? (
                  <Image
                    src={caseStudy.logo}
                    alt={`${caseStudy.company} logo`}
                    width={120}
                    height={40}
                    className="case-detail__meta-logo-image"
                  />
                ) : (
                  <span className="case-detail__meta-logo-fallback">
                    {getCompanyInitials(caseStudy.company)}
                  </span>
                )}
              </div>
            </div>
            <h1>{caseStudy.title}</h1>
            <p className="case-detail__summary">{caseStudy.intro}</p>
          </header>

          <div className="case-detail__content-grid">
            <Card className="case-detail__challenge">
              <div className="case-detail__challenge-content">
                <h3>Reto</h3>
                <p>{caseStudy.challenge}</p>
                {caseStudy.approach ? (
                  <div className="case-detail__approach">
                    <h3>Enfoque</h3>
                    <p>{caseStudy.approach}</p>
                  </div>
                ) : null}
              </div>
            </Card>

            <Card className="case-detail__actions">
              <div className="case-detail__actions-content">
                <h3>Qué se hizo</h3>
                <ul>
                  {caseStudy.actions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>

          <div className="case-detail__footer">
            <p>
              Si quieres, te explico el criterio detrás del enfoque y el contexto de resultados en
              una conversación breve.
            </p>
            <div className="case-detail__footer-actions">
              <Button
                href="/contacto"
                track={{
                  event: "cta_click",
                  payload: { cta: "meeting_request", source: caseStudy.slug },
                }}
              >
                {caseStudy.ctas.contact}
              </Button>
              <Button href="/experiencia-relevante" variant="ghost">
                {caseStudy.ctas.back}
              </Button>
            </div>
          </div>
        </article>
      </Section>
    </>
  );
}
