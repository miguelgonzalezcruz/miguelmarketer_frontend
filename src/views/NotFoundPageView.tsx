import Link from "next/link";
import type { Locale } from "@/src/lib/i18n";
import { getLocalizedPath } from "@/src/lib/routes";
import { Section } from "@/src/components/ui/Section";

interface NotFoundPageViewProps {
  locale: Locale;
}

export function NotFoundPageView({ locale }: NotFoundPageViewProps) {
  const copy =
    locale === "en"
      ? {
          title: "Page not found",
          description: "The requested route does not exist or is no longer available.",
          cta: "Back to home",
        }
      : {
          title: "Página no encontrada",
          description: "La ruta solicitada no existe o ya no está disponible.",
          cta: "Volver al inicio",
        };

  return (
    <Section title={copy.title} description={copy.description}>
      <Link href={getLocalizedPath(locale, "home")} className="btn btn--primary">
        {copy.cta}
      </Link>
    </Section>
  );
}
