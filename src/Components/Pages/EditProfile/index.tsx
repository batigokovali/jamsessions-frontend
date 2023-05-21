import { Container } from "react-bootstrap";
import styles from "./styles.module.css";
import Button from "@mui/joy/Button";
import cx from "classnames";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const EditProfile = () => {
  useEffect(() => {
    document.title = "Jamsessions | Edit Profile";
  }, []);

  return (
    <Container className="button-container mt-5 d-flex flex-column align-items-center">
      <Link to={"/edit-profile/data"}>
        <Button className={cx(styles.button, "mb-3")}>
          Change Profile Data
        </Button>
      </Link>
      <Link to={"/edit-profile/password"}>
        <Button className={cx(styles.button, "mb-3")}>Change Password</Button>
      </Link>
      <Link to={"/edit-profile/picture"}>
        <Button className={cx(styles.button, "mb-3")}>
          Change Profile Picture
        </Button>
      </Link>
      <Link to={"/edit-profile/location"}>
        <Button className={cx(styles.button, "mb-3")}>Change Location</Button>
      </Link>
    </Container>
  );
};
