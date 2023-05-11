import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { ISession } from "../../../Types/ISession";
import { BsFillTrashFill } from "react-icons/bs";
import { format } from "date-fns";
import { FiEdit } from "react-icons/fi";
import styles from "./styles.module.css";
import cx from "classnames";
import { Link } from "react-router-dom";

interface props {
  sessions: ISession[];
  state: boolean;
}

export const SessionsCard = ({ sessions, state }: props) => {
  return (
    <>
      <Container className="mt-5">
        <Row>
          {sessions?.map((session: ISession) => (
            <Col sm={3} md={3} lg={3}>
              <Card className={cx(styles.card, "mb-3")}>
                <Card.Body>
                  <Link to={`/session-details/${session?._id}`}>
                    <Card.Title>{session?.title}</Card.Title>
                  </Link>
                  <Link to={`/profile/${session?.user._id}`}>
                    <Card.Text>By: {session?.user.username}</Card.Text>
                  </Link>

                  <Card.Text>{session?.description}</Card.Text>
                  <Card.Text>Role Needed: {session?.role}</Card.Text>
                  <Card.Text>Genre: {session?.genre}</Card.Text>
                  <Card.Text>
                    Date:{" "}
                    {format(new Date(session?.date), "do 'of' MMMM',' EEEE ")}
                  </Card.Text>
                </Card.Body>
                {state ? (
                  <Row className="my-3">
                    <Col className="d-flex justify-content-center">
                      <BsFillTrashFill />
                    </Col>
                    <Col className="d-flex justify-content-center">
                      <FiEdit />
                    </Col>
                  </Row>
                ) : (
                  <></>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
