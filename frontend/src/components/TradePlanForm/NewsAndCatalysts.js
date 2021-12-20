import React, { Fragment, useRef, useEffect, useState } from "react";
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
  const { state, setState } = useTradePlanContext();
  const [formError, setFormError] = useState(false);
  // This is to keep scroll at the bottom of the element when new news/catalyst is entered.
  const addedNewsCatalystRef = useRef(null);
  const newsCatalystInputRef = useRef(null);

  useEffect(() => {
    const el = addedNewsCatalystRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [state.newsAndCatalysts]);

  const handleNewsOrCatalystKeyUp = (event) => {
    // Allow for the user to add news/catalyst to list
    // by pressing the Enter button.
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddNewsOrCatalyst();
    }
  };

  const handleNewsOrCatalystChange = (event) => {
    if (formError) {
      // If error, remove it once user begins typing
      setFormError(false);
    }
    setState({ ...state, newsCatalyst: event.target.value });
  };

  const handleAddNewsOrCatalyst = () => {
    const newsCatalystToAdd = state.newsCatalyst;
    // do nothing if we have nothing to add
    if (!newsCatalystToAdd || newsCatalystToAdd === "") {
      setFormError(true);
      return;
    }
    setState({
      ...state,
      newsCatalyst: "",
      newsAndCatalysts: [...state.newsAndCatalysts, newsCatalystToAdd],
    });
    // Focus on input after adding
    if (newsCatalystInputRef.current) {
      newsCatalystInputRef.current.focus();
    }
  };

  const handleRemoveNews = (index) => {
    state.newsAndCatalysts.splice(index, 1);
    setState({ ...state, newsAndCatalysts: [...state.newsAndCatalysts] });
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
            error={formError}
            helperText={formError && "REQUIRED FIELD"}
            value={state.newsCatalyst}
            onChange={handleNewsOrCatalystChange}
            onKeyUp={handleNewsOrCatalystKeyUp}
            label="News or Catalyst"
            placeholder="add news or catalyst, if any"
            inputRef={newsCatalystInputRef}
            InputProps={{
              endAdornment: (
                <Tooltip title="add news/catalyst">
                  <IconButton
                    sx={{ boxShadow: 1 }}
                    color="primary"
                    onClick={handleAddNewsOrCatalyst}
                  >
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
            ref={addedNewsCatalystRef}
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
