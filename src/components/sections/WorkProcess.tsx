import React from "react";

interface WorkStep {
  title: string;
  description: string;
}

interface WorkProcessProps {
  steps: WorkStep[];
}

export function WorkProcess({ steps }: WorkProcessProps) {
  return (
    <div className="work-basic">
      <div className="work-basic__row">
        {steps.map((step, index) => (
          <React.Fragment key={step.title}>
            <article className="work-basic__card">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>

            {index < steps.length - 1 ? (
              <span className="work-basic__arrow" aria-hidden="true">
                →
              </span>
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
