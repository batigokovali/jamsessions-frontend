import { useState, useEffect } from "react";
import axios from "axios";
import { ISession } from "../../../Types/ISession";
import { NavbarMain } from "../../Reusables/Navbars/NavbarMain";
import { SessionsCard } from "../../Reusables/SessionsCard";
import { NavbarSecond } from "../../Reusables/Navbars/NavbarSecond";

export const MySessions = () => {
  const [savedSessions, setSavedSessions] = useState<ISession[]>();
  const [createdSessions, setCreatedSessions] = useState<ISession[]>();

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
      console.log(data.user.createdSessions);
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

  return (
    <>
      <NavbarMain />
      <NavbarSecond name={"Saved Sessions" as string} />
      <SessionsCard sessions={savedSessions as ISession[]} state={false} />
      <NavbarSecond name={"My Sessions" as string} />
      <SessionsCard sessions={createdSessions as ISession[]} state={true} />
    </>
  );
};
