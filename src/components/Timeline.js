import React from "react";

import "../blocks/Timeline.css";
import TimelineItem from "./TimelineItem";
import workdata from "../utils/workdata";

const miguel = require("../images/job_logos/miguel.jpeg");

const sortedWorkData = workdata.sort((a, b) => a.datestart - b.datestart);

const Timeline = () =>
  sortedWorkData.length > 0 && (
    <>
      <div id="career" className="timeline-block">
        <h1 className="timeline-title">Trayectoria</h1>

        <div className="timeline-container">
          <div className="userimage"></div>
          {sortedWorkData.map((data, idx) => (
            <TimelineItem data={data} key={idx} />
          ))}
          <div className="userimage-now"></div>
        </div>
      </div>
    </>
  );

export default Timeline;
