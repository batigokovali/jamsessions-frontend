import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import styles from "./styles.module.css";

interface props {
  name: string;
}

export const NavbarSecond = ({ name }: props) => {
  return (
    <Navbar id={styles.navbar} expand="lg">
      <Container className="d-flex justify-content-center">
        <p>{name}</p>
      </Container>
    </Navbar>
  );
};
