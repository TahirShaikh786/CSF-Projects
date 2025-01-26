import React from "react";
import imageEncrypt from "../assets/protected-file.png";
import TextEncrypt from "../assets/text-box.png";
import passgene from "../assets/key.png";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center flex-wrap">
          <Col md={3} className="services">
            <Link to="/image">
              <img src={imageEncrypt} alt="Image Encryption" />
              <h5>Image Encryption</h5>
            </Link>
          </Col>
          <Col md={3} className="services">
            <Link to="/text">
              <img src={TextEncrypt} alt="Image Encryption" />
              <h5>Text Encryption</h5>
            </Link>
          </Col>
          <Col md={3} className="services">
            <Link to="/password">
              <img src={passgene} alt="Image Encryption" />
              <h5>Password Generator</h5>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Services;
