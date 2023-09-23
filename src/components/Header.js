import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";

import "../blocks/Header.css";

import logo from "../images/job_logos/logomiguelmarketer.svg";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="mr-auto">
          <Image
            src={logo}
            alt="Miguel Marketer Logo"
            height="32"
            className="mr-2"
          />
          Miguel Marketer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link as={Link} to="/#about">
              Sobre mi
            </Nav.Link>
            <Nav.Link as={Link} to="/#career">
              Trayectoria
            </Nav.Link>
            <Nav.Link as={Link} to="/#contact">
              Contacto
            </Nav.Link>
            <Nav.Link as={Link} to="/blog">
              Blog
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
