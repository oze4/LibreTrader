import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";

import App from "@/App";
import { ColorModeProvider } from "@/theme";

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ColorModeProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ColorModeProvider>
  </StyledEngineProvider>,
  document.querySelector("#root"),
);
