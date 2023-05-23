import { useState, useEffect } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import styles from "./styles.module.css";
import cx from "classnames";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";

export const CreateAPost = () => {
  // Media Upload
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaData, setMediaData] = useState<FormData | null>(null);
  const [isInputsValid, setIsInputsValid] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if inputs are not empty
    setIsInputsValid(
      title.trim() !== "" && description.trim() !== "" && mediaData !== null
    );
  }, [title, description, mediaData]);

  const handleFile = (e: any) => {
    const media = e.target.files[0];
    const mediaData = new FormData();
    mediaData.append("media", media);
    setMediaData(mediaData);
  };

  const postPost = async () => {
    try {
      if (!isInputsValid) {
        // If inputs are empty, do not proceed
        return;
      }
      setLoading(true);

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
        (process.env.REACT_APP_API_URL as string) + "/feed/media",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setLoading(false);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container className="d-flex flex-column justify-content-center align-items-center mt-3">
        <Input
          className={cx(styles.input)}
          variant="soft"
          placeholder="Title"
          onChange={(val) => setTitle(val.currentTarget.value)}
        />
        <Input
          className={cx(styles.input, "my-3")}
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
        <Button
          className="mt-3"
          onClick={postPost}
          disabled={!isInputsValid} // Disable button when inputs are empty
        >
          Create A Post
        </Button>
        <div className="w-100 d-flex justify-content-center align-items-center">
          {isLoading ? (
            <FadeLoader className="ms-3 mt-5" color="#ffffff" />
          ) : (
            <></>
          )}
        </div>
      </Container>
    </>
  );
};
