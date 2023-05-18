import { useState, useEffect } from "react";
import axios from "axios";
import { ISession } from "../../../Types/ISession";
import { NavbarMain } from "../../Reusables/Navbars/NavbarMain";
import { SessionsCard } from "../../Reusables/SessionsCard";
import { NavbarSecond } from "../../Reusables/Navbars/NavbarSecond";
import { IUser } from "../../../Types/IUser";

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
    getProfileInfo();
  }, []);

  console.log(createdSessions);
  const distance = 0;

  return (
    <>
      <NavbarMain />
      <NavbarSecond name={"Saved Sessions" as string} />
      <SessionsCard
        sessions={savedSessions as ISession[]}
        user={user as IUser}
        state={false}
        state2={true}
        fetch={getProfileInfo}
        distance={distance as number}
      />
      <NavbarSecond name={"My Sessions" as string} />
      <SessionsCard
        sessions={createdSessions as ISession[]}
        user={user as IUser}
        state={true}
        state2={false}
        fetch={getProfileInfo}
        distance={distance as number}
      />
    </>
  );
};
