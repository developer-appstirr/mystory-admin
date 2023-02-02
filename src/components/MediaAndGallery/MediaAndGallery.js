import React, { useState, useCallback, useEffect } from "react";
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from "video-react";
import {
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { DeleteMediaBulk } from "../../state/action-creater/storiesActions";
import { JOURNALS_LOADING } from "../../Constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import SelectedImage from "./SelectedImage";
import Zoom from "react-medium-image-zoom";

export default function MediaAndGallery(props) {
  const [selectAll, setSelectAll] = useState(false);
  const [isselect, setIsselect] = useState(false);
  const [selectAllVideo, setSelectAllVideo] = useState(false);
  const [isselectVideo, setIsselectVideo] = useState(false);

  //filtring video
  const filtredvideos = props?.data?.filter((e) => e.contentType === "video");
  //filtring image
  const filtredimages = props?.data?.filter((e) => e.contentType === "image");
  //changing name on filtred array

  //hooks
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  //api call

  const onSelectImage = (index) => {
    const images = filtredimages?.slice();
    const img = images[index];
    if (img.hasOwnProperty("isSelected")) {
      img.isSelected = !img.isSelected;
      setIsselect(img.isSelected);
    } else {
      img.isSelected = true;
      setIsselect(true);
    }
  };
  const onSelectVideo = (index) => {
    const videos = filtredvideos?.slice();
    const vdo = videos[index];
    if (vdo.hasOwnProperty("isSelected")) {
      vdo.isSelected = !vdo.isSelected;
      setIsselectVideo(vdo.isSelected);
    } else {
      vdo.isSelected = true;
      setIsselectVideo(true);
    }
  };

  const toggleSelectAllVideos = () => {
    setSelectAllVideo(!selectAllVideo);
    const videos = filtredvideos?.slice();
    if (selectAllVideo) {
      for (var i = 0; i < filtredvideos?.length; i++)
        videos[i].isSelected = true;
      setIsselectVideo(false);
    } else {
      for (var i = 0; i < filtredvideos?.length; i++)
        videos[i].isSelected = false;
      setIsselectVideo(true);
    }
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    const images = filtredimages?.slice();
    if (selectAll) {
      for (var i = 0; i < filtredimages?.length; i++)
        images[i].isSelected = true;
      setIsselect(false);
    } else {
      for (var i = 0; i < filtredimages?.length; i++)
        images[i].isSelected = false;
      setIsselect(true);
    }
  };

  const filteingDeletedfiles = async () => {
    const media = filtredimages?.filter((e) => {
      return e?.isSelected;
    });
    let medias = { media };
    try {
      dispatch({
        type: JOURNALS_LOADING,
        payload: true,
      });
      const res = await DeleteMediaBulk(medias);
      if (res?.data?.isSuccess) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        dispatch({
          type: JOURNALS_LOADING,
          payload: false,
        });
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
        dispatch({
          type: JOURNALS_LOADING,
          payload: false,
        });
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
    }
  };

  return (
    <Container fluid>
      <Row>
        {/* <div className="mediastories"> */}
        {filtredimages?.length === 0 ? (
          <Col xs="6">
            <h3>IMAGE NOT FOUND</h3>
          </Col>
        ) : (
          <Col xs="6">
            <div className="pb-3">
              <div className="upperView">
                <div>
                  <h3>Images</h3>
                </div>
                <div>
                  {selectAll ? (
                    <Button size="sm" color="success" onClick={toggleSelectAll}>
                      Select All
                    </Button>
                  ) : (
                    <Button
                      outline
                      size="sm"
                      color="success"
                      onClick={toggleSelectAll}
                    >
                      Select All
                    </Button>
                  )}
                  {isselect ? (
                    <Button
                      size="sm"
                      color="danger"
                      onClick={() => filteingDeletedfiles()}
                    >
                      Delete
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {filtredimages?.map((row, index) => (
                <>
                  <Col xs="6">
                    {row?.url ? (
                      <>
                        <div key={index}>
                          <FormGroup check>
                            <Label check>
                              <Input
                                type="checkbox"
                                checked={isselect}
                                onChange={() => onSelectImage(index)}
                              />
                              Select
                            </Label>
                          </FormGroup>
                        </div>
                        <Zoom>
                          <img
                            alt="..."
                            className="rounded"
                            style={{
                              height: "250px",
                              width: "250px",
                            }}
                            src={row.url}
                          />
                        </Zoom>
                      </>
                    ) : (
                      ""
                    )}
                  </Col>
                </>
              ))}
            </div>
          </Col>
        )}
        <Col xs="6">
          {filtredvideos?.length !== 0 ? (
            <>
              <div className="upperView">
                <div>
                  <h3>Videos</h3>
                </div>
                <div>
                  {selectAllVideo ? (
                    <Button
                      size="sm"
                      color="success"
                      onClick={toggleSelectAllVideos}
                    >
                      Select All
                    </Button>
                  ) : (
                    <Button
                      outline
                      size="sm"
                      color="success"
                      onClick={toggleSelectAllVideos}
                    >
                      Select All
                    </Button>
                  )}
                  {isselectVideo ? (
                    <Button
                      size="sm"
                      color="danger"
                      onClick={() => filteingDeletedfiles()}
                    >
                      Delete
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {filtredvideos?.map((e, index) => (
                <Col xs="6">
                  <div key={index}>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="checkbox"
                          checked={isselectVideo}
                          onChange={() => onSelectVideo(index)}
                        />
                        Select
                      </Label>
                    </FormGroup>
                  </div>
                  <div className="pb-3">
                    <Player
                      width={320}
                      height={250}
                      playsInline
                      fluid={false}
                      poster={e.thumbnail}
                    >
                      <source src={e.url} />

                      <ControlBar>
                        <ReplayControl seconds={10} order={1.1} />
                        <ForwardControl seconds={30} order={1.2} />
                        <CurrentTimeDisplay order={4.1} />
                        <TimeDivider order={4.2} />
                        <PlaybackRateMenuButton
                          rates={[5, 2, 1, 0.5, 0.1]}
                          order={7.1}
                        />
                        <VolumeMenuButton disabled />
                      </ControlBar>
                    </Player>
                  </div>
                </Col>
              ))}
            </>
          ) : (
            <Col xs="6">
              <h3>VIDEO NOT FOUND</h3>
            </Col>
          )}
        </Col>
        {/* </div> */}
      </Row>
    </Container>
  );
}
