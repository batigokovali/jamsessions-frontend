import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { IUser } from "../../../Types/IUser";
import { FiPlus, FiEdit2 } from "react-icons/fi";

interface props {
  userData: IUser;
  state: boolean;
  address: string;
}

export const ProfileInfo = ({ userData, state, address }: props) => {
  return (
    <Container className="mt-5">
      <Row>
        <Col xs={4} md={4} lg={3}>
          <img src={userData?.avatar} className={styles.image} alt="" />
        </Col>
        <Col xs={3} md={2} lg={2}>
          <p>{userData?.username}</p>
          <p>{address}</p>
        </Col>
        <Col
          xs={2}
          md={1}
          lg={1}
          className="ms-auto d-flex flex-column text-white"
        >
          {state ? (
            <>
              <div className="d-flex flex-column ms-auto align-items-center">
                <Link to="/create-a-post">
                  <Button variant="contained" className="mb-3">
                    <FiPlus />
                  </Button>
                </Link>
                <Link to="/edit-profile">
                  <Button variant="contained">
                    <FiEdit2 />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <Row className="mt-3"></Row>
    </Container>
  );
};
