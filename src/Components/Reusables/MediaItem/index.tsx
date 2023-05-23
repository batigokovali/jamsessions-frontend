import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { IFeeds } from "../../../Types/IFeeds";
import { format } from "date-fns";
import styles from "./styles.module.css";
import cx from "classnames";
import { MediaModal } from "../Modals";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Props {
  feed: IFeeds[];
  state: boolean;
  fetch: Function;
}

export const MediaItem = ({ feed, state, fetch }: Props) => {
  const [playing, setPlaying] = useState(false);
  const [activeModal, setActiveModal] = useState<IFeeds | null>(null);
  const [imageErrors, setImageErrors] = useState<boolean[]>([]);

  const navigate = useNavigate();

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleOpenModal = (feed: IFeeds) => {
    setActiveModal(feed);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    setImageErrors(new Array(feed?.length ?? 0).fill(false));
  }, [feed]);

  const handleImageError = (index: number) => {
    setImageErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      updatedErrors[index] = true;
      return updatedErrors;
    });
  };

  const deleteFeed = async (feedID: string) => {
    try {
      await axios.delete(
        (process.env.REACT_APP_API_URL as string) + `/feed/${feedID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      fetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-3">
      <Row className="d-flex">
        {feed?.map((feed, index) => (
          <Col
            sm={12}
            md={6}
            lg={3}
            className={cx(
              styles.feed,
              "mb-3 p-0 d-flex justify-content-center flex-column align-items-center"
            )}
            key={feed?._id}
          >
            <div className={cx(styles.video)}>
              {!imageErrors[index] && (
                <img
                  src={feed?.media?.replace("mp4", "jpg")}
                  className={cx(styles.thumbnail)}
                  onError={() => handleImageError(index)}
                  onClick={() => handleOpenModal(feed)}
                  alt=""
                />
              )}
              {imageErrors[index] && (
                <AiFillPlayCircle onClick={() => handleOpenModal(feed)} />
              )}
            </div>
            <Row className="d-flex px-3 mt-1 w-100 justify-content-start">
              <Col>
                <p className="mb-0 text-white text-truncate">{feed?.title}</p>
              </Col>
            </Row>
            <Row className="d-flex px-3 mt-0 w-100 justify-content-start">
              <p className={cx(styles.date, "mb-0 d-flex")}>
                {format(new Date(feed?.createdAt), "do 'of' MMMM',' EEEE ")}
                {state ? (
                  <div className="ms-auto">
                    <FiEdit
                      onClick={() => navigate(`/edit-a-feed/${feed?._id}`)}
                    />
                    <BsFillTrashFill
                      className="ms-2"
                      onClick={() => deleteFeed(feed?._id)}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </p>
            </Row>
          </Col>
        ))}
      </Row>
      <MediaModal
        isOpen={activeModal !== null}
        onClose={handleCloseModal}
        mediaItem={activeModal}
        playing={playing}
        handlePlay={handlePlay}
        handlePause={handlePause}
      />
    </Container>
  );
};
