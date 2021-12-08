import React, { useState } from "react";
import { Typography, Grid, Paper } from "@mui/material";

export default function Planner() {
  const [date, setDate] = useState(undefined);
  return (
    <Grid container>
      <Typography variant="h1" textAlign="center">
        Trade Plan {date ? date : null}
      </Typography>
      <Grid item xs={12} marginTop={5}>
        <Paper sx={{ minHeight: "70vh" }}>Helllllo</Paper>
      </Grid>
    </Grid>
  )
}
