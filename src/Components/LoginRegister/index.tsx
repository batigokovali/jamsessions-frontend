import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import logo from "../assets/jamsessions-logo/png/logo-no-background.png";
import styles from "./styles.module.css";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import cx from "classnames";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import axios from "axios";

export const LoginRegister = ({ isLogin }: props) => {
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
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img className={styles.image} src={logo}></img>
        {!isLogin ? (
          <>
            <Input
              className={cx(styles.input)}
              variant="soft"
              placeholder="Username"
            />
            <Input
              className={cx(styles.input, "mt-3")}
              variant="soft"
              placeholder="Email"
            />
            <Input
              className={cx(styles.input, "mt-3")}
              variant="soft"
              placeholder="Password"
            />
            <Input
              className={cx(styles.input, "mt-3")}
              variant="soft"
              placeholder="Role"
            />
            {/* {!isLoaded && (
              <> */}
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
            {/* </>
            )} */}
            <Button className={cx(styles.button, "mt-4")}>Register</Button>
          </>
        ) : (
          <>
            <Input
              className={cx(styles.input)}
              variant="soft"
              placeholder="Email"
            />
            <Input
              className={cx(styles.input, "mt-3")}
              variant="soft"
              placeholder="Password"
            />
            <Button className={cx(styles.button, "mt-4")}>Sign In</Button>
            <p className="mt-4">
              Don't have an account? <Link to="/register">Register Here.</Link>
            </p>
            <Button className={cx(styles.button, "mt-3")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-google mx-2"
                viewBox="0 0 16 16"
              >
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
              </svg>
              Login with Google
            </Button>
          </>
        )}
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

LoginRegister.defaultProps = {
  isLogin: true,
};
