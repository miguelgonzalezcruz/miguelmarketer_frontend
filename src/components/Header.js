import logo from "../images/job_logos/logomiguelmarketer.svg";
import Link from "next/link";

const logoSrc = logo?.src || logo;

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link href="/#home">
            <img className="header__logo-image" src={logoSrc} alt="logo" />
          </Link>
          <Link className="header__menu-list-item-brand" href="/#home">
            Miguel González
          </Link>
        </div>
        <div className="header__menu">
          <ul className="header__menu-list">
            <li>
              <Link className="header__menu-list-item-link" href="/#about">
                Mi Propuesta
              </Link>
            </li>
            <li>
              <Link className="header__menu-list-item-link" href="/#career">
                Experiencia
              </Link>
            </li>
            <li>
              <Link className="header__menu-cta" href="/#contact">
                Solicitar reunión
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
