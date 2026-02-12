import logo from "../images/job_logos/logomiguelmarketer.svg";
import Link from "next/link";

const logoSrc = logo?.src || logo;

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link href="/">
            <img className="header__logo-image" src={logoSrc} alt="logo" />
          </Link>
          <Link className="header__menu-list-item-brand" href="/">
            Miguel Marketer
          </Link>
        </div>
        <div className="header__menu">
          <ul className="header__menu-list">
            <li className="header__menu-list-item">
              <Link className="header__menu-list-item-link" href="/sobre-mi">
                Sobre mi
              </Link>
              <Link
                className="header__menu-list-item-link"
                href="/mi-trayectoria"
              >
                Trayectoria
              </Link>
              <Link className="header__menu-list-item-link" href="/contacta">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
