import React, { Fragment, useMemo, useState } from "react";
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

const RequiredFieldHelperText = ({ text = "REQUIRED" }) => (
  <Typography
    sx={{
      fontSize: "0.75rem",
      color: "rgb(211, 47, 47)",
      margin: "3px 14px 0 14px",
      lineHeight: 1.66,
    }}
    component="p"
  >
    {text}
  </Typography>
);

export default function Zones(props) {
  const { state, setState } = useTradePlanContext();
  const [zoneFormErrors, setZoneFormErrors] = useState([]); // array of strings, where each string is the field name

  const isZoneFieldError = (fieldName) => zoneFormErrors.includes(fieldName);

  const isEmptyField = (fieldName) => !state.zone[fieldName] || state.zone[fieldName] === "";

  const removeZoneFieldError = (fieldName) => {
    const zfe = [...zoneFormErrors];
    zfe.splice(zfe.indexOf(fieldName), 1);
    setZoneFormErrors(zfe);
  };

  const removeZoneFieldErrorIfExists = (fieldName) => {
    if (isZoneFieldError(fieldName)) {
      removeZoneFieldError(fieldName);
    }
  };

  const handleZoneImageChange = (event) => {
    const file = event.target.files[0];
    const image = { name: file.name, blob: URL.createObjectURL(file) };
    state.zone.images.push(image);
    setState({ ...state, zone: { ...state.zone, images: [...state.zone.images] } });
  };

  const handleZoneImageRemove = (index) => {
    state.zone.images.splice(index, 1);
    setState({ ...state, zone: { ...state.zone, images: [...state.zone.images] } });
  };

  const handleZoneTypeChange = (value) => {
    removeZoneFieldErrorIfExists("type");
    setState({ ...state, zone: { ...state.zone, type: value } });
  };

  const handleTimeFrameChange = (event) => {
    removeZoneFieldErrorIfExists("timeFrame");
    setState({ ...state, zone: { ...state.zone, timeFrame: event.target.value } });
  };

  const handleZoneStartChange = (event) => {
    removeZoneFieldErrorIfExists("start");
    setState({ ...state, zone: { ...state.zone, start: event.target.value } });
  };

  const handleZoneEndChange = (event) => {
    removeZoneFieldErrorIfExists("end");
    setState({ ...state, zone: { ...state.zone, end: event.target.value } });
  };

  const handleZoneNotesChange = (event) => {
    setState({ ...state, zone: { ...state.zone, notes: event.target.value } });
  };

  const handleAddZone = () => {
    const requiredFields = ["type", "timeFrame", "start", "end"];
    const foundZoneFormErrors = requiredFields.reduce((errs, field) => {
      if (isEmptyField(field)) {
        errs.push(field);
      }
      return errs;
    }, []);
    // do nothing if there are field errors
    if (foundZoneFormErrors.length > 0) {
      setZoneFormErrors(foundZoneFormErrors);
      return;
    }
    const zones = [...state.zones];
    zones.push(state.zone);
    setState({
      ...state,
      zone: { type: "", timeFrame: "", start: "", end: "", images: [], notes: "" },
      zones: [...zones],
    });
  };

  const handleRemoveZone = (index) => {
    const zones = [...state.zones];
    zones.splice(index, 1);
    setState({ ...state, zones: zones });
  };

  const calculateZoneTypeColor = useMemo(() => {
    switch (state.zone.type) {
      case "supply":
        return "error";
      case "demand":
        return "success";
      default:
        return "info";
    }
  }, [state.zone.type]);

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Imbalance Zones</Typography>
            <Typography variant="subtitle2">add supply and demand zones below</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <ToggleButtonGroup
              fullWidth
              sx={{
                boxShadow: 1,
                ...(isZoneFieldError("type") ? { border: "1px solid red" } : {}),
              }}
              color={calculateZoneTypeColor}
              value={state.zone.type}
              orientation="horizontal"
              exclusive
              onChange={(_e, val) => handleZoneTypeChange(val)}
            >
              <ToggleButtonStyled value="supply">Supply</ToggleButtonStyled>
              <ToggleButtonStyled value="demand">Demand</ToggleButtonStyled>
            </ToggleButtonGroup>
            {isZoneFieldError("type") && <RequiredFieldHelperText text="REQUIRED FIELD" />}
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              error={isZoneFieldError("timeFrame")}
              helperText={isZoneFieldError("timeFrame") && "REQUIRED FIELD"}
              fullWidth
              value={state.zone.timeFrame}
              onChange={handleTimeFrameChange}
              label="Time Frame"
              placeholder="5min/1hr/etc.."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              error={isZoneFieldError("start")}
              helperText={isZoneFieldError("start") && "REQUIRED FIELD"}
              fullWidth
              value={state.zone.start}
              onChange={handleZoneStartChange}
              label="Zone Start"
              placeholder="zone start price"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              error={isZoneFieldError("end")}
              helperText={isZoneFieldError("end") && "REQUIRED FIELD"}
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
                  CellProps={{
                    sx: {
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "160px",
                    },
                  }}
                  data={state.zones.map((z, zoneIndex) => ({
                    ...z,
                    images: z.images.length,
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
                    { key: "type", display: "Type" },
                    { key: "timeFrame", display: "TimeFrame" },
                    { key: "start", display: "Start" },
                    { key: "end", display: "End" },
                    { key: "notes", display: "Notes" },
                    { key: "images", display: "#Images" },
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
