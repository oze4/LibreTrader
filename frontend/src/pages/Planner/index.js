import React, { useState } from "react";

import { TradePlanForm, SimpleTable } from "@/components";
import { Paper, Box, Grid } from "@mui/material";

export default function Planner() {
  const [tradePlans, setTradePlans] = useState([]);

  const handleTradePlanSubmit = (tradeplan) => {
    const tp = [...tradePlans];
    tp.push(tradeplan);
    setTradePlans(tp);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <TradePlanForm onSubmit={(data) => alert(JSON.stringify(data, null, 2))} />
      </Grid>
      {tradePlans &&
        tradePlans.length > 0 &&
        tradePlans.map((tradePlan, index) => {
          <pre key={index}>{JSON.stringify(tradePlan, null, 2)}</pre>;
        })}
      {tradePlans && tradePlans.length > 0 && <SimpleTable />}
    </Grid>
  );
}
