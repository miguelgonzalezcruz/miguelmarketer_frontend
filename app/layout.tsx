import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { SITE_URL, getSiteData } from "@/content/siteData";
import { SiteHeader } from "@/src/components/layout/SiteHeader";
import { SiteFooter } from "@/src/components/layout/SiteFooter";
import { JsonLd } from "@/src/components/seo/JsonLd";
import { LOCALE_COOKIE, resolveLocale } from "@/src/lib/i18n";

export function generateMetadata(): Metadata {
  const locale = resolveLocale(cookies().get(LOCALE_COOKIE)?.value);
  const siteData = getSiteData(locale);
  const description =
    locale === "en"
      ? "Executive profile of Miguel González: positioning, demand and conversion aligned with business results."
      : "Perfil ejecutivo de Miguel González: posicionamiento, demanda y conversión conectados a resultados de negocio.";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${siteData.person.displayName} | ${siteData.person.jobTitle}`,
      template: `%s | ${siteData.person.displayName}`,
    },
    description,
    alternates: {
      canonical: locale === "en" ? "/en" : "/",
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "es_ES",
      siteName: siteData.person.displayName,
      url: locale === "en" ? `${SITE_URL}/en` : SITE_URL,
      title: `${siteData.person.displayName} | ${siteData.person.jobTitle}`,
      description:
        locale === "en"
          ? "Marketing leadership for companies that need predictable growth and high-level execution."
          : "Marketing leadership para compañías que necesitan crecimiento predecible y ejecución de alto nivel.",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = resolveLocale(cookies().get(LOCALE_COOKIE)?.value);
  const siteData = getSiteData(locale);
  const copy =
    locale === "en"
      ? {
          skipToContent: "Skip to content",
          websiteName: `${siteData.person.displayName} - Marketing Leadership`,
        }
      : {
          skipToContent: "Saltar al contenido",
          websiteName: `${siteData.person.displayName} - Marketing Leadership`,
        };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteData.person.fullName,
    alternateName: siteData.person.displayName,
    jobTitle: "Marketing Director",
    url: SITE_URL,
    sameAs: [siteData.person.linkedIn],
    description: siteData.person.description,
    homeLocation: siteData.person.location,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: copy.websiteName,
    url: SITE_URL,
    inLanguage: locale,
  };

  return (
    <html lang={locale}>
      <body>
        <a className="skip-link" href="#main-content">
          {copy.skipToContent}
        </a>
        <JsonLd data={personSchema} />
        <JsonLd data={websiteSchema} />
        <SiteHeader locale={locale} />
        <main id="main-content" className="site-main">
          {children}
        </main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
