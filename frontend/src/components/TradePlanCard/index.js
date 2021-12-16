import React from "react";
import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";

export default function TradePlanCard({
  date = "n/a",
  symbol = "n/a",
  biggerPicture = "n/a",
  ...props
}) {
  const { onEdit = (event) => {} } = props;

  const handleOnClick = (event) => {
    onEdit(event);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{symbol}</Typography>
        <Typography variant="body2">{biggerPicture}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleOnClick}>Edit</Button>
      </CardActions>
    </Card>
  );
}
