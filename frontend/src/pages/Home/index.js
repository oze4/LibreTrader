import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Button, Grid, Container, useMediaQuery } from "@mui/material";

export default function Home() {
  const isIPadOrSmaller = useMediaQuery((theme) => theme.breakpoints.between("0", "811"));

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
          <Typography variant={isIPadOrSmaller ? "h3" : "h1"}>LibreTrader</Typography>
          <Typography variant={isIPadOrSmaller ? "h5" : "h3"}></Typography>
          <Typography variant={isIPadOrSmaller ? "h6" : "h5"}>
            <i>...more coming soon!</i>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" component={RouterLink} to="/planner">
            Trade Planner
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
