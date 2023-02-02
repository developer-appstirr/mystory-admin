import React, { useState, useEffect } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Container,
  Row,
  Modal,
  ModalBody,
  Button,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import moment from "moment";
import Select from "react-select";
import { countries } from "../../Constants/countries";
import { useToasts } from "react-toast-notifications";
import {
  GET_USERS,
  GET_UNREGISTERED_USERS,
  GET_REGISTERED_USERS,
  GET_UNBLOCKED_USERS,
  GET_BLOCKED_USERS,
  GET_BLOCK_USER,
  GET_APPROVE_USER,
  USERDATEANDCOUNTRY,
  GET_USERS_BYEMAIL,
  LOGOUT_ALL_USERS,
} from "../../state/action-creater/usersAction";
import { GET_ALL_USERS, LOADING } from "../../Constants/constants";
import Zoom from "react-medium-image-zoom";
import ReIcon from "../../assets/img/icons/common/re.png";
import DateTimePicker from "react-datetime-picker";
import "react-medium-image-zoom/dist/styles.css";

const Users = () => {
  const isloading = useSelector((state) => state.allUsers.isLoading);
  const [modal, setModal] = React.useState(false);
  const [value, onChange] = useState();
  const [currentPage, setcurrentPage] = useState(1);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [dynamicName, setDynamicName] = useState("All Users");
  const [switchcaseType, setSwitchcaseType] = useState("all");
  const [dataperPage] = useState(10);
  const [selectedrows, setSelectedRows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  //hooks
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  //useEffect
  useEffect(() => {
    dispatch(GET_USERS());
  }, []);

  useEffect(() => {
    filterCountry();
  }, [currentCountry]);

  //search by email
  const searchByEmail = (e, type) => {
    e.preventDefault();
    if (searchInput !== "") {
      onAction(type);
    } else {
      addToast("Search Feild Is Empty", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const searchByDate = async (e) => {
    e.preventDefault();
    if (
      value !== "" &&
      currentCountry?.value !== null &&
      currentCountry !== null
    ) {
      dispatch(
        USERDATEANDCOUNTRY(
          moment(value)?.format("YYYY-MM-DD"),
          currentCountry?.value
        )
      );
      
    } else {
      addToast("Select Date and Country", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  //useSelector
  const usersData = useSelector((state) => state.allUsers.usersData);

  // api call then user changes sort by
  function onAction(type) {
    switch (type) {
      case "all":
        setDynamicName("All Users");
        dispatch(GET_USERS());
        setSwitchcaseType("all");
        break;

      case "unregistered":
        setDynamicName("All Unregistered Users");
        dispatch(GET_UNREGISTERED_USERS());
        setSwitchcaseType("unregistered");
        break;

      case "unblocked":
        setDynamicName("All Unblocked Users");
        dispatch(GET_UNBLOCKED_USERS());
        setSwitchcaseType("unblocked");
        break;

      case "blocked":
        setDynamicName("All Blocked Users");
        dispatch(GET_BLOCKED_USERS());
        setSwitchcaseType("blocked");
        break;

      case "registered":
        setDynamicName("All Registered Users");
        dispatch(GET_REGISTERED_USERS());
        setSwitchcaseType("registered");
        break;

      case "byEmail":
        setDynamicName("User Email");
        dispatch(GET_USERS_BYEMAIL(searchInput));
        setSwitchcaseType("byEmail");
        break;

      default:
        break;
    }
  }

  // api call then user changes status
  const userActions = async (type, condition, id) => {
    if (type === "block") {
      try {
        dispatch({
          type: LOADING,
          payload: true,
        });
        const res = await GET_BLOCK_USER(condition, id);
        if (res?.data?.isSuccess) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          onAction(switchcaseType);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          onAction(switchcaseType);
        }
      } catch (error) {
        addToast(error?.message, {
          appearance: "error",
          autoDismiss: true,
        });
        onAction(switchcaseType);
      }
    } else if (type === "isActive") {
      try {
        dispatch({
          type: LOADING,
          payload: true,
        });
        const res = await GET_APPROVE_USER(condition, id);
        if (res?.data?.isSuccess) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          onAction(switchcaseType);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          onAction(switchcaseType);
        }
      } catch (error) {
        addToast(error?.message, {
          appearance: "error",
          autoDismiss: true,
        });
        onAction(switchcaseType);
      }
    } else {
      try {
        dispatch({
          type: LOADING,
          payload: true,
        });
        const res = await LOGOUT_ALL_USERS(id);
        if (res?.data?.isSuccess) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          onAction(switchcaseType);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          onAction(switchcaseType);
        }
      } catch (error) {
        addToast("Feature is under mintanance", {
          appearance: "error",
          autoDismiss: true,
        });
        onAction(switchcaseType);
      }
    }
  };

  //modal toggler
  const toggle = (row) => {
    setSelectedRows(row);
    setModal(!modal);
  };

  //pagination
  let currentPages;
  let pagesNumbers = [];
  if (usersData?.length > 0) {
    const indexOfLastData = currentPage * dataperPage;
    const indexOfFirstData = indexOfLastData - dataperPage;
    currentPages = usersData?.slice(indexOfFirstData, indexOfLastData);

    for (let i = 1; i <= Math.ceil(usersData?.length / dataperPage); i++) {
      pagesNumbers.push(i);
    }
  } else {
    currentPages = usersData;
  }

  // for changing page number
  const changePage = (pageNumber) => {
    setcurrentPage(pageNumber);
  };

  // filtring by country name
  const filterCountry = () => {
    const filtredcountry = usersData?.filter(
      (e) => e?.address?.countryValue.trim() === currentCountry?.value
    );
    if (currentCountry?.value === null || currentCountry === null) {
      dispatch(GET_USERS());
    } else if (filtredcountry?.length === 0) {
      dispatch(GET_USERS());
      addToast("No Match Found", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      dispatch({
        type: GET_ALL_USERS,
        payload: filtredcountry,
      });
    }
  };

  //lenght of descrition to show
  const MAX_LENGTH = 50;

  return (
    <>
      <Header />
      <>
        <Modal size="lg" isOpen={modal} toggle={toggle}>
          <ModalBody>
            <div>
              <div className="container">
                <div className="row">
                  <div className="underline mt-2 col-md-6">
                    <b>User</b>
                    <div className="mt-4">
                      <p>
                        <b>FullName</b> : {selectedrows?.firstName}
                      </p>
                      <p>
                        <b>Given Name</b> : {selectedrows?.givenName}
                      </p>
                      <p>
                        <b>Email</b> :<br />
                        {selectedrows?.email}
                      </p>
                      <p>
                        <b>Last Notification Read</b> :<br />
                        {moment(
                          new Date(selectedrows?.lastNotificationReadTime)
                        ).format("DD-MM-YYYY/HH:MM")}
                      </p>
                      <p>
                        <b>Login Source</b> :<br />
                        {selectedrows?.loginSource}
                      </p>
                      <b>Profile Picture :</b>
                      <img
                        className="user-img"
                        src={selectedrows?.profilePicture}
                      />
                    </div>
                  </div>
                  <div className="underline mt-2 col-md-6">
                    <b>&nbsp;</b>
                    <div className="mt-4">
                      <p>
                        <b>LastName</b> : {selectedrows?.lastName}
                      </p>
                      <p>
                        <b>Home Town</b> : {selectedrows?.homeTown}
                      </p>

                      <p>
                        <b>Date Of Birth</b> :<br />
                        {selectedrows?.dob}
                      </p>
                      <p>
                        <b>Created On Date</b> :<br />
                        {moment(new Date(selectedrows?.createdOnDate)).format(
                          "DD-MM-YYYY"
                        )}
                      </p>
                      <p>
                        <b>Is Email Verified</b> :<br />
                        {selectedrows?.isEmailVerified ? "True" : "False"}
                      </p>
                      <p>
                        <b>Short Description</b> :<br />
                        {selectedrows?.shortDescription}
                      </p>
                      <b>Address</b>
                      <p className="mt-2">
                        <b>City</b> :{selectedrows?.address?.cityValue}
                      </p>
                      <p className="mt-2">
                        <b>Country</b> : {selectedrows?.address?.countryValue}
                      </p>
                      <p className="mt-2">
                        <b>State</b> : {selectedrows?.address?.stateValue}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="user-header">
                  <div>
                    <h3 className="mb-0">{dynamicName}</h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      position: "absolute",
                      right: 5,
                      paddingTop: "3px",
                    }}
                  >
                    <Button
                      onClick={() => onAction("all")}
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
                  <Form
                    onSubmit={(e) => searchByEmail(e, "byEmail")}
                    className="navbar-search form-inline mr-3 d-none d-md-flex ml-lg-auto"
                  >
                    <FormGroup className="mb-0">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <Button type="submit" size="sm" className="mr-1">
                            <i className="fas fa-search" />
                          </Button>
                        </InputGroupAddon>
                        <Input
                          placeholder="Search Email"
                          type="text"
                          onChange={(e) => setSearchInput(e.target.value)}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Form>

                  <div className="user-header-inner">
                    <div className="mr-3">
                      <Select
                        className="input-countries"
                        value={currentCountry}
                        placeholder={"Select Country.."}
                        onChange={setCurrentCountry}
                        options={countries}
                      />
                    </div>
                    {/* <Form
                      onSubmit={(e) => searchByDate(e)}
                      className="navbar-search form-inline mr-3 d-none d-md-flex ml-lg-auto"
                    >
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
                    <div className="mt-1 mr-4">
                      <small> Sort By</small>
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
                            onClick={() => onAction("unregistered")}
                          >
                            Registered Users
                          </DropdownItem>
                          <DropdownItem onClick={() => onAction("registered")}>
                            UnRegistered Users
                          </DropdownItem>
                          <DropdownItem onClick={() => onAction("unblocked")}>
                            Unblocked Users
                          </DropdownItem>
                          <DropdownItem onClick={() => onAction("blocked")}>
                            Blocked Users
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">fullName</th>
                    <th scope="col">firstName</th>
                    <th scope="col">lastName</th>
                    <th scope="col">Email</th>
                    <th scope="col">createdOnDate</th>
                    {/* <th scope="col">Short Description</th> */}
                    <th scope="col">Profile Picture</th>
                    <th>Actions</th>
                    {/* <th scope="col" /> */}
                  </tr>
                </thead>
                {isloading ? (
                  <tbody>
                    <td colSpan="9">
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
                    {currentPages && currentPages?.length > 0 ? (
                      <>
                        {currentPages?.length > 0 ? (
                          <>
                            {currentPages?.reverse().map((row, index) => (
                              <tr key={row.id}>
                                <td>{index + 1}</td>
                                <th
                                  className="newstyle"
                                  scope="row"
                                  onClick={() => toggle(row)}
                                >
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {row?.fullName}
                                    </span>
                                  </Media>
                                </th>

                                <td>{row?.firstName}</td>
                                <td>{row?.lastName}</td>
                                <td>{row?.email}</td>
                                <td>
                                  {moment(new Date(row?.createdOnDate)).format(
                                    "DD-MM-YYYY"
                                  )}
                                </td>
                                {/* <td>
                                  {" "}
                                  {row?.shortDescription.length > MAX_LENGTH ? (
                                    <>{`${row?.shortDescription.substring(
                                      0,
                                      MAX_LENGTH
                                    )}...`}</>
                                  ) : (
                                    <>{row?.shortDescription}</>
                                  )}
                                </td> */}

                                <td className="ml-left">
                                  <div className="avatar avatar-sm">
                                    {row?.profilePicture ? (
                                      <Zoom>
                                        <img
                                          alt="..."
                                          className="rounded-circle"
                                          style={{
                                            height: "50px",
                                            width: "50px",
                                          }}
                                          src={row?.profilePicture}
                                        />
                                      </Zoom>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </td>
                                <td style={{ paddingLeft: "30px" }}>
                                  <div>
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
                                      <DropdownMenu
                                        className="dropdown-menu-arrow"
                                        right
                                      >
                                        <DropdownItem
                                          onClick={() =>
                                            userActions(
                                              "block",
                                              row?.isBlock,
                                              row?.id
                                            )
                                          }
                                        >
                                          {row?.isBlock
                                            ? "Unblock User"
                                            : "Block User"}
                                        </DropdownItem>
                                        <DropdownItem
                                          onClick={() =>
                                            userActions(
                                              "isActive",
                                              row?.isActive,
                                              row?.id
                                            )
                                          }
                                          disabled={row?.isActive}
                                        >
                                          {row?.isActive
                                            ? "Approved User"
                                            : "Approve User"}
                                        </DropdownItem>
                                        <DropdownItem
                                          onClick={() =>
                                            userActions("logout", null, row?.id)
                                          }
                                        >
                                          Logout All Devices
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <>
                            {currentPages?.id && (
                              <tr key={currentPages?.id}>
                                <td>{1}</td>
                                <th
                                  className="newstyle"
                                  scope="row"
                                  onClick={() => toggle(currentPages)}
                                >
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {currentPages?.fullName}
                                    </span>
                                  </Media>
                                </th>

                                <td>{currentPages?.firstName}</td>
                                <td>{currentPages?.lastName}</td>
                                <td>{currentPages?.email}</td>
                                <td>
                                  {currentPages?.createdOnDate &&
                                    moment(
                                      new Date(currentPages?.createdOnDate)
                                    ).format("DD-MM-YYYY")}
                                </td>
                                <td>
                                  {currentPages?.shortDescription?.length >
                                  MAX_LENGTH ? (
                                    <>{`${currentPages?.shortDescription.substring(
                                      0,
                                      MAX_LENGTH
                                    )}...`}</>
                                  ) : (
                                    <>{currentPages?.shortDescription}</>
                                  )}
                                </td>

                                <td className="ml-left">
                                  {currentPages?.profilePicture && (
                                    <div className="avatar avatar-sm">
                                      <a
                                        href="#"
                                        id="tooltip742438047"
                                        // onClick={(e) => e.preventDefault()}
                                      >
                                        <img
                                          alt="..."
                                          className="rounded-circle"
                                          style={{
                                            height: "50px",
                                            width: "50px",
                                          }}
                                          src={currentPages?.profilePicture}
                                        />
                                      </a>
                                    </div>
                                  )}
                                </td>
                                <td style={{ paddingLeft: "30px" }}>
                                  <div>
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
                                      <DropdownMenu
                                        className="dropdown-menu-arrow"
                                        right
                                      >
                                        <DropdownItem
                                          onClick={() =>
                                            userActions(
                                              "block",
                                              currentPages?.isBlock,
                                              currentPages?.id
                                            )
                                          }
                                        >
                                          {currentPages?.isBlock
                                            ? "Unblock User"
                                            : "Block User"}
                                        </DropdownItem>
                                        <DropdownItem
                                          onClick={() =>
                                            userActions(
                                              "isActive",
                                              currentPages?.isActive,
                                              currentPages?.id
                                            )
                                          }
                                          disabled={currentPages?.isActive}
                                        >
                                          {currentPages?.isActive
                                            ? "Approved User"
                                            : "Approve User"}
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <h4 className="mt-2">NO DATA FOUND</h4>
                      </div>
                    )}
                  </tbody>
                )}
              </Table>

              {/* Footer */}
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    {/* <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem> */}
                    {pagesNumbers?.map((number) => (
                      <PaginationItem
                        key={number}
                        className={currentPage === number ? "active" : ""}
                      >
                        <PaginationLink onClick={() => changePage(number)}>
                          {number}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    {/* <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem> */}
                    {/* <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem> */}
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Users;
