import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { ISession } from "../../../Types/ISession";
import { IUser } from "../../../Types/IUser";
import { BsFillTrashFill } from "react-icons/bs";
import { format } from "date-fns";
import { FiEdit } from "react-icons/fi";
import styles from "./styles.module.css";
import cx from "classnames";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/joy/Button/Button";
import { useState } from "react";
import { EditSessionModal } from "../Modals/EditSession";

interface props {
  sessions: ISession[];
  user: IUser;
  state: boolean;
  state2: boolean;
  fetch: Function;
}

export const SessionsCard = ({
  sessions,
  user,
  state,
  state2,
  fetch,
}: props) => {
  const navigate = useNavigate();

  const saveSession = async (sessionID: string) => {
    try {
      const { data } = await axios.post(
        (process.env.REACT_APP_API_URL as string) + `/sessions/${sessionID}`,
        null,
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

  const deleteSession = async (sessionID: string) => {
    try {
      const { data } = await axios.delete(
        (process.env.REACT_APP_API_URL as string) + `/sessions/${sessionID}`,
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

  console.log(user);
  console.log(sessions);

  return (
    <>
      <Container className="mt-5">
        <Row>
          {sessions?.map((session: ISession) => (
            <Col sm={3} md={3} lg={3}>
              <Card className={cx(styles.card, "mb-3")}>
                <Card.Body>
                  <Link to={`/session-details/${session?._id}`}>
                    <Card.Title>{session?.title}</Card.Title>
                  </Link>
                  <Link to={`/profile/${session?.user._id}`}>
                    <Card.Text>By: {session?.user.username}</Card.Text>
                  </Link>

                  <Card.Text>{session?.description}</Card.Text>
                  <Card.Text>Role Needed: {session?.role}</Card.Text>
                  <Card.Text>Genre: {session?.genre}</Card.Text>
                  <Card.Text>
                    Date:{" "}
                    {format(new Date(session?.date), "do 'of' MMMM',' EEEE ")}
                  </Card.Text>
                </Card.Body>
                {state ? (
                  <Row className="my-3">
                    <Col className="d-flex justify-content-center">
                      <BsFillTrashFill
                        onClick={() => deleteSession(session._id)}
                      />
                    </Col>
                    <Col className="d-flex justify-content-center">
                      <FiEdit
                        onClick={() =>
                          navigate(`/edit-a-session/${session._id}`)
                        }
                      />
                    </Col>
                  </Row>
                ) : (
                  <></>
                )}
                {state2 ? (
                  <>
                    {user?._id === session?.user._id ? (
                      <>
                        <Button disabled className="mx-3">
                          Your Session
                        </Button>
                      </>
                    ) : (
                      <>
                        {user?.savedSessions?.some(
                          (el) => el._id === session._id
                        ) ? (
                          <>
                            <Button
                              className="mx-3"
                              color="danger"
                              onClick={() => saveSession(session._id)}
                            >
                              Delete Session
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              className="mx-3"
                              onClick={() => saveSession(session._id)}
                            >
                              Save Session
                            </Button>
                          </>
                        )}{" "}
                      </>
                    )}

                    <p></p>
                  </>
                ) : (
                  <></>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
