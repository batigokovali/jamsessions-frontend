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
  const { userID } = useParams();
  const [feed, setFeeds] = useState<IFeeds[]>();
  const [userData, setUserData] = useState<IUser>();
  const [userAddress, setUserAddress] = useState("");

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

  const getUserAddress = async () => {
    try {
      if (userData) {
        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userData?.location.lat},${userData?.location.lng}&location_type=ROOFTOP&result_type=street_address&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        );
        setUserAddress(data.results[0].formatted_address);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
    getUserFeed();
    document.title = `Jamsessions | Profile`;
  }, [state]);

  useEffect(() => {
    if (userData) {
      getUserAddress();
    }
  }, [userData]);
  console.log(userData);
  console.log(userAddress);

  return (
    <>
      <NavbarMain />
      <ProfileInfo
        userData={userData as IUser}
        state={state}
        address={userAddress}
      />
      <MediaItem feed={feed as IFeeds[]} />
    </>
  );
};
