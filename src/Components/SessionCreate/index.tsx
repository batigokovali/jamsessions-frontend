import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import styles from "./styles.module.css";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import cx from "classnames";
import { toast } from "react-toastify";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";

export const SessionCreate = () => {
  //Page Navigation
  const navigate = useNavigate();

  //Geolocation
  const [formData, setFormData] = useState({});
  const [currentLocation, setLocation] = useState<any>({});
  const [isData, setData] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
  });

  //Create A Session
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

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

  console.log(date);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      selected.forEach((el) => roleArray.push(el.value));
      selected2.forEach((el) => genreArray.push(el.value));
      const sessionData = {
        title,
        description,
        date,
        role: roleArray,
        genre: genreArray,
      };
      await axios.post(
        (process.env.REACT_APP_API_URL as string) + "/sessions",
        sessionData,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      toast("Creating session successful! 💪", { autoClose: 1000 });
      roleArray = [];
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Jamsessions | Create A Session";
  }, []);

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
            onChange={(val) => setTitle(val.currentTarget.value)}
          />
          <Input
            className={cx(styles.input, "mt-3")}
            variant="soft"
            placeholder="Description"
            onChange={(val) => setDescription(val.currentTarget.value)}
          />
          <Input
            className={cx(styles.input, "mt-3")}
            variant="soft"
            placeholder="date"
            type="date"
            onChange={(val) => setDate(val.currentTarget.value)}
          />
          <div className={cx(styles.multiselect, "mt-3")}>
            <MultiSelect
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy="Role"
            />
          </div>
          <div className={cx(styles.multiselect, "mt-3")}>
            <MultiSelect
              options={options2}
              value={selected2}
              onChange={setSelected2}
              labelledBy="Genre"
            />
          </div>
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
