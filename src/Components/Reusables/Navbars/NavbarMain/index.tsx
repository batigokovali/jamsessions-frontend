import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Button from "@mui/joy/Button/Button";
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { IUser } from "../../../../Types/IUser";
import cx from "classnames";
import logo from "../../../assets/jamsessions-logo/png/logo-no-background.png";

export const NavbarMain = () => {
  const navigate = useNavigate();
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

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <>
      <Navbar expand="lg" className="d-flex" id={styles.mainnavbar}>
        <img src={logo} className={cx(styles.logo, "ms-2")} alt="" />
        <Link to="/profile" className={cx(styles.imagelink, "me-3")}>
          <img src={user?.avatar} className={cx(styles.image)} />
        </Link>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="ms-2"
          id={styles.toggle}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Link to="/home" className={cx(styles.navbarelements, "me-3")}>
              Home
            </Link>
            <Link to="/map-view" className={cx(styles.navbarelements, "me-3")}>
              Map View
            </Link>
            <Link
              to="/my-sessions"
              className={cx(styles.navbarelements, "me-3")}
            >
              My Sessions
            </Link>
            <Link to="/create-a-session">
              <Button size="sm" className={cx(styles.button, "me-3")}>
                Create A Session
              </Button>
            </Link>
            <Button
              color="danger"
              size="sm"
              className={cx(styles.button, "me-3")}
              onClick={logout}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
