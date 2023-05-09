import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const ProfileInfo = () => {
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

  const getProfileInfo = async () => {
    try {
      const { data } = await axios.get(
        (process.env.REACT_APP_API_URL as string) + "/users/me",
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

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col xs={2} md={2} lg={2}>
          <img src={userData?.avatar} className={styles.image} alt="" />
        </Col>
        <Col xs={2} md={2} lg={2}>
          <p>{userData?.username}</p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={2} md={2} lg={2}>
          <Link to="/create-a-post">
            <Button variant="contained">Create A Post</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
