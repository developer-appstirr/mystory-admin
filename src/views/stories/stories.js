import React, { useState, useEffect } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Button,
  Modal,
  Form,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from "reactstrap";
// core components

import { useHistory } from "react-router-dom";
import Header from "components/Headers/Header.js";
import { useDispatch, useSelector } from "react-redux";

import {
  GET_PARENT_CATEGORY,
  GET_STORIES,
  GET_SUB_CATEGORY,
  GET_STORIES_BY_DATE,
  DELETE_POST,
} from "../../state/action-creater/storiesActions";
import { PAGE_COUNT, JOURNALS_LOADING } from "../../Constants/constants";
// extra libraries
import Loader from "react-loader-spinner";
import moment from "moment";
import { AnimateKeyframes } from "react-simple-animate";
import Select from "react-select";
import "video-react/dist/video-react.css";
// import MediaStories from "./mediaStories";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useToasts } from "react-toast-notifications";
import DateTimePicker from "react-datetime-picker";

const Stories = () => {
  const [parentCategory, setParentCategory] = useState(null);
  const [value, onChange] = useState();
  const [subCategory, setSubCategory] = useState(null);
  const [extraSubCategory, setExtraSubCategory] = useState("");
  const [sortby, setSortby] = useState("all");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [deleteMedia, setdeleteMedia] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [deletingItems, setDeletingItems] = useState("");

  // useSelector
  const isloading = useSelector((state) => state.allSories.isLoading);
  const pageCount = useSelector((state) => state.allSories.pageCount);
  const storiesData = useSelector((state) => state.allSories.storiesData);

  useEffect(() => {
    getparentcategory();
  }, []);

  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const history = useHistory();

  const parentCategoriesData = useSelector(
    (state) => state.allSories.parentCategoriesData
  );
  const subCategoriesData = useSelector(
    (state) => state.allSories.subCategoriesData
  );

  // Api Hits
  function getparentcategory() {
    dispatch(GET_PARENT_CATEGORY());
  }

  // filtring array
  const filterdParentCategory = parentCategoriesData?.data?.map((e) => {
    return {
      label: e.categoryName,
      value: e.id,
    };
  });

  const filterdSubCategory = subCategoriesData?.data?.map((e) => {
    return {
      label: e.categoryName,
      value: e.id,
    };
  });

  // parent category on change
  const parentchange = (e) => {
    setParentCategory(e);
    dispatch(GET_SUB_CATEGORY(e.value));
    setSubCategory(null);
  };
  const subchange = (e) => {
    setSubCategory(e);
    setExtraSubCategory(e.value);
    dispatch(GET_STORIES(e.value, sortby, pageCount));
    dispatch({
      type: PAGE_COUNT,
      payload: 1,
    });
  };
  const onAction = (e) => {
    setSortby(e);
    dispatch(GET_STORIES(extraSubCategory, e, pageCount));
  };

  //next page button
  const nextPage = () => {
    const incrimentPage = pageCount + 1;
    dispatch(GET_STORIES(extraSubCategory, sortby, incrimentPage));
    dispatch({
      type: PAGE_COUNT,
      payload: incrimentPage,
    });
  };

  //previous Page button
  const previousPage = () => {
    const decrimentPage = pageCount - 1;
    dispatch(GET_STORIES(extraSubCategory, sortby, decrimentPage));
    dispatch({
      type: PAGE_COUNT,
      payload: decrimentPage,
    });
  };

  //by Datesearch
  const searchByDate = async (e) => {
    e.preventDefault();
    if (value !== "" && parentCategory !== null && subCategory !== null) {
      dispatch(
        GET_STORIES_BY_DATE(
          moment(value)?.format("YYYY-MM-DD"),
          subCategory?.value
        )
      );
    } else {
      addToast("Please Select Parent-Category and Sub-Category ", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  //designation character length
  const MAX_LENGTH = 50;
  //modal funcitons
  const toggle = (row, type) => {
    if (type === "descrition") {
      setSelectedDescription(row);
      setModal(!modal);
    } else {
      setSelectedMedia(row);
      setModal(!modal);
    }
  };
  //modal funcitons
  const deleteToggle = (Id) => {
    setdeleteMedia(!deleteMedia);
    setDeletingItems(Id);
  };
  //Delete Story Api call
  const deleteStory = async () => {
    try {
      dispatch({
        type: JOURNALS_LOADING,
        payload: true,
      });
      const res = await DELETE_POST(deletingItems);
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
        dispatch(GET_STORIES(extraSubCategory, sortby, pageCount));
      } else {
        addToast("Unable to delete this story", {
          appearance: "error",
          autoDismiss: true,
        });
        dispatch({
          type: JOURNALS_LOADING,
          payload: false,
        });
        setdeleteMedia(!deleteMedia);
        dispatch(GET_STORIES(extraSubCategory, sortby, pageCount));
      }
    } catch (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
      dispatch({
        type: JOURNALS_LOADING,
        payload: false,
      });
      setdeleteMedia(!deleteMedia);
      dispatch(GET_STORIES(extraSubCategory, sortby, pageCount));
    }
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
                    Are you sure you want to delete this Story
                    <div className="btns-modal">
                      <Button onClick={deleteStory} color="danger">
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
                    <h3 className="mt-3" style={{ textTransform: "uppercase" }}>
                      {extraSubCategory} All Stories
                    </h3>
                  </div>
                  <div className="select-dropdown">
                    <AnimateKeyframes
                      play
                      duration={1}
                      keyframes={["opacity: 0", "opacity: 1"]}
                    >
                      <div className="mr-4">
                        {parentCategory ? (
                          <div className="mt-4"></div>
                        ) : (
                          <small style={{ color: "#FF0000" }}>
                            Please Select Parent Category
                          </small>
                        )}

                        <Select
                          className="input-countries"
                          value={parentCategory}
                          placeholder={"Select Parent Category.."}
                          onChange={(e) => parentchange(e)}
                          options={filterdParentCategory}
                          autoFocus
                        />
                      </div>
                    </AnimateKeyframes>

                    {parentCategory ? (
                      <AnimateKeyframes
                        play
                        duration={1}
                        keyframes={["opacity: 0", "opacity: 1"]}
                      >
                        <div className="mr-3">
                          {subCategory ? (
                            <div className="mt-4"></div>
                          ) : (
                            <small style={{ color: "#FF0000" }}>
                              Please Select Sub Category
                            </small>
                          )}
                          <Select
                            className="input-countries"
                            value={subCategory}
                            placeholder={"Select Sub Category.."}
                            onChange={(e) => subchange(e)}
                            options={filterdSubCategory}
                            autoFocus
                          />
                        </div>
                      </AnimateKeyframes>
                    ) : (
                      ""
                    )}
                    {/* <Form onSubmit={(e) => searchByDate(e)} className="mt-4">
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
                    <div className="sorted-styling">
                      <div>
                        <small className="mr-2">Sort By</small>
                      </div>
                      <div>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem onClick={() => onAction("all")}>
                              All
                            </DropdownItem>
                            <DropdownItem onClick={() => onAction("weekly")}>
                              Weekly
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Story Title</th>
                    <th scope="col">Added By Name</th>
                    <th scope="col">Created On</th>
                    <th scope="col" className="ml-right">
                      Media
                    </th>
                    <th scope="col">Description</th>
                    <th scope="col">Profile Picture</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                {isloading ? (
                  <tbody>
                    <td colSpan="7">
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
                    <>
                      {!parentCategory ? (
                        <tr>
                          <td style={{ color: "#FF0000" }}>
                            Please Select Parent Category
                          </td>
                        </tr>
                      ) : !subCategory ? (
                        <tr>
                          <td style={{ color: "#FF0000" }}>
                            Please Select Sub Category
                          </td>
                        </tr>
                      ) : (
                        // <>
                        // </>
                        <>
                          {storiesData?.data?.length > 0 ? (
                            <>
                              {storiesData?.data?.map((row, index) => (
                                <tr key={row.id}>
                                  <th scope="row">{index + 1}</th>
                                  <th scope="row">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        {row.storyTitle}
                                      </span>
                                    </Media>
                                  </th>
                                  <td className="ml-left">{row.addedByName}</td>
                                  <td>
                                    {moment(new Date(row.createdOnDate)).format(
                                      "DD-MM-YYYY"
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

                                  <td className="ml-left">
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
                                          onClick={() => deleteToggle(row.id)}
                                        >
                                          Delete Story
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </td>
                                </tr>
                              ))}
                            </>
                          ) : (
                            <>
                              <td style={{ color: "#FF0000" }}>
                                Selected Category Doesn't Contain Any Stories
                              </td>
                            </>
                          )}
                        </>
                      )}
                    </>
                  </tbody>
                )}
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  {subCategory ? (
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
                          storiesData?.data?.length < 10 ? "disabled" : ""
                        }
                      >
                        <PaginationLink onClick={() => nextPage()}>
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  ) : (
                    ""
                  )}
                  <div className="countPage">
                    {storiesData?.data?.length > 0 && subCategory !== null
                      ? `Page : ${pageCount}`
                      : ""}
                  </div>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Stories;
