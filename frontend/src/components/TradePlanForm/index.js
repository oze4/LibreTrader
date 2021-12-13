import React, { useState, useRef, Fragment, useEffect } from "react";
import {
  Grid,
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
  ImageList,
  ImageListItem,
  Box,
  Link,
  Chip,
  ImageListItemBar,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  AddAPhotoOutlined as AddAPhotoOutlinedIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import styled from "@emotion/styled";

import { FileUploadButton, SimpleTable } from "@/components";
import GeneralInfo from "./GeneralInfo";
import Thesis from "./Thesis";

const Section = styled(Paper, (props) => ({ ...props }))`
  padding: 1rem;
  margin: 1rem 0;
`;

export default function TradePlan({ onSubmit }) {
  // This is to keep scroll at the bottom of the element when new news/catalyst is entered.
  const newsAndCatalystsListRef = useRef(null);
  const formBoxRef = useRef(null);

  // Currently entered form data state
  // const [newsCatalyst, setNewsCatalyst] = useState("");
  // const [zoneType, setZoneType] = useState("");
  // const [zoneStart, setZoneStart] = useState("");
  // const [zoneTimeFrame, setZoneTimeFrame] = useState("");
  // const [zoneEnd, setZoneEnd] = useState("");
  // const [zoneScreenshots, setZoneScreenshots] = useState([]);

  // State that is passed to `onSubmit(state)`
  // const [state, setState] = useState({
  //   biggerPicture: "",
  //   date: Date.now(),
  //   symbol: "",
  //   // a zone has the following shape:
  //   //// { type: ("supply"|"demand"), timeFrame: String, start: String, end: String, images: [String] }
  //   zones: [],
  //   newsAndCatalysts: [],
  // });

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
      setState(() => {
        // Since we added the currently typed news/catalyst we need to clear the text field
        setNewsCatalyst("");
        return c;
      });
    }
  };

  const handleRemoveZone = (_event, zoneIndex) => {
    const c = { ...state };
    c.zones.splice(zoneIndex, 1);
    setState(c);
  };

  const handleZoneImageUpload = (event) => {
    const file = event.target.files[0];
    const uploadedImage = {
      name: file.name,
      blob: URL.createObjectURL(file),
    };
    const c = [...zoneScreenshots];
    c.push(uploadedImage);
    setZoneScreenshots(c);
  };

  const handleRemoveZoneScreenshot = (index) => {
    const c = [...zoneScreenshots];
    c.splice(index, 1);
    setZoneScreenshots(c);
  };

  const handleAddZone = () => {
    const zone = {
      type: zoneType,
      timeFrame: zoneTimeFrame,
      start: zoneStart,
      end: zoneEnd,
      images: zoneScreenshots,
    };
    const c = { ...state };
    c.zones.push(zone);
    setState(() => {
      clearZoneInput();
      return c;
    });
  };

  const handleRemoveNews = (index) => {
    const c = { ...state };
    c.newsAndCatalysts.splice(index, 1);
    setState(c);
  };

  const clearZoneInput = () => {
    setZoneType(null);
    setZoneStart("");
    setZoneEnd("");
    setZoneTimeFrame("");
    setZoneScreenshots([]);
  };

  return (
    <Fragment>
      <Typography variant="h3">Trade Planner</Typography>
      <Box ref={formBoxRef} sx={{ maxHeight: "75vh", overflow: "scroll" }}>
        {/**
         * GENERAL INFO
         */}
         <Section>
           <GeneralInfo />
         </Section>
         {/*
        <Section>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">General</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                onChange={(e) => handleTextFieldChange(e, "date")}
                label="Date"
              />
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
         */}
        {/* END GENERAL INFO */}

        {/**
         * THESIS
         */}
         <Section>
           <Thesis />
         </Section>
         {/*
        <Section>
          <Grid container spacing={2}>
            <Grid item xs={12} marginTop="1vh">
              <Typography variant="subtitle1">Thesis</Typography>
              <Typography variant="subtitle2">overall market context and conditions</Typography>
            </Grid>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={12} md={6} container spacing={2}>
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
                <Grid item xs={12}>
                  <List
                    ref={newsAndCatalystsListRef}
                    sx={{ maxHeight: "180px", overflow: "scroll" }}
                    subheader={
                      <ListSubheader sx={{ textAlign: "center" }}>
                        News &amp; Catalysts
                      </ListSubheader>
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
        </Section>
                  */}
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
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                value={zoneTimeFrame}
                onChange={(e) => setZoneTimeFrame(e.target.value)}
                label="Time Frame"
                placeholder="5min/1hr/etc.."
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                value={zoneStart}
                onChange={(e) => setZoneStart(e.target.value)}
                label="Zone Start"
                placeholder="zone start price"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                value={zoneEnd}
                onChange={(e) => setZoneEnd(e.target.value)}
                label="Zone End"
                placeholder="zone end price"
              />
            </Grid>
            <Grid item xs={12} md={2} container>
              <FileUploadButton
                onChange={(e) => handleZoneImageUpload(e)}
                title="add image"
                ButtonProps={{
                  fullWidth: true,
                  variant: "text",
                  color: "inherit",
                  startIcon: <AddAPhotoOutlinedIcon />,
                }}
                InputProps={{
                  accept: "image/*",
                  type: "file",
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} container>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => handleAddZone()}
              >
                ADD TO ZONES
              </Button>
            </Grid>
            {/* display uploaded zone images */}
            <Grid item xs={12}>
              <ImageList
                cols={12}
                sx={{ overflow: "scroll", maxHeight: "100px", textAlign: "center" }}
              >
                {zoneScreenshots.map((file, index) => {
                  return (
                    <ImageListItem key={`${index}-${file.name}`}>
                      <Link rel="noopener" target="_blank" href={file.blob}>
                        <img height="100px" src={file.blob} />
                      </Link>
                      <ImageListItemBar
                        actionIcon={
                          <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            onClick={() => handleRemoveZoneScreenshot(index)}
                          >
                            <CloseIcon />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  );
                })}
              </ImageList>
            </Grid>
          </Grid>
          <Grid item xs={12} container>
            {state.zones && state.zones.length > 0 ? (
              <Fragment>
                <Grid item xs={12} margin="1rem">
                  <Typography variant="subheader2">Zones</Typography>
                </Grid>
                <SimpleTable
                  data={state.zones.map((z, zoneIndex) => ({
                    ...z,
                    // override example
                    type: (
                      <Chip
                        color={
                          z.type === "supply"
                            ? "error"
                            : z.type === "demand"
                            ? "success"
                            : "default"
                        }
                        onDelete={(e) => handleRemoveZone(e, zoneIndex)}
                        label={z.type}
                      />
                    ),
                  }))}
                  columns={[
                    { key: "type", display: "Zone Type" },
                    { key: "timeFrame", display: "Time Frame" },
                    { key: "start", display: "Zone Start" },
                    { key: "end", display: "Zone End" },
                  ]}
                />
              </Fragment>
            ) : (
              <Fragment />
            )}
          </Grid>
        </Section>
        {/* END SUPPLY AND DEMAND ZONES */}
      </Box>
      <Grid item xs={12} container justifyContent="flex-end" margin="1rem">
        <Button
          variant="contained"
          size="large"
          sx={{ padding: "1.5rem" }}
          onClick={() => onSubmit(state)}
        >
          ADD TO TRADE PLAN
        </Button>
      </Grid>
    </Fragment>
  );
}
