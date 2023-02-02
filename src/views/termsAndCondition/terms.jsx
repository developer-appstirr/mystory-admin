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
import { useSelector, useDispatch } from "react-redux";
import { LOADING } from "../../Constants/constants";
import Header from "components/Headers/Header.js";
import Loader from "react-loader-spinner";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  EditorState,
  convertFromHTML,
  ContentState,
  convertToRaw,
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { PRIVACY_POLICY } from "../../state/action-creater/usersAction";
import { GET_PRIVACY_POLICY } from "../../state/action-creater/usersAction";

export default function Terms() {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const user = localStorage.getItem("policy");
  const currentpolicy = JSON.parse(user);
  const filtredArray = currentpolicy?.filter((e) => e?.type === "term");
  // const newpolicyData = useSelector((state) => state.allAuth.policyData);
  // const isLoading = useSelector((state) => state.allAuth.isLoading);
  const [title, setTitle] = useState();
  const [loading, setLoading] = useState(false);
  const [body, setBody] = React.useState(() => {
    const blocksFromHTML = convertFromHTML(filtredArray?.[0]?.description);
    const contentState = ContentState?.createFromBlockArray(
      blocksFromHTML?.contentBlocks,
      blocksFromHTML?.entityMap
    );

    return EditorState?.createWithContent(contentState);
  });

  const htmlbody = stateToHTML(body?.getCurrentContent());

  let objdata = {
    description: htmlbody,
    type: "term",
  };

  async function postPrivacy(event) {
    event.preventDefault();
    setLoading(true);
    if (body !== "") {
      try {
        const userData = await PRIVACY_POLICY(objdata);
        if (userData) {
          setLoading(false);
          GET_PRIVACY_POLICY();
          addToast("Updated Successfully", {
            appearance: "success",
            autoDismiss: true,
          });
        } else {
          setLoading(false);
          addToast(userData?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      addToast("Fill all the feilds", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }

  return (
    <>
      <Header />
      {loading ? (
        <div className="aling-items-center mt-5">
          <Loader type="Grid" color="#11cdef" height={60} width={60} />
        </div>
      ) : (
        <Container>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow mt-4">
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Privacy Policy
                  </h6>
                  {/* <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label>Title</label>
                          <Input
                            className="form-control-alternative"
                            placeholder="Title"
                            // defaultValue={newpolicyData?.data?.title}
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div> */}
                  <hr className="my-4" />
                  {/* Description */}
                  {/* <h6 className="heading-small text-muted mb-4">About me</h6> */}
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Body</label>
                      <div className="test">
                        <Editor
                          editorState={body}
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                          onEditorStateChange={setBody}
                        />
                      </div>

                      {/* <Input
                        className="form-control-alternative"
                        placeholder="Body"
                        rows="4"
                        defaultValue={newpolicyData?.data?.body}
                        type="textarea"
                        onChange={(e) => setBody(e.target.value)}
                      /> */}
                    </FormGroup>
                  </div>
                  <div className="pl-lg-4">
                    <Button
                      className="mr-4"
                      onClick={(e) => postPrivacy(e)}
                      size="md"
                      type="submit"
                    >
                      Save
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          {/* <Col lg="12" md="12">
          <h2>{data?.title}</h2>
          <p>{data?.body}</p>
        </Col> */}
        </Container>
      )}
    </>
  );
}
