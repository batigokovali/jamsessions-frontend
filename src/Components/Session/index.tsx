import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ISession } from "../../Types/ISession";
import { format } from "date-fns";
import styles from "./styles.module.css";
import { Navbar } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";
import { IMultiselect } from "../../Types/IMultiselect";
import cx from "classnames";
import Input from "@mui/joy/Input";

export const SessionCard = () => {
  const [sessions, setSessions] = useState<ISession[]>();
  const [distance, setDistance] = useState("");

  //Multiselect Options
  const options = [
    { label: "Guitarist", value: "guitarist" },
    { label: "Singer", value: "singer" },
    { label: "Drummer", value: "drummer" },
    { label: "Bassist", value: "bassist" },
    { label: "Tech", value: "tech" },
    { label: "Keys", value: "keys" },
  ];

  const options2 = [
    { label: "Rock", value: "rock" },
    { label: "Metal", value: "metal" },
    { label: "Blues", value: "blues" },
    { label: "Jazz", value: "jazz" },
    { label: "Pop", value: "pop" },
    { label: "Electronic", value: "electronic" },
  ];

  //Role array for POST, array of strings ["guitarist","singer"]
  let roleArray: any = [];
  let genreArray: any = [];

  //Multiselect selected
  const [roles, setRoles] = useState<IMultiselect[]>([]);
  const [genres, setGenres] = useState<IMultiselect[]>([]);

  const getSessions = async () => {
    try {
      roles.forEach((el) => roleArray.push(el.value));
      genres.forEach((el) => genreArray.push(el.value));
      console.log(roleArray.toString());
      console.log(genreArray.toString());
      const sessions = await axios.get(
        (process.env.REACT_APP_API_URL as string) +
          `/sessions?role=${roleArray.toString()}&genre=${genreArray.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(sessions.data.sessions);
      setSessions(sessions.data.sessions);
      roleArray = [];
      genreArray = [];
      console.log(roleArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSessions();
  }, [roles, genres]);

  return (
    <>
      <Navbar id={styles.secondnavbar} expand="lg">
        <Container className="d-flex">
          <div className="d-flex align-items-center">
            <p className="mb-0">Roles: </p>
            <div>
              <MultiSelect
                options={options}
                value={roles}
                onChange={setRoles}
                labelledBy="Role"
                className={cx(styles.multiselect)}
              />
            </div>
          </div>
          <div className="d-flex align-items-center">
            <p className="mb-0">Genres: </p>
            <MultiSelect
              options={options2}
              value={genres}
              onChange={setGenres}
              labelledBy="Genre"
              className={cx(styles.multiselect)}
            />
          </div>
          <Input
            className={cx(styles.input)}
            variant="soft"
            placeholder="Distance"
            onChange={(val) => setDistance(val.currentTarget.value)}
          />
        </Container>
      </Navbar>
      <Container className="mt-5">
        <Row>
          {sessions?.map((session: ISession) => (
            <Col sm={3} md={3} lg={3}>
              <Card>
                <Card.Body>
                  <Link to={`/session-details/${session?._id}`}>
                    <Card.Title>{session?.title}</Card.Title>
                  </Link>
                  <Link to={`/profile/${session?.user._id}`}>
                    <Card.Text>By: {session?.user.username}</Card.Text>
                  </Link>
                  <Card.Text>{session?.description}</Card.Text>
                  <Card.Text>Genre: {session?.genre}</Card.Text>
                  <Card.Text>Role Needed: {session?.role}</Card.Text>
                  <Card.Text>
                    Date:
                    {format(new Date(session?.date), "do 'of' MMMM',' EEEE ")}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
