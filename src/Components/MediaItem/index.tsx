import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { IFeeds } from "../../Types/IFeeds";
import { format } from "date-fns";

export const MediaItem = () => {
  const [feeds, setFeeds] = useState<IFeeds[]>();
  const [playing, setPlaying] = useState(false);
  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const getFeeds = async () => {
    try {
      const feeds = await axios.get(
        (process.env.REACT_APP_API_URL as string) + "/feed",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(feeds.data);
      setFeeds(feeds.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeeds();
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        {feeds?.map((feed) => (
          <Col sm={12} md={6} lg={3} className="mb-3">
            <Card>
              <Card.Body className="d-flex justify-content-center flex-column align-items-center">
                <Card.Title>{feed?.title}</Card.Title>
                <Card.Text>{feed?.description}</Card.Text>
                <Card.Text>
                  {format(new Date(feed?.createdAt), "do 'of' MMMM',' EEEE ")}
                </Card.Text>

                <video
                  controls
                  width="100%"
                  height="100px"
                  onPlay={handlePlay}
                  onPause={handlePause}
                >
                  <source src={feed?.media} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* <iframe
                    className="embed-responsive allowfullscreen"
                    height="auto"
                    src={feed?.media}
                  ></iframe> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
