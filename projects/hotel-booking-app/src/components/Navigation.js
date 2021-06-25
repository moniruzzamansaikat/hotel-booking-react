import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/GlobalContextProvider";
import firebase from "../firebase-config";
import { MenuButtonFill } from "react-bootstrap-icons";

function Navigation({ bc }) {
  const { user, setUser, isLoading } = useContext(AuthContext);

  const handleSignOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(setUser(null));
  };

  return (
    <Navbar expand="lg" sticky="top" bg={bc ? "dark" : ""}>
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img src="/logo.svg" alt="" style={{ width: "100px" }} />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="my-nav" style={{ background: "transparent", border: "0" }}>
          <MenuButtonFill style={{ color: "#f0f0f0" }} accumulate="sum" />
        </Navbar.Toggle>

        <Navbar.Collapse id="my-nav">
          <Nav className="ml-auto">
            <Nav.Link className="text-light" href="#home">
              <Link to="/" style={{ textDecoration: "none", color: "#f0f0f0", fontWeight: "300" }}>
                Home
              </Link>
            </Nav.Link>
            <Nav.Link className="text-light" href="#pricing">
              <Link to="/rooms" style={{ textDecoration: "none", color: "#f0f0f0", fontWeight: "300" }}>
                Rooms
              </Link>
            </Nav.Link>
            {user && (
              <Nav.Link className="text-light" href="#pricing">
                <Link to="/mybookings" style={{ textDecoration: "none", color: "#f0f0f0", fontWeight: "300" }}>
                  My Bookings
                </Link>
              </Nav.Link>
            )}
            <Nav.Link className="btn btn-primary login_button" href="#">
              {user ? (
                <a href="/login" onClick={handleSignOut} style={{ textDecoration: "none", color: "#f0f0f0" }}>
                  {isLoading ? "loading..." : "Sign Out"}
                </a>
              ) : (
                <Link to="/login" style={{ textDecoration: "none", color: "#f0f0f0" }}>
                  {isLoading ? "loading..." : "Sing In"}
                </Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
