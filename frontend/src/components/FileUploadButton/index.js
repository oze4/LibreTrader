import React from "react";
import { Button } from "@mui/material";

export default function FileUploadButton(props) {
  const {
    buttonText = "File Upload",
    inputProps = {},
    buttonProps = {},
    onChange = () => {},
  } = props;

  return (
    <Button component="label" {...buttonProps}>
      {buttonText}
      <input {...inputProps} onChange={(e) => onChange(e)} hidden />
    </Button>
  );
}
