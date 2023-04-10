import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

import "../blocks/JobLogos.css";

import logo1 from "../images/job_logos/logo_logitravel.svg";
import logo2 from "../images/job_logos/logo_portblue.png";
import logo3 from "../images/job_logos/logo_rafa-nadal-academy.png";
import logo4 from "../images/job_logos/logo_hotelbeds.png";
import logo5 from "../images/job_logos/logo_roiback.png";

const cardStyle = {
  margin: "10px",
};

function JobLogos() {
  return (
    <div className="job-logos">
      <h2 className="job-logos-title">He trabajado en:</h2>
      <CardGroup className="job-logos-container">
        <Card style={cardStyle}>
          <Card.Img variant="top" src={logo1} />
        </Card>
        <Card style={cardStyle}>
          <Card.Img variant="top" src={logo2} />
        </Card>
        <Card style={cardStyle}>
          <Card.Img variant="top" src={logo3} />
        </Card>
        <Card style={cardStyle}>
          <Card.Img variant="top" src={logo4} />
        </Card>
        <Card style={cardStyle}>
          <Card.Img variant="top" src={logo5} />
        </Card>
      </CardGroup>
    </div>
  );
}

export default JobLogos;
