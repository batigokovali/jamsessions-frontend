import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { IFeeds } from "../../../Types/IFeeds";
import { format } from "date-fns";
import styles from "./styles.module.css";
import cx from "classnames";
import { MediaModal } from "../Modals";
import { AiFillPlayCircle } from "react-icons/ai";

interface Props {
  feed: IFeeds[];
}

export const MediaItem = ({ feed }: Props) => {
  const [playing, setPlaying] = useState(false);
  const [activeModal, setActiveModal] = useState<IFeeds | null>(null);
  const [imageErrors, setImageErrors] = useState<boolean[]>([]);

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

  return (
    <Container className="mt-3">
      <Row className="d-flex">
        {feed?.map((feed, index) => (
          <Col
            sm={12}
            md={6}
            lg={3}
            onClick={() => handleOpenModal(feed)}
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
                  alt=""
                />
              )}
              {imageErrors[index] && <AiFillPlayCircle />}
            </div>
            <Row className="d-flex px-3 mt-1 w-100 justify-content-start">
              <Col>
                <p className="mb-0 text-white">{feed?.title}</p>
              </Col>
            </Row>
            <Row className="d-flex px-3 mt-0 w-100 justify-content-start">
              <p className="mb-0">
                <span className={cx(styles.date)}>
                  {format(new Date(feed?.createdAt), "do 'of' MMMM',' EEEE ")}
                </span>
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
