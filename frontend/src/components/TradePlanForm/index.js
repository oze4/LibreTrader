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
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  AddAPhotoOutlined as AddAPhotoOutlinedIcon,
} from "@mui/icons-material";
import styled from "@emotion/styled";

import { FileUploadButton } from "@/components";

const Section = styled(Paper, (props) => ({ ...props }))`
  padding: 1rem;
  margin: 1rem 0;
`;

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
      <Section>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">General</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth onChange={(e) => handleTextFieldChange(e, "date")} label="Date" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              onChange={(e) => handleTextFieldChange(e, "symbol")}
              label="Symbol"
              placeholder="TSLA"
            />
          </Grid>
        </Grid>
      </Section>
      {/* END GENERAL INFO */}

      {/**
       * THESIS
       */}
      <Section>
        <Grid container spacing={2}>
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
              label="Summary"
              placeholder="market context &amp; conditions/bigger picture"
            />
          </Grid>
          {/* add news or catalyst */}
          <Grid item xs={12} md={6}>
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
          {/* display news and catalysts */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              ref={newsAndCatalystsListRef}
              sx={{ minHeight: "130px", maxHeight: "200px", overflow: "auto" }}
            >
              <List
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
            </Paper>
          </Grid>
        </Grid>
      </Section>
      {/* END THESIS */}

      {/**
       * SUPPLY AND DEMAND ZONES
       */}
      <Section>
        <Grid container spacing={2}>
          <Grid item xs={12} marginTop="1vh">
            <Typography variant="subtitle1">Imbalance</Typography>
            <Typography variant="subtitle2">add supply and demand zones below</Typography>
          </Grid>
          {/* add supply or demand zone */}
          <Grid item xs={12} md={6} container spacing={2}>
            <Grid item xs={6}>
              <ToggleButtonGroup
                color={zoneType === "supply" ? "error" : "success"}
                value={zoneType}
                exclusive
                onChange={(_, selected) => setZoneType(selected)}
              >
                <ToggleButton value="supply">Supply</ToggleButton>
                <ToggleButton value="demand">Demand</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={6}>
              <FileUploadButton
                title="add image"
                ButtonProps={{
                  variant: "text",
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
            <Grid item xs={6}>
              <TextField
                fullWidth
                value={zoneStart}
                onChange={(e) => setZoneStart(e.target.value)}
                label="Zone Start"
                placeholder="zone start price"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                value={zoneEnd}
                onChange={(e) => setZoneEnd(e.target.value)}
                label="Zone End"
                placeholder="zone end price"
              />
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Grid item>
                <Button color="inherit" variant="outlined" fullWidth startIcon={<AddIcon />}>
                  ADD TO ZONES
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} container spacing={2}>
            <Grid item xs={12}>
              <List subheader={<ListSubheader sx={{ textAlign: "center" }}>Images</ListSubheader>}>
                <Divider />
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Section>
      {/* END SUPPLY AND DEMAND ZONES */}
      <Grid item xs={12} justifyContent="flex-end">
        <Button
          variant="contained"
          size="large"
          sx={{ padding: "1.5rem" }}
          onClick={() => onSubmit(state)}
        >
          ADD TO TRADE PLAN
        </Button>
      </Grid>
    </>
  );
}
