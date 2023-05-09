import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ISession } from "../../Types/ISession";

export const SessionDetails = () => {
  const { sessionID } = useParams();
  const [session, setSession] = useState<ISession>();

  const getSessionDetails = async () => {
    try {
      const session = await axios.get(
        (process.env.REACT_APP_API_URL as string) + `/sessions/${sessionID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(session.data[0]);
      setSession(session.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSessionDetails();
  }, []);

  console.log(session);
  return (
    <Container className="mt-5">
      <Card.Title>{session?.title}</Card.Title>
      <Card.Text>{session?.user.username}</Card.Text>
      <Card.Text>{session?.description}</Card.Text>
      <Card.Text>{session?.role}</Card.Text>
    </Container>
  );
};
