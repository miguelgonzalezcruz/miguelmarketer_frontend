import Link from "next/link";
import { Section } from "@/src/components/ui/Section";

export default function NotFoundPage() {
  return (
    <Section title="Página no encontrada" description="La ruta solicitada no existe o ya no está disponible.">
      <Link href="/" className="btn btn--primary">
        Volver al inicio
      </Link>
    </Section>
  );
}
