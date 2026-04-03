"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/src/lib/i18n";
import { LOCALE_COOKIE } from "@/src/lib/i18n";
import { switchLocalePath } from "@/src/lib/routes";

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
}

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedLocale, setSelectedLocale] = useState<Locale>(locale);

  function handleLocaleChange(nextLocale: Locale) {
    setSelectedLocale(nextLocale);
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000`;

    const targetPath = switchLocalePath(pathname, nextLocale);

    startTransition(() => {
      router.push(targetPath);
      router.refresh();
    });
  }

  return (
    <div className="language-switcher">
      <label className="language-switcher__label" htmlFor="site-language">
        {label}
      </label>
      <select
        id="site-language"
        className="language-switcher__select"
        value={selectedLocale}
        onChange={(event) => handleLocaleChange(event.target.value as Locale)}
        disabled={isPending}
      >
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}
