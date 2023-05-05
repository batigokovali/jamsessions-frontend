import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "@mui/joy/Button/Button";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export const NavbarMySessions = () => {
  return (
    <Navbar id={styles.secondnavbar} expand="lg" className="mt-5">
      <Container className="d-flex justify-content-center">
        <p>My Sessions</p>
      </Container>
    </Navbar>
  );
};
