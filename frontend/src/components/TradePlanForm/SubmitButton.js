import React, { useContext } from "react";
import { Button } from "@mui/material";

import { useTradePlanContext } from "./context";

export default function SubmitButton({ onSubmit, title, ButtonProps = {} }) {
  const { state, clearForm } = useTradePlanContext();

  const handleSubmit = () => {
    // remove props "zone" and "newsCatalyst" from the object we emit in the "onSubmit" event.
    const { zone, newsCatalyst, ...stateToEmit } = state;
    onSubmit({ ...stateToEmit });
    clearForm();
  };

  return (
    <Button
      {...ButtonProps}
      variant="contained"
      size="large"
      sx={{ padding: "1.5rem" }}
      onClick={handleSubmit}
    >
      {title}
    </Button>
  );
}
