import React, { useState, useEffect } from "react";
// reactstrap components
import {
  Col,
  Container,
  Input,
  FormGroup,
  Card,
  Row,
  CardHeader,
  Button,
  CardBody,
  Form,
} from "reactstrap";
import { useToasts } from "react-toast-notifications";
import { bindActionCreators } from "redux";
import { actionsCreators } from "../../state/index";
import { useSelector, useDispatch } from "react-redux";
import { LOADING } from "../../Constants/constants";
import Header from "components/Headers/Header.js";
import Loader from "react-loader-spinner";
import parse from "html-react-parser";

export default function PublicTerms() {
  const dispatch = useDispatch();
  const newtermsData = useSelector((state) => state.allAuth.termsData);
  const isLoading = useSelector((state) => state.allAuth.isLoading);

  const { GET_TERM_CONDITION } = bindActionCreators(actionsCreators, dispatch);

  useEffect(() => {
    GET_TERM_CONDITION();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="aling-items-center mt-5">
          <Loader type="Grid" color="#8DBF26" height={60} width={60} />
        </div>
      ) : (
        <Container>
          <Col lg="12" md="12">
            <h1>{newtermsData?.data?.title}</h1>
            {newtermsData?.length !== 0 ? (
              <div className="ml-1"> {parse(newtermsData?.data?.body)}</div>
            ) : (
              ""
            )}
          </Col>
        </Container>
      )}
    </>
  );
}
