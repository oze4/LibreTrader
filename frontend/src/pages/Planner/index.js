import React, { useState, useMemo } from "react";
import {
  Container,
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
  useMediaQuery,
  Button,
  ListSubheader,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Close as CloseIcon, FormatListBulleted, NotesOutlined } from "@mui/icons-material";

import { TradePlanForm, TradePlanCard } from "@/components";

export default function Planner() {
  const [tradePlans, setTradePlans] = useState([]);
  const isIPadOrSmaller = useMediaQuery((theme) => theme.breakpoints.between("0", "811"));
  // We want the drawer open by default. ONLY after a trade plan is added though
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
    <Container fluid="true" sx={{ marginTop: "5rem" }}>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={10} sm={8}>
          <Typography variant="h3">Trade Planner</Typography>
        </Grid>
        <Grid item xs={2} sm={4} container spacing={2} justifyContent="flex-end">
          <Tooltip title={`${drawerOpen ? "hide" : "show"} trade plan`}>
            <IconButton
              edge="end"
              sx={{ boxShadow: 1, margin: "1em 1em 0 0", color: tradePlans.length > 0 ? "green" : "" }}
              disableRipple
              color="primary"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <Badge badgeContent={`${tradePlans.length}`}>
                {drawerOpen ? (
                  <FormatListBulleted fontSize="large" />
                ) : (
                  <NotesOutlined fontSize="large" />
                )}
              </Badge>
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TradePlanForm onSubmit={handleTradePlanSubmit} />
      </Grid>
      <Drawer
        sx={{
          width: calculateTradePlanDrawerSize,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            zIndex: 9001,
            width: calculateTradePlanDrawerSize,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        open={drawerOpen}
        anchor="right"
      >
        <List>
          <ListSubheader>
            <Typography variant="h5">Trade Plan</Typography>
          </ListSubheader>
          <Divider />
          {tradePlans.map((plan, index) => {
            return (
              <ListItem key={`${index}-${plan.date}-${plan.symbol}-${plan.summary.length}`}>
                <Box sx={{ width: "100%" }}>
                  <TradePlanCard symbol={plan.symbol} date={plan.date} summary={plan.summary} />
                </Box>
                <Divider />
              </ListItem>
            );
          })}
          <AppBar
            position="fixed"
            color="primary"
            sx={{
              padding: "2em",
              // use `calculateTradePlanDrawerSize` for the appbar footer as well
              width: calculateTradePlanDrawerSize,
              top: "auto",
              bottom: 0,
            }}
          >
            <Toolbar>
              <Button
                onClick={() => setDrawerOpen(!drawerOpen)}
                variant="contained"
                startIcon={<CloseIcon />}
              >
                Close
              </Button>
            </Toolbar>
          </AppBar>
        </List>
      </Drawer>
    </Container>
  );
}
