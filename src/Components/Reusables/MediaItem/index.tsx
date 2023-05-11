import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { IFeeds } from "../../../Types/IFeeds";
import { format } from "date-fns";

interface props {
  feed: IFeeds[];
}

export const MediaItem = ({ feed }: props) => {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  return (
    <Container className="mt-5">
      <Row>
        {feed?.map((feed) => (
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
                </video>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
