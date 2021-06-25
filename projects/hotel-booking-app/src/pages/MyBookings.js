import React, { useEffect } from "react";
import { Card, Container, Button, Form } from "react-bootstrap";
import Navigation from "../components/Navigation";

function LoginPage() {
  return (
    <div>
      <Navigation bc />

      <Container>
        <h2 className="section_title">My Bookings</h2>
      </Container>
    </div>
  );
}

export default LoginPage;
