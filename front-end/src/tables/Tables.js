import React from "react";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow, Paper,Button} from "@mui/material";
import { finishTable } from "../utils/api";
import CheckIcon from '@mui/icons-material/Check';

function Tables({loadDashboard,tables,setReservationsError}){

    const handleFinish = async (table_id) => {
        const abortController = new AbortController();
        try {
          if (
            window.confirm(
              "Is this table ready to seat new guests?\nThis cannot be undone."
            )
          ) {
            await finishTable(table_id, abortController.signal);
            await loadDashboard();
          }
        } catch (error) {
          setReservationsError(error);
        }
        return () => abortController.abort();
      };

      return (
        <TableContainer component={Paper} sx={{maxWidth : 400}}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Table</TableCell>
              <TableCell align="center">Capacity</TableCell>
              <TableCell align="center">Availability</TableCell>
              <TableCell align="center" sx={{maxWidth : 70}}>Finish</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tables.map((table) => {
               const finishButton = (<Button variant="contained" size="small" sx={{py : 1}} data-table-id-finish={table.table_id} onClick={()=>handleFinish(table.table_id)}>{<CheckIcon fontSize="1em" />}</Button>)
              return (
              <TableRow
                key={table.table_id}
                >
                <TableCell align="center">{table.table_name}</TableCell>
                <TableCell align="center">{table.capacity}</TableCell>
                <TableCell align="center" data-table-id-status={table.table_id}>{table.reservation_id ? "Occupied" : "Free"}</TableCell>
                <TableCell align="center">{table.reservation_id ? finishButton : null }</TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default Tables