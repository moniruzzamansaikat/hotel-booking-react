import React, { useState, useEffect, useContext } from "react";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { RoomContext } from "../context/GlobalContextProvider";

import Navigation from "../components/Navigation";

function BookingPage() {
  const [room, setRoom] = useState(null);
  const { roomId } = useParams();
  const { state, dispatch } = useContext(RoomContext);

  useEffect(() => {
    if (state) setRoom(state.rooms.find((rm) => rm.id == roomId));
  }, [roomId]);

  return (
    <div>
      <Navigation bc />

      <Container className="my-4 py-2">
        <Card className="my-3">
          <Card.Img src={`/rooms/${room?.photo}`} className="img-fluid" />
          <Card.Body>
            <h3>{room?.name}</h3>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default BookingPage;
