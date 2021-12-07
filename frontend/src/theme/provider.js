import React, { useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

import { darkMode, lightMode } from "./colorModes.js";
import ColorModeContext from './context';

export default function ColorModeProvider({ children }) {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggle: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode
    }),
    [mode],
  );

  const theme = useMemo(
    () => {
      if (mode === "dark") return createTheme(darkMode);
      return createTheme(lightMode);
    },
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}