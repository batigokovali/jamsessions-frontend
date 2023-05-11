import styles from "./styles.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IFeeds } from "../../../Types/IFeeds";
import { IUser } from "../../../Types/IUser";
import { NavbarMain } from "../../Reusables/Navbars/NavbarMain";
import { ProfileInfo } from "../../Reusables/ProfileInfo";
import { MediaItem } from "../../Reusables/MediaItem";

interface props {
  state: boolean;
}

export const UserProfile = ({ state }: props) => {
  console.log(state);
  const { userID } = useParams();

  const [feed, setFeeds] = useState<IFeeds[]>();
  const [playing, setPlaying] = useState(false);
  const [userData, setUserData] = useState<IUser>();

  const getUserProfile = async () => {
    try {
      if (state === true) {
        const { data } = await axios.get(
          (process.env.REACT_APP_API_URL as string) + `/users/me`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setUserData(data.user);
        console.log("logged in user's profile");
      } else {
        const { data } = await axios.get(
          (process.env.REACT_APP_API_URL as string) + `/users/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setUserData(data);
        console.log("another profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserFeed = async () => {
    try {
      if (state) {
        const { data } = await axios.get(
          (process.env.REACT_APP_API_URL as string) + `/feed`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log(data);
        setFeeds(data);
      } else {
        const { data } = await axios.get(
          (process.env.REACT_APP_API_URL as string) + `/feed/user/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log(data);
        setFeeds(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
    getUserFeed();
  }, [state]);

  return (
    <>
      <NavbarMain />
      <ProfileInfo userData={userData as IUser} state={state} />
      <MediaItem feed={feed as IFeeds[]} />
    </>
  );
};
