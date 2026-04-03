import { redirect } from "next/navigation";

interface CasosRedirectProps {
  params: {
    slug: string;
  };
}

export default function CasosSlugRedirectPage({ params }: CasosRedirectProps) {
  redirect(`/experiencia-relevante/${params.slug}`);
}
