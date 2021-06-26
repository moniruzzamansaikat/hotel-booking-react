import React, { useEffect } from "react";
import { Card, Container, Button, Form } from "react-bootstrap";
import Navigation from "../components/Navigation";
import firebase from "../firebase-config";
import { AuthContext } from "../context/GlobalContextProvider";
import { useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Google } from "react-bootstrap-icons";
import { useState } from "react";
import { createUser, googleLogin } from "../utils/loginManager";

function RegisterPage() {
  const { user, setUser } = useContext(AuthContext);
  const [emailAddress, setEmailAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ email: "", password: "", name: "" });

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  // Google provider login
  const handleGoogleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const newLoggedInUser = await googleLogin(provider);
    setUser(newLoggedInUser);
    history.replace(from);
  };

  // Custom email and password login
  const handleRegister = async () => {
    if (!fullName.trim().length) {
      setMessage((prev) => ({ ...prev, name: "Please enter your name !" }));
    } else {
      setMessage((prev) => ({ ...prev, name: "" }));
    }

    if (!emailAddress.trim().length || !validateEmail(emailAddress)) {
      setMessage((prev) => ({ ...prev, email: "Enter an valid email !" }));
    } else {
      setMessage((prev) => ({ ...prev, email: "" }));
    }

    if (!password.trim().length) {
      setMessage((prev) => ({ ...prev, password: "Enter your password !" }));
    } else if (password.length < 6) {
      setMessage((prev) => ({ ...prev, password: "Password must be at least 6 characters long !" }));
    } else {
      setMessage((prev) => ({ ...prev, password: "" }));
    }

    if (Object.values(message).every((item) => item.length === 0)) {
      const user = await createUser({
        fullName,
        emailAddress,
        password,
      });
      setUser(user);
      history.replace(from);
    }
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  useEffect(() => {
    if (user) {
      history.replace(from);
    }
  }, [user]);

  return (
    <div>
      <Navigation bc />

      <Container>
        <Card style={{ margin: "0  auto", width: 400 }} className="my-3">
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" onChange={(e) => setFullName(e.target.value)} value={fullName} />
                {message.name && <small style={{ color: "#b71010", fontSize: "11px" }}>{message.name}</small>}
              </Form.Group>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" onChange={(e) => setEmailAddress(e.target.value)} value={emailAddress} />
                {message.email && <small style={{ color: "#b71010", fontSize: "11px" }}>{message.email}</small>}
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                {message.password && <small style={{ color: "#b71010", fontSize: "11px" }}>{message.password}</small>}
              </Form.Group>
              <Form.Group>
                <Button
                  onClick={handleRegister}
                  className="btn-block"
                  style={{
                    backgroundColor: "#8b3151",
                    outline: 0,
                    borderColor: "transparent",
                    boxShadow: "0 0 0 0",
                  }}
                >
                  REGISTER
                </Button>
              </Form.Group>
            </Form>

            <Button
              onClick={handleGoogleLogin}
              className="btn-block"
              type="button"
              style={{
                backgroundColor: "#3f73e2",
                outline: 0,
                borderColor: "transparent",
                boxShadow: "0 0 0 0",
              }}
            >
              <Google className="me-3" style={{ marginRight: "10px", marginBottom: "3px" }} />
              <span className="ms-2">LOGIN WITH GOOGLE</span>
            </Button>
            <p className="mt-3" style={{ fontSize: "13px" }}>
              <span className="mr-2">Already have an account ?</span>
              <Link to="/login">Sign In</Link>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default RegisterPage;
