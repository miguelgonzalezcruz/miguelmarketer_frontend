import React from "react";
import "../blocks/Timeline.css";
import { Card } from "react-bootstrap";

const Timeline = () => {
  const data = [
    {
      date: "January 2022",
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra justo vel nulla dapibus luctus. Nunc gravida urna id sapien feugiat, sit amet sagittis enim pharetra. Maecenas tincidunt vestibulum mauris, vel laoreet ipsum tristique vel.",
    },
    {
      date: "February 2022",
      title: "Dolor Sit Amet",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      date: "March 2022",
      title: "Consectetur Adipiscing Elit",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
  ];

  return (
    <div className="timeline">
      {data.map((item, index) => (
        <div
          className={`timeline-item ${
            index % 2 === 0 ? "timeline-item-left" : "timeline-item-right"
          }`}
          key={index}
        >
          <div className="timeline-dot"></div>
          <Card className="timeline-card">
            <Card.Body>
              <Card.Title className="timeline-title">{item.title}</Card.Title>
              <Card.Subtitle className="timeline-date mb-2 text-muted">
                {item.date}
              </Card.Subtitle>
              <Card.Text className="timeline-description">
                {item.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
