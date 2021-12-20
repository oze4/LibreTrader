import React, { useState, useMemo } from "react";
import {
  Container,
  Grid,
  IconButton,
  Typography,
  Tooltip,
  Badge,
  useMediaQuery,
} from "@mui/material";
import { FormatListBulleted, NotesOutlined } from "@mui/icons-material";

import { TradePlanForm, TradePlanCard } from "@/components";
import PlannerDrawer from "./PlannerDrawer";

export default function Planner() {
  const [tradePlans, setTradePlans] = useState([]);
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

  return (
    <Container fluid="true" sx={{ marginTop: "5rem" }}>
      <PlannerDrawer
        tradePlans={tradePlans}
        isOpen={drawerOpen}
        closeOnClickAway
        onCloseClick={() => setDrawerOpen(!drawerOpen)}
      />
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={10} sm={8}>
          <Typography variant="h3">Trade Planner</Typography>
        </Grid>
        <Grid item xs={2} sm={4} container spacing={2} justifyContent="flex-end">
          <Tooltip title={`${drawerOpen ? "hide" : "show"} trade plan`}>
            <IconButton
              edge="end"
              sx={{
                boxShadow: 1,
                margin: "1em 1em 0 0",
                color: tradePlans.length > 0 ? "green" : "",
              }}
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
    </Container>
  );
}
