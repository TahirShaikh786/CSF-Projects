import React from "react";
import "../assets/CSS/components.css";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import headerLogo from "../assets/csf_logo.jpg";

const Header = () => {
  return (
    <>
      <header className="bg-black">
        <Container>
          <Navbar expand="lg">
            <Container className="d-flex ">
              <Navbar.Brand className="navLogo">
                <Link to='/'><img src={headerLogo} alt="Logo"/></Link>
              </Navbar.Brand>
              <Navbar.Collapse className="Links justify-content-end">
                <Link>Login</Link>
                <Link>Register</Link>
                <Link>Logout</Link>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Container>
      </header>
    </>
  );
};

export default Header;
