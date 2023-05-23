import { Container, Navbar } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ISession } from "../../../Types/ISession";
import styles from "./styles.module.css";
import { MultiSelect } from "react-multi-select-component";
import { IMultiselect } from "../../../Types/IMultiselect";
import cx from "classnames";
import Input from "@mui/joy/Input";
import { SessionsCard } from "../../Reusables/SessionsCard";
import { NavbarMain } from "../../Reusables/Navbars/NavbarMain";
import { IUser } from "../../../Types/IUser";

export const Home = () => {
  const loc = useLocation();
  const [sessions, setSessions] = useState<ISession[]>();
  const [distance, setDistance] = useState<number>();
  const [user, setUser] = useState<IUser>();

  //Multiselect Options
  const options = [
    { label: "Guitarist", value: "guitarist" },
    { label: "Singer", value: "singer" },
    { label: "Drummer", value: "drummer" },
    { label: "Bassist", value: "bassist" },
    { label: "Tech", value: "tech" },
    { label: "Keys", value: "keys" },
  ];

  const options2 = [
    { label: "Rock", value: "rock" },
    { label: "Metal", value: "metal" },
    { label: "Blues", value: "blues" },
    { label: "Jazz", value: "jazz" },
    { label: "Pop", value: "pop" },
    { label: "Electronic", value: "electronic" },
  ];

  //Role array for POST, array of strings ["guitarist","singer"]
  let roleArray: any = [];
  let genreArray: any = [];

  //Multiselect selected
  const [roles, setRoles] = useState<IMultiselect[]>([]);
  const [genres, setGenres] = useState<IMultiselect[]>([]);

  const getSessions = async () => {
    try {
      roles.forEach((el) => roleArray.push(el.value));
      genres.forEach((el) => genreArray.push(el.value));
      const sessions = await axios.get(
        (process.env.REACT_APP_API_URL as string) +
          `/sessions?role=${roleArray.toString()}&genre=${genreArray.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setSessions(sessions.data.sessions);
      roleArray = [];
      genreArray = [];
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    const searchParams = new URLSearchParams(loc.search);
    const accessToken = searchParams.get("accessToken");
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
    getSessions();
    getProfileInfo();
    document.title = "Jamsessions | Home";
  }, [roles, genres]);

  return (
    <>
      <NavbarMain />
      <Navbar id={styles.secondnavbar} expand="lg">
        <Container className="d-flex align-items-center justify-content-between">
          <MultiSelect
            overrideStrings={{ selectSomeItems: "Roles" }}
            options={options}
            value={roles}
            onChange={setRoles}
            labelledBy="Role"
            className={cx(styles.multiselect, "roles")}
          />
          <MultiSelect
            overrideStrings={{ selectSomeItems: "Genres" }}
            options={options2}
            value={genres}
            onChange={setGenres}
            labelledBy="Genre"
            className={cx(styles.multiselect, "genres")}
          />
          <Input
            className={cx(styles.input)}
            variant="soft"
            placeholder="Distance"
            type="number"
            onChange={(val) =>
              setDistance(val.currentTarget.value as unknown as number)
            }
          />
        </Container>
      </Navbar>
      <SessionsCard
        sessions={sessions as ISession[]}
        user={user as IUser}
        state={false}
        state2={true}
        fetch={getProfileInfo}
        distance={distance as number}
      />
    </>
  );
};
