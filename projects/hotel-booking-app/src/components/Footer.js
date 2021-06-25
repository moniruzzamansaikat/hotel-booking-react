import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark">
      <Container className="py-5">
        <p className="text-center text-light">&copy; {new Date().getFullYear()} - All right reserved clarion hotel</p>
      </Container>
    </footer>
  );
}

export default Footer;
