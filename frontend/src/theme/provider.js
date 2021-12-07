import React, { useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

import { darkMode, lightMode } from "./themes.js";
import ColorModeContext from "./context";

export default function ColorModeProvider({ children }) {
  const [mode, setMode] = useState(lightMode.palette.type);

  const colorMode = useMemo(
    () => ({
      toggle: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => generateTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

function generateTheme(mode) {
  return mode === "dark" ? createTheme(darkMode) : createTheme(lightMode);
}