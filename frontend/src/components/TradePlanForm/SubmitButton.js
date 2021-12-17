import React, { useContext } from "react";
import { Button } from "@mui/material";

import { useTradePlanContext } from "./context";

export default function SubmitButton({ onSubmit, title, ButtonProps = {} }) {
  const { state, clearForm, setErrors } = useTradePlanContext();

  const handleSubmit = () => {
    // remove props "zone" and "newsCatalyst" from the object we emit in the "onSubmit" event.
    const { zone, newsCatalyst, ...data } = state;
    const requiredFields = ["symbol", "biggerPicture", "date"];
    const formErrors = requiredFields.reduce((errs, field) => {
      if (!data[field] || data[field] === "") {
        errs[field] = `${field.toUpperCase()} IS REQUIRED`;
        return errs;
      }
    }, {});
  
    setErrors(formErrors);
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
