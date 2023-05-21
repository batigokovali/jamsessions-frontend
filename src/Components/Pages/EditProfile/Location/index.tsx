import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import styles from "./styles.module.css";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import cx from "classnames";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useEffect, useState, useRef } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import axios from "axios";
import { ILocation } from "../../../../Types/ILocation";
import { useNavigate } from "react-router-dom";

export const EditUserLocation = () => {
  const [location, setLocation] = useState<ILocation | null>(null);
  const [latAuto, setLat] = useState<number | undefined>(undefined);
  const [lngAuto, setLng] = useState<number | undefined>(undefined);
  const navigate = useNavigate();

  //Google Maps
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const center = {
    lat: latAuto!,
    lng: lngAuto!,
  };

  //Google maps marker drag
  function handleDrag(this: any) {
    console.log(this.getPosition().toJSON());
    setLat(this.getPosition().toJSON().lat);
    setLng(this.getPosition().toJSON().lng);
    setLocation({ lat: latAuto!, lng: lngAuto! });
  }

  //lat lng info from marker
  const inputRef = useRef<any>();

  const handlePlaceChanged = () => {
    const places = inputRef?.current?.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      if (place.geometry?.location) {
        setLat(place.geometry.location.lat());
        setLng(place.geometry.location.lng());
      } else {
        console.error("Invalid place object:", place);
      }
    } else {
      console.error("No places found.");
    }
  };

  const saveLocation = async () => {
    if (!location) {
      // If location is not selected, do not proceed
      return;
    }

    try {
      await axios.put(
        (process.env.REACT_APP_API_URL as string) + "/users/me",
        { location: location || center },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Jamsessions | Edit Location";
  }, []);

  return (
    <>
      <Container className="mt-3 d-flex flex-column justify-content-center align-items-center">
        {!isLoaded ? (
          <>
            <Box>
              <p>Loading...</p>
            </Box>
          </>
        ) : (
          <>
            <div className={cx(styles.autocomplete)}>
              <StandaloneSearchBox
                onLoad={(ref) => (inputRef.current = ref)}
                onPlacesChanged={handlePlaceChanged}
              >
                <Input
                  type="text"
                  placeholder="Search your location"
                  variant="soft"
                />
              </StandaloneSearchBox>
            </div>
            <GoogleMap
              zoom={10}
              center={center}
              mapContainerClassName={styles.map}
            >
              <MarkerF
                position={center}
                draggable={true}
                onDragEnd={handleDrag}
              />
            </GoogleMap>
          </>
        )}
        <Button
          className={cx(styles.button, "mt-4")}
          onClick={saveLocation}
          disabled={!location} // Disable the button when location is not selected
        >
          Save
        </Button>
      </Container>
    </>
  );
};
