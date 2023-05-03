import * as React from "react";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import logo from "../assets/jamsessions-logo/png/logo-no-background.png";
import styles from "./login.module.css";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import cx from "classnames";
import { shadows } from "@mui/system";

export const Login = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img className={styles.image} src={logo}></img>
        <Input
          className={cx(styles.input)}
          variant="soft"
          placeholder="Email"
        />
        <Input
          className={cx(styles.input, "mt-3")}
          variant="soft"
          placeholder="Password"
        />
        <Button className={cx(styles.button, "mt-3")}>Sign In</Button>
        <p className="mt-4">
          Don't have an account? <a href="">Register Here.</a>
        </p>
        <Button className={cx(styles.button, "mt-3")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-google mx-2"
            viewBox="0 0 16 16"
          >
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
          </svg>
          Login with Google
        </Button>
      </Box>
    </Container>
  );
};
