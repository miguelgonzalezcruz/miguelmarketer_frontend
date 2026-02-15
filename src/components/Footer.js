import linkedin from "../images/job_logos/In-White-128@2x.png";

import logo from "../images/job_logos/logomiguelmarketer.svg";

const logoSrc = logo?.src || logo;
const linkedinSrc = linkedin?.src || linkedin;

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__name-content">
        <img src={logoSrc} alt="Miguel González" />
        <p className="footer__text">Miguel González | Marketing Director</p>
      </div>
      <div className="footer__linkedin-badge">
        <a
          href="https://www.linkedin.com/in/miguelgonzalezcruz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={linkedinSrc}
            alt="LinkedIn Badge"
            width="40"
            height="auto"
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
