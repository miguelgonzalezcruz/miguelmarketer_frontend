import React from "react";

import "../blocks/TimelineList.css";
import TimelineItem from "./TimelineItem";
import workdata from "../utils/workdata";

const sortedWorkData = workdata.sort((a, b) => b.datestart - a.datestart);

const Timeline = () =>
  sortedWorkData.length > 0 && (
    <>
      <div id="career" className="timeline-block">
        <h1 className="timeline-title">Trayectoria</h1>

        <div className="timeline-container">
          <div className="userimage-now"></div>
          {sortedWorkData.map((data, idx) => (
            <TimelineItem data={data} key={idx} />
          ))}
          <div className="userimage"></div>
        </div>
      </div>
    </>
  );

export default Timeline;
