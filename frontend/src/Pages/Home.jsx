import React from "react";
import imageEncrypt from "../assets/protected-file.png";
import Header from "../Components/Header";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Hero from "../Components/Hero";
import Services from "../Components/Services";

const Home = () => {
  return (
    <>
      <Header />

      <main className="bg-black">
        <Container>
          <Row className="heroBox">
            <h1>Dashboard</h1>
          </Row>
          <Row>
            <Hero />
          </Row>
        </Container>
      </main>

      <section className="bg-black">
        <Container className="servicesBox">
          <Row>
            <h2>Our Services</h2>
          </Row>
          <Row>
            <Services />
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
