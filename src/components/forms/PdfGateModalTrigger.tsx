"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { Modal } from "@/src/components/ui/Modal";
import { SchemaForm } from "@/src/components/forms/SchemaForm";
import { formSchemas, siteData } from "@/content/siteData";
import { trackEvent } from "@/src/lib/tracking";

interface PdfGateModalTriggerProps {
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  label?: string;
  source?: string;
}

export function PdfGateModalTrigger({
  className = "",
  variant = "secondary",
  label = "Descargar perfil (PDF)",
  source = "unknown",
}: PdfGateModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

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
        {label}
      </Button>

      <Modal isOpen={isOpen} title="Descargar perfil ejecutivo" onClose={closeModal}>
        <SchemaForm
          schema={formSchemas.pdf_gate}
          hiddenFields={{ source }}
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
