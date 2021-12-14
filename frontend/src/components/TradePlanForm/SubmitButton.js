import React, { useContext } from "react";
import { Button } from "@mui/material";

import { TradePlanContext } from "./context";

export default function SubmitButton({ onSubmit, title }) {
  const { state } = useContext(TradePlanContext);

  return (
    <Button
      variant="contained"
      size="large"
      sx={{ padding: "1.5rem" }}
      onClick={() => onSubmit(state)}
    >
      {title}
    </Button>
  );
}
