"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ContactConversationWizard } from "@/src/components/contact/ContactConversationWizard";
import type { Locale } from "@/src/lib/i18n";
import { getLocalizedPath } from "@/src/lib/routes";

interface ContactBlockProps {
  compact?: boolean;
  source?: string;
  locale: Locale;
}

export function ContactBlock({ compact = false, source = "contact", locale }: ContactBlockProps) {
  const pathname = usePathname();
  const contactPath = getLocalizedPath(locale, "contact");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname !== contactPath) return;
    if (window.location.hash !== "#calendar") return;

    window.history.replaceState(null, "", pathname);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [contactPath, pathname]);

  return (
    <div className={`contact-block ${compact ? "contact-block--compact" : ""}`.trim()}>
      <div className="contact-block__form-wrap" id="calendar">
        <ContactConversationWizard source={`${source}_multistep_v5`} locale={locale} />
      </div>
    </div>
  );
}
