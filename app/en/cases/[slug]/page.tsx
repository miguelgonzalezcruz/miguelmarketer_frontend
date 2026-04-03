import { redirect } from "next/navigation";

interface CasesSlugRedirectProps {
  params: {
    slug: string;
  };
}

export default function CasesSlugRedirectPageEn({ params }: CasesSlugRedirectProps) {
  redirect(`/en/relevant-experience/${params.slug}`);
}
