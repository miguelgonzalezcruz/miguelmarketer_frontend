"use client";

import { useState } from "react";
import { getFormSchemas, getSiteData } from "@/content/siteData";
import { SchemaForm } from "@/src/components/forms/SchemaForm";
import { Button } from "@/src/components/ui/Button";
import { trackEvent } from "@/src/lib/tracking";
import type { Locale } from "@/src/lib/i18n";

interface WaitlistCardProps {
  source?: string;
  locale: Locale;
}

export function WaitlistCard({ source = "recursos", locale }: WaitlistCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const siteData = getSiteData(locale);
  const formSchemas = getFormSchemas(locale);

  const handleOpen = () => {
    setIsOpen(true);
    trackEvent("resource_open", { slug: siteData.resources.tool.slug, source });
  };

  return (
    <div className="waitlist-card">
      <h3>{siteData.resources.tool.title}</h3>
      <p>{siteData.resources.tool.description}</p>

      {!isOpen ? (
        <Button variant="secondary" onClick={handleOpen}>
          {siteData.resources.tool.cta}
        </Button>
      ) : (
        <SchemaForm
          schema={formSchemas.waitlist}
          hiddenFields={{ intent: "waitlist", source, locale }}
          locale={locale}
        />
      )}
    </div>
  );
}
