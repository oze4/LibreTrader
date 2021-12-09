import React, { useState, Fragment } from "react";
import { Grid, Typography, InputAdornment, TextField, IconButton, List, ListItem, ListItemText, ListSubheader, Box, Paper, Divider } from "@mui/material";
import { Add as AddIcon, IndeterminateCheckBox } from "@mui/icons-material";

const TextFieldFilled = (props) => <TextField {...props} color="secondary" variant="filled" />;

export default function TradePlan() {
  const [currentNewsCatalyst, setCurrentNewsCatalyst] = useState(undefined);
  const [state, setState] = useState({
    biggerPicture: "",
    date: Date.now(),
    symbol: "",
    newsAndCatalysts: [],
  });

  const handleAddNewsOrCatalyst = () => {
    const c = { ...state };
    c.newsAndCatalysts.push(currentNewsCatalyst);
    setCurrentNewsCatalyst("");
    setState(c);
  };

  const handleTextFieldChange = (event, propertyName) => {
    const c = { ...state };
    c[propertyName] = event.target.value;
    setState(c);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2} marginTop="3vh">
      {/* DATE */}
      <Grid item xs={12} md={6}>
        <TextField fullWidth onChange={(e) => handleTextFieldChange(e, "date")} label="Date" />
      </Grid>

      {/* TICKER SYMBOL */}
      <Grid item xs={12} md={6}>
        <TextField fullWidth onChange={(e) => handleTextFieldChange(e, "symbol")} label="Symbol" placeholder="TSLA" />
      </Grid>

      {/* NEWS AND CATALYSTS */}
      <Grid item xs={12} marginTop="4vh">
        <TextField
          fullWidth
          multiline
          rows={2}
          value={currentNewsCatalyst}
          onChange={(e) => setCurrentNewsCatalyst(e.target.value)}
          label="News/Catalyst"
          helperText="add news or catalyst, if any"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={(e) => {
                    handleAddNewsOrCatalyst();
                    console.log(state, currentNewsCatalyst);
                  }}
                >
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={10}>
        <Paper elevation={1}>
          <List subheader={<ListSubheader>News and Catalysts</ListSubheader>}>
            <Divider />
            <ListItem>
              <ListItemText primary="Joe Mama" />
            </ListItem>
            {state.newsAndCatalysts.map((news, index) => {
              return (
                <Fragment key={"" + news.length + index}>
                  <Divider />
                  <ListItem>
                    <ListItemText primary={news} secondary={"" + news.length + index}/>
                  </ListItem>
                </Fragment>
              );
            })}
          </List>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1">Bigger Picture</Typography>
        <Typography variant="p">{state.biggerPicture ?? state.biggerPicture}</Typography>
      </Grid>
    </Grid>
  );
}
