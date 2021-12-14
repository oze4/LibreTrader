import React, { useContext, Fragment } from "react";
import { Grid, Typography, TextField } from "@mui/material";
import { TradePlanContext } from "./context";

export default function GeneralInfo(props) {
  const formData = useContext(TradePlanContext);

  const handleSymbolChange = (event) => {
    const c = { ...formData.current };
    c.symbol = event.target.value;
    formData.setCurrent(c);
  };

  const handleDateChange = (event) => {
    const c = { ...formData.current };
    c.date = event.target.value;
    formData.setCurrent(c);
  };

  return (
    <Fragment>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">General</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth onChange={handleDateChange} label="Date" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth onChange={handleSymbolChange} label="Symbol" placeholder="TSLA" />
        </Grid>
      </Grid>
    </Fragment>
  );
}
