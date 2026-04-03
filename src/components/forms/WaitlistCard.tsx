"use client";

import { useState } from "react";
import { formSchemas, siteData } from "@/content/siteData";
import { SchemaForm } from "@/src/components/forms/SchemaForm";
import { Button } from "@/src/components/ui/Button";
import { trackEvent } from "@/src/lib/tracking";

interface WaitlistCardProps {
  source?: string;
}

export function WaitlistCard({ source = "recursos" }: WaitlistCardProps) {
  const [isOpen, setIsOpen] = useState(false);

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
        <SchemaForm schema={formSchemas.waitlist} hiddenFields={{ intent: "waitlist", source }} />
      )}
    </div>
  );
}
