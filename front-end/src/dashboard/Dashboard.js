import React, { useState, useEffect } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "../reservations/Reservations";
import Tables from "../tables/Tables";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [stackView,setStackView] = useState(true)

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const changeView = () => {
    setStackView(!stackView)
  }

  return (
    <main>
      <div className="d-flex flex-column align-items-center">
        <h1 className="m-0">Dashboard</h1>
        <Button onClick={changeView}><SwapVertRoundedIcon/></Button>
      </div>
      <ErrorAlert
        error={reservationsError}
        setReservationsError={setReservationsError}
      />
      <Stack direction={stackView ? "row" : "column"}>
        <div className="p-2">
          <Reservations
            loadDashboard={loadDashboard}
            reservations={reservations}
            reservationsError={reservationsError}
            setReservationsError={setReservationsError}
            date={date}
          />
        </div>
        <div className="p-2">
        <Tables
          loadDashboard={loadDashboard}
          tables={tables}
          setReservationsError={setReservationsError}
          />
        </div>
      </Stack>
    </main>
  );
}

export default Dashboard;
