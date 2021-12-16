import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

export default function SimpleTable({ data = [], columns = [], TableProps = {} }) {
  // const rows = [];
  // data.forEach((dat) => {
  //   const row = [];
  //   columns.forEach((col) =>
  //     row.push(<TableCell key={`${col.key}-${col.display}`}>{dat[col.key]}</TableCell>),
  //   );
  //   rows.push(row);
  // });

  const rows = data.reduce((acc, dat) => {
    acc.push(
      columns.reduce((row, col) => {
        row.push(<TableCell key={`${col.key}-${col.display}`}>{dat[col.key]}</TableCell>);
        return row;
      }, []),
    );
    return acc;
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table {...TableProps}>
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
