import React, { useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { darkMode, lightMode } from "./themes.js";
import ColorModeContext from "./context";

/**
 * @notes
 *  - ColorModeProvider is React context that wraps our app which allows us to easily toggle between dark and light modes.
 *  - 
 */

export default function ColorModeProvider({ children }) {
  const [mode, setMode] = useState(lightMode.palette.type);

  const colorMode = useMemo(
    () => ({
      toggle: () => setMode(handleSetMode),
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

//// INTERNAL FUNCTIONS 

/**
 * @function handleSetMode state handler for color mode
 * @param {String} previousMode 
 * @returns {String} either "light" or "dark". by default "light".
 */
function handleSetMode(previousMode) {
  return previousMode === "light" ? "dark" : "light"
}

/**
 * @function generateTheme wraps mui createTheme call in order to determine color mode.
 * @param {String} mode ("dark"|"light")
 * @returns mui theme. it returns whatever `createTheme` returns.
 */
function generateTheme(mode) {
  return createTheme(mode === "dark" ? darkMode : lightMode);
}