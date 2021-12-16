import React, { useContext, Fragment } from "react";
import { Grid, Typography, TextField } from "@mui/material";
import { useTradePlanContext } from "./context";

export default function GeneralInfo(props) {
  const [state, setState] = useTradePlanContext();

  const handleSymbolChange = (event) => {
    setState({
      ...state,
      symbol: event.target.value,
    });
    // const c = { ...formData.current };
    // c.symbol = event.target.value;
    // formData.setCurrent(c);
  };

  const handleDateChange = (event) => {
    setState({
      ...state,
      date: event.target.value,
    })
    // const c = { ...formData.current };
    // c.date = event.target.value;
    // formData.setCurrent(c);
  };

  return (
    <Fragment>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">General</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            onChange={handleDateChange}
            value={state.date}
            label="Date"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            onChange={handleSymbolChange}
            value={state.symbol}
            label="Symbol"
            placeholder="TSLA"
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}
