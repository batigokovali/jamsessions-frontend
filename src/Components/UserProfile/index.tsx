import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { IFeeds } from "../../Types/IFeeds";
import Card from "react-bootstrap/Card";
import { format } from "date-fns";

export const UserProfile = () => {
  const { userID } = useParams();

  const [feed, setFeeds] = useState<IFeeds[]>();
  const [playing, setPlaying] = useState(false);
  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  interface UserData {
    avatar: string;
    createdSessions: [string];
    email: string;
    refreshToken?: string;
    role: [string];
    savedSessions: [string];
    username: string;
    _id: string;
  }

  const [userData, setUserData] = useState<UserData>();

  const getUserProfileInfo = async () => {
    try {
      const { data } = await axios.get(
        (process.env.REACT_APP_API_URL as string) + `/users/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserFeed = async () => {
    try {
      const feed = await axios.get(
        (process.env.REACT_APP_API_URL as string) + `/feed/user/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(feed.data);
      setFeeds(feed.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfileInfo();
    getUserFeed();
  }, []);

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col xs={2} md={2} lg={2}>
            <img src={userData?.avatar} className={styles.image} alt="" />
          </Col>
          <Col xs={2} md={2} lg={2}>
            <p>{userData?.username}</p>
          </Col>
        </Row>
      </Container>
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
    </>
  );
};
