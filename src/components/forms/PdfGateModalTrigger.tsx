"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { Modal } from "@/src/components/ui/Modal";
import { SchemaForm } from "@/src/components/forms/SchemaForm";
import { getFormSchemas, getSiteData } from "@/content/siteData";
import { trackEvent } from "@/src/lib/tracking";
import type { Locale } from "@/src/lib/i18n";

interface PdfGateModalTriggerProps {
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  label?: string;
  source?: string;
  locale: Locale;
}

export function PdfGateModalTrigger({
  className = "",
  variant = "secondary",
  label,
  source = "unknown",
  locale,
}: PdfGateModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const siteData = getSiteData(locale);
  const formSchemas = getFormSchemas(locale);
  const resolvedLabel = label ?? siteData.resources.leadMagnet.cta;
  const modalTitle =
    locale === "en" ? "Download executive profile" : "Descargar perfil ejecutivo";

  const openModal = () => {
    setIsOpen(true);
    trackEvent("cta_click", { cta: "download_pdf", source });
    trackEvent("resource_open", { slug: siteData.resources.leadMagnet.slug, source });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button variant={variant} className={className} onClick={openModal}>
        {resolvedLabel}
      </Button>

      <Modal isOpen={isOpen} title={modalTitle} onClose={closeModal}>
        <SchemaForm
          schema={formSchemas.pdf_gate}
          hiddenFields={{ source, locale }}
          locale={locale}
          onSuccess={({ downloadUrl }) => {
            const target = downloadUrl || siteData.resources.leadMagnet.downloadUrl;
            if (target) {
              window.open(target, "_blank", "noopener,noreferrer");
            }
            closeModal();
          }}
        />
      </Modal>
    </>
  );
}
