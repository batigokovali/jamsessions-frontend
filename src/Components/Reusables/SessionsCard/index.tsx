import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { ISession } from "../../../Types/ISession";
import { IUser } from "../../../Types/IUser";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { format } from "date-fns";
import styles from "./styles.module.css";
import cx from "classnames";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/joy/Button/Button";
import Badge from "react-bootstrap/Badge";

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

  return (
    <>
      <Container className="mt-3">
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
              <Col sm={6} md={6} lg={3}>
                <Card className={cx(styles.card, "mb-3")}>
                  <Card.Body>
                    <Link
                      to={`/session-details/${session?._id}`}
                      className={cx(
                        styles.title,
                        "d-flex justify-content-center text-white"
                      )}
                    >
                      <Card.Title className="text-truncate">
                        {session?.title}
                      </Card.Title>
                    </Link>

                    <div className="d-flex flex-column align-items-center">
                      <Card.Text className="mb-3 text-truncate">
                        <Link
                          to={`/profile/${session?.user._id}`}
                          className={cx(styles.title)}
                        >
                          {session?.user.username}
                        </Link>
                      </Card.Text>
                      <Card.Text className="text-truncate mb-1">
                        <Badge className={cx(styles.rolebadge)}>
                          {session?.role}
                        </Badge>{" "}
                        <Badge className={cx(styles.genrebadge)}>
                          {session?.genre}
                        </Badge>
                      </Card.Text>
                      <Card.Text className="text-truncate mb-1"></Card.Text>

                      <Card.Text className="text-truncate mb-1">
                        <Badge className={cx(styles.distancebadge)}>
                          {calculateDistance(
                            user?.location?.lat as number,
                            user?.location?.lng as number,
                            session?.location?.lat as number,
                            session?.location?.lng as number
                          )}{" "}
                          km away
                        </Badge>
                      </Card.Text>
                      <Card.Text>
                        <Badge className={cx(styles.datebadge)}>
                          {format(
                            new Date(session?.date),
                            "do 'of' MMMM',' EEEE "
                          )}
                        </Badge>
                      </Card.Text>
                    </div>
                  </Card.Body>
                  {state ? (
                    <Row className="my-3">
                      <Col className="d-flex justify-content-center text-white">
                        <BsFillTrashFill
                          onClick={() => deleteSession(session._id)}
                        />
                      </Col>
                      <Col className="d-flex justify-content-center text-white">
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
                          <Button
                            disabled
                            className={cx(styles.yourSession, "mx-3")}
                          >
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
                                className={cx(styles.deleteSession, "mx-3")}
                                color="danger"
                                onClick={() => saveSession(session._id)}
                              >
                                Delete Session
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                className={cx(styles.saveSession, "mx-3")}
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
