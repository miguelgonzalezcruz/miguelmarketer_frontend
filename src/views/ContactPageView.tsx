import type { Locale } from "@/src/lib/i18n";
import { getLocalizedPath } from "@/src/lib/routes";
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";
import { Section } from "@/src/components/ui/Section";
import { ContactBlock } from "@/src/components/sections/ContactBlock";

interface ContactPageViewProps {
  locale: Locale;
}

export function ContactPageView({ locale }: ContactPageViewProps) {
  const copy =
    locale === "en"
      ? {
          home: "Home",
          page: "Contact",
        }
      : {
          home: "Inicio",
          page: "Contacto",
        };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: copy.home, path: getLocalizedPath(locale, "home") },
          { name: copy.page, path: getLocalizedPath(locale, "contact") },
        ]}
      />

      <Section title={copy.page}>
        <ContactBlock source="contacto" locale={locale} />
      </Section>
    </>
  );
}
