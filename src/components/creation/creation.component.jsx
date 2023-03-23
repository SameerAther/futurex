import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./creation.styles.css";
import { useNavigate } from "react-router-dom";

import { signOutUser } from "../../utils/firebase.utils";

export const CreateEmployee = () => {
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      await signOutUser();
      navigate("/");
    } catch (e) {
      alert("Something went wrong. Please try again");
      console.log(e);
    }
  };

  return (
    <Stack spacing={2} direction="row" className="buttonstack">
      <Button variant="outlined" onClick={signOut}>
        Logout
      </Button>
    </Stack>
  );
};
