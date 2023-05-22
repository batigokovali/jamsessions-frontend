import { useState, useEffect } from "react";
import axios from "axios";
import { ISession } from "../../../Types/ISession";
import { NavbarMain } from "../../Reusables/Navbars/NavbarMain";
import { SessionsCard } from "../../Reusables/SessionsCard";
import { NavbarSecond } from "../../Reusables/Navbars/NavbarSecond";
import { IUser } from "../../../Types/IUser";
import { Container } from "react-bootstrap";
import styles from "./styles.module.css";
import cx from "classnames";

export const MySessions = () => {
  const [savedSessions, setSavedSessions] = useState<ISession[]>();
  const [createdSessions, setCreatedSessions] = useState<ISession[]>();
  const [user, setUser] = useState<IUser>();

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
      setCreatedSessions(data.user.createdSessions);
      setSavedSessions(data.user.savedSessions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Jamsessions | My Sessions";
    getProfileInfo();
  }, []);

  console.log(savedSessions);
  const distance = 0;

  return (
    <>
      <NavbarMain />
      <NavbarSecond name={"Saved Sessions" as string} />
      {savedSessions && savedSessions.length > 0 ? (
        <SessionsCard
          sessions={savedSessions as ISession[]}
          user={user as IUser}
          state={false}
          state2={true}
          fetch={getProfileInfo}
          distance={distance as number}
        />
      ) : (
        <Container className="my-5 d-flex justify-content-center align-items-center">
          <p className={cx(styles.placeholder, "mb-0")}>
            No saved sessions to display.
          </p>
        </Container>
      )}
      <NavbarSecond name={"My Sessions" as string} />
      {createdSessions && createdSessions.length > 0 ? (
        <SessionsCard
          sessions={createdSessions as ISession[]}
          user={user as IUser}
          state={true}
          state2={false}
          fetch={getProfileInfo}
          distance={distance as number}
        />
      ) : (
        <Container className="my-5 d-flex justify-content-center align-items-center">
          <p className={cx(styles.placeholder, "mb-0")}>
            No created sessions to display.
          </p>
        </Container>
      )}
    </>
  );
};
