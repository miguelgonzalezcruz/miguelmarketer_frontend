"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ContactConversationWizard } from "@/src/components/contact/ContactConversationWizard";

interface ContactBlockProps {
  compact?: boolean;
  source?: string;
}

export function ContactBlock({ compact = false, source = "contact" }: ContactBlockProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname !== "/contacto") return;
    if (window.location.hash !== "#calendar") return;

    window.history.replaceState(null, "", pathname);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div className={`contact-block ${compact ? "contact-block--compact" : ""}`.trim()}>
      <div className="contact-block__form-wrap" id="calendar">
        <ContactConversationWizard source={`${source}_multistep_v5`} />
      </div>
    </div>
  );
}
