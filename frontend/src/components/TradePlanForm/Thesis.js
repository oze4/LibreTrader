import React, { Fragment } from "react";
import {
  Grid,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

export default function Thesis(props) {
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
                onChange={(e) => handleTextFieldChange(e, "biggerPicture")}
                label="Summary"
                placeholder="market context &amp; conditions/bigger picture"
              />
            </Grid>
            {/* add news or catalyst */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                value={newsCatalyst}
                onChange={(e) => setNewsCatalyst(e.target.value)}
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
                ref={newsAndCatalystsListRef}
                sx={{ maxHeight: "180px", overflow: "scroll" }}
                subheader={
                  <ListSubheader sx={{ textAlign: "center" }}>News &amp; Catalysts</ListSubheader>
                }
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
