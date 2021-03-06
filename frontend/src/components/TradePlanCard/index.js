import React from "react";
import { Card, CardContent, CardActions, Typography, Button, Stack } from "@mui/material";

export default function TradePlanCard({ date = "n/a", symbol = "n/a", summary = "n/a", ...props }) {
  const { onEdit = (event) => {} } = props;

  const handleOnClick = (event) => {
    onEdit(event);
  };

  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={1}>
          <Typography color="primary" variant="h5">
            {symbol}
          </Typography>
          <Typography variant="h6">{date}</Typography>
        </Stack>
        <Typography variant="body2">{summary}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={handleOnClick}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
