import React, { useState } from "react";

import { TradePlanForm } from "@/components";
import { Paper, Box, Grid } from "@mui/material";

export default function Planner() {
    const [tradePlans, setTradePlans] = useState(undefined);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper sx={{ padding: "1.75%", marginTop: "1%" }}>
                    <TradePlanForm onSubmit={(data) => alert(JSON.stringify(data, null, 2))} />
                </Paper>
            </Grid>
            {tradePlans && tradePlans.length && tradePlans.map((tradePlan, index) => {})}
        </Grid>
    );
}
