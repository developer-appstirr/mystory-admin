import React from "react";
import Header from "components/Headers/Header";
import { Container, Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import MediaAndGallery from "components/MediaAndGallery/MediaAndGallery";

export default function AllMedia() {
  const location = useLocation();
  return (
    <>
      <Header />
      <Container className="mt-5" fluid>
        <Row>
          <Col xs="12">
            <MediaAndGallery data={location.state?.data?.media} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
