import React, { Fragment, useContext } from "react";
import { Container, Typography } from "@mui/material";
import { ColorModeContext } from "./theme";
import { Topbar } from "./components";

export default function App() {
  const theme = useContext(ColorModeContext);

  return (
    <Fragment>
      <Topbar />
      <Container fluid>
        <Typography variant="h1">Hello, App!</Typography>
      </Container>
    </Fragment>
  );
}
