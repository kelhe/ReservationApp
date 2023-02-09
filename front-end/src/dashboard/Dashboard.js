import React from "react";
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
function Dashboard({
  date,
  render,
  setRender,
  reservations,
  setReservationsError,
  reservationsError,
  tables,
  handleFinish,
}) {

  return (
    <main>
      <h1>Dashboard</h1>
      <DateChange date={date}/>
      <ErrorAlert
        error={reservationsError}
        setReservationsError={setReservationsError}
      />
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <div className="d-flex justify-content-between p-4">
        <Reservations
          reservations={reservations}
          render={render}
          setRender={setRender}
          reservationsError={reservationsError}
          setReservationsError={setReservationsError}
        />
        <Tables tables={tables} handleFinish={handleFinish} />
      </div>
    </main>
  );
}

export default Dashboard;
