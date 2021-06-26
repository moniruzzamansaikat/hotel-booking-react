import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { AuthContext, RoomContext } from "../context/GlobalContextProvider";
import firebase from "../firebase-config";
import Navigation from "../components/Navigation";

function BookingPage() {
  const [room, setRoom] = useState(null);
  const { roomId } = useParams();
  const [booking, setBooking] = useState(null);
  const { state, dispatch } = useContext(RoomContext);
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState();

  useEffect(() => {
    if (state) {
      setRoom(state.rooms.find((rm) => rm.id == roomId));
      setBooking(JSON.parse(localStorage.getItem("currentBooking")));
    }
  }, [roomId]);

  const confirmBooking = () => {
    // set user email
    booking.email = user.email;

    const ref = firebase.firestore().collection("bookings");
    ref.add(booking).then((wtf) => {
      setMessage("Your booking has bee confirmed !");
    });
  };

  return (
    <div>
      <Navigation bc />

      <Container className="my-4 py-2">
        <Card className="my-3">
          <Card.Img src={`/rooms/${room?.photo}`} className="img-fluid" />
          <Card.Body>
            {message ? (
              <p>
                {message} . <Link to="/mybookings">See your all bookings.</Link>
              </p>
            ) : (
              <>
                <h3>{room?.name}</h3>
                <p>
                  Your booking is being confirmed for {booking?.dayCount} days with {booking?.personCount} persons.
                </p>
                <p>Total Bill : ${booking?.totalBill} USD</p>
              </>
            )}
            <Button variant="success" onClick={confirmBooking}>
              CONFIRM BOOKING
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default BookingPage;
