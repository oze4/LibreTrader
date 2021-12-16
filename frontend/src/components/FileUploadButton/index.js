import React from "react";
import { Button, Tooltip } from "@mui/material";

export default function FileUploadButton(props) {
  const {
    title = undefined,
    InputProps = {},
    ButtonProps = {},
    TooltipProps = {},
    onChange = () => {},
  } = props;

  return (
    <Tooltip {...TooltipProps}>
      <Button component="label" {...ButtonProps}>
        {title}
        <input {...InputProps} onChange={(e) => onChange(e)} hidden />
      </Button>
    </Tooltip>
  );
}
