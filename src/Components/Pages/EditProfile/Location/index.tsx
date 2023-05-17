import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import logo from "../assets/jamsessions-logo/png/logo-no-background.png";
import styles from "./styles.module.css";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import cx from "classnames";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";
import { ILocation } from "../../../../Types/ILocation";

export const EditUserLocation = () => {
  const [location, setLocation] = useState<ILocation>();
  const [latAuto, setLat] = useState();
  const [lngAuto, setLng] = useState();

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
  console.log("center:", center);
  console.log("dragged", location);

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Jamsessions | Edit Location";
  }, []);

  return (
    <>
      <Container>
        {!isLoaded ? (
          <>
            <Box>
              <p>Loading...</p>
            </Box>
          </>
        ) : (
          <>
            <div className={cx(styles.autocomplete, "mt-3")}>
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
        <Button className={cx(styles.button, "mt-4")} onClick={saveLocation}>
          Save
        </Button>
      </Container>
    </>
  );
};
