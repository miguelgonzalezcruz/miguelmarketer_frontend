import React, { useEffect, useRef, useState } from "react";
import TimelineItem from "./TimelineItem";
import workdata from "../utils/workdata";

const sortedWorkData = [...workdata].sort((a, b) => {
  if (a.featured && !b.featured) return -1;
  if (!a.featured && b.featured) return 1;
  return b.datestart - a.datestart;
});

const filterOptions = [
  { key: "core", label: "Puestos principales" },
  { key: "side", label: "Proyectos paralelos" },
  { key: "learning", label: "Formación" },
];

const Timeline = () => {
  const headRef = useRef(null);
  const [headHeight, setHeadHeight] = useState(0);
  const [activeFilter, setActiveFilter] = useState(null);

  useEffect(() => {
    const updateHeadHeight = () => {
      if (!headRef.current) return;
      setHeadHeight(headRef.current.getBoundingClientRect().height);
    };

    updateHeadHeight();
    window.addEventListener("resize", updateHeadHeight);

    return () => {
      window.removeEventListener("resize", updateHeadHeight);
    };
  }, []);

  const filteredWorkData = activeFilter
    ? sortedWorkData.filter((item) => item.group === activeFilter)
    : sortedWorkData;

  return (
    filteredWorkData.length > 0 && (
      <>
        <div
          id="career"
          className="timeline-block"
          style={{ "--timeline-head-height": `${headHeight}px` }}
        >
          <div className="timeline-head" ref={headRef}>
            <h1 className="timeline-title">Experiencia relevante</h1>
            <p className="timeline-intro">
              Recorrido profesional liderando estrategia de marca, growth y
              transformación digital en compañías internacionales.
            </p>
            <div className="timeline-legend">
              {filterOptions.map((option) => {
                const isAllActive = activeFilter === null;
                const isSelected = activeFilter === option.key;

                return (
                  <button
                    key={option.key}
                    type="button"
                    aria-pressed={isAllActive || isSelected}
                    onClick={() =>
                      setActiveFilter((current) =>
                        current === option.key ? null : option.key
                      )
                    }
                    className={`timeline-legend-pill timeline-legend-pill--${option.key} ${
                      isAllActive
                        ? "timeline-legend-pill--all-active"
                        : isSelected
                        ? "timeline-legend-pill--selected"
                        : "timeline-legend-pill--inactive"
                    }`}
                  >
                    {option.label}
                    {isSelected && (
                      <span
                        className="timeline-legend-pill-close"
                      >
                        ✕
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="timeline-container">
            {filteredWorkData.map((data, idx) => (
              <TimelineItem data={data} index={idx} key={data.id} />
            ))}
          </div>
        </div>
      </>
    )
  );
};

export default Timeline;
