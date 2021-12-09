import React, { useState, Fragment } from "react";

import { TradePlanForm } from "@/components";
import { Paper, Box, Grid } from "@mui/material";

export default function Planner() {
  const [tradePlans, setTradePlans] = useState(undefined);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper sx={{ padding: "1.75%", marginTop: "1%" }}>
          <TradePlanForm onSubmit={(data) => alert(data)} />
        </Paper>
      </Grid>
      {tradePlans &&
        tradePlans.length &&
        tradePlans.map((tradePlan, index) => {})}
    </Grid>
  );
}
