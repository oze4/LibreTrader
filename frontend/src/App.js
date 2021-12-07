import React from "react";
import { Container, Button, Typography, Paper } from "@mui/material";

import { ColorModeContext } from "./theme";

import { Topbar } from "./components";

export default function App() {
  const theme = React.useContext(ColorModeContext);

  return (
    <>
      <Topbar />
      <Container fluid>
        <Typography variant="h1">Hello, App!</Typography>
        <Button variant="contained" onClick={theme.toggle}>
          Toggle Theme
        </Button>
      </Container>
    </>
  );
}
