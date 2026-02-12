import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

import logo from "../images/job_logos/logomiguelmarketer.svg";
import closeIcon from "../images/CloseIcon.svg";

const logoSrc = logo?.src || logo;
const closeIconSrc = closeIcon?.src || closeIcon;

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
          <Link href="/">
            <img className="burgerheader__logo-image" src={logoSrc} alt="logo" />
          </Link>
          <Link className="burgerheader__menu-list-item-brand" href="/">
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
              <img src={closeIconSrc} alt="Close menu" />
            </button>
            <ul className="burgerheader__menu-list-column">
              <li className="burgerheader__menu-list-item">
                <Link
                  className="burgerheader__menu-list-item-link"
                  href="/sobre-mi"
                  onClick={() => setIsOpen(false)}
                >
                  Sobre mi
                </Link>
              </li>
              <li className="burgerheader__menu-list-item">
                <Link
                  className="burgerheader__menu-list-item-link"
                  href="/mi-trayectoria"
                  onClick={() => setIsOpen(false)}
                >
                  Trayectoria
                </Link>
              </li>
              <li className="burgerheader__menu-list-item">
                <Link
                  className="burgerheader__menu-list-item-link"
                  href="/contacta"
                  onClick={() => setIsOpen(false)}
                >
                  Contacto
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
