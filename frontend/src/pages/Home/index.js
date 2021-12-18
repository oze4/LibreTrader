import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Typography, Button, Grid, Stack, Container } from "@mui/material";

export default function Home() {
  return (
    <Container fixed sx={{ height: "100vh", width: "100vw" }}>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100%"
        textAlign="center"
      >
        <Grid item xs={12}>
          <Typography variant="h1">LibreTrader</Typography>
          <Typography variant="h5">
            <i>...more coming soon!</i>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="info" component={RouterLink} to="/planner">
            Trade Planner
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
