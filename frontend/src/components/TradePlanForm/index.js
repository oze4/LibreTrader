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
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

import { FileUploadButton } from "@/components";

export default function TradePlan({ onSubmit }) {
  const newsRef = useRef(null);

  // const [currentNewsCatalyst, setCurrentNewsCatalyst] = useState(undefined);
  const [currentFormData, setCurrentFormData] = useState({
    newsAndCatalysts: "",
    zoneStart: "",
    zoneEnd: "",
    zoneType: "supply",
    zoneScreenshots: [],
  });

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
  }, [currentFormData.newsAndCatalysts]);

  const handleAddNewsOrCatalyst = () => {
    if (currentFormData.newsAndCatalysts) {
      const c = { ...state };
      c.newsAndCatalysts.push(currentFormData.newsAndCatalysts);
      // Since we added the currently typed news/catalyst we need to clear the text field
      handleCurrentFormDataChange("newsAndCatalysts", "");
      setState(c);
    }
  };

  const handleAddZone = () => {
    if (
      currentFormData.zoneStart &&
      currentFormData.zoneEnd &&
      currentFormData.zoneType
    ) {
    }
  };

  const handleCurrentFormDataChange = (propertyName, propertyValue) => {
    const fd = { ...currentFormData };
    fd[propertyName] = propertyValue;
    setCurrentFormData(fd);
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
          <Typography variant="subtitle1">Thesis</Typography>
          <Typography variant="subtitle2">overall market context and conditions</Typography>
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

        {/* ENTER NEW NEWS OR CATALYSTS */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            multiline
            rows={2}
            value={currentFormData.newsAndCatalysts}
            onChange={(e) =>
              handleCurrentFormDataChange("newsAndCatalysts", e.target.value)
            }
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
            sx={{ minHeight: "200px", maxHeight: "200px", overflow: "auto" }}
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
          <Typography variant="subtitle2">fill out the info below to add a supply or demand zone</Typography>
        </Grid>

        <Grid item xs={4} md={2}>
          <ToggleButtonGroup
            color={currentFormData.zoneType === "supply" ? "error" : "success"}
            value={currentFormData.zoneType}
            exclusive
            onChange={(e, newZone) => handleCurrentFormDataChange("zoneType", newZone)}
          >
            <ToggleButton value="supply">Supply</ToggleButton>
            <ToggleButton value="demand">Demand</ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        <Grid item xs={12} md={2}>
          <TextField
            value={currentFormData.zone}
            onChange={(e) =>
              handleCurrentFormDataChange("zoneStart", e.target.value)
            }
            label="Zone Start"
            placeholder="zone start price"
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <TextField
            value={currentFormData.zone}
            onChange={(e) =>
              handleCurrentFormDataChange("zoneEnd", e.target.value)
            }
            label="Zone End"
            placeholder="zone end price"
          />
        </Grid>

        <Grid item xs={12}>
          <FileUploadButton
            buttonProps={{
              variant: "filled",
            }}
            inputProps={{
              accept: "image/png, image/jpeg",
              type: "file",
            }}
            onChange={(e) => console.log(e)}
          />
        </Grid>

        <Grid item xs={12} marginTop="2vh">
          <Button variant="contained" size="large" onClick={() => onSubmit(state)}>Add To Trade Plan</Button>
        </Grid>
      </Grid>
    </>
  );
}
