"use client";

import React from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export function Modal({ isOpen, title, children, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal-card">
        <button className="modal-close" type="button" onClick={onClose}>
          Cerrar
        </button>
        <h3 className="modal-title">{title}</h3>
        {children}
      </div>
    </div>
  );
}
