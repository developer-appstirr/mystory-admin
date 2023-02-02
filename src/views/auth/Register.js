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
  Progress,
  Spinner,
  Row,
  Col,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useContext } from "react";
import { _ADMIN_SIGNUP } from "../../state/action-creater/index";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { bindActionCreators } from "redux";
// import { actionsCreators } from "../../state/index";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { useToasts } from "react-toast-notifications";
import ls from "localstorage-slim";
import { UserContext } from "../../context/userContext";
import { AUTH_LOADING, ADMIN_DATA } from "../../Constants/constants";

const Register = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [progress, setProgress] = React.useState(0);
  const [url, setUrl] = React.useState("");
  const [disablechkr, setDisablechkr] = React.useState(false);
  // const [buffer, setBuffer] = React.useState(10);

  const { setUser } = useContext(UserContext);
  const { addToast } = useToasts();
  const history = useHistory();
  const dispatch = useDispatch();
  const isloading = useSelector((state) => state.allAuth.isLoading);
  // const { _ADMIN_SIGNUP } = bindActionCreators(actionsCreators, dispatch);
  const auth = getAuth();

  const data = {
    firstName: fName,
    lastName: lName,
    email: email,
    profilePicture: url,
  };

  const logginIn = async (e) => {
    e.preventDefault();
    if ((email !== "", password !== "", fName !== "", lName !== "")) {
      dispatch({
        type: AUTH_LOADING,
        payload: true,
      });
      try {
        await createUserWithEmailAndPassword(auth, email, password).then(
          async function (userCredential) {
            const user = userCredential.user;
            const response = await _ADMIN_SIGNUP(data, user?.accessToken);
            if (response?.data?.isSuccess) {
              localStorage.setItem("user", JSON.stringify(user?.accessToken));
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
              addToast(response?.data?.message, {
                appearance: "success",
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
        addToast(error.message, {
          appearance: "error",
          autoDismiss: true,
        });
        dispatch({
          type: AUTH_LOADING,
          payload: false,
        });
      }
    } else {
      addToast("Fill all the feilds", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };
  const pushTo = (e) => {
    e.preventDefault();
    history.push("/auth/login");
  };

  // const progressRef = React.useRef(() => {});
  // React.useEffect(() => {
  //   progressRef.current = () => {
  //     if (progress > 100) {
  //       setProgress(0);
  //       setBuffer(10);
  //     } else {
  //       const diff = Math.random() * 10;
  //       const diff2 = Math.random() * 10;
  //       setProgress(progress + diff);
  //       setBuffer(progress + diff + diff2);
  //     }
  //   };
  // });

  const handleChange = (e) => {
    setDisablechkr(true);
    if (e.target.files[0]) {
      if (
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image/jpg"
      ) {
        const storageRef = ref(storage, `admin/${e.target.files[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            addToast(error.message, {
              appearance: "error",
              autoDismiss: true,
            });
            setDisablechkr(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setUrl(url);
              setProgress(0);
              setDisablechkr(false);
            });
          }
        );
      } else {
        addToast("Invalid Image format, Select Jpg, Jpeg, Png", {
          appearance: "error",
          autoDismiss: true,
        });
        setDisablechkr(false);
      }
    } else {
      addToast("Please Select File", {
        appearance: "error",
        autoDismiss: true,
      });
      setDisablechkr(false);
    }
  };
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0 from-style">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign Up With Credentials</small>
            </div>
            <Form role="form">
              <FormGroup>
                <Row>
                  <Col md={6}>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-circle-08" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="First Name"
                        type="text"
                        maxLength="40"
                        autoComplete="new-name"
                        onChange={(e) => setFName(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <InputGroup className="input-group-alternative ">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-circle-08" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Last Name"
                        type="text"
                        maxLength="40"
                        autoComplete="new-lastname"
                        onChange={(e) => setLName(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
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
              <Col sm={10}>
                <label class="btn btn-warning custom-file-upload">
                  <input
                    disabled={disablechkr}
                    accept="image/*"
                    type="file"
                    onChange={handleChange}
                  />
                  <i class="ni ni-cloud-upload-96 check"></i> Upload Image
                </label>
              </Col>
              {progress ? <Progress value={progress} /> : ""}
              {url ? (
                <Row className="my-4">
                  <Col xs="12">
                    <div className="text-center">
                      <img className="register-img" src={url} alt="image" />
                    </div>
                  </Col>
                </Row>
              ) : (
                ""
              )}
              <div className="text-center">
                <Button
                  disabled={isloading}
                  onClick={(e) => logginIn(e)}
                  className="mt-2"
                  color="primary"
                  type="button"
                >
                  {isloading ? (
                    <Spinner size="sm">Loading...</Spinner>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6"></Col>
          <Col className="text-right" xs="6">
            <a className="text-light" href="" onClick={(e) => pushTo(e)}>
              <small>Already Have An Account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Register;
