import React, { Fragment, useContext, useRef, useEffect } from "react";
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

export default function Thesis(props) {
  const [state, setState] = useTradePlanContext();
  // This is to keep scroll at the bottom of the element when new news/catalyst is entered.
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [state]);

  const handleBiggerPictureChange = (event) => {
    setState({
      ...state,
      biggerPicture: event.target.value,
    });
    // const c = { ...formData.current };
    // c.biggerPicture = event.target.value;
    // formData.setCurrent(c);
  };

  const handleNewsOrCatalystChange = (event) => {
    setState({
      ...state,
      newsCatalyst: event.target.value,
    });
    // const c = { ...formData.current };
    // c.newsCatalyst = event.target.value;
    // formData.setCurrent(c);
  };

  const handleAddNewsOrCatalyst = () => {
    const newsCatalystToAdd = state.newsCatalyst;
    setState({
      ...state,
      
    })
    // const s = { ...formData.state };
    // s.newsAndCatalysts.push(formData.current.newsCatalyst);
    // formData.setState(s);
    // formData.setCurrent({ ...formData.current, newsCatalyst: "" });
  };

  const handleRemoveNews = (index) => {
    const s = { ...formData.state };
    s.newsAndCatalysts.splice(index, 1);
    formData.setState(s);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} marginTop="1vh">
          <Typography variant="subtitle1">Thesis</Typography>
          <Typography variant="subtitle2">overall market context and conditions</Typography>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12} md={6} container spacing={2}>
            {/* bigger picture */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                onChange={handleBiggerPictureChange}
                label="Summary"
                value={formData.current.biggerPicture}
                placeholder="market context &amp; conditions/bigger picture"
              />
            </Grid>
            {/* add news or catalyst */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                value={formData.current.newsCatalyst}
                onChange={handleNewsOrCatalystChange}
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
          <Grid item xs={12} md={6} container spacing={2}>
            {/* display news and catalysts */}
            <Grid item xs={12}>
              <List
                ref={ref}
                sx={{ maxHeight: "180px", overflow: "scroll" }}
                subheader={
                  <ListSubheader sx={{ textAlign: "center" }}>News &amp; Catalysts</ListSubheader>
                }
              >
                <Divider />
                {formData.state.newsAndCatalysts.map((news, index) => {
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
      </Grid>
    </Fragment>
  );
}
