"use client";

import { useState } from "react";
import type React from "react";
import { Card } from "@/src/components/ui/Card";

interface CollapsibleCaseCardProps {
  className?: string;
  top: React.ReactNode;
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  moreLabel: string;
  lessLabel: string;
}

export function CollapsibleCaseCard({
  className = "",
  top,
  title,
  children,
  footer,
  moreLabel,
  lessLabel,
}: CollapsibleCaseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className={`case-card case-card--overview case-card--collapsible ${className}`.trim()}
      data-expanded={isExpanded}
    >
      {top}
      <div className="case-card__body case-card__body--overview">
        <h3>{title}</h3>
        <button
          type="button"
          className="case-card__mobile-toggle"
          onClick={() => setIsExpanded((current) => !current)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? lessLabel : moreLabel}
        </button>
        <div className="case-card__mobile-panel">{children}</div>
      </div>
      <div className="case-card__credentials">{footer}</div>
    </Card>
  );
}
