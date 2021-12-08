import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, List, ListItem, ListItemIcon, ListItemButton, ListItemText } from "@mui/material";

TradePlan.propTypes = {
  newsAndCatalysts: PropTypes.arrayOf(PropTypes.string),
  biggerPicture: PropTypes.string,
  zones: PropTypes.shape({
    supply: PropTypes.arrayOf(
      PropTypes.shape({
        timeframe: PropTypes.string, // (1min,5min,10min, etc...)
        startPrice: PropTypes.string, // start of supply zone
        endPrice: PropTypes.string, // end of supply zone
        screenshots: PropTypes.arrayOf(PropTypes.string), // array of screenshots for this zone.
      })
    ),
    demand: PropTypes.arrayOf(
      PropTypes.shape({
        timeframe: PropTypes.string, // (1min,5min,10min, etc...)
        startPrice: PropTypes.string, // start of supply zone
        endPrice: PropTypes.string, // end of supply zone
        screenshots: PropTypes.arrayOf(PropTypes.string), // array of screenshots for this zone.
      })
    ),
  }),
};

export default function TradePlan(props) {
  const { newsAndCatalysts, biggerPicture } = props;

  const isNewsAndCatalysts = () => newsAndCatalysts && newsAndCatalysts.length;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h2">News and Catalysts</Typography>
        <List>
          {isNewsAndCatalysts() &&
            newsAndCatalysts.map((newscatalyst, index) => {
              return (
                <ListItem>
                  {index + 1}. {newscatalyst}
                </ListItem>
              );
            })}
        </List>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h2">Bigger Picture</Typography>
        <Typography variant="p">{biggerPicture}</Typography>
      </Grid>
    </Grid>
  );
}
