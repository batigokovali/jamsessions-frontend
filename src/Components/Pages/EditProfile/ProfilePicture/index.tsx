import { Container } from "react-bootstrap";
import cx from "classnames";
import Button from "@mui/joy/Button";
import { useEffect, useState, useRef } from "react";
import Input from "@mui/joy/Input";
import styles from "./styles.module.css";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const EditUserProfilePicture = () => {
  //User profile picture file
  const [avatar, setAvatar] = useState<FormData | null>(null);

  const handleFile = (e: any) => {
    const avatar = e.target.files[0];
    const avatarData = new FormData();
    avatarData.append("avatar", avatar);
    setAvatar(avatarData);
  };

  const saveProfilePicture = async () => {
    const formData = new FormData();
    if (avatar) {
      const avatarFile = avatar.get("avatar");
      if (avatarFile instanceof Blob) {
        formData.append("avatar", avatarFile);
      }
    }
    try {
      await axios.post(
        (process.env.REACT_APP_API_URL as string) + "/users/me/avatar",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Input type="file" placeholder="Avatar" onChange={handleFile}></Input>
      <Button onClick={saveProfilePicture}>Save</Button>
    </Container>
  );
};
