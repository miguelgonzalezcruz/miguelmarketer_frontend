import { cookies } from "next/headers";
import { LOCALE_COOKIE, resolveLocale } from "@/src/lib/i18n";
import { NotFoundPageView } from "@/src/views/NotFoundPageView";

export default function NotFoundPage() {
  const locale = resolveLocale(cookies().get(LOCALE_COOKIE)?.value);
  return <NotFoundPageView locale={locale} />;
}
