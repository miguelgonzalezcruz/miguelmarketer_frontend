import Image from "next/image";
import { notFound } from "next/navigation";
import { getSiteData } from "@/content/siteData";
import type { Locale } from "@/src/lib/i18n";
import { getLocalizedPath } from "@/src/lib/routes";
import { absoluteUrl } from "@/src/lib/seo";
import { Button } from "@/src/components/ui/Button";
import { Section } from "@/src/components/ui/Section";
import { Card } from "@/src/components/ui/Card";
import { JsonLd } from "@/src/components/seo/JsonLd";
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";
import { TrackOnMount } from "@/src/components/tracking/TrackOnMount";

interface CaseDetailPageViewProps {
  locale: Locale;
  slug: string;
}

function getCompanyInitials(company: string) {
  return company
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export function CaseDetailPageView({ locale, slug }: CaseDetailPageViewProps) {
  const siteData = getSiteData(locale);
  const caseStudy = siteData.caseDetails.find((item) => item.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  const copy =
    locale === "en"
      ? {
          home: "Home",
          relevantExperience: "Relevant Experience",
          challenge: "Challenge",
          approach: "Approach",
          whatWasDone: "What was done",
          footer:
            "If useful, I can walk you through the thinking behind the approach and the result context in a short conversation.",
        }
      : {
          home: "Inicio",
          relevantExperience: "Experiencia Relevante",
          challenge: "Reto",
          approach: "Enfoque",
          whatWasDone: "Qué se hizo",
          footer:
            "Si quieres, te explico el criterio detrás del enfoque y el contexto de resultados en una conversación breve.",
        };

  const caseSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: caseStudy.title,
    description: caseStudy.intro,
    inLanguage: locale,
    url: absoluteUrl(getLocalizedPath(locale, "caseDetail", { slug: caseStudy.slug })),
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
          { name: copy.home, path: getLocalizedPath(locale, "home") },
          { name: copy.relevantExperience, path: getLocalizedPath(locale, "relevantExperience") },
          { name: caseStudy.title, path: getLocalizedPath(locale, "caseDetail", { slug: caseStudy.slug }) },
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
                <h3>{copy.challenge}</h3>
                <p>{caseStudy.challenge}</p>
                {caseStudy.approach ? (
                  <div className="case-detail__approach">
                    <h3>{copy.approach}</h3>
                    <p>{caseStudy.approach}</p>
                  </div>
                ) : null}
              </div>
            </Card>

            <Card className="case-detail__actions">
              <div className="case-detail__actions-content">
                <h3>{copy.whatWasDone}</h3>
                <ul>
                  {caseStudy.actions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>

          <div className="case-detail__footer">
            <p>{copy.footer}</p>
            <div className="case-detail__footer-actions">
              <Button
                href={getLocalizedPath(locale, "contact")}
                track={{
                  event: "cta_click",
                  payload: { cta: "meeting_request", source: caseStudy.slug },
                }}
              >
                {caseStudy.ctas.contact}
              </Button>
              <Button href={getLocalizedPath(locale, "relevantExperience")} variant="ghost">
                {caseStudy.ctas.back}
              </Button>
            </div>
          </div>
        </article>
      </Section>
    </>
  );
}
