import Link from "next/link";
import { Container } from "@/src/components/ui/Container";
import { siteData } from "@/content/siteData";

const year = new Date().getFullYear();

export function SiteFooter() {
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

        <nav className="site-footer__nav" aria-label="Enlaces secundarios">
          <Link href="/experiencia-relevante">Experiencia Relevante</Link>
          <Link href="/contacto">Contacto</Link>
          <a href={siteData.person.linkedIn} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </nav>

        <p className="site-footer__meta">© {year} {siteData.person.displayName}</p>
      </Container>
    </footer>
  );
}
