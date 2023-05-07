import { useState, useEffect } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import styles from "./styles.module.css";
import cx from "classnames";
import { Container } from "react-bootstrap";
import Box from "@mui/material/Box";
import axios from "axios";

export const CreateAPost = () => {
  //Media Upload
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaData, setMediaData] = useState<FormData | null>(null);

  const handleFile = (e: any) => {
    const media = e.target.files[0];
    const mediaData = new FormData();
    mediaData.append("media", media);
    setMediaData(mediaData);
  };

  const postPost = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);

      if (mediaData) {
        const mediaFile = mediaData.get("media");
        if (mediaFile instanceof Blob) {
          formData.append("media", mediaFile);
        }
      }
      await axios.post(
        (process.env.REACT_APP_API_URL as string) + "/feed/media2",
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
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Input
          className={cx(styles.input)}
          variant="soft"
          placeholder="Title"
          onChange={(val) => setTitle(val.currentTarget.value)}
        />
        <Input
          className={cx(styles.input)}
          variant="soft"
          placeholder="Description"
          onChange={(val) => setDescription(val.currentTarget.value)}
        />
        <Input
          className={cx(styles.file)}
          placeholder="Description"
          type="file"
          onChange={handleFile}
        />
        <Button className="mt-3" onClick={postPost}>
          Create A Post
        </Button>
      </Box>
    </>
  );
};
