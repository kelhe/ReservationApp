import React from "react";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow, Paper} from "@mui/material";
import { formatAs12Hr } from "../utils/date-time";
import OptionsMenu from "./OptionsMenu";
import DateChange from "../dashboard/DateChange";
import { useLocation } from "react-router-dom";

function ReservationTable({ reservations, handleCancellation, date }) {
  const path = useLocation().pathname;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          {/*only render if rendering on dashboard */}
          {path === "/search" ? null : (
            <TableRow>
              <TableCell align="left" colSpan={5}>
                <h4 className="pt-2">Reservations for {date}</h4>
              </TableCell>
              <TableCell align="right" colSpan={3}>
                <DateChange date={date} />
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell align="center" sx={{ minWidth: 25 }}>
              #
            </TableCell>
            <TableCell align="center" sx={{ minWidth: 130 }}>
              Name
            </TableCell>
            <TableCell align="center" sx={{ minWidth: 120 }}>
              Phone
            </TableCell>
            <TableCell align="center" sx={{ minWidth: 110 }}>
              Date
            </TableCell>
            <TableCell align="center" sx={{ minWidth: 100 }}>
              Time
            </TableCell>
            <TableCell align="center">People</TableCell>
            <TableCell align="center" sx={{ minWidth: 100 }}>
              Status
            </TableCell>
            <TableCell align="center" sx={{ minWidth: 20 }}>
              Options
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.reservation_id}>
              <TableCell align="center" sx={{ maxWidth: 25 }}>
                {reservation.reservation_id}
              </TableCell>
              <TableCell
                align="center"
                sx={{ maxWidth: 130, overflowWrap: "break-word" }}
              >
                {reservation.first_name} {reservation.last_name}
              </TableCell>
              <TableCell align="center" sx={{ maxWidth: 120 }}>
                {reservation.mobile_number}
              </TableCell>
              <TableCell align="center" sx={{ maxWidth: 110 }}>
                {reservation.reservation_date}
              </TableCell>
              <TableCell align="center" sx={{ maxWidth: 100 }}>
                {formatAs12Hr(reservation.reservation_time)}
              </TableCell>
              <TableCell align="center">{reservation.people}</TableCell>
              <TableCell
                align="center"
                data-reservation-id-status={reservation.reservation_id}
                sx={{ maxWidth: 100 }}
              >
                {reservation.status[0].toUpperCase() +
                  reservation.status.slice(1)}
              </TableCell>
              <TableCell align="center" sx={{ maxWidth: 20 }}>
                {reservation.status === "booked" ? (
                  <OptionsMenu
                    handleCancellation={handleCancellation}
                    reservation_id={reservation.reservation_id}
                  />
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ReservationTable;
