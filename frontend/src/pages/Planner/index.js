import React, { useState, useMemo } from "react";
import styled from "@emotion/styled";

import { TradePlanForm, TradePlanCard } from "@/components";
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
  useMediaQuery,
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
  const isIPadOrSmaller = useMediaQuery((theme) => theme.breakpoints.between("0", "850"));
  // We want the drawer open by default. ONLY after a trade plan is added though
  // Even though this is true, it won't be open on load.
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleTradePlanSubmit = (tradeplan) => {
    const tp = [...tradePlans];
    tp.push(tradeplan);
    setTradePlans(tp);
    // Only force open the drawer if it is the first item
    if (tp.length === 1) {
      setDrawerOpen(true);
    }
  };

  const calculateTradePlanDrawerSize = useMemo(() => {
    return isIPadOrSmaller ? "100vw" : "40vw";
  }, [drawerOpen]);

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
          width: calculateTradePlanDrawerSize,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: calculateTradePlanDrawerSize,
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
          <Typography variant="subheader1">Trade Plans</Typography>
        </DrawerHeader>
        <Divider />
        <List>
          {tradePlans.map((plan, index) => {
            return (
              <ListItem key={`${index}-${plan.date}-${plan.symbol}-${plan.biggerPicture.length}`}>
                <Box sx={{ width: "100%" }}>
                  <TradePlanCard
                    symbol={plan.symbol}
                    date={plan.date}
                    biggerPicture={plan.biggerPicture}
                  />
                </Box>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Grid>
  );
}
