import React, { Fragment, useContext } from "react";
import { Container } from "@mui/material";

import AppRouter from "./router";
import { ColorModeContext } from "./theme";
import { Topbar } from "@/components";

export default function App() {
  const theme = useContext(ColorModeContext);

  return (
    <Fragment>
      <Topbar />
      <Container fluid="true">
        <AppRouter />
      </Container>
    </Fragment>
  );
}
