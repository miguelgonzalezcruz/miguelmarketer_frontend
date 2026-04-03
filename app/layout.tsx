import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL, siteData } from "@/content/siteData";
import { SiteHeader } from "@/src/components/layout/SiteHeader";
import { SiteFooter } from "@/src/components/layout/SiteFooter";
import { JsonLd } from "@/src/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteData.person.displayName} | ${siteData.person.jobTitle}`,
    template: `%s | ${siteData.person.displayName}`,
  },
  description:
    "Perfil ejecutivo de Miguel González: posicionamiento, demanda y conversión conectados a resultados de negocio.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: siteData.person.displayName,
    url: SITE_URL,
    title: `${siteData.person.displayName} | ${siteData.person.jobTitle}`,
    description:
      "Marketing leadership para compañías que necesitan crecimiento predecible y ejecución de alto nivel.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    name: `${siteData.person.displayName} - Marketing Leadership`,
    url: SITE_URL,
    inLanguage: "es",
  };

  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#main-content">
          Saltar al contenido
        </a>
        <JsonLd data={personSchema} />
        <JsonLd data={websiteSchema} />
        <SiteHeader />
        <main id="main-content" className="site-main">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
