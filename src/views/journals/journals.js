import React, { useState, useEffect } from "react";
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Modal,
  ModalFooter,
  Button,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import moment from "moment";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_ALL_JOURNALS,
  DELETE_JOURNAL,
  GET_ALL_JOURNALS_BY_DATE,
} from "../../state/action-creater/journalsActions";
import { PAGE_COUNT, JOURNALS_LOADING } from "../../Constants/constants";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useToasts } from "react-toast-notifications";
import DateTimePicker from "react-datetime-picker";
import ReIcon from "../../assets/img/icons/common/re.png";

const Journals = () => {
  const [modal, setModal] = React.useState(false);
  const [value, onChange] = useState();
  const [deleteMedia, setdeleteMedia] = React.useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [deletingItems, setDeletingItems] = useState({
    userID: "",
    journalID: "",
  });
  // hooks
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const history = useHistory();
  useEffect(() => {
    dispatch(GET_ALL_JOURNALS(pageCount));
  }, []);
  // useSelector
  const journalsData = useSelector((state) => state.allJournals.journalsData);
  const isloading = useSelector((state) => state.allJournals.isLoading);
  const pageCount = useSelector((state) => state.allJournals.pageCount);

  //by Datesearch
  const searchByDate = async (e) => {
    e.preventDefault();
    if (value !== "") {
      dispatch(
        GET_ALL_JOURNALS_BY_DATE(pageCount, moment(value)?.format("YYYY-MM-DD"))
      );
    } else {
      addToast("Please Select The Date First ", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  //designation character length
  const MAX_LENGTH = 50;
  // modal toggler
  const toggle = (row, type) => {
    if (type === "descrition") {
      setSelectedDescription(row);
      setModal(!modal);
    } else {
      setSelectedMedia(row);
      setModal(!modal);
    }
  };

  // delete modal toggler
  const deleteToggle = (userID, journalID) => {
    setdeleteMedia(!deleteMedia);
    setDeletingItems({ userID: userID, journalID: journalID });
  };

  //onRefresh button
  const onRefresh = () => {
    dispatch(GET_ALL_JOURNALS(1));
  };

  // delete journal api call
  const deleteJournal = async () => {
    try {
      dispatch({
        type: JOURNALS_LOADING,
        payload: true,
      });
      const res = await DELETE_JOURNAL(deletingItems);
      if (res?.data?.isSuccess) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        dispatch({
          type: JOURNALS_LOADING,
          payload: false,
        });
        setdeleteMedia(!deleteMedia);
        dispatch(GET_ALL_JOURNALS(pageCount));
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
        dispatch({
          type: JOURNALS_LOADING,
          payload: false,
        });
        setdeleteMedia(!deleteMedia);
        dispatch(GET_ALL_JOURNALS(pageCount));
      }
    } catch (error) {
      addToast(error?.message, {
        appearance: "error",
        autoDismiss: true,
      });
      dispatch({
        type: JOURNALS_LOADING,
        payload: false,
      });
      setdeleteMedia(!deleteMedia);
    }
  };
  //previousPage btn function
  const previousPage = () => {
    const decrimentPage = pageCount - 1;
    dispatch(GET_ALL_JOURNALS(decrimentPage));
    dispatch({
      type: PAGE_COUNT,
      payload: decrimentPage,
    });
  };
  //nextPage btn function
  const nextPage = () => {
    const incrimentPage = pageCount + 1;
    dispatch(GET_ALL_JOURNALS(incrimentPage));
    dispatch({
      type: PAGE_COUNT,
      payload: incrimentPage,
    });
  };
  return (
    <>
      <Header />
      <>
        <Modal
          size={selectedMedia?.media ? "lg" : "md"}
          isOpen={modal}
          toggle={toggle}
        >
          <ModalBody>
            <div>
              <div className="container">
                <div className="row">
                  <div className=" col-md-12">
                    {selectedMedia?.media ? (
                      <>{/* <MediaStories data={selectedMedia?.media} /> */}</>
                    ) : (
                      <>
                        <b>Description</b>
                        <div className="mt-4">
                          <p>{selectedDescription?.description}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </>
      <>
        <Modal size="md" isOpen={deleteMedia} toggle={deleteToggle}>
          <ModalBody>
            <div>
              <div className="container">
                <div className="row">
                  <div className="col-md-12 text-center">
                    Are you sure you want to delete this journal
                    <div className="btns-modal">
                      <Button onClick={deleteJournal} color="danger">
                        Delete
                      </Button>
                      <Button outline onClick={deleteToggle}>
                        Cancel
                      </Button>
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
                    <h3 className="mb-0">All Weekly Journals</h3>
                  </div>

                  {/* <Form className="mr-5" onSubmit={(e) => searchByDate(e)}>
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
                    <th scope="col">Journal Title</th>
                    <th scope="col">Added By</th>
                    <th scope="col">Created On</th>
                    <th scope="col">Description</th>
                    <th scope="col" className="th-margin">
                      View Media
                    </th>
                    <th scope="col">Profile Picture</th>
                    <th scope="col">Actions</th>
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
                    {journalsData?.data?.length > 0 ? (
                      <>
                        {journalsData?.data?.map((row, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <th scope="row">{row.journalTitle}</th>
                            <td>{row.addedByName}</td>
                            <td>
                              {moment(new Date(row.createdOnDate)).format(
                                "DD-MM-YYYY"
                              )}
                            </td>
                            <td
                              className="descritopn-styling"
                              onClick={() => toggle(row, "descrition")}
                            >
                              {row.description?.length > MAX_LENGTH ? (
                                <>{`${row.description.substring(
                                  0,
                                  MAX_LENGTH
                                )}...`}</>
                              ) : (
                                <>{row.description}</>
                              )}
                            </td>
                            <td>
                              <Button
                                onClick={() =>
                                  history.push({
                                    pathname: "/admin/allMedia",
                                    state: { data: row },
                                  })
                                }
                              >
                                View Media
                              </Button>
                            </td>
                            <td className="ml-left">
                              <div className="avatar-group">
                                <div className="avatar avatar-sm">
                                  {row.addedByProfilePic ? (
                                    <Zoom>
                                      <img
                                        alt="..."
                                        className="rounded-circle"
                                        style={{
                                          height: "50px",
                                          width: "50px",
                                        }}
                                        src={row.addedByProfilePic}
                                      />
                                    </Zoom>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="journals-action-btn">
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
                                      deleteToggle(row.addedById, row.id)
                                    }
                                  >
                                    Delete journal
                                  </DropdownItem>
                                  {/* <DropdownItem
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem> */}
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <td>No Data Found</td>
                    )}
                  </tbody>
                )}
              </Table>
              {journalsData?.data?.length >= 10 ? (
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
                          journalsData?.data?.length < 10 ? "disabled" : ""
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

export default Journals;
