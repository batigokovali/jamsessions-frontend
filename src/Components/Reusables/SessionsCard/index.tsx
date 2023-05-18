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

interface props {
  sessions: ISession[];
  user: IUser;
  state: boolean;
  state2: boolean;
  fetch: Function;
  distance?: number;
}

export const SessionsCard = ({
  sessions,
  user,
  state,
  state2,
  fetch,
  distance,
}: props) => {
  const navigate = useNavigate();

  const saveSession = async (sessionID: string) => {
    try {
      await axios.post(
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
      await axios.delete(
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

  function calculateDistance(
    lat1: number, //from user
    lon1: number, //from user
    lat2: number, //from session
    lon2: number //from session
  ): number {
    const earthRadius = 6371;
    const latRad1 = toRadians(lat1);
    const lonRad1 = toRadians(lon1);
    const latRad2 = toRadians(lat2);
    const lonRad2 = toRadians(lon2);

    const diffLat = latRad2 - latRad1;
    const diffLon = lonRad2 - lonRad1;
    const a =
      Math.sin(diffLat / 2) ** 2 +
      Math.cos(latRad1) * Math.cos(latRad2) * Math.sin(diffLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return Number(distance.toFixed(1));
  }

  function toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  console.log(user);
  console.log(sessions);
  console.log("distance from user test:", distance);

  return (
    <>
      <Container className="mt-5">
        <Row>
          {sessions
            ?.filter((session) => {
              if (!distance || distance === 0) {
                return true; // Show all sessions when filterValue is empty
              } else {
                const distanceCalculated = calculateDistance(
                  user?.location?.lat,
                  user?.location?.lng,
                  session?.location?.lat,
                  session?.location?.lng
                );
                return distanceCalculated < distance;
              }
            })
            .map((session: ISession) => (
              <Col sm={3} md={3} lg={3}>
                <Card className={cx(styles.card, "mb-3")}>
                  <Card.Body>
                    <Link to={`/session-details/${session?._id}`}>
                      <Card.Title>{session?.title}</Card.Title>
                    </Link>
                    <Link to={`/profile/${session?.user._id}`}>
                      <Card.Text>By: {session?.user.username}</Card.Text>
                    </Link>

                    <Card.Text className="text-truncate">
                      {session?.description}
                    </Card.Text>
                    <Card.Text>Role Needed: {session?.role}</Card.Text>
                    <Card.Text>Genre: {session?.genre}</Card.Text>

                    <Card.Text>
                      Distance:{" "}
                      {calculateDistance(
                        user?.location?.lat as number,
                        user?.location?.lng as number,
                        session?.location?.lat as number,
                        session?.location?.lng as number
                      )}{" "}
                      km away
                    </Card.Text>
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
