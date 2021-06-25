import React from "react";
import { Container } from "react-bootstrap";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className="app_header">
      <Navigation />

      <Container className="mt-5 text-center">
        <h1 className="text-light" style={{ fontSize: "4rem", fontWeight: "800", fontStyle: "italic" }}>
          Clarion Hotel
        </h1>
        <h3 className="text-light mt-3 fw-300">Internationl luxurious hotel in the planet _</h3>
      </Container>
    </header>
  );
}

export default Header;
