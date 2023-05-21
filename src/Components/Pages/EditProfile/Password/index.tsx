import { useState } from "react";
import { Container } from "react-bootstrap";
import Input from "@mui/joy/Input";
import cx from "classnames";
import Button from "@mui/joy/Button";
import styles from "./styles.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const EditUserPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New and old password needs to match!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    try {
      const userData = {
        password: confirmPassword,
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

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const isFormValid =
    oldPassword !== "" && newPassword !== "" && confirmPassword !== "";

  return (
    <Container className="d-flex mt-3 flex-column justify-content-center align-items-center">
      <Input
        className={cx(styles.input)}
        variant="soft"
        type="password"
        value={oldPassword}
        placeholder="Enter Old Password"
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <Input
        className={cx(styles.input, "my-3")}
        variant="soft"
        type="password"
        value={newPassword}
        placeholder="Enter New Password"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Input
        className={cx(styles.input, "mb-3")}
        variant="soft"
        type="password"
        value={confirmPassword}
        placeholder="Enter New Password again"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button onClick={handleChangePassword} disabled={!isFormValid}>
        Change Password
      </Button>
      <ToastContainer />
    </Container>
  );
};
