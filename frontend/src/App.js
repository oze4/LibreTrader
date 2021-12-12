import React, { Fragment } from "react";
import { Container } from "@mui/material";

import AppRouter from "@/router";
import { Topbar } from "@/components";

export default function App() {
  return (
    <Fragment>
      <Topbar />
      <Container fluid="true" sx={{ marginTop: "5rem" }}>
        <AppRouter />
      </Container>
    </Fragment>
  );
}
