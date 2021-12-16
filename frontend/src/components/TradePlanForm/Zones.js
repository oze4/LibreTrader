import React, { Fragment } from "react";
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
  Paper,
  Divider,
  List,
  ListSubheader,
  useTheme,
} from "@mui/material";
import {
  Add as AddIcon,
  AddAPhotoOutlined as AddAPhotoOutlinedIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import styled from "@emotion/styled";

import { SimpleTable, FileUploadButton } from "@/components";
import { useTradePlanContext } from "./context";

const ToggleButtonStyled = styled(ToggleButton, (props) => ({ ...props }))`
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export default function Zones(props) {
  const theme = useTheme();
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

  const handleZoneTypeChange = (value) => {
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

  const handleZoneNotesChange = (event) => {
    setState({
      ...state,
      zone: {
        ...state.zone,
        notes: event.target.value,
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
        notes: "",
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
        <Grid item xs={12} md={6} container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Imbalance</Typography>
            <Typography variant="subtitle2">add supply and demand zones below</Typography>
          </Grid>
          {/* add supply or demand zone */}
          <Grid item xs={12} sm={6} md={6}>
            <ToggleButtonGroup
              fullWidth
              color={
                state.zone.type === "supply"
                  ? "error"
                  : state.zone.type === "demand"
                  ? "success"
                  : "warning"
              }
              value={state.zone.type}
              orientation="horizontal"
              exclusive
              onChange={(_e, val) => handleZoneTypeChange(val)}
            >
              <ToggleButtonStyled value="supply">Supply</ToggleButtonStyled>
              <ToggleButtonStyled value="demand">Demand</ToggleButtonStyled>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              fullWidth
              value={state.zone.timeFrame}
              onChange={handleTimeFrameChange}
              label="Time Frame"
              placeholder="5min/1hr/etc.."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              fullWidth
              value={state.zone.start}
              onChange={handleZoneStartChange}
              label="Zone Start"
              placeholder="zone start price"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              fullWidth
              value={state.zone.end}
              onChange={handleZoneEndChange}
              label="Zone End"
              placeholder="zone end price"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              value={state.zone.notes}
              onChange={handleZoneNotesChange}
              label="Notes"
              placeholder="notes for this zone"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} container>
            <FileUploadButton
              onChange={handleZoneImageChange}
              title="add image"
              TooltipProps={{
                title: "screenshots or images related to this zone",
              }}
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
          <Grid item xs={12} sm={6} md={6} container>
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
        <Grid item xs={12} md={6} container>
          <Grid item xs={12}>
            <List
              sx={{ maxHeight: "180px", overflow: "scroll" }}
              subheader={<ListSubheader sx={{ textAlign: "center" }}>Zones</ListSubheader>}
            >
              <Divider />
            </List>
            {state.zones && state.zones.length > 0 ? (
              <Fragment>
                <SimpleTable
                  data={state.zones.map((z, zoneIndex) => ({
                    ...z,
                    images: z.images.length || 0,
                    notes: <Typography sx={{ overflow: "hidden" }}>{z.notes}</Typography>,
                    type: (
                      <Chip
                        color={
                          z.type === "supply"
                            ? "error"
                            : z.type === "demand"
                            ? "success"
                            : "default"
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
                    { key: "notes", display: "Notes" },
                    { key: "images", display: "Images Count" },
                  ]}
                />
              </Fragment>
            ) : (
              <Fragment />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}
