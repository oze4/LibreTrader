import React, { useState, useRef, Fragment, useEffect } from "react";
import {
  Grid,
  InputAdornment,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Paper,
  Divider,
  Button,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

export default function TradePlan({ onSubmit }) {
  const newsRef = useRef(null);
  const [currentNewsCatalyst, setCurrentNewsCatalyst] = useState(undefined);
  const [state, setState] = useState({
    biggerPicture: "",
    date: Date.now(),
    symbol: "",
    newsAndCatalysts: [],
  });

  useEffect(() => {
    const newsRefEl = newsRef.current;
    if (newsRefEl) {
      newsRefEl.scrollTop = newsRefEl.scrollHeight;
    }
  }, [currentNewsCatalyst]);

  const handleAddNewsOrCatalyst = () => {
    if (currentNewsCatalyst) {
      const c = { ...state };
      c.newsAndCatalysts.push(currentNewsCatalyst);
      setCurrentNewsCatalyst("");
      setState(c);
    }
  };

  const handleTextFieldChange = (event, propertyName) => {
    const c = { ...state };
    c[propertyName] = event.target.value;
    setState(c);
  };

  const handleRemoveNews = (index) => {
    const c = { ...state };
    c.newsAndCatalysts.splice(index, 1);
    setState(c);
  };

  return (
    <>
      <Typography variant="h3">Trade Planner</Typography>
      <Grid container spacing={2} marginTop="3vh">
        <Grid item xs={12}>
          <Typography variant="subtitle1">General</Typography>
        </Grid>

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

        <Grid item xs={12} marginTop="1vh">
          <Typography variant="subtitle1">Context</Typography>
        </Grid>

        {/* MARKET CONTEXT/BIGGER PICTURE */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            onChange={(e) => handleTextFieldChange(e, "biggerPicture")}
            label="Bigger Picture"
            placeholder="market context/bigger picture"
          />
        </Grid>

        {/* NEWS AND CATALYSTS */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            multiline
            rows={2}
            value={currentNewsCatalyst}
            onChange={(e) => setCurrentNewsCatalyst(e.target.value)}
            label="News or Catalysts"
            placeholder="add news or catalyst, if any"
            InputProps={{
              endAdornment: (
                <IconButton color="inherit" onClick={handleAddNewsOrCatalyst}>
                  <AddIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
        {/* DISPLAY NEWS AND CATALYSTS */}
        <Grid item xs={12} md={6}>
          <Paper
            ref={newsRef}
            elevation={1}
            sx={{ maxHeight: "300px", overflow: "auto" }}
          >
            <List
              subheader={<ListSubheader>News and Catalysts:</ListSubheader>}
            >
              <Divider />
              {state.newsAndCatalysts.map((news, index) => {
                return (
                  <Fragment key={"" + news.length + index}>
                    <Divider />
                    <ListItem
                      secondaryAction={
                        <Tooltip arrow title="remove">
                          <IconButton
                            color="inherit"
                            edge="end"
                            onClick={() => handleRemoveNews(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      }
                    >
                      <ListItemText primary={news} />
                    </ListItem>
                  </Fragment>
                );
              })}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} marginTop="1vh">
          <Typography variant="subtitle1">Supply and Demand Zones</Typography>
        </Grid>

        <Grid item xs={12} marginTop="2vh">
          <Button onClick={() => onSubmit(state)}>Add Trade Plan</Button>
        </Grid>
      </Grid>
    </>
  );
}
