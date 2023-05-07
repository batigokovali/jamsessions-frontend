import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import logo from "../assets/jamsessions-logo/png/logo-no-background.png";
import styles from "./styles.module.css";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import cx from "classnames";
import { Link } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";
import { toast } from "react-toastify";

export const LoginRegister = ({ isLogin }: props) => {
  //Page Navigation
  const navigate = useNavigate();

  //Geolocation
  const [currentLocation, setLocation] = useState<any>({});
  const [isData, setData] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
  });

  //Toastify
  const [error, setError] = useState("");

  //Register
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState([]);

  //Multiselect Options
  const options = [
    { label: "Guitarist", value: "guitarist" },
    { label: "Singer", value: "singer" },
    { label: "Drummer", value: "drummer" },
    { label: "Bassist", value: "bassist" },
    { label: "Tech", value: "tech" },
    { label: "Keys", value: "keys" },
    { label: "Drummer", value: "drummer" },
  ];

  //Multiselect selected
  const [selected, setSelected] = useState<any[]>([]);

  //Role array for POST, array of strings ["guitarist","singer"]
  let roleArray: any = [];

  //For Getting the location
  const getLocation = async () => {
    try {
      const location = await axios.get("https://ipapi.co/json");
      setLocation(location.data);
      setData(true);
    } catch (error) {
      console.log(error);
    }
  };

  const center = {
    lat: currentLocation?.latitude,
    lng: currentLocation?.longitude,
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      selected.forEach((el) => roleArray.push(el.value));
      const { data } = await axios.post(
        (process.env.REACT_APP_API_URL as string) + "/users/register",
        {
          username,
          email,
          password,
          role: roleArray,
        }
      );
      toast("Register successful! 💪", { autoClose: 1000 });
      localStorage.setItem("accessToken", data.accessToken);
      roleArray = [];
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        (process.env.REACT_APP_API_URL as string) + "/users/login",
        {
          email,
          password,
        }
      );
      toast("Register successful! 💪", { autoClose: 1000 });
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Jamsessions | Register";
    getLocation();
  }, []);

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
              onChange={(val) => setUsername(val.currentTarget.value)}
            />
            <Input
              className={cx(styles.input, "mt-3")}
              variant="soft"
              placeholder="Email"
              onChange={(val) => setEmail(val.currentTarget.value)}
            />
            <Input
              className={cx(styles.input, "mt-3")}
              variant="soft"
              placeholder="Password"
              onChange={(val) => setPassword(val.currentTarget.value)}
            />
            <div className={cx(styles.multiselect, "mt-3")}>
              <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="Role"
              />
            </div>
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
                center={center}
                mapContainerClassName={styles.map}
              >
                <MarkerF position={center} />
              </GoogleMap>
            )}
            {/* </>
            )} */}
            <Button
              onClick={handleSubmit}
              type="submit"
              className={cx(styles.button, "mt-4")}
            >
              Register
            </Button>
          </>
        ) : (
          <>
            <Input
              className={cx(styles.input)}
              variant="soft"
              placeholder="Email"
              onChange={(val) => setEmail(val.currentTarget.value)}
            />
            <Input
              className={cx(styles.input, "mt-3")}
              variant="soft"
              placeholder="Password"
              onChange={(val) => setPassword(val.currentTarget.value)}
            />
            <Button className={cx(styles.button, "mt-4")} onClick={handleLogin}>
              Sign In
            </Button>
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
