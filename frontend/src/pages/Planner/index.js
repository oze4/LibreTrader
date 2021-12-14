import React, { useState } from "react";
import styled from "@emotion/styled";

import { TradePlanForm, SimpleTable } from "@/components";
import {
  Paper,
  Box,
  Grid,
  Drawer,
  List,
  ListItem,
  Divider,
  IconButton,
  Typography,
  Tooltip,
  Badge,
  Stack,
} from "@mui/material";
import { Close, FormatListBulleted, NotesOutlined } from "@mui/icons-material";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function Planner() {
  const [tradePlans, setTradePlans] = useState([]);
  // We want the drawer open by default. ONLY after a trade plan is added though
  // Even though this is true, it won't be open on load.
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleTradePlanSubmit = (tradeplan) => {
    const tp = [...tradePlans];
    tp.push(tradeplan);
    console.log(tp);
    setTradePlans(tp);
    // Only force open the drawer if it is the first item
    if (tp.length === 1) {
      setDrawerOpen(true);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Stack direction="row">
          <Typography variant="h3">Trade Planner</Typography>
          <Tooltip title={`${drawerOpen ? "hide" : "show"} trade plan`}>
            <IconButton
              disableRipple
              color={tradePlans.length > 0 ? "success" : "inherit"}
              onClick={() => {
                setDrawerOpen(!drawerOpen);
              }}
            >
              <Badge badgeContent={`${tradePlans.length}`}>
                {drawerOpen ? <FormatListBulleted /> : <NotesOutlined />}
              </Badge>
            </IconButton>
          </Tooltip>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <TradePlanForm onSubmit={handleTradePlanSubmit} />
      </Grid>
      <Drawer
        sx={{
          width: "40vw",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "40vw",
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        open={drawerOpen}
        anchor="right"
      >
        <DrawerHeader sx={{ marginTop: "200px" }}>
          <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
            <Close />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {tradePlans.map((plan) => {
            return <ListItem>{plan.symbol}</ListItem>;
          })}
        </List>
      </Drawer>
    </Grid>
  );
}
