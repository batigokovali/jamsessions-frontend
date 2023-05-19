import { Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ISession } from "../../../Types/ISession";
import { ILocation } from "../../../Types/ILocation";
import { NavbarMain } from "../../Reusables/Navbars/NavbarMain";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import styles from "./styles.module.css";
import { format } from "date-fns";
import Badge from "react-bootstrap/Badge";
import cx from "classnames";

export const SessionDetails = () => {
  const { sessionID } = useParams();
  const [session, setSession] = useState<ISession>();
  const [location, setLocation] = useState<ILocation>();

  //Google Maps
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const center = {
    lat: location?.lat,
    lng: location?.lng,
  };

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
      setLocation(session.data[0].location);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSessionDetails();
  }, []);

  console.log(session);
  console.log(location);
  return (
    <>
      {session ? (
        <>
          <NavbarMain />
          <Container className="mt-5">
            <Row>
              <Col>
                <Row>
                  <Col>
                    <p className={cx(styles.title)}>{session?.title}</p>
                  </Col>
                  <Col className="text-truncate">
                    <Link to={`/profile/${session?.user._id}`}>
                      <Badge bg="danger">{session?.user.username}</Badge>
                    </Link>
                  </Col>
                </Row>

                <p> {session?.description}</p>
              </Col>
              <Col className="d-flex">
                <p className="ms-auto">
                  <Badge bg="primary">{session?.role}</Badge>
                </p>
                <p className="ms-auto">
                  <Badge bg="success">{session?.genre}</Badge>
                </p>
                <p className="ms-auto">
                  <Badge bg="secondary">
                    {format(
                      new Date(session?.date as Date),
                      "do 'of' MMMM',' EEEE "
                    )}
                  </Badge>
                </p>
              </Col>
            </Row>
            <Row>
              {!isLoaded ? (
                <>
                  <div>
                    <p>Loading...</p>
                  </div>
                </>
              ) : (
                <>
                  <GoogleMap
                    zoom={10}
                    center={center as ILocation}
                    mapContainerClassName={styles.map}
                  >
                    <MarkerF position={center as ILocation} />
                  </GoogleMap>
                </>
              )}
            </Row>
          </Container>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
