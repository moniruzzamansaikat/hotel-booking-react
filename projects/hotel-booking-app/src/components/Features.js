import React from "react";
import { Container, Row, Col, Card, CardImg } from "react-bootstrap";

function Features() {
  return (
    <section>
      <Container className="my-3 pb-3">
        <h2 className="mb-3 section_title">Features</h2>

        <Row>
          <Col md="4">
            <Card>
              <Card.Img style={{ height: "200px" }} variant="top" src="features/garden.jpg" />
              <Card.Body>
                <h3>Beautiful Garden</h3>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur molestias facere rem autem corrupti
                officia modi nemo ducimus qui illum.
              </Card.Body>
            </Card>
          </Col>

          <Col md="4">
            <Card>
              <Card.Img style={{ height: "200px" }} variant="top" src="features/swimming-pool.jpg" />
              <Card.Body>
                <h3>Large Swimming Pool</h3>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur molestias facere rem autem corrupti
                officia modi nemo ducimus qui illum.
              </Card.Body>
            </Card>
          </Col>

          <Col md="4">
            <Card>
              <Card.Img style={{ height: "200px" }} variant="top" src="features/virtual-reality.jpg" />
              <Card.Body>
                <h3>Explore virtual reality</h3>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur molestias facere rem autem corrupti
                officia modi nemo ducimus qui illum.
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Features;
