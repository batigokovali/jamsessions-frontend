import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "@mui/joy/Button/Button";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export const NavbarSecond = () => {
  return (
    <Navbar id={styles.secondnavbar} expand="lg">
      <Container className="d-flex">
        <Link to="/home" className="me-3">
          Role: All
        </Link>
        <Link to="/home">Genre: Hard Rock</Link>
      </Container>
    </Navbar>
  );
};
