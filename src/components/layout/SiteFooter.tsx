import Link from "next/link";
import { Container } from "@/src/components/ui/Container";
import { getSiteData } from "@/content/siteData";
import type { Locale } from "@/src/lib/i18n";
import { getLocalizedPath } from "@/src/lib/routes";
import { LanguageSwitcher } from "@/src/components/layout/LanguageSwitcher";

const year = new Date().getFullYear();

interface SiteFooterProps {
  locale: Locale;
}

export function SiteFooter({ locale }: SiteFooterProps) {
  const siteData = getSiteData(locale);
  const copy =
    locale === "en"
      ? {
          navLabel: "Secondary links",
          relevantExperience: "Relevant Experience",
          contact: "Contact",
          languageLabel: "Language",
        }
      : {
          navLabel: "Enlaces secundarios",
          relevantExperience: "Experiencia Relevante",
          contact: "Contacto",
          languageLabel: "Idioma",
        };

  return (
    <footer className="site-footer">
      <div className="site-footer__line" aria-hidden="true" />
      <Container className="site-footer__inner">
        <div>
          <p className="site-footer__brand">{siteData.person.displayName}</p>
          <p className="site-footer__meta">
            {siteData.person.jobTitle} · {siteData.person.location}
          </p>
        </div>

        <nav className="site-footer__nav" aria-label={copy.navLabel}>
          <Link href={getLocalizedPath(locale, "relevantExperience")}>{copy.relevantExperience}</Link>
          <Link href={getLocalizedPath(locale, "contact")}>{copy.contact}</Link>
          <a href={siteData.person.linkedIn} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </nav>

        <div className="site-footer__locale-wrap">
          <LanguageSwitcher locale={locale} label={copy.languageLabel} />
          <p className="site-footer__meta">© {year} {siteData.person.displayName}</p>
        </div>
      </Container>
    </footer>
  );
}
