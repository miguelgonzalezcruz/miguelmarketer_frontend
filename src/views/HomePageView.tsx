import Image from "next/image";
import profileImage from "@/src/images/history/miguelmarketer_.png";
import musicImage from "@/src/images/history/CarmenSupermarketConcierto_1.jpg";
import { getSiteData } from "@/content/siteData";
import type { Locale } from "@/src/lib/i18n";
import { getLocalizedPath } from "@/src/lib/routes";
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { KPIStat } from "@/src/components/ui/KPIStat";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { ContactBlock } from "@/src/components/sections/ContactBlock";
import { HowIHelpSticky } from "@/src/components/sections/HowIHelpSticky";
import { CollapsibleCaseCard } from "@/src/components/cases/CollapsibleCaseCard";

interface HomePageViewProps {
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

export function HomePageView({ locale }: HomePageViewProps) {
  const siteData = getSiteData(locale);
  const copy =
    locale === "en"
      ? {
          breadcrumbHome: "Home",
          proofAria: "Experience across relevant brands and groups",
          impactTitle: "Measurable impact in real operating contexts",
          howIHelpTitle: "Marketing that turns strategy into a growth system",
          featuredCases: "Relevant experience",
          challenge: "Challenge",
          approach: "Approach",
          impact: "Impact",
          viewAll: "View full experience",
          contact: "Contact",
          liveAlt: "Carmen Supermarket performing live",
          seeMore: "See more",
          seeLess: "See less",
        }
      : {
          breadcrumbHome: "Inicio",
          proofAria: "Experiencia en marcas y grupos relevantes",
          impactTitle: "Impacto medible en contextos reales",
          howIHelpTitle: "Marketing que convierte la estrategia en un sistema de crecimiento",
          featuredCases: "Experiencia relevante",
          challenge: "Reto",
          approach: "Enfoque",
          impact: "Impacto",
          viewAll: "Ver experiencia completa",
          contact: "Contacta",
          liveAlt: "Carmen Supermarket en directo",
          seeMore: "Ver más",
          seeLess: "Ver menos",
        };

  const heroProofLogos = [
    {
      name: "HBX Group",
      src: "/logos-hero/hbx-group-logo.png",
      width: 118,
      height: 24,
      className: "",
    },
    {
      name: "Roiback",
      src: "/logos-hero/roiback-part-of-hbx-group-logo.png",
      width: 124,
      height: 28,
      className: "",
    },
    {
      name: "Hotelbeds",
      src: "/logos-hero/hotelbeds-part-of-hbx-group-logo.png",
      width: 124,
      height: 28,
      className: "hero__proof-logo-image--hotelbeds",
    },
    {
      name: "Rafa Nadal Academy",
      src: "/logos-hero/RNA-final3.png",
      width: 76,
      height: 44,
      className: "hero__proof-logo-image--rna",
    },
    {
      name: "Logitravel",
      src: "/logos-hero/logitravel.svg",
      width: 122,
      height: 24,
      className: "",
    },
    {
      name: "PortBlue Hotels",
      src: "/logos-hero/portblue-hotels-logo.png",
      width: 108,
      height: 28,
      className: "hero__proof-logo-image--portblue",
    },
  ];

  const featuredOrder = [
    "roiback-inbound-ia-operacion-comercial",
    "hotelbeds-growth-automatizacion-cro-global",
    "rafa-nadal-academy-ecosistema-digital-desde-cero",
    "logitravel-escalado-ingresos-web-growth",
    "portblue-rebranding-venta-directa-web",
    "hylovi-mvp-ia-seo-local",
  ];

  const homeExperienceOverrides: Record<
    string,
    { company: string; role: string }
  > = {
    "roiback-inbound-ia-operacion-comercial": {
      company: "Roiback (HBX Group)",
      role: "Head of Marketing Communications",
    },
    "hotelbeds-growth-automatizacion-cro-global": {
      company: "Hotelbeds (HBX Group)",
      role: "Global Growth Marketing Manager",
    },
    "rafa-nadal-academy-ecosistema-digital-desde-cero": {
      company: "Rafa Nadal Academy by Movistar",
      role: "Marketing & eCommerce Director",
    },
    "logitravel-escalado-ingresos-web-growth": {
      company: "Logitravel Group",
      role: "Marketing & Communications Director",
    },
    "portblue-rebranding-venta-directa-web": {
      company: "PortBlue Hotels & Resorts",
      role: "Head of Marketing & Communications",
    },
    "hylovi-mvp-ia-seo-local": {
      company: "Hylovi",
      role:
        locale === "en"
          ? "Founder, Developer & Product Owner (current MVP)"
          : "Founder, Developer & Product Owner (current MVP)",
    },
  };

  const featuredCases = featuredOrder
    .map((slug) => siteData.caseSummaries.find((item) => item.slug === slug))
    .filter((item): item is (typeof siteData.caseSummaries)[number] => Boolean(item));

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: copy.breadcrumbHome, path: getLocalizedPath(locale, "home") }]} />

      <Section className="section--hero">
        <div className="hero hero--minimal">
          <div className="hero__content">
            <div className="hero__intro-grid">
              <div className="hero__headline-stack">
                <h1 className="hero__title">
                  <span className="text-gradient">{siteData.hero.headline}</span>
                </h1>
                <h2 className="hero__subheadline">
                  <span className="hero__subheadline-line">{siteData.hero.subheadline}</span>
                </h2>
              </div>
              <div className="hero__aside" id="hero-profile-anchor">
                <div className="hero__profile">
                  <div className="hero__avatar-wrap hero__avatar-wrap--hero">
                    <Image src={profileImage} alt="Miguel González" width={220} height={220} priority />
                  </div>
                </div>
              </div>
            </div>

            <div className="hero__body">
              <div className="hero__actions">
                <Button
                  href={getLocalizedPath(locale, "contact")}
                  className="hero__cta"
                  track={{
                    event: "cta_click",
                    payload: { cta: "meeting_request", source: "hero" },
                  }}
                >
                  {siteData.hero.ctas.primary.label}
                </Button>
              </div>
              <p className="hero__microcopy">{siteData.hero.microcopy}</p>
              <div className="hero__proof" aria-label={copy.proofAria}>
                <div className="hero__proof-logos">
                  {heroProofLogos.map((logo) => (
                    <div key={logo.name} className="hero__proof-logo">
                      <Image
                        src={logo.src}
                        alt={logo.name}
                        width={logo.width}
                        height={logo.height}
                        className={`hero__proof-logo-image ${logo.className}`.trim()}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title={copy.impactTitle}>
        <div className="proof-grid proof-grid--featured">
          {siteData.kpisHome.map((kpi) => (
            <KPIStat
              key={kpi.id}
              value={kpi.value}
              label={kpi.label}
              note={kpi.note}
              className={kpi.id === "revenue-growth" ? "kpi-stat--revenue" : ""}
            />
          ))}
        </div>
      </Section>

      <HowIHelpSticky title={copy.howIHelpTitle} modules={siteData.howIHelpModules} />

      <Section id="featured-cases" title={copy.featuredCases}>
        <div className="case-grid case-grid--overview">
          {featuredCases.map((item) => {
            const override = homeExperienceOverrides[item.slug];
            const company = override?.company ?? item.company;
            const role = override?.role ?? item.role;

            return (
              <CollapsibleCaseCard
                key={item.slug}
                moreLabel={copy.seeMore}
                lessLabel={copy.seeLess}
                top={
                  <div className="case-card__top case-card__top--overview">
                    <Badge>{item.tag}</Badge>
                    <div className={`case-card__logo case-card__logo--${item.slug}`} aria-hidden="true">
                      {item.logo ? (
                        <Image
                          src={item.logo}
                          alt={`${company} logo`}
                          width={120}
                          height={42}
                          className="case-card__logo-image"
                        />
                      ) : (
                        <span className="case-card__logo-fallback">{getCompanyInitials(company)}</span>
                      )}
                    </div>
                  </div>
                }
                title={item.title}
                footer={
                  <p className="case-card__signature">
                    {company} · {role} · {item.years}
                  </p>
                }
              >
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
              </CollapsibleCaseCard>
            );
          })}
        </div>

        <div style={{ marginTop: 20 }}>
          <Button
            href={getLocalizedPath(locale, "relevantExperience")}
            variant="secondary"
            track={{
              event: "cta_click",
              payload: { cta: "view_cases", source: "home_cases" },
            }}
          >
            {copy.viewAll}
          </Button>
        </div>
      </Section>

      <Section title={copy.contact}>
        <ContactBlock compact source="home_contact" locale={locale} />
      </Section>

      <Section title={siteData.music.title}>
        <div className="off-clock">
          <div className="off-clock__media">
            <Image
              src={musicImage}
              alt={copy.liveAlt}
              fill
              sizes="(max-width: 739px) 100vw, (max-width: 1199px) 50vw, 42vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="off-clock__content">
            <p>{siteData.music.copy}</p>
            <div className="off-clock__links">
              {siteData.music.links.map((link) => (
                <a
                  key={link.href}
                  className="btn btn--secondary"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Container>
        <hr
          style={{
            border: 0,
            borderTop: "1px solid #d6dee6",
            margin: "0 0 32px",
          }}
        />
      </Container>
    </>
  );
}
