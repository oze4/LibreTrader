import React, { useContext } from "react";
import { Button } from "@mui/material";

import { useTradePlanContext } from "./context";

export default function SubmitButton({ onSubmit, title, ButtonProps = {} }) {
  const { state, clearForm, setState } = useTradePlanContext();

  const handleSubmit = () => {
    // remove props "zone" and "newsCatalyst" from the object we emit in the "onSubmit" event.
    const { zone, newsCatalyst, ...data } = state;
    // If required field is empty add an error to error object for it
    const requiredFields = ["symbol", "summary", "date"];
    const errObj = {
      errors: requiredFields.reduce(
        (errs, field) => {
          if (!data[field] || data[field] === "") errs[field] = `REQUIRED FIELD`;
          return errs;
        },
        { ...state.errors },
      ),
    };
    setState(errObj);
    if (Object.keys(errObj.errors).length > 0) {
      return;
    }
    // If required fields are ok we trigger onSubmit event
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
