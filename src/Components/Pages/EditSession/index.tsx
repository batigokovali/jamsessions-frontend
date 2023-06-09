import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import styles from "./styles.module.css";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import cx from "classnames";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";
import { NavbarMain } from "../../Reusables/Navbars/NavbarMain";
import { ISession } from "../../../Types/ISession";

export const EditASession = () => {
  const navigate = useNavigate(); //Page Navigation

  const { sessionID } = useParams(); //Extracting session ID from URL

  //Geolocation
  const [currentLocation, setLocation] = useState<any>({});
  const [isData, setData] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
  });

  //Get old session data
  const [sessionData, setSessionData] = useState<ISession>();

  //Edit A Session
  const [title, setTitle] = useState(sessionData?.title);
  const [description, setDescription] = useState(sessionData?.description);
  const [date, setDate] = useState(sessionData?.date.toString());

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

  const options2 = [
    { label: "Rock", value: "rock" },
    { label: "Metal", value: "metal" },
    { label: "Blues", value: "blues" },
    { label: "Jazz", value: "jazz" },
    { label: "Pop", value: "pop" },
    { label: "Electronic", value: "electronic" },
  ];

  //Multiselect selected
  const [selected, setSelected] = useState<any[]>([]);
  const [selected2, setSelected2] = useState<any[]>([]);

  useEffect(() => {
    getLocation();
  }, []);

  //Toastify
  const [error, setError] = useState("");

  const getLocation = async () => {
    try {
      const location = await axios.get("https://ipapi.co/json");
      setLocation(location.data);
      setData(true);
    } catch (error) {
      console.log(error);
    }
  };

  //Role array for POST, array of strings ["guitarist","singer"]
  let roleArray: any = [];
  let genreArray: any = [];

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      selected.forEach((el) => roleArray.push(el.value));
      selected2.forEach((el) => genreArray.push(el.value));

      if (roleArray.length === 0 && genreArray.length === 0) {
        setError("Please select at least one role or genre.");
        return;
      }

      if (!title || !description || !date) {
        setError("Please fill in all the required fields.");
        return;
      }

      const editedSessionData = {
        title,
        description,
        date,
        role: roleArray,
        genre: genreArray,
      };

      await axios.put(
        (process.env.REACT_APP_API_URL as string) + `/sessions/${sessionID}`,
        editedSessionData,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      roleArray = [];
      genreArray = [];
      navigate("/my-sessions");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSession = async () => {
    try {
      const { data } = await axios.get(
        (process.env.REACT_APP_API_URL as string) + `/sessions/${sessionID}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setSessionData(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const center2 = {
    lat: currentLocation?.latitude,
    lng: currentLocation?.longitude,
  };

  return (
    <>
      <NavbarMain />
      <Container className="mt-3 d-flex flex-column justify-content-center align-items-center">
        <Input
          className={cx(styles.input)}
          variant="soft"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          className={cx(styles.input, "mt-3")}
          variant="soft"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          className={cx(styles.input, "mt-3")}
          variant="soft"
          placeholder="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className={cx(styles.input, "mt-3")}>
          <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy="Role"
          />
        </div>
        <div className={cx(styles.input, "mt-3")}>
          <MultiSelect
            options={options2}
            value={selected2}
            onChange={setSelected2}
            labelledBy="Genre"
          />
        </div>
        {error && <p className="error-msg">{error}</p>}
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

        <Button className={cx(styles.button, "mt-4")} onClick={handleSubmit}>
          Edit Session
        </Button>
      </Container>
    </>
  );
};

interface props {
  isLogin: boolean;
}

interface useLoadScript {
  googleMapsApiKey: string;
}
