import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { today } from "../utils/date-time";
import { listReservations, listTables } from "../utils/api";
import useQuery from "../utils/useQuery"
import NotFound from "./NotFound";
import Dashboard from "../dashboard/Dashboard";
import NewReservation from "../reservations/NewReservation";
import NewTable from "../tables/NewTable";
import SeatReservation from "../reservations/SeatReservation";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  let query = useQuery();
  let date = query.get("date");
  if (!date) {
    date = today();
  }
  const [render, setRender] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([])
  const [reservationsError, setReservationsError] = useState(null);
  const [currentDate, setCurrentDate] = useState(date);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDashboard() {
      setReservationsError(null);
      try {
        const resResponse = await listReservations({ date: currentDate },abortController.signal);
        setReservations(resResponse);
        const tabResponse = await listTables(abortController.signal)
        setTables(tabResponse)
      } catch (error) {
        setReservationsError(error);
      }
    }
    loadDashboard();
    return () => abortController.abort();
  }, [currentDate, render]);
  
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard
          date={date}
          render={render}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          reservations={reservations}
          reservationsError={reservationsError}
          setReservationsError={setReservationsError}
          tables={tables}
        />
      </Route>
      <Route exact={true} path="/reservations/new">
        <NewReservation
          setRender={setRender}
          render={render}
          setCurrentDate={setCurrentDate}
          setReservationsError={setReservationsError}
          reservationsError={reservationsError}
        />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <SeatReservation tables={tables} reservationsError={reservationsError} setReservationsError={setReservationsError} setRender={setRender} render={render}/>
      </Route>  
      <Route exact={true} path="/tables/new"> 
        <NewTable setRender={setRender} render={render} setReservationsError={setReservationsError} reservationsError={reservationsError} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
