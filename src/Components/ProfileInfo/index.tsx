import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.css";

export const ProfileInfo = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col xs={2} md={2} lg={2}>
          <img
            src="https://siber.boun.edu.tr/sites/cyber.boun.edu.tr/files/sample6.jpg"
            className={styles.image}
            alt=""
          />
        </Col>
        <Col xs={2} md={2} lg={2}>
          <p>Username goes here</p>
        </Col>
      </Row>
    </Container>
  );
};
