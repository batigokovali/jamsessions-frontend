import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ISession } from "../../Types/ISession";
import { format } from "date-fns";

export const SessionCard = () => {
  const [sessions, setSessions] = useState<ISession[]>();

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
    getSessions();
  }, []);

  console.log(sessions);

  return (
    <>
      <Container className="mt-5">
        <Row>
          {sessions?.map((session: ISession) => (
            <Col sm={3} md={3} lg={3}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Link to={`/session-details/${session?._id}`}>
                    <Card.Title>{session?.title}</Card.Title>
                  </Link>
                  <Link to={`/profile/${session?.user._id}`}>
                    <Card.Text>By: {session?.user.username}</Card.Text>
                  </Link>
                  <Card.Text>{session?.description}</Card.Text>
                  <Card.Text>Role Needed: {session?.role}</Card.Text>
                  <Card.Text>
                    Date:
                    {format(new Date(session?.date), "do 'of' MMMM',' EEEE ")}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
