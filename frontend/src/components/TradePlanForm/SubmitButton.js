import React, { useContext } from "react";
import { Button } from "@mui/material";

import { useTradePlanContext } from "./context";

export default function SubmitButton({ onSubmit, title, ButtonProps = {} }) {
  const { state, clearForm, setState } = useTradePlanContext();

  const handleSubmit = () => {
    // remove props "zone" and "newsCatalyst" from the object we emit in the "onSubmit" event.
    const { zone, newsCatalyst, ...data } = state;
    const requiredFields = ["symbol", "summary", "date"];
    const formErrors = requiredFields.reduce(
      (errs, field) => {
        if (!data[field] || data[field] === "") errs[field] = `REQUIRED FIELD`;
        return errs;
      },
      { ...state.errors },
    );

    setState({ errors: formErrors });

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    onSubmit(data);
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
