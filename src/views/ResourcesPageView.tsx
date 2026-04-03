import { getSiteData } from "@/content/siteData";
import type { Locale } from "@/src/lib/i18n";
import { getLocalizedPath } from "@/src/lib/routes";
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";
import { Section } from "@/src/components/ui/Section";
import { Card } from "@/src/components/ui/Card";
import { PdfGateModalTrigger } from "@/src/components/forms/PdfGateModalTrigger";
import { WaitlistCard } from "@/src/components/forms/WaitlistCard";

interface ResourcesPageViewProps {
  locale: Locale;
}

export function ResourcesPageView({ locale }: ResourcesPageViewProps) {
  const siteData = getSiteData(locale);
  const copy =
    locale === "en"
      ? {
          home: "Home",
          page: "Resources",
          title: "Material for executive evaluation",
          description:
            "Access the PDF profile and leave your email for the Growth Scorecard beta.",
        }
      : {
          home: "Inicio",
          page: "Recursos",
          title: "Material para evaluación ejecutiva",
          description:
            "Accede al perfil en PDF y deja tu email para la beta del Growth Scorecard.",
        };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: copy.home, path: getLocalizedPath(locale, "home") },
          { name: copy.page, path: getLocalizedPath(locale, "resources") },
        ]}
      />

      <Section eyebrow={copy.page} title={copy.title} description={copy.description}>
        <div className="resource-grid">
          <Card>
            <h3>{siteData.resources.leadMagnet.title}</h3>
            <p>{siteData.resources.leadMagnet.description}</p>
            <div className="resource-card__footer">
              <PdfGateModalTrigger source="recursos" locale={locale} />
            </div>
          </Card>

          <Card>
            <WaitlistCard source="recursos" locale={locale} />
          </Card>
        </div>
      </Section>
    </>
  );
}
