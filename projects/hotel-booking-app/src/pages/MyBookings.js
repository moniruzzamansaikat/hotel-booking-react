import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Card, Container, Button, Form, Row, Col } from "react-bootstrap";
import Navigation from "../components/Navigation";
import { AuthContext } from "../context/GlobalContextProvider";
import firebase from "../firebase-config";
import CountDown from "react-countdown";

function LoginPage() {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    firebase
      .firestore()
      .collection("bookings")
      .where("email", "==", user.email)
      .get()
      .then((snapshot) => {
        console.log(snapshot.docs);
        setBookings(snapshot.docs);
      });
  }, []);

  const handleCancleBooking = (doc) => {
    // firebase.firestore().collection('bookings').where('email', '==', user.email)
    alert(doc.uid);
    console.log(doc._id);
  };

  return (
    <div>
      <Navigation bc />

      <Container>
        <h2 className="section_title">My Bookings</h2>

        <Row className="mb-5">
          {bookings &&
            bookings.map((booking, index) => {
              let date1 = new Date();
              let date2 = booking.data().startDate;
              date2 = date2?.replace(/([+\-]\d\d)(\d\d)$/, "$1:$2");
              date2 = new Date(date2);

              const cancelable = date2.getTime() > date1.getTime();

              return (
                <Col key={index} md="4">
                  <Card>
                    <Card.Body>
                      <h5>{booking.data().roomName}</h5>
                      <CountDown date={new Date(booking.data().startDate)}>
                        <p className="text-success">Enjoy Your Destination !</p>
                      </CountDown>
                      <br />
                      <br />
                      {cancelable ? (
                        <Button variant="danger" onClick={() => handleCancleBooking(booking)}>
                          Cancel Booking
                        </Button>
                      ) : null}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;
