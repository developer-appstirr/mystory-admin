import React, { useState, useEffect } from "react";
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Button,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import moment from "moment";
import Loader from "react-loader-spinner";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import ReIcon from "../../assets/img/icons/common/re.png";
import {
  GET_FAMILY_MEMBERS,
  GET_FAMILY_MEMBERS_BYDATE,
} from "../../state/action-creater/journalsActions";
import { PAGE_COUNT } from "../../Constants/constants";
import DateTimePicker from "react-datetime-picker";
import { useToasts } from "react-toast-notifications";

//hooks

const FamilyMembers = () => {
  //Life Cycle methods
  const [value, onChange] = useState();
  useEffect(() => {
    dispatch(GET_FAMILY_MEMBERS(pageCount));
  }, []);
  const { addToast } = useToasts();

  //useSelector
  const dispatch = useDispatch();
  const familyData = useSelector((state) => state.allJournals.familyData);
  const isloading = useSelector((state) => state.allJournals.isLoading);
  const pageCount = useSelector((state) => state.allJournals.pageCount);

  //by Datesearch
  // const searchByDate = async (e) => {
  //   e.preventDefault();
  //   if (value !== "") {
  //     dispatch(
  //       GET_FAMILY_MEMBERS_BYDATE(
  //         pageCount,
  //         moment(value)?.format("YYYY-MM-DD")
  //       )
  //     );
  //   } else {
  //     addToast("Please Select Parent-Category and Sub-Category ", {
  //       appearance: "error",
  //       autoDismiss: true,
  //     });
  //   }
  // };

  // previousPage functions
  const previousPage = () => {
    const decrimentPage = pageCount - 1;
    dispatch(GET_FAMILY_MEMBERS(decrimentPage));
    dispatch({
      type: PAGE_COUNT,
      payload: decrimentPage,
    });
  };
  // nextPage functions
  const nextPage = () => {
    const incrimentPage = pageCount + 1;
    dispatch(GET_FAMILY_MEMBERS(incrimentPage));
    dispatch({
      type: PAGE_COUNT,
      payload: incrimentPage,
    });
  };

  const onRefresh = () => {
    dispatch(GET_FAMILY_MEMBERS(1));
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="user-header">
                  <div>
                    <h3 className="mb-0">All Weekly Family Members</h3>
                  </div>
                  {/* <Form onSubmit={(e) => searchByDate(e)}>
                    <FormGroup className="mb-0">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <Button type="submit" size="sm" className="mr-1">
                            <i className="fas fa-search" />
                          </Button>
                        </InputGroupAddon>
                        <DateTimePicker
                          className="picker"
                          autoFocus={false}
                          disableClock={true}
                          isClockOpen={true}
                          format={"dd-MM-y"}
                          maxDate={new Date()}
                          onChange={onChange}
                          value={value}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Form> */}
                  <div
                    style={{
                      display: "flex",
                      position: "absolute",
                      right: 5,
                      paddingTop: "3px",
                    }}
                  >
                    <Button
                      onClick={() => onRefresh()}
                      type="submit"
                      size="sm"
                      className="mr-1"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Refresh"
                    >
                      <img
                        src={ReIcon}
                        style={{ width: "15px", height: "15px" }}
                      />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Created On</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Relation Name</th>
                    <th scope="col">Profile Picture</th>
                    {/* <th scope="col">Actions</th> */}
                  </tr>
                </thead>
                {isloading ? (
                  <tbody>
                    <td colSpan="8">
                      <div className="aling-items-center">
                        <Loader
                          type="Grid"
                          color="#11cdef"
                          height={60}
                          width={60}
                        />
                      </div>
                    </td>
                  </tbody>
                ) : (
                  <tbody>
                    {familyData?.data?.length > 0 ? (
                      <>
                        {familyData?.data?.map((row, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <th scope="row">
                              {row.firstName}
                              {row.middleName}
                              {row.lastName}
                            </th>
                            <td>{row.email}</td>
                            <td>
                              {moment(new Date(row.createdOnDate)).format(
                                "DD-MM-YYYY"
                              )}
                            </td>
                            <td>{row.dob}</td>
                            <td>{row.relation?.relationName}</td>
                            <td className="ml-left">
                              <div className="avatar-group">
                                <div className="avatar avatar-sm">
                                  {row.profilePicture ? (
                                    <Zoom>
                                      <img
                                        alt="..."
                                        className="rounded-circle"
                                        style={{
                                          height: "50px",
                                          width: "50px",
                                        }}
                                        src={row.profilePicture}
                                      />
                                    </Zoom>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </td>
                            {/* <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td> */}
                          </tr>
                        ))}
                      </>
                    ) : (
                      <td>No Data Found</td>
                    )}
                  </tbody>
                )}
              </Table>
              {familyData?.data?.length >= 10 ? (
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem
                        className={pageCount <= 1 ? "disabled" : ""}
                      >
                        <PaginationLink
                          onClick={() => previousPage()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem
                        className={
                          familyData?.data?.length < 10 ? "disabled" : ""
                        }
                      >
                        <PaginationLink onClick={() => nextPage()}>
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              ) : (
                ""
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default FamilyMembers;
