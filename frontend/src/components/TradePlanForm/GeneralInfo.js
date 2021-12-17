import React, { Fragment, useMemo, useEffect } from "react";
import { Grid, Typography, TextField, InputAdornment, IconButton, Tooltip } from "@mui/material";
import { Today as TodayIcon } from "@mui/icons-material";
import { useTradePlanContext } from "./context";

export default function GeneralInfo(props) {
  const { state, setState, isError, removeFieldError } = useTradePlanContext();

  const getHelperText = (field) =>
    useMemo(() => {
      if (isError(field)) {
        return state.errors[field];
      }
    }, [state.errors]);

  const handleSymbolChange = (event) => {
    setState({
      ...state,
      errors: removeFieldError("symbol"),
      symbol: event.target.value,
    });
  };

  const handleDateChange = (event) => {
    setState({
      ...state,
      errors: removeFieldError("date"),
      date: event.target.value,
    });
  };

  const handleSetDateToToday = () => {
    setState({
      ...state,
      errors: removeFieldError("date"),
      date: new Date(Date.now()).toLocaleDateString(),
    });
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
            label="Date"
            onChange={handleDateChange}
            value={state.date}
            error={isError("date")}
            helperText={getHelperText("date")}
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
            error={isError("symbol")}
            helperText={getHelperText("symbol")}
            label="Symbol"
            placeholder="TSLA"
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}
