import React, {useState, useEffect} from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import { listReservations } from "../utils/api";
import NewReservation from "./NewReservation";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  let params = (new URL(document.location)).searchParams;
  let date = params.get('date')
  if(!date){
    date = today()
  }
  const [render,setRender] = useState(false)
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [currentDate, setCurrentDate] = useState(date)


  useEffect(()=>{
    const abortController = new AbortController();
    async function loadDashboard() {
      setReservationsError(null);
      try{
       const response = await listReservations({ date : currentDate }, abortController.signal)
       setReservations(response)
      } catch(error){
        console.log(error,"fail")
        setReservationsError(error)
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
        <Dashboard date={date} render={render} currentDate={currentDate} setCurrentDate={setCurrentDate} reservations={reservations} reservationsError={reservationsError}/>
      </Route>
      <Route exact={true} path="/reservations/new">
        <NewReservation setRender={setRender} render={render} setCurrentDate={setCurrentDate} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
