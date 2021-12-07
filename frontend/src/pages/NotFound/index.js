import React from "react";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";

const TypographyCentered = styled(Typography, (props) => ({ ...props }))`
  text-align: center;
`;

export default function NotFound() {
  return (
    <TypographyCentered variant="h1">
      🔎 Unable to find that 🔎
    </TypographyCentered>
  );
}
