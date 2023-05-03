import * as React from "react";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import logo from "../assets/jamsessions-logo/png/logo-no-background.png";
import styles from "./login.module.css";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

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
        <Input className="mt-5" variant="soft" placeholder="Email" />
        <Input className="mt-1" variant="soft" placeholder="Password" />
        <Button className="mt-2">Sign In</Button>
      </Box>
    </Container>
  );
};
