import { Container } from "react-bootstrap";
import Button from "@mui/joy/Button";
import { useState } from "react";
import Input from "@mui/joy/Input";
import axios from "axios";

export const EditUserProfilePicture = () => {
  // User profile picture file
  const [avatar, setAvatar] = useState<FormData | null>(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleFile = (e: any) => {
    const avatar = e.target.files[0];
    const avatarData = new FormData();
    avatarData.append("avatar", avatar);
    setAvatar(avatarData);
    setIsFileSelected(true);
  };

  const saveProfilePicture = async () => {
    if (!isFileSelected) {
      // If no file is selected, do not proceed
      return;
    }

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
    <Container className="d-flex mt-3 flex-column align-items-center justify-content-center">
      <Input type="file" placeholder="Avatar" onChange={handleFile}></Input>
      <Button
        className="mt-3"
        onClick={saveProfilePicture}
        disabled={!isFileSelected}
      >
        Save
      </Button>
    </Container>
  );
};
