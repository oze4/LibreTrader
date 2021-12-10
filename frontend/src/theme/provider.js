import React, { useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

import { darkMode, lightMode } from "./themes.js";
import ColorModeContext from "./context";
import Cookies from "@/utils/cookies";

// ColorModeProvider uses React Context to allow for switching of themes.
export default function ColorModeProvider({ children }) {
  const [mode, setMode] = useState(Cookies.get("colorMode"));

  const colorMode = useMemo(
    () => ({
      toggle: () => setMode(handleSetMode),
      mode,
    }),
    [mode],
  );

  const theme = useMemo(() => generateTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

//// INTERNAL FUNCTIONS

/**
 * @function handleSetMode state handler for color mode
 * @param {String} previousMode
 * @returns {String} either "light" or "dark". by default "light".
 */
function handleSetMode(previousMode) {
  const n = previousMode === "light" ? "dark" : "light";
  // Persist selected theme as cookie
  Cookies.set("colorMode", n, 720);
  return n;
}

/**
 * @function generateTheme wraps mui createTheme call in order to determine color mode.
 * @param {String} mode ("dark"|"light")
 * @returns mui theme. it returns whatever `createTheme` returns.
 */
function generateTheme(mode) {
  return createTheme(mode === "dark" ? darkMode : lightMode);
}
