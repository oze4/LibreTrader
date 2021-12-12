import React, { useState } from "react";

import { TradePlanForm, SimpleTable } from "@/components";
import { Paper, Box, Grid } from "@mui/material";

export default function Planner() {
  const [tradePlans, setTradePlans] = useState(undefined);

  return (
    <Grid container>
      <Grid item xs={12}>
        <TradePlanForm onSubmit={(data) => alert(JSON.stringify(data, null, 2))} />
      </Grid>
      {tradePlans && tradePlans.length && tradePlans.map((tradePlan, index) => {})}
      <SimpleTable />
    </Grid>
  );
}
