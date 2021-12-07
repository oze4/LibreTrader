import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import App from "./App";
import { ColorModeProvider } from './theme'

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <ColorModeProvider>
        <CssBaseline />
        <App />
      </ColorModeProvider>
    </BrowserRouter>
  </StyledEngineProvider>, 
  document.querySelector("#root")
);
