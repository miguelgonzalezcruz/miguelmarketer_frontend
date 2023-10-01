import logo from "../images/job_logos/logomiguelmarketer.svg";

import { Link } from "react-router-dom";

import "../blocks/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">
            <img className="header__logo-image" src={logo} alt="logo" />
          </Link>
          <Link className="header__menu-list-item-brand" to="/">
            Miguel Marketer
          </Link>
        </div>
        <div className="header__menu">
          <ul className="header__menu-list">
            <li className="header__menu-list-item">
              <Link className="header__menu-list-item-link" to="/#about">
                Sobre mi
              </Link>
              <Link className="header__menu-list-item-link" to="/#career">
                Trayectoria
              </Link>
              <Link className="header__menu-list-item-link" to="/#contact">
                Contacto
              </Link>
              <Link className="header__menu-list-item-link" to="/blog">
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
