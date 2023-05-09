import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ISession } from "../../Types/ISession";
import { format } from "date-fns";

export const SessionsUser = () => {
  const [sessions, setSessions] = useState<ISession[]>();

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

  const getSessions = async () => {
    try {
      const sessions = await axios.get(
        (process.env.REACT_APP_API_URL as string) + "/sessions",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setSessions(sessions.data.sessions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileInfo();
    getSessions();
  }, []);

  console.log(userData);
  console.log(sessions);

  return (
    <>
      <Container className="mt-5">
        <Row>
          {sessions
            ?.filter((session) => session?.user._id === userData?._id)
            .map((session: ISession) => (
              <Col sm={3} md={3} lg={3}>
                <Card style={{ width: "18rem" }}>
                  <Link to={"/session-details"}>
                    <Card.Body>
                      <Card.Title>{session?.title}</Card.Title>
                      <Card.Text>By: {session?.user.username}</Card.Text>
                      <Card.Text>{session?.description}</Card.Text>
                      <Card.Text>Role Needed: {session?.role}</Card.Text>
                      <Card.Text>
                        Date:
                        {format(
                          new Date(session?.date),
                          "do 'of' MMMM',' EEEE "
                        )}
                      </Card.Text>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};
