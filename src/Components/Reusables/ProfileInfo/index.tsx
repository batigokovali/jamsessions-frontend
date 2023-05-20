import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { IUser } from "../../../Types/IUser";
import { FiPlus, FiEdit2 } from "react-icons/fi";
import cx from "classnames";

interface props {
  userData: IUser;
  state: boolean;
  address: string;
}

export const ProfileInfo = ({ userData, state, address }: props) => {
  return (
    <Container className="mt-3">
      <Row className="d-">
        <Col xs={4} md={4} lg={3}>
          <img src={userData?.avatar} className={styles.image} alt="" />
        </Col>
        <Col xs={5} md={2} lg={6}>
          <p className={cx(styles.username, "mb-1")}>{userData?.username}</p>
          <p className={cx(styles.address, "mb-0")}>📍{address}</p>
        </Col>
        {state ? (
          <Col
            xs={3}
            md={1}
            lg={1}
            className="d-flex flex-column text-white ms-auto"
          >
            <div className="d-flex flex-column align-items-center">
              <Link to="/create-a-post">
                <Button
                  variant="contained"
                  className={cx(styles.button, "mb-3")}
                >
                  <FiPlus />
                </Button>
              </Link>
              <Link to="/edit-profile">
                <Button variant="contained" className={cx(styles.button)}>
                  <FiEdit2 />
                </Button>
              </Link>
            </div>
          </Col>
        ) : (
          <></>
        )}
      </Row>
    </Container>
  );
};
