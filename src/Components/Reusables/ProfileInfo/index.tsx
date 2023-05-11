import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { IUser } from "../../../Types/IUser";

interface props {
  userData: IUser;
  state: boolean;
}

export const ProfileInfo = ({ userData, state }: props) => {
  return (
    <Container className="mt-5">
      <Row>
        <Col xs={2} md={2} lg={2}>
          <img src={userData?.avatar} className={styles.image} alt="" />
        </Col>
        <Col xs={2} md={2} lg={2}>
          <p>{userData?.username}</p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={2} md={2} lg={2}>
          {state ? (
            <Link to="/create-a-post">
              <Button variant="contained">Create A Post</Button>
            </Link>
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </Container>
  );
};
