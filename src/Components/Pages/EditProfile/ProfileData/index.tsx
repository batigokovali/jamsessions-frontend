import { Container } from "react-bootstrap";
import cx from "classnames";
import Button from "@mui/joy/Button";
import { useState } from "react";
import Input from "@mui/joy/Input";
import styles from "./styles.module.css";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const EditUserProfileData = () => {
  //navigate
  const navigate = useNavigate();

  //User Data
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<any[]>([]);
  let roleArray: any = [];

  //Multiselect Options
  const options = [
    { label: "Guitarist", value: "guitarist" },
    { label: "Singer", value: "singer" },
    { label: "Drummer", value: "drummer" },
    { label: "Bassist", value: "bassist" },
    { label: "Tech", value: "tech" },
    { label: "Keys", value: "keys" },
    { label: "Drummer", value: "drummer" },
  ];

  const handleSubmit = async () => {
    try {
      role.forEach((el) => roleArray.push(el.value));

      const userData = {
        username,
        email,
        role: roleArray,
      };

      await axios.put(
        (process.env.REACT_APP_API_URL as string) + "/users/me",
        userData,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      roleArray = [];
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Input
        className={cx(styles.input)}
        variant="soft"
        placeholder="Username"
        onChange={(val) => setUsername(val.currentTarget.value)}
      />
      <Input
        className={cx(styles.input, "mt-3")}
        variant="soft"
        placeholder="Email"
        onChange={(val) => setEmail(val.currentTarget.value)}
      />
      <div className={cx(styles.multiselect, "mt-3")}>
        <MultiSelect
          options={options}
          value={role}
          onChange={setRole}
          labelledBy="Role"
        />
      </div>
      <Button className={cx(styles.button, "mt-4")} onClick={handleSubmit}>
        Save
      </Button>
    </Container>
  );
};
