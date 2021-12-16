import React, { useContext } from "react";
import { Button } from "@mui/material";

import { useTradePlanContext } from "./context";

export default function SubmitButton({ onSubmit, title, ButtonProps = {} }) {
  const { state, clearForm } = useTradePlanContext();

  const handleSubmit = (_event) => {
    onSubmit({ ...state });
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
