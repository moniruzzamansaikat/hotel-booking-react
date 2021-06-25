import React, { useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";

import { useContext } from "react";
import { RoomContext } from "../context/GlobalContextProvider";
import { AuthContext } from "../context/GlobalContextProvider";

import Navigation from "../components/Navigation";
import RoomCard from "../components/RoomCard";
import { useState } from "react";

function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const { state, dispatch } = useContext(RoomContext);

  const { isLoading, setIsLoading } = useContext(AuthContext);

  useEffect(() => {
    dispatch({ type: "LOAD_ROOMS" });
    setRooms(state.rooms);
  }, [state, dispatch]);

  return (
    <div>
      <Navigation bc />
      <Container className="mb-5">
        <h2 className="section_title">Rooms</h2>

        {isLoading ? (
          <Spinner animation="grow" />
        ) : (
          <Row>
            {rooms.map((room) => (
              <Col md="4" key={room.id}>
                <RoomCard room={room} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default RoomsPage;
