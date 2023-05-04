import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "@mui/joy/Button/Button";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export const MyNavbar = () => {
  return (
    <>
      <Navbar id={styles.mainnavbar} expand="lg">
        <Container fluid className="d-flex justify-content-between">
          <div className="d-flex ms-5">
            <Link to="/home" className="me-3">
              Home
            </Link>
            <Link to="/home">My Sessions</Link>
          </div>
          <div className="d-flex align-items-center me-5">
            <Button className="me-3">Create A Session</Button>
            <p className="mb-0 me-3">Profile</p>
            <img
              src="https://siber.boun.edu.tr/sites/cyber.boun.edu.tr/files/sample6.jpg"
              alt=""
              className={styles.image}
            />
          </div>
        </Container>
      </Navbar>
      <Navbar id={styles.secondnavbar} expand="lg">
        <Container className="d-flex">
          <Link to="/home" className="me-3">
            Role: All
          </Link>
          <Link to="/home">Genre: Hard Rock</Link>
        </Container>
      </Navbar>
    </>
  );
};
