import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Label,
  Col,
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";
import DateTimePicker from "react-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "../../../Constants/countries";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import { SCEDULENOTIFICATION } from "../../../state/action-creater/notificationActions";

function SchduleNotification() {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  // const notificatoionData = useSelector(
  //   (state) => state.allnotifications.notificatoionData
  // );
  const [currentCountry, setCurrentCountry] = useState("all");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [value, onChange] = useState(new Date());

  const onSubmit = async () => {
    const data = {
      title: title,
      topic: [currentCountry?.label],
      userId: "",
      body: body,
      icon: "",
      setOn: value.getTime(),
      status: "",
    };
    if (title !== "" && body !== "" && value !== "" && currentCountry !== "") {
      await dispatch(SCEDULENOTIFICATION(data)).then((res) => {
        if (res?.data?.isSuccess) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    } else {
      addToast("Fill all the Feilds", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };
  return (
    <>
      <div className="col">
        <Card className="shadow">
          <div className="ml-3 mt-4">
            <h3 style={{ textAlign: "center" }} className="mb-0">
              Schdule Notification
            </h3>
          </div>
          <CardHeader className="border-0">
            <Form>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Title
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="Title"
                    id="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="examplePassword" sm={2}>
                  Country
                </Label>
                <Col sm={10}>
                  <Select
                    className="input-countries-noti"
                    value={currentCountry}
                    placeholder={"Select Country.."}
                    onChange={setCurrentCountry}
                    options={countries}
                  />
                </Col>
                {/* <div className="center-text">
                  <p>
                    Select country if u want to send notification to a specific
                    country
                  </p>
                </div> */}
              </FormGroup>
              <FormGroup row>
                <Label for="body" sm={2}>
                  Body
                </Label>
                <Col sm={10}>
                  <Input
                    type="textarea"
                    name="text"
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="body" sm={2}>
                  Time
                </Label>
                <Col className="mt-2" sm={10}>
                  <DateTimePicker
                    format={"y-MM-dd h:mm:ss a"}
                    minDate={new Date()}
                    onChange={onChange}
                    value={value}
                  />
                </Col>
              </FormGroup>

              <FormGroup check row>
                <Col sm={{ size: 10, offset: 5 }}>
                  <Button onClick={() => onSubmit()}>Submit</Button>
                </Col>
              </FormGroup>
            </Form>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}

export default SchduleNotification;
