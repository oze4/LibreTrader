import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Button, Grid, Container, useMediaQuery } from "@mui/material";

export default function Home() {
  const isIPadOrSmaller = useMediaQuery((theme) => theme.breakpoints.between("0", "811"));

  const variants = isIPadOrSmaller
    ? {
        title: "h3",
        subheader: "h5",
        message: "h6",
      }
    : {
        title: "h1",
        subheader: "h3",
        message: "h5",
      };

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
          <Typography variant={variants.title}>LibreTrader</Typography>
          <Typography variant={variants.subheader}>Open Source Trading Journal</Typography>
          <Typography variant={variants.message}>
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
