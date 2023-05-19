import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import styles from "./styles.module.css";
import cx from "classnames";

interface props {
  name: string;
}

export const NavbarSecond = ({ name }: props) => {
  return (
    <Navbar id={styles.navbar} expand="lg">
      <Container className="d-flex justify-content-center">
        <p className={cx(styles.navbarelements, "mb-0")}>{name}</p>
      </Container>
    </Navbar>
  );
};
