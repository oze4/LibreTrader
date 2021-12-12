import React from "react";
import PropTypes from "prop-types";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

/*
const tableData = {
  data: [
    { 
      timeframe: '1HR', 
      start: "1", 
      end: "5" 
    },
    { 
      start: "90", 
      timeframe: '5MIN', 
      end: "95" 
    }
  ],
  columns: [
    { key: "timeframe", display: "Time Frame" }, 
    { key: "start", display: "Zone Start" }, 
    { key: "end", display: "Zone End" }
  ],
};
*/

export default function SimpleTable({ data = [], columns = [] }) {
  const rows = [];
  data.forEach((dat) => {
    const row = [];
    columns.forEach((col) =>
      row.push(<TableCell key={`${col.key}-${col.display}`}>{dat[col.key]}</TableCell>),
    );
    rows.push(row);
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columns.map((col) => {
              return <TableCell key={`${col.key}:${col.display}`}>{col.display}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            return <TableRow key={`${row}-${index}`}>{row}</TableRow>;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
