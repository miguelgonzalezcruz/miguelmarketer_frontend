import type React from "react";
import { Container } from "@/src/components/ui/Container";
import { Card } from "@/src/components/ui/Card";

interface HelpModule {
  id: string;
  title: string;
  description: string;
}

interface HowIHelpStickyProps {
  eyebrow?: string;
  title: React.ReactNode;
  modules: HelpModule[];
}

function ModuleIcon({ moduleId }: { moduleId: string }) {
  if (moduleId === "positioning-gtm") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2V4M12 20V22M2 12H4M20 12H22" />
      </svg>
    );
  }

  if (moduleId === "demand-pipeline") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5H20L14 12V18L10 20V12L4 5Z" />
        <path d="M16 16H21M19 14L21 16L19 18" />
      </svg>
    );
  }

  if (moduleId === "website-revenue") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5" width="16" height="10" rx="2" />
        <path d="M2 19H22" />
        <path d="M10 15H14" />
      </svg>
    );
  }

  if (moduleId === "revops-automation-ai") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="6" y="8" width="12" height="9" rx="3" />
        <circle cx="10" cy="12.5" r="1.1" />
        <circle cx="14" cy="12.5" r="1.1" />
        <path d="M12 8V5M9 5H15M6 13H3M21 13H18" />
      </svg>
    );
  }

  if (moduleId === "leadership-alignment") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="1.4" />
        <path d="M12 4V6M12 18V20M4 12H6M18 12H20" />
        <path d="M12 12L16.2 7.8" />
        <path d="M12 12L8.4 15.6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3V21M3 12H21" />
    </svg>
  );
}

function iconToneClass(moduleId: string) {
  if (moduleId === "positioning-gtm") return "how-help__icon-wrap--target";
  if (moduleId === "demand-pipeline") return "how-help__icon-wrap--pipeline";
  if (moduleId === "website-revenue") return "how-help__icon-wrap--web";
  if (moduleId === "revops-automation-ai") return "how-help__icon-wrap--automation";
  return "how-help__icon-wrap--leadership";
}

export function HowIHelpSticky({ eyebrow, title, modules }: HowIHelpStickyProps) {
  return (
    <section
      id="como-ayudo"
      className="section section--how-help"
    >
      <Container>
        <div className="how-help">
          <aside className="how-help__sticky">
            {eyebrow ? <p className="section__eyebrow">{eyebrow}</p> : null}
            <h2 className="section__title">{title}</h2>
          </aside>

          <div className="how-help__track">
            <div className="how-help__stage">
              <div className="how-help__cards">
                {modules.map((module) => (
                  <Card key={module.id} className="how-help__card">
                    <div className="how-help__card-inner">
                      <div
                        className={`how-help__icon-wrap ${iconToneClass(module.id)}`}
                      >
                        <ModuleIcon moduleId={module.id} />
                      </div>
                      <div className="how-help__content">
                        <h3>{module.title}</h3>
                        <p>{module.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
