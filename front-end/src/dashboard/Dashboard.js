import React, { useState, useEffect } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "../reservations/Reservations";
import Tables from "../tables/Tables";
import DateChange from "./DateChange";
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

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDashboard() {
      setReservationsError(null);
      try {
        const resResponse = await listReservations(
          { date },
          abortController.signal
        );
        setReservations(resResponse);
        const tabResponse = await listTables(abortController.signal);
        setTables(tabResponse);
      } catch (error) {
        setReservationsError(error);
      }
    }
    loadDashboard();
    return () => abortController.abort();
  }, [date]);

  return (
    <main>
      <div className="d-flex flex-column align-items-center">
        <h1 className="m-0">Dashboard</h1>
        <DateChange date={date} />
      </div>
      <ErrorAlert
        error={reservationsError}
        setReservationsError={setReservationsError}
      />
      <div className="d-flex justify-content-around p-4">
        <div>
          <h4 className="mb-2">Reservations for {date}</h4>
          <Reservations
            reservations={reservations}
            reservationsError={reservationsError}
            setReservationsError={setReservationsError}
          />
        </div>
        <Tables
          tables={tables}
          setReservationsError={setReservationsError}
        />
      </div>
    </main>
  );
}

export default Dashboard;
