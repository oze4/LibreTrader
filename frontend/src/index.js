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
      <HashRouter>
        <CssBaseline />
        <App />
      </HashRouter>
    </ColorModeProvider>
  </StyledEngineProvider>,
  document.querySelector("#root"),
);
