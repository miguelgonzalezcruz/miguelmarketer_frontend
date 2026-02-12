import React from "react";

const TimelineItem = ({ data }) => (
  <div className="timeline-item">
    <div className="timeline-item-content">
      {/* <span className="tag" style={{ color: data.category.color }}>
        {data.category.tag}
      </span> */}

      <p className="timeline-item-content-title">{data.title}</p>
      <p className="timeline-item-content-subtitle">{data.text}</p>
      <p className="timeline-item-content-date">
        {data.datestart} - {data.date}
      </p>
      <p className="timeline-item-content-description">{data.description}</p>
      {data.link && (
        <a href={data.link.url} target="_blank" rel="noopener noreferrer">
          {data.link.text}
        </a>
      )}
      <span
        className="circle"
        style={{ backgroundImage: `url(${data.logo.img?.src || data.logo.img})` }}
      />
    </div>
  </div>
);

export default TimelineItem;
