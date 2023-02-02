import React, { useState, useEffect } from "react";
// reactstrap components
import { Col, Container } from "reactstrap";
import Loader from "react-loader-spinner";
import parse from "html-react-parser";
import { GET_PRIVACY_POLICY } from "state/action-creater/usersAction";
import { useToasts } from "react-toast-notifications";

export default function PublicPrivacyPolicy() {
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState([]);
  const filtredArray = data?.filter((e) => e?.type === "policy");
  const { addToast } = useToasts();

  useEffect(() => {
    getPrivacy();
  }, []);

  async function getPrivacy() {
    setisLoading(true);
    try {
      const userData = await GET_PRIVACY_POLICY();
      if (userData) {
        setisLoading(false);
        setData(userData);
        addToast(userData?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        setisLoading(false);
        addToast(userData?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    } catch (error) {
      setisLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="aling-items-center mt-5">
          <Loader type="Grid" color="#8DBF26" height={60} width={60} />
        </div>
      ) : (
        <Container>
          <Col lg="12" md="12">
            {filtredArray?.length !== 0 ? (
              <div className="ml-1"> {parse(newpolicyData?.data?.description)}</div>
            ) : (
              ""
            )}
          </Col>
        </Container>
      )}
    </>
  );
}
