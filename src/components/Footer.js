import "../blocks/Footer.css";

import linkedin from "../images/job_logos/In-White-128@2x.png";

import logo from "../images/job_logos/logomiguelmarketer.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__name-content">
        <img src={logo} alt="Miguel González" />
        <p className="footer__text">Miguel Marketer</p>
      </div>
      <div className="footer__linkedin-badge">
        <a
          href="https://www.linkedin.com/in/miguelgonzalezcruz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedin} alt="LinkedIn Badge" width="40" height="auto" />
        </a>
      </div>
      <p className="footer__text">
        Desarrollado por Miguel González | {new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default Footer;
