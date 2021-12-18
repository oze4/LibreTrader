import React, { Fragment, useRef, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

import { useTradePlanContext } from "./context";

export default function NewsAndCatalysts(props) {
  const { state, setState, isError, removeFieldError } = useTradePlanContext();
  // This is to keep scroll at the bottom of the element when new news/catalyst is entered.
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [state]);

  const handleNewsOrCatalystKeyUp = (event) => {
    // Allow for the user to add news/catalyst to list
    // by pressing the Enter button.
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddNewsOrCatalyst();
    }
  };

  const handleNewsOrCatalystChange = (event) => {
    setState({
      ...state,
      newsCatalyst: event.target.value,
    });
  };

  const handleAddNewsOrCatalyst = () => {
    const newsCatalystToAdd = state.newsCatalyst;
    const currentNewsAndCatalysts = [...state.newsAndCatalysts];
    currentNewsAndCatalysts.push(newsCatalystToAdd);
    setState({
      ...state,
      newsCatalyst: "",
      newsAndCatalysts: currentNewsAndCatalysts,
    });
  };

  const handleRemoveNews = (index) => {
    const currentNewsAndCatalysts = [...state.newsAndCatalysts];
    currentNewsAndCatalysts.splice(index, 1);
    setState({
      ...state,
      newsAndCatalysts: currentNewsAndCatalysts,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">News &amp; Catalysts</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={state.newsCatalyst}
            onChange={handleNewsOrCatalystChange}
            onKeyUp={handleNewsOrCatalystKeyUp}
            label="News or Catalyst"
            placeholder="add news or catalyst, if any"
            InputProps={{
              endAdornment: (
                <Tooltip title="add news/catalyst">
                  <IconButton color="primary" onClick={handleAddNewsOrCatalyst}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid item xs={12}>
          <List
            ref={ref}
            sx={{ minHeight: "160px", maxHeight: "160px", overflow: "scroll" }}
            subheader={
              <ListSubheader sx={{ textAlign: "center" }}>News &amp; Catalysts</ListSubheader>
            }
          >
            <Divider />
            {state.newsAndCatalysts &&
              state.newsAndCatalysts.length > 0 &&
              state.newsAndCatalysts.map((news, index) => {
                return (
                  <Fragment key={"" + news.length + index}>
                    <Divider />
                    <ListItem
                      secondaryAction={
                        <Tooltip arrow title="remove">
                          <IconButton
                            color="primary"
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
        </Grid>
      </Grid>
    </Grid>
  );
}
