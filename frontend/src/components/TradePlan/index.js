import React, { useState } from "react";
import {
  Grid,
  Typography,
  InputAdornment,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const TextFieldFilled = (props) => (
  <TextField {...props} color="secondary" variant="filled" />
);

export default function TradePlan() {
  const [state, setState] = useState({
    biggerPicture: "",
    date: Date.now(),
    symbol: "",
    newsAndCatalysts: [],
  });

  const isNewsAndCatalysts = () => newsAndCatalysts && newsAndCatalysts.length;

  const handleNewsAndCatalystsChange = (event = () => {
    const c = [...state];
    c.newsAndCatalysts.push(event.target.value);
    setState(c);
  });

  const handleTextFieldChange = (event, propertyName) => {
    const c = [...state];
    c[propertyName] = event.target.value;
    setState(c);
  };

  return (
    <>
      <Grid container spacing={2} margin="3vh 0">
        {/* DATE */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            onChange={(e) => handleTextFieldChange(e, "date")}
            label="Date"
          />
        </Grid>

        {/* TICKER SYMBOL */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            onChange={(e) => handleTextFieldChange(e, "symbol")}
            label="Symbol"
            placeholder="TSLA"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center">
        {/* NEWS AND CATALYSTS */}
        <Grid item xs={6}>
          <TextField
            fullWidth
            onChange={handleNewsAndCatalystsChange}
            label="News/Catalyst"
            helperText="add news or catalyst, if any"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <Box
            sx={{
              bgcolor: "background.paper",
              borderColor: "background.paper",
            }}
          >
            <List>
              <ListItem>
                <ListItemText primary="Joe Mama" />
              </ListItem>
              <ListItem />
            </List>
          </Box>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1">Bigger Picture</Typography>
        <Typography variant="p">
          {state.biggerPicture ?? state.biggerPicture}
        </Typography>
      </Grid>
    </>
  );
}
