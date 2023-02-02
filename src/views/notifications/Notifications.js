import React from "react";
import Header from "components/Headers/Header";
import { Container, Row, Col } from "reactstrap";
import SchduleNotification from "./schduleNotification.js/schduleNotification";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";

export default function Notifications() {
  const isloading = useSelector((state) => state.allnotifications.isLoading);
  return (
    <>
      <Header />
      <Container className="mt-5" fluid>
        {isloading ? (
          <div className="col aling-items-center">
            <Loader type="Grid" color="#8DBF26" height={60} width={60} />
          </div>
        ) : (
          <Row>
            <Col xs="6">
              <SchduleNotification />
            </Col>
            <Col xs="6"></Col>
          </Row>
        )}
      </Container>
    </>
  );
}
