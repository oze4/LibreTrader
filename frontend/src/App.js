import React from "react";
import { Button, Typography, Paper } from "@mui/material";

import { ColorModeContext } from "./theme";

export default function App() {
  const theme = React.useContext(ColorModeContext);

  return (
    <div>
      <Typography variant="h1">Hello, App!</Typography>
      <Button onClick={theme.toggle}>Toggle Theme</Button>
      <Paper>
        <Typography variant="p">The current mode is {theme.mode} mode</Typography>
      </Paper>
    </div>
  );
}
