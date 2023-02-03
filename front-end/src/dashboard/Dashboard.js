import React from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "./Reservations";
import {today,next,previous} from "../utils/date-time"
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({setCurrentDate,currentDate,reservations, reservationsError}) {
  const history = useHistory();

  const dateHandler = async ({target}) => {
    if(target.innerHTML === "Previous"){
      const previousDate = previous(currentDate)
      await setCurrentDate(previousDate)
      history.push(`/dashboard?date=${previousDate}`)
    }
    if(target.innerHTML === "Today"){
      const todayDate = today()
      await setCurrentDate(todayDate)
      history.push(`/dashboard?date=${todayDate}`)
    }
    if(target.innerHTML === "Next"){
      const tmrDate = next(currentDate)
      await setCurrentDate(tmrDate)
      history.push(`/dashboard?date=${tmrDate}`)
    }
  }


  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {currentDate}</h4>
      </div>
      <div>
        <button type="button" onClick={dateHandler}>Previous</button>
        <button type="button" onClick={dateHandler}>Today</button>
        <button type="button" onClick={dateHandler}>Next</button>
      </div>
      <ErrorAlert error={reservationsError} />
      <Reservations reservations={reservations}/>

    </main>
  );
}

export default Dashboard;
