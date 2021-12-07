import React from "react";
import { Container, Typography } from "@mui/material";

import { ColorModeContext } from "./theme";

import { Topbar } from "./components";

export default function App() {
  const theme = React.useContext(ColorModeContext);

  return (
    <>
      <Topbar />
      <Container fluid>
        <Typography variant="h1">Hello, App!</Typography>
      </Container>
    </>
  );
}
