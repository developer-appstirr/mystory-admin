// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Loader from "react-loader-spinner";

const Header = () => {
  const isloading = useSelector((state) => state.allUsers.countLoading);
  const usersData = useSelector((state) => state.allUsers.allCount);

  // const date = new Date();
  // const month = date.toLocaleString("default", { month: "long" });
  // const listItems = allusers?.map((row) =>
  //   moment(new Date(row.createdOnDate)).format("MMMM")
  // );
  // const monthingroup = groupData?.list?.map((row) =>
  //   moment(new Date(row.createdOnDate)).format("MMMM")
  // );
  // const count = listItems?.filter((e) => (e = month));
  // const groupMonthcount = monthingroup?.filter((e) => (e = month));
  // const percenttagemonth = (100 * groupMonthcount?.length) / groupData?.size;

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    {isloading ? (
                      <div className="col aling-items-center">
                        <Loader
                          type="Grid"
                          color="#11cdef"
                          height={30}
                          width={30}
                        />
                      </div>
                    ) : (
                      <>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Total Users
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              {usersData?.userCount}
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                              <i className="fas fa-chart-bar" />
                            </div>
                          </Col>
                        </Row>
                      </>
                    )}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    {isloading ? (
                      <div className="col aling-items-center">
                        <Loader
                          type="Grid"
                          color="#11cdef"
                          height={30}
                          width={30}
                        />
                      </div>
                    ) : (
                      <>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Total Journals
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              {usersData?.journalCount}
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                              <i className="fas fa-chart-pie" />
                            </div>
                          </Col>
                        </Row>
                      </>
                    )}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    {isloading ? (
                      <div className="col aling-items-center">
                        <Loader
                          type="Grid"
                          color="#11cdef"
                          height={30}
                          width={30}
                        />
                      </div>
                    ) : (
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Family Members
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {usersData?.familyMemberCount}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                    )}
                  </CardBody>
                </Card>
              </Col>
              {/* <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Performance
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">49,65%</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col> */}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
