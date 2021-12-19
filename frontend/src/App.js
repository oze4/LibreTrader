import React from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import AppRouter from "@/router";
import { Topbar } from "@/components";

export default function App() {
  return (
    <BrowserRouter basename="/">
      <CssBaseline />
      <Topbar />
      <AppRouter />
    </BrowserRouter>
  );
}
