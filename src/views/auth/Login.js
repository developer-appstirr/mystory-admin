import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Spinner,
  Row,
  Col,
} from "reactstrap";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { _ADMIN_LOGIN } from "../../state/action-creater/index";
import { UserContext } from "../../context/userContext";
import logo from "../../assets/img/brand/logo.png";
import { useToasts } from "react-toast-notifications";
import { AUTH_LOADING, ADMIN_DATA } from "../../Constants/constants";
import ls from "localstorage-slim";

const Login = () => {
  const history = useHistory();
  const auth = getAuth();
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const isloading = useSelector((state) => state.allAuth.isLoading);

  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");

  const logginIn = async (e) => {
    e.preventDefault();
    if ((email !== "", password !== "")) {
      dispatch({
        type: AUTH_LOADING,
        payload: true,
      });
      try {
        await signInWithEmailAndPassword(auth, email, password).then(
          async function (userCredential) {
            const user = userCredential.user;
            const changingINData = {
              access_token: user?.stsTokenManager?.accessToken,
              expires_in: user?.stsTokenManager?.expirationTime,
              refresh_token: user?.stsTokenManager?.refreshToken,
            };
            const response = await _ADMIN_LOGIN(user?.accessToken);

            if (response?.data?.isSuccess) {
              ls.set("user", changingINData, { encrypt: true });
              ls.set("data", response?.data?.data, { encrypt: true });
              setUser(true);
              addToast(response?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              dispatch({
                type: AUTH_LOADING,
                payload: false,
              });
              dispatch({
                type: ADMIN_DATA,
                payload: response?.data,
              });
            } else {
              addToast(response.data.message, {
                appearance: "error",
                autoDismiss: true,
              });
              dispatch({
                type: AUTH_LOADING,
                payload: false,
              });
            }
          }
        );
      } catch (error) {
        addToast("Email Or Password Is Wrong", {
          appearance: "error",
          autoDismiss: true,
        });
        dispatch({
          type: AUTH_LOADING,
          payload: false,
        });
      }
    } else {
      addToast("fill all the feild", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };
  const redirect = (e) => {
    e.preventDefault();
    history.push("/auth/register");
  };
  return (
    <>
      <Col className="main-login" lg="5" md="7">
        <div className="logo-div">
          <img src={logo} className="logo" alt="logo" />
        </div>
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign In With Credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    maxLength="40"
                    autoComplete="new-email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    maxLength="40"
                    autoComplete="new-password"
                    onChange={(e) => setPasword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                  disabled={isloading}
                  onClick={(e) => logginIn(e)}
                  className="my-4 newgreen"
                  type="submit"
                >
                  {isloading ? (
                    <Spinner animation="border" variant="light" size="sm" />
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          {/* <Col xs="6"></Col>
          <Col className="text-right" xs="6">
            <a className="text-light" href="" onClick={(e) => redirect(e)}>
              <small>Create new account</small>
            </a>
          </Col> */}
        </Row>
      </Col>
    </>
  );
};

export default Login;
