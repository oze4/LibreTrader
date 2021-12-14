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
import { TradePlanContext } from "./context";

export default function Zones(props) {
  const formData = useContext(TradePlanContext);

  const handleZoneImageChange = (event) => {
    const file = event.target.files[0];
    const image = {
      name: file.name,
      blob: URL.createObjectURL(file),
    };
    const c = { ...formData.current };
    c.zone.images.push(image);
    formData.setCurrent(c);
  };

  const handleZoneImageRemove = (index) => {
    const c = { ...formData.current };
    c.zone.images.splice(index, 1);
    formData.setCurrent(c);
  };

  const handleZoneTypeChange = (_event, value) => {
    const c = { ...formData.current };
    c.zone.type = value;
    formData.setCurrent(c);
  };

  const handleTimeFrameChange = (event) => {
    const c = { ...formData.current };
    c.zone.timeFrame = event.target.value;
    formData.setCurrent(c);
  };

  const handleZoneStartChange = (event) => {
    const c = { ...formData.current };
    c.zone.start = event.target.value;
    formData.setCurrent(c);
  };

  const handleZoneEndChange = (event) => {
    const c = { ...formData.current };
    c.zone.end = event.target.value;
    formData.setCurrent(c);
  };

  const handleAddZone = () => {
    const { type, timeFrame, start, end, images } = formData.current.zone;
    const zone = { type, timeFrame, start, end, images };
    const s = { ...formData.state };
    s.zones.push(zone);
    formData.setState(s);
    // Clear form input so another zone can be added.
    const emptyZone = { type: "", timeFrame: "", start: "", end: "", images: [] };
    formData.setCurrent({ ...formData.current, zone: emptyZone });
  };

  const handleRemoveZone = (index) => {
    const s = { ...formData.state };
    s.zones.splice(index, 1);
    formData.setState(s);
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
            color={formData.current.zone.type === "supply" ? "error" : "success"}
            value={formData.current.zone.type}
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
            value={formData.current.zone.timeFrame}
            onChange={handleTimeFrameChange}
            label="Time Frame"
            placeholder="5min/1hr/etc.."
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            value={formData.current.zone.start}
            onChange={handleZoneStartChange}
            label="Zone Start"
            placeholder="zone start price"
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            value={formData.current.zone.end}
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
            {formData.current.zone.images.map((file, index) => {
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
        {formData.state.zones && formData.state.zones.length > 0 ? (
          <Fragment>
            <Grid item xs={12}>
              <Typography variant="subheader2">Zones</Typography>
            </Grid>
            <SimpleTable
              data={formData.state.zones.map((z, zoneIndex) => ({
                ...z,
                // override example
                type: (
                  <Chip
                    color={
                      z.type === "supply" ? "error" : z.type === "demand" ? "success" : "default"
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
    </Fragment>
  );
}
