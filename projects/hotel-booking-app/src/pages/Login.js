import React, { useEffect } from "react";
import { Card, Container, Button, Form } from "react-bootstrap";
import Navigation from "../components/Navigation";
import firebase from "../firebase-config";
import { AuthContext } from "../context/GlobalContextProvider";
import { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Google } from "react-bootstrap-icons";
import { useState } from "react";

function LoginPage() {
  const { user, setUser } = useContext(AuthContext);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  // Google provider login
  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { email, displayName: name } = result.user;
        setUser({ email, name });
        history.replace(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Custom email and password login
  const handleCustomLogin = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(emailAddress, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log({ errorCode, errorMessage });
      });
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
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" onChange={(e) => setEmailAddress(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Button
                  onClick={handleCustomLogin}
                  className="btn-block"
                  style={{
                    backgroundColor: "#8b3151",
                    outline: 0,
                    borderColor: "transparent",
                    boxShadow: "0 0 0 0",
                  }}
                >
                  LOGIN
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
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default LoginPage;
