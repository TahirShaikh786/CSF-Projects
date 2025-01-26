import React from "react";
import heroImg from "../assets/heroImg.png"
import { Col, Container, Row } from "react-bootstrap";

const Hero = () => {
  return (
    <>
      <Container>
        <Row className="hero">
          <Col md={6} className="d-flex align-items-center">
            <h3>
              <span>"Secure Service"</span> is a comprehensive Cyber Security solution
              designed to provide robust protection and privacy for sensitive
              data. The project offers various services such as image
              encryption, text encryption, and other forms of data security.
              These services ensure that users' files, communications, and
              digital assets are securely encrypted, making them unreadable to
              unauthorized parties.
            </h3>
          </Col>
          <Col md={6}>
            <img src={heroImg} alt="Hero Image" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Hero;
