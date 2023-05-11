import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "@mui/joy/Button/Button";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { IUser } from "../../../../Types/IUser";

export const NavbarMain = () => {
  const [user, setUser] = useState<IUser>();

  const fetchUserInfo = async () => {
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
    fetchUserInfo();
  }, []);

  return (
    <>
      <Navbar id={styles.mainnavbar} expand="lg">
        <Container fluid className="d-flex justify-content-between">
          <div className="d-flex ms-5">
            <Link to="/home" className="me-3">
              Home
            </Link>
            <Link to="/my-sessions">My Sessions</Link>
          </div>
          <div className="d-flex align-items-center me-5">
            <Link to="/create-a-session">
              <Button className="me-3">Create A Session</Button>
            </Link>

            <Link to="/profile">
              <p className="mb-0 me-3">Profile</p>
            </Link>
            <Link to="/edit-profile">
              <img src={user?.avatar} alt="" className={styles.image} />
            </Link>
          </div>
        </Container>
      </Navbar>
    </>
  );
};
