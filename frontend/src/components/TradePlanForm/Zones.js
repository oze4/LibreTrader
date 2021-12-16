import React, { Fragment, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Link,
} from "@mui/material";
import {
  Add as AddIcon,
  AddAPhotoOutlined as AddAPhotoOutlinedIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

import { SimpleTable, FileUploadButton } from "@/components";
import { useTradePlanContext } from "./context";

export default function Zones(props) {
  // const formData = useContext(TradePlanContext);
  const { state, setState } = useTradePlanContext();

  const handleZoneImageChange = (event) => {
    const file = event.target.files[0];
    const image = {
      name: file.name,
      blob: URL.createObjectURL(file),
    };
    const zoneImages = [...state.zone.images];
    zoneImages.push(image);
    setState({
      ...state,
      zone: {
        ...state.zone,
        images: zoneImages,
      },
    });
  };

  const handleZoneImageRemove = (index) => {
    const zoneImages = [...state.zone.images];
    zoneImages.splice(index, 1);
    setState({
      ...state,
      zone: {
        ...state.zone,
        images: zoneImages,
      },
    });
  };

  const handleZoneTypeChange = (_event, value) => {
    setState({
      ...state,
      zone: {
        ...state.zone,
        type: value,
      },
    });
  };

  const handleTimeFrameChange = (event) => {
    setState({
      ...state,
      zone: {
        ...state.zone,
        timeFrame: event.target.value,
      },
    });
  };

  const handleZoneStartChange = (event) => {
    setState({
      ...state,
      zone: {
        ...state.zone,
        start: event.target.value,
      },
    });
  };

  const handleZoneEndChange = (event) => {
    setState({
      ...state,
      zone: {
        ...state.zone,
        end: event.target.value,
      },
    });
  };

  const handleAddZone = () => {
    const zones = [...state.zones];
    zones.push(state.zone);
    setState({
      ...state,
      zone: {
        type: "",
        timeFrame: "",
        start: "",
        end: "",
        images: [],
      },
      zones: [...zones],
    });
  };

  const handleRemoveZone = (index) => {
    const zones = [...state.zones];
    zones.splice(index, 1);
    setState({
      ...state,
      zones: zones,
    });
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Imbalance</Typography>
          <Typography variant="subtitle2">add supply and demand zones below</Typography>
        </Grid>
        {/* add supply or demand zone */}
        <Grid item xs={12} md={2} container>
          <ToggleButtonGroup
            fullWidth
            color={state.zone.type === "supply" ? "error" : "success"}
            value={state.zone.type}
            exclusive
            onChange={handleZoneTypeChange}
          >
            <ToggleButton value="supply">Supply</ToggleButton>
            <ToggleButton value="demand">Demand</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            value={state.zone.timeFrame}
            onChange={handleTimeFrameChange}
            label="Time Frame"
            placeholder="5min/1hr/etc.."
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            value={state.zone.start}
            onChange={handleZoneStartChange}
            label="Zone Start"
            placeholder="zone start price"
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            value={state.zone.end}
            onChange={handleZoneEndChange}
            label="Zone End"
            placeholder="zone end price"
          />
        </Grid>
        <Grid item xs={12} md={2} container>
          <FileUploadButton
            onChange={handleZoneImageChange}
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
          <Button fullWidth variant="outlined" startIcon={<AddIcon />} onClick={handleAddZone}>
            ADD TO ZONES
          </Button>
        </Grid>
        {/* display uploaded zone images */}
        <Grid item xs={12}>
          <ImageList
            cols={12}
            sx={{ overflow: "scroll", maxHeight: "50px", minHeight: "50px", textAlign: "center" }}
          >
            {state.zone &&
              state.zone.images.length > 0 &&
              state.zone.images.map((file, index) => {
                return (
                  <ImageListItem key={`${index}-${file.name}`}>
                    <Link rel="noopener" target="_blank" href={file.blob}>
                      <img height="50px" width="50px" src={file.blob} />
                    </Link>
                    <ImageListItemBar
                      sx={{}}
                      actionIcon={
                        <IconButton
                          size="small"
                          sx={{ maxHeight: "2px", color: "rgba(255, 255, 255, 0.54)" }}
                          onClick={() => handleZoneImageRemove(index)}
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
            <Grid item xs={12}>
              <Typography variant="subheader2">Zones</Typography>
            </Grid>
            <SimpleTable
              data={state.zones.map((z, zoneIndex) => ({
                ...z,
                // override example
                type: (
                  <Chip
                    color={
                      z.type === "supply" ? "error" : z.type === "demand" ? "success" : "default"
                    }
                    onDelete={() => handleRemoveZone(zoneIndex)}
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
    </Fragment>
  );
}
