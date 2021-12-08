import React from "react";
import PropTypes from "prop-types";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

ImbalanceZone.propTypes = {
  timeframe: PropTypes.string, // (1min,5min,10min, etc...)
  startPrice: PropTypes.string, // start of supply zone
  endPrice: PropTypes.string, // end of supply zone
  screenshots: PropTypes.arrayOf(PropTypes.string), // array of screenshots for this zone.
};

export default function ImbalanceZone(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Time Frame</TableCell>
            <TableCell align="right">Start</TableCell>
            <TableCell align="right">End&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
