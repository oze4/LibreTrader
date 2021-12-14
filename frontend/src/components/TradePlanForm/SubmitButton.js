import React, { useContext } from "react";
import { Button } from "@mui/material";

import { TradePlanContext } from "./context";

export default function SubmitButton({ onSubmit, title, ButtonProps = {} }) {
  const formData = useContext(TradePlanContext);

  const handleSubmit = (_event) => {
    onSubmit({
      ...formData.state,
      symbol: formData.current.symbol,
      date: formData.current.date,
      biggerPicture: formData.current.biggerPicture,
    });
    formData.clearFormData();
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
