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
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, AddAPhotoOutlined as AddAPhotoOutlinedIcon } from "@mui/icons-material";

import { FileUploadButton } from "@/components";

export default function TradePlan({ onSubmit }) {
  // This is to keep scroll at the bottom of the element when new news/catalyst is entered.
  const newsAndCatalystsListRef = useRef(null);
  // Currently entered form data state
  const [newsCatalyst, setNewsCatalyst] = useState("");
  const [zoneType, setZoneType] = useState("");
  const [zoneStart, setZoneStart] = useState("");
  const [zoneEnd, setZoneEnd] = useState("");
  const [zoneScreenshots, setZoneScreenshots] = useState([]);
  // State that is passed to `onSubmit(state)`
  const [state, setState] = useState({
    biggerPicture: "",
    date: Date.now(),
    symbol: "",
    zones: {
      supply: [],
      demand: [],
    },
    newsAndCatalysts: [],
  });

  // When a new news or catalyst is added, scroll to bottom of list element.
  useEffect(() => {
    const el = newsAndCatalystsListRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [newsCatalyst]);

  const handleAddNewsOrCatalyst = () => {
    if (newsCatalyst) {
      const c = { ...state };
      c.newsAndCatalysts.push(newsCatalyst);
      // Since we added the currently typed news/catalyst we need to clear the text field
      setNewsCatalyst("");
      setState(c);
    }
  };

  const handleAddZone = () => {
    if (zoneStart && zoneEnd && zoneType) {
    }
  };

  const handleRemoveNews = (index) => {
    const c = { ...state };
    c.newsAndCatalysts.splice(index, 1);
    setState(c);
  };

  return (
    <>
      <Typography variant="h3">Trade Planner</Typography>

      {/**
       * GENERAL INFO
       */}
      <Grid container spacing={2} marginTop="3vh">
        <Grid item xs={12}>
          <Typography variant="subtitle1">General</Typography>
        </Grid>
        {/* DATE */}
        <Grid item xs={12} md={6}>
          <TextField fullWidth onChange={(e) => handleTextFieldChange(e, "date")} label="Date" />
        </Grid>
        {/* TICKER SYMBOL */}
        <Grid item xs={12} md={6}>
          <TextField fullWidth onChange={(e) => handleTextFieldChange(e, "symbol")} label="Symbol" placeholder="TSLA" />
        </Grid>
        {/* END GENERAL INFO */}

        {/**
         * THESIS
         */}
        <Grid item xs={12} marginTop="1vh">
          <Typography variant="subtitle1">Thesis</Typography>
          <Typography variant="subtitle2">overall market context and conditions</Typography>
        </Grid>
        {/* bigger picture */}
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
        {/* add news or catalyst */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            multiline
            rows={2}
            value={newsCatalyst}
            onChange={(e) => setNewsCatalyst(e.target.value)}
            label="News or Catalysts"
            placeholder="add news or catalyst, if any"
            InputProps={{
              endAdornment: (
                <IconButton color="primary" onClick={handleAddNewsOrCatalyst}>
                  <AddIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
        {/* display news and catalysts */}
        <Grid item xs={12} md={6}>
          <Paper
            ref={newsAndCatalystsListRef}
            elevation={1}
            sx={{ minHeight: "200px", maxHeight: "200px", overflow: "auto" }}
          >
            <List subheader={<ListSubheader>News and Catalysts:</ListSubheader>}>
              <Divider />
              {state.newsAndCatalysts.map((news, index) => {
                return (
                  <Fragment key={"" + news.length + index}>
                    <Divider />
                    <ListItem
                      secondaryAction={
                        <Tooltip arrow title="remove">
                          <IconButton color="primary" edge="end" onClick={() => handleRemoveNews(index)}>
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
        {/* END THESIS */}

        {/**
         * SUPPLY AND DEMAND ZONES
         */}
        {/* add supply or demand zone */}
        <Grid item xs={12} marginTop="1vh">
          <Typography variant="subtitle1">Imbalance</Typography>
          <Typography variant="subtitle2">supply &amp; demand zones aid in determining market imbalance</Typography>
        </Grid>
        <Grid item xs={12} md={2} container>
          <ToggleButtonGroup
            fullWidth
            color={zoneType === "supply" ? "error" : "success"}
            value={zoneType}
            exclusive
            onChange={(_, selected) => setZoneType(selected)}
          >
            <ToggleButton value="supply">Supply</ToggleButton>
            <ToggleButton value="demand">Demand</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            fullWidth
            value={zoneStart}
            onChange={(e) => setZoneStart(e.target.value)}
            label="Zone Start"
            placeholder="zone start price"
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            fullWidth
            value={zoneEnd}
            onChange={(e) => setZoneEnd(e.target.value)}
            label="Zone End"
            placeholder="zone end price"
          />
        </Grid>
        <Grid item xs={6} md={2} container>
          <FileUploadButton
            title="ADD IMAGE"
            ButtonProps={{
              fullWidth: true,
              variant: "text",
              size: "small",
              color: "inherit",
              startIcon: <AddAPhotoOutlinedIcon />,
            }}
            InputProps={{
              accept: "image/png, image/jpeg",
              type: "file",
            }}
            onChange={(e) => console.log(e)}
          />
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <Grid item>
            <Button color="inherit" variant="outlined" fullWidth startIcon={<AddIcon />}>
              ADD TO ZONES
            </Button>
          </Grid>
        </Grid>
        {/* END SUPPLY AND DEMAND ZONES */}

        <Grid item xs={12} marginTop="7vh" container justifyContent="flex-end">
          <Button variant="contained" size="large" sx={{ padding: "1.5rem" }} onClick={() => onSubmit(state)}>
            ADD TO TRADE PLAN
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
