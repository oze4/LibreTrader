import React from "react";
import { Button } from "@mui/material";

export default function FileUploadButton(props) {
    const { title = undefined, InputProps = {}, ButtonProps = {}, onChange = () => {} } = props;

    return (
        <Button component="label" {...ButtonProps}>
            {title}
            <input {...InputProps} onChange={(e) => onChange(e)} hidden />
        </Button>
    );
}
