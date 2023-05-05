import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "@mui/joy/Button/Button";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export const NavbarMain = () => {
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
              <img
                src="https://siber.boun.edu.tr/sites/cyber.boun.edu.tr/files/sample6.jpg"
                alt=""
                className={styles.image}
              />
            </Link>
          </div>
        </Container>
      </Navbar>
    </>
  );
};
