import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";

import App from "@/App";
import { ColorModeProvider } from "@/theme";

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ColorModeProvider>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ColorModeProvider>
  </StyledEngineProvider>,
  document.querySelector("#root"),
);
