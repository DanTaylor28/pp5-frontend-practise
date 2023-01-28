import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import logo2 from "../assets/logo2.png";

const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top">
      <Container>
        <Navbar.Brand>
          <img src={logo2} alt="logo" height="75" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Sign In</Nav.Link>
            <Nav.Link>Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
