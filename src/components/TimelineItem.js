import React from "react";

const groupLabels = {
  core: "Principal",
  side: "Proyecto paralelo",
  learning: "Formación",
};

const TimelineItem = ({ data, index }) => {
  const group = data.group || "core";
  const logoSrc = data.logo.img?.src || data.logo.img;
  const logoAlt = data.logo.alt || data.text;
  const logoBackground = data.logo.bgColor || "#ffffff";

  return (
    <div
      className="timeline-item"
      style={{
        zIndex: 20 + index,
      }}
    >
      <article className={`timeline-item-content timeline-item-content--${group}`}>
        <div className="timeline-item-head">
          <span className={`timeline-badge timeline-badge--${group}`}>
            {groupLabels[group] || groupLabels.core}
          </span>
          <p className="timeline-item-content-date">
            {data.datestart} - {data.date}
          </p>
        </div>
        <div className="timeline-item-main">
          <div>
            <p className="timeline-item-content-title">{data.title}</p>
            <p className="timeline-item-content-subtitle">{data.text}</p>
          </div>
          <div className="timeline-logo" style={{ backgroundColor: logoBackground }}>
            <img src={logoSrc} alt={logoAlt} loading="lazy" />
          </div>
        </div>
        <p className="timeline-item-content-description">{data.description}</p>
        {data.link && (
          <a href={data.link.url} target="_blank" rel="noopener noreferrer">
            {data.link.text}
          </a>
        )}
      </article>
    </div>
  );
};

export default TimelineItem;
