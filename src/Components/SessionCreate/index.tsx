import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import logo from "../assets/jamsessions-logo/png/logo-no-background.png";
import styles from "./styles.module.css";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import cx from "classnames";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import axios from "axios";

export const SessionCreate = () => {
  const [formData, setFormData] = useState({});
  const [isError, setError] = useState({ is: false, message: "" });
  const navigate = useNavigate();
  const [currentLocation, setLocation] = useState<any>({});
  const [isData, setData] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
  });

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const location = await axios.get("https://ipapi.co/json");
      setLocation(location.data);
      setData(true);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(currentLocation);

  const center = useMemo(
    () => ({
      lat: currentLocation?.latitude,
      lng: currentLocation?.longitude,
    }),
    []
  );

  const center2 = {
    lat: currentLocation?.latitude,
    lng: currentLocation?.longitude,
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <>
          <Input
            className={cx(styles.input)}
            variant="soft"
            placeholder="Title"
          />
          <Input
            className={cx(styles.input, "mt-3")}
            variant="soft"
            placeholder="Description"
          />
          <Input
            className={cx(styles.input, "mt-3")}
            variant="soft"
            placeholder="Genre"
          />
          <Input
            className={cx(styles.input, "mt-3")}
            variant="soft"
            placeholder="Role"
          />
          {!isData ? (
            <>
              <Box>
                <p>Loading...</p>
              </Box>
            </>
          ) : (
            <GoogleMap
              zoom={10}
              center={center2}
              mapContainerClassName={styles.map}
            >
              <MarkerF position={center2} />
            </GoogleMap>
          )}

          <Button className={cx(styles.button, "mt-4")}>
            Create A Session
          </Button>
        </>
      </Box>
    </Container>
  );
};

interface props {
  isLogin: boolean;
}

interface useLoadScript {
  googleMapsApiKey: string;
}
