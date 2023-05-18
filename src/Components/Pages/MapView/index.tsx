import { NavbarMain } from "../../Reusables/Navbars/NavbarMain";
import { ISession } from "../../../Types/ISession";
import { IUser } from "../../../Types/IUser";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import styles from "./styles.module.css";
import cx from "classnames";
import { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
import { ILocation } from "../../../Types/ILocation";
import { Link } from "react-router-dom";

export const MapView = () => {
  //Session and user data
  const [user, setUser] = useState<IUser>();
  const [sessions, setSessions] = useState<ISession[]>();

  //Fetching user profile
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
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  //Fetching sessions
  const getSessions = async () => {
    try {
      const sessions = await axios.get(
        (process.env.REACT_APP_API_URL as string) + `/sessions`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(sessions.data.sessions);
      setSessions(sessions.data.sessions);
    } catch (error) {
      console.log(error);
    }
  };

  //Google Maps
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const [initialCenter, setInitialCenter] = useState<ILocation | undefined>(
    undefined
  );

  const centerMap = {
    lat: user?.location?.lat,
    lng: user?.location?.lng,
  };

  useEffect(() => {
    // Fetch user profile and sessions only once when the component mounts
    const fetchData = async () => {
      await getSessions();
      await getProfileInfo();
    };

    fetchData();
    document.title = "Jamsessions | Map View";
  }, []);

  useEffect(() => {
    if (user?.location) {
      setInitialCenter(user?.location);
    }
  }, [user?.location]);

  const [selectedMarker, setSelectedMarker] = useState<ISession | null>(null);

  const handleMarkerClick = (session: ISession) => {
    setSelectedMarker(session);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  console.log(selectedMarker);

  return (
    <>
      <NavbarMain />
      <Container className="d-flex justify-content-center align-items-center">
        {!isLoaded ? (
          <>
            <Box>
              <p>Loading...</p>
            </Box>
          </>
        ) : (
          <>
            <div className={cx(styles.autocomplete, "mt-3")}></div>
            <GoogleMap
              zoom={10}
              center={initialCenter as ILocation}
              mapContainerClassName={styles.map}
            >
              {sessions?.map((session) => (
                <>
                  <MarkerF
                    key={session?._id}
                    position={session?.location as ILocation}
                    onClick={() => handleMarkerClick(session)}
                  />

                  {selectedMarker && (
                    <InfoWindowF
                      position={selectedMarker?.location as ILocation}
                      onCloseClick={handleInfoWindowClose}
                    >
                      <div>
                        <Link to={`/session-details/${selectedMarker?._id}`}>
                          <h6>{selectedMarker?.title}</h6>
                        </Link>
                        <p>kek</p>
                      </div>
                    </InfoWindowF>
                  )}
                </>
              ))}
            </GoogleMap>
          </>
        )}
      </Container>
    </>
  );
};
