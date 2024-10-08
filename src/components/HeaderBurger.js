import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import "../blocks/HeaderBurger.css";

import logo from "../images/job_logos/logomiguelmarketer.svg";
import closeIcon from "../images/CloseIcon.svg";

function HeaderBurger() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <header className="burgerheader">
      <div className="burgerheader__container">
        <div className="burgerheader__logo">
          <Link to="/">
            <img className="burgerheader__logo-image" src={logo} alt="logo" />
          </Link>
          <Link className="burgerheader__menu-list-item-brand" to="/">
            Miguel Marketer
          </Link>
        </div>
        <div className="burgerheader__burger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {isOpen && (
          <div
            className={`burgerheader__sidebar ${
              isOpen ? "burgerheader__sidebar--open" : ""
            }`}
            ref={sidebarRef}
          >
            <button
              className="burgerheader__close"
              onClick={() => setIsOpen(false)}
            >
              <img src={closeIcon} alt="Close menu" />
            </button>
            <ul className="burgerheader__menu-list-column">
              <li className="burgerheader__menu-list-item">
                <Link
                  className="burgerheader__menu-list-item-link"
                  to="/sobre-mi"
                  onClick={() => setIsOpen(false)}
                >
                  Sobre mi
                </Link>
              </li>
              <li className="burgerheader__menu-list-item">
                <Link
                  className="burgerheader__menu-list-item-link"
                  to="/mi-trayectoria"
                  onClick={() => setIsOpen(false)}
                >
                  Trayectoria
                </Link>
              </li>
              <li className="burgerheader__menu-list-item">
                <Link
                  className="burgerheader__menu-list-item-link"
                  to="/contacta"
                  onClick={() => setIsOpen(false)}
                >
                  Contacto
                </Link>
              </li>
              <li className="burgerheader__menu-list-item">
                <Link
                  className="burgerheader__menu-list-item-link"
                  to="/blog-posts"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default HeaderBurger;
