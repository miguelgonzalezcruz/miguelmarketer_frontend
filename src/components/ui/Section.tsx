import React from "react";
import { Container } from "@/src/components/ui/Container";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      <Container>
        {(eyebrow || title || description) && (
          <header className="section__header">
            {eyebrow ? <p className="section__eyebrow">{eyebrow}</p> : null}
            {title ? <h2 className="section__title">{title}</h2> : null}
            {description ? <p className="section__description">{description}</p> : null}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
