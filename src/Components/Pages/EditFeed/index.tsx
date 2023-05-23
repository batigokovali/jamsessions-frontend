import { Container } from "@mui/material";
import styles from "./styles.module.css";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import cx from "classnames";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { NavbarMain } from "../../Reusables/Navbars/NavbarMain";

export const EditFeed = () => {
  const navigate = useNavigate(); //Page Navigation

  const { feedID } = useParams(); //Extracting session ID from URL

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [disableButton, setDisableButton] = useState(true); // State to disable button initially

  const editFeed = async () => {
    const editedFeedData = {
      title,
      description,
    };
    try {
      await axios.put(
        (process.env.REACT_APP_API_URL as string) + `/feed/${feedID}`,
        editedFeedData,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  // Function to enable/disable the button based on input field values
  useEffect(() => {
    if (title.trim() !== "" && description.trim() !== "") {
      setDisableButton(false); // Enable the button if both fields are not empty
    } else {
      setDisableButton(true); // Disable the button if any of the fields is empty
    }
  }, [title, description]);

  return (
    <>
      <NavbarMain />
      <Container className="mt-3 d-flex flex-column justify-content-center align-items-center">
        <Input
          className={cx(styles.input)}
          variant="soft"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          className={cx(styles.input, "mt-3")}
          variant="soft"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button
          className={cx(styles.button, "mt-4")}
          onClick={editFeed}
          disabled={disableButton} // Disable the button when fields are empty
        >
          Edit Feed
        </Button>
      </Container>
    </>
  );
};
