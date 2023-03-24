import React from "react";
import Button from "@mui/material/Button";
import { signInWithGooglePopup } from "../../utils/firebase.utils";

export const LoginForm = ({ handleLogin }) => {
  const signInWithPopup = () => {
    signInWithGooglePopup()
      .then((result) => {
        handleLogin(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Button variant="contained" color="primary" onClick={signInWithPopup}>
      Sign In With Google
    </Button>
  );
};
