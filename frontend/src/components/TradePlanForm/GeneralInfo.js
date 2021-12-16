import React, { Fragment } from "react";
import { Grid, Typography, TextField, InputAdornment, IconButton, Tooltip } from "@mui/material";
import { Today as TodayIcon } from "@mui/icons-material";
import { useTradePlanContext } from "./context";

export default function GeneralInfo(props) {
  const { state, setState } = useTradePlanContext();

  const handleSymbolChange = (event) => {
    setState({
      ...state,
      symbol: event.target.value,
    });
  };

  const handleDateChange = (event) => {
    setState({
      ...state,
      date: event.target.value,
    });
  };

  const handleSetDateToToday = () => {
    setState({
      ...state,
      date: new Date(Date.now()).toLocaleDateString(),
    })
  }

  return (
    <Fragment>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">General</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth 
            label="Date"
            onChange={handleDateChange} 
            value={state.date} 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Tooltip title="today">
                    <IconButton color="primary" onClick={handleSetDateToToday}>
                      <TodayIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
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
